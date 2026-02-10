import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

function ParticleBackground({ intensity = 0.3, particleCount = 200 }) {
  const containerRef = useRef(null);
  const isMobileRef = useRef(window.innerWidth < 768);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;
    const isMobile = isMobileRef.current;
    
    // Reduce particle count on mobile
    const actualParticleCount = isMobile ? Math.floor(particleCount * 0.4) : particleCount;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: !isMobile,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 2));
    container.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0x404040, 0.2));

    const positions = new Float32Array(actualParticleCount * 3);
    const particleColors = new Float32Array(actualParticleCount * 3);
    const speeds = [];
    const colors = [0xEAB308, 0xF97316];
    
    for (let i = 0; i < actualParticleCount; i++) {
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
      
      speeds.push({
        x: (Math.random() - 0.5) * 0.02,
        y: Math.random() * 0.02 + 0.005,
        z: (Math.random() - 0.5) * 0.02,
      });
    }
    
    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: isMobile ? 0.06 : 0.1,
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
    let lastTime = 0;
    const targetFPS = isMobile ? 30 : 60;
    const frameInterval = 1000 / targetFPS;

    // Pause when not visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          clock.stop();
        } else {
          clock.start();
        }
      });
    }, { threshold: 0 });

    observer.observe(container);

    function animate(currentTime) {
      animationId = requestAnimationFrame(animate);
      
      if (isMobile && currentTime - lastTime < frameInterval) {
        return;
      }
      lastTime = currentTime;

      // Keep clock running for potential future use
      clock.getElapsedTime();
      const posAttr = particles.geometry.attributes.position;
      
      for (let i = 0; i < actualParticleCount; i++) {
        const speed = speeds[i];
        posAttr.array[i * 3] += speed.x;
        posAttr.array[i * 3 + 1] += speed.y;
        posAttr.array[i * 3 + 2] += speed.z;
        
        if (posAttr.array[i * 3] > 15) posAttr.array[i * 3] = -15;
        if (posAttr.array[i * 3] < -15) posAttr.array[i * 3] = 15;
        if (posAttr.array[i * 3 + 1] > 15) posAttr.array[i * 3 + 1] = -15;
        if (posAttr.array[i * 3 + 1] < -15) posAttr.array[i * 3 + 1] = 15;
        if (posAttr.array[i * 3 + 2] > 15) posAttr.array[i * 3 + 2] = -15;
        if (posAttr.array[i * 3 + 2] < -15) posAttr.array[i * 3 + 2] = 15;
      }
      
      posAttr.needsUpdate = true;
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
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      renderer.dispose();
      particles.geometry.dispose();
      particles.material.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [intensity, particleCount]);

  return <div ref={containerRef} className="particle-background-canvas" aria-hidden="true" />;
}

export default ParticleBackground;
