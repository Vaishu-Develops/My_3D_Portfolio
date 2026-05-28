"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export const SneakText = ({ text = "HIRE ME", className = "" }: { text?: string, className?: string }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sceneInitialized = useRef(false);

  useEffect(() => {
    if (!containerRef.current || sceneInitialized.current) return;
    sceneInitialized.current = true;

    // === Scene Setup ===
    const scene = new THREE.Scene();
    // Ensure transparent background so LightRays show behind it
    scene.background = null; 
    
    let aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
    const cameraDistance = 3.5;

    const camera = new THREE.OrthographicCamera(
      -cameraDistance * aspect,
      cameraDistance * aspect,
      cameraDistance,
      -cameraDistance,
      0.01,
      1000
    );
    camera.position.set(0, -10, 4);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // Enable alpha for transparency
    renderer.setClearColor(0x000000, 0); // Transparent clear color
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    
    // Clear any existing canvas elements first
    while (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild);
    }
    
    containerRef.current.appendChild(renderer.domElement);

    // === Utility: Create Text Texture ===
    function createTextTexture(textStr: string): Promise<THREE.Texture> {
      // Use pure white text with transparent background for dark theme
      const textColor = '#ffffff';
      
      const svg = `
        <svg width="2048" height="512" xmlns="http://www.w3.org/2000/svg">
          <text x="50%" y="50%" 
                font-family="Inter, system-ui, sans-serif" 
                font-size="280" 
                font-weight="900" 
                text-anchor="middle" 
                dominant-baseline="middle" 
                fill="${textColor}">${textStr}</text>
        </svg>
      `;

      const img = new Image();
      const svgBlob = new Blob([svg], { type: "image/svg+xml" });
      const url = URL.createObjectURL(svgBlob);

      return new Promise((resolve) => {
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = 2048;
          canvas.height = 512;
          const ctx = canvas.getContext("2d")!;
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = "high";
          ctx.drawImage(img, 0, 0);
          const texture = new THREE.CanvasTexture(canvas);
          texture.generateMipmaps = false;
          texture.minFilter = THREE.LinearFilter;
          texture.magFilter = THREE.LinearFilter;
          texture.wrapS = THREE.ClampToEdgeWrapping;
          texture.wrapT = THREE.ClampToEdgeWrapping;
          URL.revokeObjectURL(url);
          resolve(texture);
        };
        img.src = url;
      });
    }

    // === Shader Material ===
    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: null },
        uDisplacement: { value: new THREE.Vector3(1000, 1000, 1000) }, // Start far away from text
      },
      vertexShader: `
        varying vec2 vUv;
        uniform vec3 uDisplacement;

        float easeInOutCubic(float x) {
          return x < 0.5 ? 4. * x * x * x : 1. - pow(-2. * x + 2., 3.) / 2.;
        }

        float map(float value, float min1, float max1, float min2, float max2) {
          return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
        }

        void main() {
          vUv = uv;
          vec3 new_position = position;

          vec4 localPosition = vec4(position, 1.);
          vec4 worldPosition = modelMatrix * localPosition;

          float dist = length(uDisplacement - worldPosition.xyz);
          float min_distance = 3.;

          if (dist < min_distance) {
            float distance_mapped = map(dist, 0., min_distance, 1., 0.);
            float val = easeInOutCubic(distance_mapped) * 1.5; // Increased bulge height slightly
            new_position.z += val;
          }

          gl_Position = projectionMatrix * modelViewMatrix * vec4(new_position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform sampler2D uTexture;
        void main() {
          vec4 color = texture2D(uTexture, vUv);
          if (color.a < 0.1) discard; // Discard transparent canvas pixels
          gl_FragColor = vec4(color.rgb, color.a);
        }
      `,
      transparent: true,
      depthWrite: false,
      side: THREE.FrontSide,
    });

    // Load texture
    createTextTexture(text).then((texture) => {
      shaderMaterial.uniforms.uTexture.value = texture;
    });

    // === Main text plane (SINGLE PLANE ONLY) ===
    const geometry = new THREE.PlaneGeometry(15, 15, 150, 150); // Increased vertices for smoother bulge
    const plane = new THREE.Mesh(geometry, shaderMaterial);
    // Rotate to lie flat on the "floor" and face the camera elegantly
    plane.rotation.z = Math.PI / 4;
    scene.add(plane);

    // === Mouse interaction (FIXED BOUNDS) ===
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    function onPointerMove(event: PointerEvent) {
      if (!containerRef.current) return;
      const bounds = containerRef.current.getBoundingClientRect();
      pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      pointer.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;

      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObject(plane);

      if (intersects.length > 0) {
        // Smoothly lerp towards target point or snap
        shaderMaterial.uniforms.uDisplacement.value.copy(intersects[0].point);
      } else {
         // Reset when off the object
         // shaderMaterial.uniforms.uDisplacement.value.set(1000,1000,1000);
      }
    }
    
    function onPointerLeave() {
      // Moves the bulge away when mouse leaves container
      shaderMaterial.uniforms.uDisplacement.value.set(1000, 1000, 1000);
    }

    // === Resize handling ===
    function onWindowResize() {
      if (!containerRef.current || !renderer) return;
      aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.left = -cameraDistance * aspect;
      camera.right = cameraDistance * aspect;
      camera.top = cameraDistance;
      camera.bottom = -cameraDistance;
      camera.updateProjectionMatrix();
      renderer.setSize(
        containerRef.current.clientWidth,
        containerRef.current.clientHeight
      );
    }

    window.addEventListener("pointermove", onPointerMove);
    containerRef.current?.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("resize", onWindowResize);

    // === Animation loop ===
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // === Cleanup ===
    return () => {
      sceneInitialized.current = false;
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onWindowResize);
      if (containerRef.current) {
        containerRef.current.removeEventListener("pointerleave", onPointerLeave);
      }
      
      if (containerRef.current?.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      geometry.dispose();
      shaderMaterial.dispose();
      if (shaderMaterial.uniforms.uTexture.value) {
        shaderMaterial.uniforms.uTexture.value.dispose();
      }
      renderer.dispose();
    };
  }, [text]);

  return <div ref={containerRef} className={`w-full h-full ${className}`} />;
};
