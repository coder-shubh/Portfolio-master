import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

function ThreeScene() {
  const containerRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Enhanced lighting system with more dynamic lights
    const ambientLight = new THREE.AmbientLight(0x404040, 0.2);
    scene.add(ambientLight);

    // Animated colored lights with more variety
    const lights = [];
    const lightColors = [0xEAB308, 0xF97316, 0xFFD700, 0xFF6B35];
    const lightPositions = [
      [6, 6, 6],
      [-6, -6, 6],
      [-6, 6, -6],
      [6, -6, -6],
      [0, 8, 0],
      [0, -8, 0]
    ];
    
    lightPositions.forEach((pos, i) => {
      const color = lightColors[i % lightColors.length];
      const light = new THREE.PointLight(color, 1.0, 100);
      light.position.set(...pos);
      light.userData = { basePos: [...pos], index: i, color };
      scene.add(light);
      lights.push(light);
    });

    // Create glowing orbs (halos) around lights with better glow
    const glowMeshes = [];
    lights.forEach((light, i) => {
      const glowGeometry = new THREE.SphereGeometry(1.2, 32, 32);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: light.userData.color,
        transparent: true,
        opacity: 0.25,
        side: THREE.BackSide
      });
      const glow = new THREE.Mesh(glowGeometry, glowMaterial);
      glow.position.copy(light.position);
      scene.add(glow);
      glowMeshes.push(glow);
    });

    // More diverse and interesting shapes
    const shapesConfig = [
      { type: 'sphere', position: [-4, 2.5, -3], color: 0xEAB308, speed: 0.5, scale: 1.2 },
      { type: 'octahedron', position: [4, -2, -4], color: 0xF97316, speed: 0.7, scale: 1.0 },
      { type: 'torus', position: [-3, -2.5, -5], color: 0xEAB308, speed: 0.6, scale: 1.1 },
      { type: 'icosahedron', position: [3, 1.5, -3], color: 0xF97316, speed: 0.4, scale: 0.9 },
      { type: 'box', position: [-1.5, 0, -4], color: 0xEAB308, speed: 0.8, scale: 1.0 },
      { type: 'torusKnot', position: [2, -1, -3], color: 0xF97316, speed: 0.5, scale: 0.8 },
      { type: 'tetrahedron', position: [-2, 1, -4], color: 0xFFD700, speed: 0.6, scale: 0.7 },
      { type: 'dodecahedron', position: [1.5, -0.5, -5], color: 0xFF6B35, speed: 0.5, scale: 0.6 },
      { type: 'cone', position: [-3.5, 0.5, -4], color: 0xEAB308, speed: 0.7, scale: 0.8 },
      { type: 'cylinder', position: [3.5, -1.5, -3], color: 0xF97316, speed: 0.6, scale: 0.7 },
    ];

    const meshes = [];
    shapesConfig.forEach(({ type, position, color, speed, scale }) => {
      let geometry;
      switch(type) {
        case 'sphere':
          geometry = new THREE.SphereGeometry(0.5 * scale, 32, 32);
          break;
        case 'box':
          geometry = new THREE.BoxGeometry(0.7 * scale, 0.7 * scale, 0.7 * scale);
          break;
        case 'torus':
          geometry = new THREE.TorusGeometry(0.6 * scale, 0.25 * scale, 16, 32);
          break;
        case 'octahedron':
          geometry = new THREE.OctahedronGeometry(0.5 * scale, 0);
          break;
        case 'icosahedron':
          geometry = new THREE.IcosahedronGeometry(0.5 * scale, 0);
          break;
        case 'torusKnot':
          geometry = new THREE.TorusKnotGeometry(0.4 * scale, 0.15 * scale, 100, 16);
          break;
        case 'tetrahedron':
          geometry = new THREE.TetrahedronGeometry(0.5 * scale, 0);
          break;
        case 'dodecahedron':
          geometry = new THREE.DodecahedronGeometry(0.4 * scale, 0);
          break;
        case 'cone':
          geometry = new THREE.ConeGeometry(0.5 * scale, 1 * scale, 32);
          break;
        case 'cylinder':
          geometry = new THREE.CylinderGeometry(0.4 * scale, 0.4 * scale, 0.8 * scale, 32);
          break;
        default:
          geometry = new THREE.SphereGeometry(0.5 * scale, 32, 32);
      }

      // Enhanced dual material - solid + wireframe with better glow
      const solidMaterial = new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.5,
        metalness: 0.95,
        roughness: 0.05,
        transparent: true,
        opacity: 0.8,
      });

      const wireframeMaterial = new THREE.MeshBasicMaterial({
        color,
        wireframe: true,
        transparent: true,
        opacity: 0.4,
      });

      const solidMesh = new THREE.Mesh(geometry, solidMaterial);
      const wireframeMesh = new THREE.Mesh(geometry, wireframeMaterial);
      
      solidMesh.position.set(position[0], position[1], position[2]);
      wireframeMesh.position.set(position[0], position[1], position[2]);
      
      solidMesh.userData = { 
        baseY: position[1], 
        baseX: position[0],
        baseZ: position[2],
        speed, 
        timeOffset: position[0] + position[1],
        scale,
        color
      };
      wireframeMesh.userData = solidMesh.userData;
      
      scene.add(solidMesh);
      scene.add(wireframeMesh);
      meshes.push({ solid: solidMesh, wireframe: wireframeMesh });
    });

    // Enhanced particle system with more particles and better effects
    const particleCount = 400;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const speeds = [];
    const particleColors = [0xEAB308, 0xF97316, 0xFFD700, 0xFF6B35];
    
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40;
      
      const color = particleColors[Math.floor(Math.random() * particleColors.length)];
      const r = (color >> 16) / 255;
      const g = ((color >> 8) & 0xff) / 255;
      const b = (color & 0xff) / 255;
      
      colors[i * 3] = r;
      colors[i * 3 + 1] = g;
      colors[i * 3 + 2] = b;
      
      sizes[i] = Math.random() * 0.12 + 0.03;
      speeds.push({
        x: (Math.random() - 0.5) * 0.03,
        y: Math.random() * 0.04 + 0.01,
        z: (Math.random() - 0.5) * 0.03,
        rotation: Math.random() * Math.PI * 2,
      });
    }
    
    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.15,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });
    
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Animated wireframe grid with rotation
    const gridHelper = new THREE.GridHelper(40, 40, 0xEAB308, 0xEAB308);
    gridHelper.material.opacity = 0.15;
    gridHelper.material.transparent = true;
    scene.add(gridHelper);

    // Add connecting lines between nearby particles (network effect)
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(particleCount * 6);
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xEAB308,
      transparent: true,
      opacity: 0.1,
    });
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    // Mouse interaction
    const handleMouseMove = (event) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };
    
    container.addEventListener('mousemove', handleMouseMove);

    let animationId;
    const clock = new THREE.Clock();

    function animate() {
      animationId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Enhanced light animation
      lights.forEach((light, i) => {
        const { basePos } = light.userData;
        const orbitRadius = 3;
        light.position.x = basePos[0] + Math.sin(t * 0.4 + i) * orbitRadius;
        light.position.y = basePos[1] + Math.cos(t * 0.5 + i) * orbitRadius;
        light.position.z = basePos[2] + Math.sin(t * 0.3 + i) * orbitRadius;
        light.intensity = 0.6 + Math.sin(t * 1.5 + i) * 0.4;
        
        // Update glow position and intensity
        if (glowMeshes[i]) {
          glowMeshes[i].position.copy(light.position);
          glowMeshes[i].material.opacity = 0.2 + Math.sin(t * 1.5 + i) * 0.15;
          glowMeshes[i].scale.setScalar(1 + Math.sin(t + i) * 0.2);
        }
      });

      // Enhanced shape animations with more complex movements
      meshes.forEach(({ solid, wireframe }) => {
        const { baseY, baseX, baseZ, speed, timeOffset, scale, color } = solid.userData;
        
        // Complex 3D floating animation
        solid.position.y = baseY + Math.sin(t * 0.9 + timeOffset) * 1.2;
        solid.position.x = baseX + Math.cos(t * 0.7 + timeOffset) * 0.8;
        solid.position.z = baseZ + Math.sin(t * 0.8 + timeOffset) * 0.6;
        
        wireframe.position.copy(solid.position);
        
        // Multi-axis rotation
        solid.rotation.x += speed * 0.02;
        solid.rotation.y += speed * 0.018;
        solid.rotation.z += speed * 0.01;
        wireframe.rotation.copy(solid.rotation);
        
        // Pulsing scale with breathing effect
        const pulseScale = 1 + Math.sin(t * 2.5 + timeOffset) * 0.15;
        solid.scale.set(scale * pulseScale, scale * pulseScale, scale * pulseScale);
        wireframe.scale.copy(solid.scale);
        
        // Mouse interaction with stronger influence
        const mouseInfluence = 0.5;
        solid.position.x += (mouseRef.current.x * 3 - solid.position.x * 0.1) * mouseInfluence * 0.015;
        solid.position.y += (mouseRef.current.y * 3 - solid.position.y * 0.1) * mouseInfluence * 0.015;
        wireframe.position.copy(solid.position);
        
        // Dynamic opacity and emissive intensity
        const distanceFromCenter = Math.sqrt(
          Math.pow(solid.position.x, 2) + Math.pow(solid.position.y, 2)
        );
        const opacity = 0.8 - (distanceFromCenter / 15) * 0.4;
        solid.material.opacity = Math.max(0.5, opacity);
        solid.material.emissiveIntensity = 0.3 + Math.sin(t + timeOffset) * 0.2;
        wireframe.material.opacity = opacity * 0.5;
      });

      // Enhanced particle animation
      const posAttr = particles.geometry.attributes.position;
      const colorAttr = particles.geometry.attributes.color;
      
      for (let i = 0; i < particleCount; i++) {
        const speed = speeds[i];
        posAttr.array[i * 3] += speed.x + Math.sin(t * 0.5 + i * 0.1) * 0.002;
        posAttr.array[i * 3 + 1] += speed.y;
        posAttr.array[i * 3 + 2] += speed.z + Math.cos(t * 0.5 + i * 0.1) * 0.002;
        
        // Wrap around with smooth transitions
        if (posAttr.array[i * 3] > 20) posAttr.array[i * 3] = -20;
        if (posAttr.array[i * 3] < -20) posAttr.array[i * 3] = 20;
        if (posAttr.array[i * 3 + 1] > 20) posAttr.array[i * 3 + 1] = -20;
        if (posAttr.array[i * 3 + 1] < -20) posAttr.array[i * 3 + 1] = 20;
        if (posAttr.array[i * 3 + 2] > 20) posAttr.array[i * 3 + 2] = -20;
        if (posAttr.array[i * 3 + 2] < -20) posAttr.array[i * 3 + 2] = 20;
        
        // Enhanced color pulsing
        const colorPulse = 0.6 + Math.sin(t * 3 + i * 0.05) * 0.4;
        colorAttr.array[i * 3] *= colorPulse;
        colorAttr.array[i * 3 + 1] *= colorPulse;
        colorAttr.array[i * 3 + 2] *= colorPulse;
      }
      
      posAttr.needsUpdate = true;
      colorAttr.needsUpdate = true;

      // Update connecting lines (network effect)
      let lineIndex = 0;
      const maxDistance = 3;
      for (let i = 0; i < particleCount; i += 4) {
        for (let j = i + 1; j < Math.min(i + 4, particleCount); j++) {
          const dx = posAttr.array[i * 3] - posAttr.array[j * 3];
          const dy = posAttr.array[i * 3 + 1] - posAttr.array[j * 3 + 1];
          const dz = posAttr.array[i * 3 + 2] - posAttr.array[j * 3 + 2];
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
          
          if (distance < maxDistance && lineIndex < particleCount * 3) {
            linePositions[lineIndex * 6] = posAttr.array[i * 3];
            linePositions[lineIndex * 6 + 1] = posAttr.array[i * 3 + 1];
            linePositions[lineIndex * 6 + 2] = posAttr.array[i * 3 + 2];
            linePositions[lineIndex * 6 + 3] = posAttr.array[j * 3];
            linePositions[lineIndex * 6 + 4] = posAttr.array[j * 3 + 1];
            linePositions[lineIndex * 6 + 5] = posAttr.array[j * 3 + 2];
            lineIndex++;
          }
        }
      }
      lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions.slice(0, lineIndex * 6), 3));
      lineGeometry.setDrawRange(0, lineIndex * 2);

      // Enhanced camera movement with smooth following
      camera.position.x += (mouseRef.current.x * 0.8 - camera.position.x) * 0.08;
      camera.position.y += (mouseRef.current.y * 0.8 - camera.position.y) * 0.08;
      camera.position.z = 8 + Math.sin(t * 0.3) * 0.5;
      camera.lookAt(0, 0, 0);

      // Rotate grid with multiple axes
      gridHelper.rotation.z = t * 0.15;
      gridHelper.rotation.x = Math.sin(t * 0.1) * 0.1;

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
      container.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="hero-threejs-canvas" aria-hidden="true" />;
}

export default ThreeScene;
