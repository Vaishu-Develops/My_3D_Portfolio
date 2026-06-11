"use client";

import { useRef, useEffect } from 'react';
import * as THREE from 'three';

/**
 * Interactive Woven Light 3D particle torus-knot.
 * Particles scatter away from the mouse cursor and drift back.
 * Works inside any sized container — uses ResizeObserver for responsive sizing.
 */
export const WovenCanvas = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check WebGL support before initializing Three.js
    const isWebGLAvailable = () => {
      try {
        const canvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
      } catch (e) {
        return false;
      }
    };

    if (!isWebGLAvailable()) {
      console.warn('WovenCanvas: WebGL is disabled or unsupported.');
      return;
    }

    // ── Scene ──────────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 5;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch (e) {
      console.warn('WovenCanvas: Failed to create WebGLRenderer.', e);
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Size the renderer to fill its container
    const applySize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    applySize();

    // ── Mouse state ───────────────────────────────────────
    const mouse = new THREE.Vector2(0, 0);

    // ── Particles ─────────────────────────────────────────
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 12000 : 35000;
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    const geometry = new THREE.BufferGeometry();
    const torusKnot = new THREE.TorusKnotGeometry(1.5, 0.5, 200, 32);

    for (let i = 0; i < particleCount; i++) {
      const vertexIndex = i % torusKnot.attributes.position.count;
      const x = torusKnot.attributes.position.getX(vertexIndex);
      const y = torusKnot.attributes.position.getY(vertexIndex);
      const z = torusKnot.attributes.position.getZ(vertexIndex);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;

      const color = new THREE.Color();
      color.setHSL(Math.random(), 0.8, 0.5);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      velocities[i * 3] = 0;
      velocities[i * 3 + 1] = 0;
      velocities[i * 3 + 2] = 0;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.02,
      vertexColors: true,
      blending: THREE.NormalBlending,
      transparent: true,
      opacity: 1.0,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // ── Mouse handler — relative to container ─────────────
    const handleMouseMove = (event: MouseEvent) => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      // Only track when cursor is actually over (or near) the container
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // ── Animation loop ────────────────────────────────────
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsedTime = performance.now() * 0.001;

      const mouseWorld = new THREE.Vector3(mouse.x * 3, mouse.y * 3, 0);
      const mx = mouseWorld.x;
      const my = mouseWorld.y;
      const mz = mouseWorld.z;

      for (let i = 0; i < particleCount; i++) {
        const ix = i * 3;
        const iy = i * 3 + 1;
        const iz = i * 3 + 2;

        const px = positions[ix];
        const py = positions[iy];
        const pz = positions[iz];

        const opx = originalPositions[ix];
        const opy = originalPositions[iy];
        const opz = originalPositions[iz];

        let vx = velocities[ix];
        let vy = velocities[iy];
        let vz = velocities[iz];

        // Repel from mouse
        const dx = px - mx;
        const dy = py - my;
        const dz = pz - mz;
        const distSq = dx * dx + dy * dy + dz * dz;
        const dist = Math.sqrt(distSq);

        if (dist < 1.5) {
          const force = (1.5 - dist) * 0.01;
          const invDist = 1 / (dist || 1);
          vx += dx * invDist * force;
          vy += dy * invDist * force;
          vz += dz * invDist * force;
        }

        // Return to original position
        const rx = (opx - px) * 0.001;
        const ry = (opy - py) * 0.001;
        const rz = (opz - pz) * 0.001;

        vx = (vx + rx) * 0.95;
        vy = (vy + ry) * 0.95;
        vz = (vz + rz) * 0.95;

        positions[ix] = px + vx;
        positions[iy] = py + vy;
        positions[iz] = pz + vz;

        velocities[ix] = vx;
        velocities[iy] = vy;
        velocities[iz] = vz;
      }
      geometry.attributes.position.needsUpdate = true;

      points.rotation.y = elapsedTime * 0.05;
      renderer.render(scene, camera);
    };
    animate();

    // ── ResizeObserver — auto-resizes when container changes ──
    const ro = new ResizeObserver(() => applySize());
    ro.observe(container);

    // ── Cleanup ───────────────────────────────────────────
    return () => {
      ro.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      torusKnot.dispose();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ width: '100%', height: '100%', overflow: 'hidden' }}
    />
  );
};
