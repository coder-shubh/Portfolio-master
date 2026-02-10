import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

function ThreeScene() {
  const containerRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const isMobileRef = useRef(window.innerWidth < 768);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;
    const isMobile = isMobileRef.current;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: !isMobile, // Disable antialiasing on mobile for performance
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 2)); // Lower pixel ratio on mobile
    container.appendChild(renderer.domElement);

    // Lights - reduced count on mobile
    const ambientLight = new THREE.AmbientLight(0x404040, 0.2);
    scene.add(ambientLight);

    const lights = [];
    const lightColors = [0xEAB308, 0xF97316];
    const lightPositions = isMobile 
      ? [[5, 5, 5], [-5, -5, 5]] // Only 2 lights on mobile
      : [[5, 5, 5], [-5, -5, 5], [-5, 5, -5], [5, -5, -5]]; // 4 lights on desktop
    
    lightPositions.forEach((pos, i) => {
      const light = new THREE.PointLight(lightColors[i % lightColors.length], 0.6, 100);
      light.position.set(...pos);
      light.userData = { basePos: [...pos], index: i };
      scene.add(light);
      lights.push(light);
    });

    // Shapes - fewer on mobile
    const shapesConfig = isMobile ? [
      { type: 'sphere', position: [-3, 2, -2], color: 0xEAB308, speed: 0.5, scale: 1.0 },
      { type: 'box', position: [3, -1, -3], color: 0xF97316, speed: 0.7, scale: 0.9 },
      { type: 'torus', position: [-2, -2, -4], color: 0xEAB308, speed: 0.6, scale: 0.8 },
      { type: 'sphere', position: [2, 1, -2], color: 0xF97316, speed: 0.4, scale: 0.7 },
    ] : [
      { type: 'sphere', position: [-4, 2.5, -3], color: 0xEAB308, speed: 0.5, scale: 1.2 },
      { type: 'octahedron', position: [4, -2, -4], color: 0xF97316, speed: 0.7, scale: 1.0 },
      { type: 'torus', position: [-3, -2.5, -5], color: 0xEAB308, speed: 0.6, scale: 1.1 },
      { type: 'icosahedron', position: [3, 1.5, -3], color: 0xF97316, speed: 0.4, scale: 0.9 },
      { type: 'box', position: [-1.5, 0, -4], color: 0xEAB308, speed: 0.8, scale: 1.0 },
      { type: 'torusKnot', position: [2, -1, -3], color: 0xF97316, speed: 0.5, scale: 0.8 },
    ];

    const meshes = [];
    shapesConfig.forEach(({ type, position, color, speed, scale }) => {
      let geometry;
      switch(type) {
        case 'sphere':
          geometry = new THREE.SphereGeometry(0.5 * scale, isMobile ? 16 : 32, isMobile ? 16 : 32);
          break;
        case 'box':
          geometry = new THREE.BoxGeometry(0.7 * scale, 0.7 * scale, 0.7 * scale);
          break;
        case 'torus':
          geometry = new THREE.TorusGeometry(0.6 * scale, 0.25 * scale, isMobile ? 8 : 16, isMobile ? 16 : 32);
          break;
        case 'octahedron':
          geometry = new THREE.OctahedronGeometry(0.5 * scale, 0);
          break;
        case 'icosahedron':
          geometry = new THREE.IcosahedronGeometry(0.5 * scale, 0);
          break;
        case 'torusKnot':
          geometry = new THREE.TorusKnotGeometry(0.4 * scale, 0.15 * scale, isMobile ? 50 : 100, isMobile ? 8 : 16);
          break;
        default:
          geometry = new THREE.SphereGeometry(0.5 * scale, 16, 16);
      }

      const material = new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.3,
        metalness: 0.8,
        roughness: 0.2,
        transparent: true,
        opacity: 0.6,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(position[0], position[1], position[2]);
      mesh.userData = { 
        baseY: position[1], 
        baseX: position[0],
        baseZ: position[2],
        speed, 
        timeOffset: position[0] + position[1],
        scale
      };
      scene.add(mesh);
      meshes.push(mesh);
    });

    // Particles - much fewer on mobile
    const particleCount = isMobile ? 50 : 200;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const speeds = [];
    const particleColors = [0xEAB308, 0xF97316];
    
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
      
      const color = particleColors[Math.floor(Math.random() * particleColors.length)];
      const r = (color >> 16) / 255;
      const g = ((color >> 8) & 0xff) / 255;
      const b = (color & 0xff) / 255;
      
      colors[i * 3] = r;
      colors[i * 3 + 1] = g;
      colors[i * 3 + 2] = b;
      
      speeds.push({
        x: (Math.random() - 0.5) * 0.02,
        y: Math.random() * 0.03 + 0.01,
        z: (Math.random() - 0.5) * 0.02,
      });
    }
    
    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: isMobile ? 0.08 : 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });
    
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Mouse interaction - disabled on mobile for performance
    const handleMouseMove = isMobile ? null : (event) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };
    
    if (handleMouseMove) {
      container.addEventListener('mousemove', handleMouseMove);
    }

    let animationId;
    const clock = new THREE.Clock();
    let lastTime = 0;
    const targetFPS = isMobile ? 30 : 60; // Lower FPS on mobile
    const frameInterval = 1000 / targetFPS;

    // Intersection Observer to pause when not visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          // Pause animation when not visible
          clock.stop();
        } else {
          clock.start();
        }
      });
    }, { threshold: 0 });

    observer.observe(container);

    function animate(currentTime) {
      animationId = requestAnimationFrame(animate);
      
      // Throttle FPS on mobile
      if (isMobile && currentTime - lastTime < frameInterval) {
        return;
      }
      lastTime = currentTime;

      const t = clock.getElapsedTime();

      // Animate lights
      lights.forEach((light, i) => {
        const { basePos } = light.userData;
        const orbitRadius = isMobile ? 1.5 : 2;
        light.position.x = basePos[0] + Math.sin(t * 0.4 + i) * orbitRadius;
        light.position.y = basePos[1] + Math.cos(t * 0.5 + i) * orbitRadius;
        light.position.z = basePos[2] + Math.sin(t * 0.3 + i) * orbitRadius;
        light.intensity = 0.4 + Math.sin(t * 1.5 + i) * 0.2;
      });

      // Animate shapes
      meshes.forEach((mesh) => {
        const { baseY, baseX, baseZ, speed, timeOffset, scale } = mesh.userData;
        
        mesh.position.y = baseY + Math.sin(t * 0.8 + timeOffset) * 0.8;
        mesh.position.x = baseX + Math.cos(t * 0.6 + timeOffset) * 0.5;
        mesh.position.z = baseZ + Math.sin(t * 0.7 + timeOffset) * 0.4;
        
        mesh.rotation.x += speed * 0.015;
        mesh.rotation.y += speed * 0.012;
        
        const pulseScale = 1 + Math.sin(t * 2 + timeOffset) * 0.1;
        mesh.scale.set(scale * pulseScale, scale * pulseScale, scale * pulseScale);
        
        // Mouse interaction only on desktop
        if (!isMobile) {
          const mouseInfluence = 0.3;
          mesh.position.x += (mouseRef.current.x * 2 - mesh.position.x * 0.1) * mouseInfluence * 0.01;
          mesh.position.y += (mouseRef.current.y * 2 - mesh.position.y * 0.1) * mouseInfluence * 0.01;
        }
      });

      // Animate particles
      const posAttr = particles.geometry.attributes.position;
      
      for (let i = 0; i < particleCount; i++) {
        const speed = speeds[i];
        posAttr.array[i * 3] += speed.x;
        posAttr.array[i * 3 + 1] += speed.y;
        posAttr.array[i * 3 + 2] += speed.z;
        
        // Wrap around
        if (posAttr.array[i * 3] > 15) posAttr.array[i * 3] = -15;
        if (posAttr.array[i * 3] < -15) posAttr.array[i * 3] = 15;
        if (posAttr.array[i * 3 + 1] > 15) posAttr.array[i * 3 + 1] = -15;
        if (posAttr.array[i * 3 + 1] < -15) posAttr.array[i * 3 + 1] = 15;
        if (posAttr.array[i * 3 + 2] > 15) posAttr.array[i * 3 + 2] = -15;
        if (posAttr.array[i * 3 + 2] < -15) posAttr.array[i * 3 + 2] = 15;
      }
      
      posAttr.needsUpdate = true;

      // Camera movement - subtle on mobile
      if (!isMobile) {
        camera.position.x += (mouseRef.current.x * 0.5 - camera.position.x) * 0.05;
        camera.position.y += (mouseRef.current.y * 0.5 - camera.position.y) * 0.05;
      }
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
    animate();

    function handleResize() {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
    window.addEventListener('resize', handleResize);

    return () => {
      observer.disconnect();
      if (handleMouseMove) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      renderer.dispose();
      // Dispose geometries and materials
      meshes.forEach(mesh => {
        mesh.geometry.dispose();
        mesh.material.dispose();
      });
      particles.geometry.dispose();
      particles.material.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="hero-threejs-canvas" aria-hidden="true" />;
}

export default ThreeScene;
