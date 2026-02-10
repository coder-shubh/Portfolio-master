import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

function ParticleBackground({ intensity = 0.3, particleCount = 200, colors = [0xEAB308, 0xF97316] }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Subtle ambient light
    scene.add(new THREE.AmbientLight(0x404040, 0.2));

    // Particle system
    const positions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const speeds = [];
    
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
      
      const color = colors[Math.floor(Math.random() * colors.length)];
      const r = (color >> 16) / 255;
      const g = ((color >> 8) & 0xff) / 255;
      const b = (color & 0xff) / 255;
      
      particleColors[i * 3] = r;
      particleColors[i * 3 + 1] = g;
      particleColors[i * 3 + 2] = b;
      
      sizes[i] = Math.random() * 0.08 + 0.02;
      speeds.push({
        x: (Math.random() - 0.5) * 0.02,
        y: Math.random() * 0.02 + 0.005,
        z: (Math.random() - 0.5) * 0.02,
      });
    }
    
    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
    particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: intensity,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });
    
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    let animationId;
    const clock = new THREE.Clock();

    function animate() {
      animationId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      const posAttr = particles.geometry.attributes.position;
      const colorAttr = particles.geometry.attributes.color;
      
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
        
        // Subtle color pulsing
        const colorPulse = 0.7 + Math.sin(t * 2 + i * 0.1) * 0.3;
        colorAttr.array[i * 3] *= colorPulse;
        colorAttr.array[i * 3 + 1] *= colorPulse;
        colorAttr.array[i * 3 + 2] *= colorPulse;
      }
      
      posAttr.needsUpdate = true;
      colorAttr.needsUpdate = true;

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
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [intensity, particleCount, colors]);

  return <div ref={containerRef} className="particle-background-canvas" aria-hidden="true" />;
}

export default ParticleBackground;
