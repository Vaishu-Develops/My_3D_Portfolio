// @ts-nocheck
// components/ScannerCardStream.tsx

'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import * as THREE from 'three';

// --- GitHub Projects Data ---
const projectsData = [
  {
    title: 'SarpGuard',
    tag: 'AI Security',
    desc: 'AI-powered dual-layer security system for real-time snake detection and classification via video or live webcam.',
    link: 'https://github.com/Vaishu-Develops/SarpGuard',
    accent: '#9ABCAB', // Light Sage
    bgFrom: '#072D33', // Deep Teal
    bgTo: '#0c0c0c',
  },
  {
    title: 'PCB Defect Detection',
    tag: 'Deep Learning',
    desc: 'End-to-end deep learning system using EfficientNet-B0 achieving 96% accuracy across 6 PCB defect types.',
    link: 'https://github.com/Vaishu-Develops/PCB-Defect-Detection-and-Classification-System',
    accent: '#3A7564', // Muted Teal
    bgFrom: '#072D33', // Deep Teal
    bgTo: '#33091B', // Deep Wine
  },
  {
    title: 'Multi-Agent Stock Analyzer',
    tag: 'AI / Finance',
    desc: 'Multi-Agent AI Financial Analyst powered by Llama 4 Maverick via SambaNova for global stock analysis.',
    link: 'https://github.com/Vaishu-Develops/Multi-Agent-Stock-Analyzer',
    accent: '#DFBE8B', // Champagne Gold
    bgFrom: '#33091B', // Deep Wine
    bgTo: '#0c0c0c',
  },
  {
    title: 'SyncSpace',
    tag: 'MERN + Real-time',
    desc: 'All-in-one collaboration hub with Kanban boards, real-time doc editing, project chat, and file versioning.',
    link: 'https://github.com/Vaishu-Develops/SyncSpace',
    accent: '#8F5C64', // Dusty Rose
    bgFrom: '#33091B', // Deep Wine
    bgTo: '#8F5C64', // Dusty Rose
  },
  {
    title: 'GigConnect',
    tag: 'MERN',
    desc: 'Hyperlocal freelance marketplace connecting clients with freelancers — gig posting, search, real-time chat.',
    link: 'https://github.com/Vaishu-Develops/GigConnect',
    accent: '#3A7564', // Muted Teal
    bgFrom: '#072D33', // Deep Teal
    bgTo: '#0c0c0c',
  },
  {
    title: 'Deep Secure Steganography',
    tag: 'AI + Crypto',
    desc: 'Steganography app combining Deep Learning and AES Cryptography to securely hide images and text.',
    link: 'https://github.com/Vaishu-Develops/AI_Powered_Deep_Secure_Steganography_Generator',
    accent: '#9ABCAB', // Light Sage
    bgFrom: '#072D33', // Deep Teal
    bgTo: '#33091B', // Deep Wine
  },
  {
    title: 'Hospital SOC Dashboard',
    tag: 'React + AI',
    desc: 'Interactive dashboards and AI-powered data querying systems for hospital Schedule of Charges management.',
    link: 'https://github.com/Vaishu-Develops/Payer_Side',
    accent: '#DFBE8B', // Champagne Gold
    bgFrom: '#33091B', // Deep Wine
    bgTo: '#0c0c0c',
  },
  {
    title: 'Audio Recognition Tool',
    tag: 'GenAI',
    desc: 'AI-driven app that transcribes audio and searches subtitles using semantic similarity — Shazam for speech.',
    link: 'https://github.com/Vaishu-Develops/Audio-To-Text-Conversion',
    accent: '#8F5C64', // Dusty Rose
    bgFrom: '#33091B', // Deep Wine
    bgTo: '#8F5C64', // Dusty Rose
  },
  {
    title: 'Gen-AI Code Reviewer',
    tag: 'GenAI',
    desc: 'AI-powered code review tool that analyzes quality, finds bugs, and suggests improvements using LLMs.',
    link: 'https://github.com/Vaishu-Develops/Gen-AI-Code-reviewer',
    accent: '#9ABCAB', // Light Sage
    bgFrom: '#072D33', // Deep Teal
    bgTo: '#3A7564', // Muted Teal
  },
  {
    title: 'AI Travel Planner',
    tag: 'AI',
    desc: 'AI-powered travel itinerary generator that creates personalized travel plans based on user preferences.',
    link: 'https://github.com/Vaishu-Develops/AI-Powered-Travel_Planner',
    accent: '#DFBE8B', // Champagne Gold
    bgFrom: '#33091B', // Deep Wine
    bgTo: '#0c0c0c',
  },
  {
    title: 'RentMate',
    tag: 'Full-Stack',
    desc: 'Full-stack rental platform for finding and listing rental properties with search and filtering capabilities.',
    link: 'https://github.com/Vaishu-Develops/RentMate',
    accent: '#3A7564', // Muted Teal
    bgFrom: '#072D33', // Deep Teal
    bgTo: '#0c0c0c',
  },
  {
    title: 'MentalHealth Chatbot',
    tag: 'AI',
    desc: 'A supportive AI companion for mental well-being with healing poetry and empathetic responses.',
    link: 'https://github.com/Vaishu-Develops/MentalHealth-Chatbot',
    accent: '#8F5C64', // Dusty Rose
    bgFrom: '#33091B', // Deep Wine
    bgTo: '#8F5C64', // Dusty Rose
  },
];

// --- Helper function to generate ASCII-like code ---
const ASCII_CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789(){}[]<>;:,._-+=!@#$%^&*|\\/\"'`~?";
const generateCode = (width: number, height: number): string => {
  let text = "";
  for (let i = 0; i < width * height; i++) {
    text += ASCII_CHARS[Math.floor(Math.random() * ASCII_CHARS.length)];
  }
  let out = "";
  for (let i = 0; i < height; i++) {
    out += text.substring(i * width, (i + 1) * width) + "\n";
  }
  return out;
};

// --- Component Props Type Definition ---
type ScannerCardStreamProps = {
  showControls?: boolean;
  showSpeed?: boolean;
  initialSpeed?: number;
  direction?: -1 | 1;
  cardImages?: string[];
  repeat?: number;
  cardGap?: number;
  friction?: number;
  scanEffect?: 'clip' | 'scramble';
};

// --- The Main Component ---
const ScannerCardStream = ({
  showControls = false,
  showSpeed = false,
  initialSpeed = 150,
  direction = -1,
  repeat = 6,
  cardGap = 60,
  friction = 0.95,
  scanEffect = 'scramble',
}: ScannerCardStreamProps) => {

  const [speed, setSpeed] = useState(initialSpeed);
  const [isPaused, setIsPaused] = useState(false);
  const [isScanning, setIsScanning] = useState(false); // New state for scanner visibility
  const [isMobile, setIsMobile] = useState(false);

  // Monitor viewport size for mobile support
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const activeCardGap = isMobile ? 24 : cardGap;
  const activeCardWidth = isMobile ? 320 : 400;
  const activeCardHeight = isMobile ? 200 : 250;
  const scannerRatio = isMobile ? 0.1 : 0.2;

  const cards = useMemo(() => {
    const totalCards = projectsData.length * repeat;
    return Array.from({ length: totalCards }, (_, i) => {
      const proj = projectsData[i % projectsData.length];
      return {
        id: i,
        index: i % projectsData.length,
        title: proj.title,
        tag: proj.tag,
        desc: proj.desc,
        link: proj.link,
        accent: proj.accent,
        bgFrom: proj.bgFrom,
        bgTo: proj.bgTo,
        ascii: generateCode(Math.floor(400 / 6.5), Math.floor(250 / 13)),
      };
    });
  }, [repeat]);

  const cardLineRef = useRef<HTMLDivElement>(null);
  const scannerLineRef = useRef<HTMLDivElement>(null);
  const particleCanvasRef = useRef<HTMLCanvasElement>(null);
  const scannerCanvasRef = useRef<HTMLCanvasElement>(null);
  const originalAscii = useRef(new Map<number, string>());

  const cardStreamState = useRef({
    position: 0, velocity: initialSpeed, direction: direction, isDragging: false,
    lastMouseX: 0, lastTime: performance.now(),
    friction: friction, minVelocity: 30,
  });

  const scannerState = useRef({ isScanning: false });
  
  const toggleAnimation = useCallback(() => setIsPaused(prev => !prev), []);
  const resetPosition = useCallback(() => {
    if (cardLineRef.current) {
        cardStreamState.current.position = cardLineRef.current.parentElement?.offsetWidth || 0;
        cardStreamState.current.velocity = initialSpeed;
        cardStreamState.current.direction = direction;
        setIsPaused(false);
    }
  }, [initialSpeed, direction]);
  const changeDirection = useCallback(() => { cardStreamState.current.direction *= -1; }, []);

  useEffect(() => {
    const cardLine = cardLineRef.current;
    const particleCanvas = particleCanvasRef.current;
    const scannerCanvas = scannerCanvasRef.current;

    if (!cardLine || !particleCanvas || !scannerCanvas) return;
    
    cards.forEach(card => originalAscii.current.set(card.id, card.ascii));
    let animationFrameId: number;

    const mobile = window.innerWidth < 768;
    const curCardWidth = mobile ? 320 : 400;
    const curCardHeight = mobile ? 200 : 250;
    const curCardGap = mobile ? 24 : cardGap;
    const curScannerRatio = mobile ? 0.1 : 0.2;

    // --- (SETUP LOGIC for Three.js, Canvas, etc.) ---
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-window.innerWidth / 2, window.innerWidth / 2, curCardHeight / 2, -curCardHeight / 2, 1, 1000);
    camera.position.z = 100;
    const renderer = new THREE.WebGLRenderer({ canvas: particleCanvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, curCardHeight);
    renderer.setClearColor(0x000000, 0);
    const particleCount = 400;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount);
    const alphas = new Float32Array(particleCount);
    const texCanvas = document.createElement("canvas");
    texCanvas.width = 100; texCanvas.height = 100;
    const texCtx = texCanvas.getContext("2d")!;
    const half = 50;
    const gradient = texCtx.createRadialGradient(half, half, 0, half, half, half);
    gradient.addColorStop(0.025, "#fff");
    gradient.addColorStop(0.1, `hsl(217, 61%, 33%)`);
    gradient.addColorStop(0.25, `hsl(217, 64%, 6%)`);
    gradient.addColorStop(1, "transparent");
    texCtx.fillStyle = gradient;
    texCtx.arc(half, half, half, 0, Math.PI * 2);
    texCtx.fill();
    const texture = new THREE.CanvasTexture(texCanvas);
    for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * window.innerWidth * 2;
        positions[i * 3 + 1] = (Math.random() - 0.5) * curCardHeight;
        velocities[i] = Math.random() * 60 + 30;
        alphas[i] = (Math.random() * 8 + 2) / 10;
    }
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("alpha", new THREE.BufferAttribute(alphas, 1));
    const material = new THREE.ShaderMaterial({
      uniforms: { pointTexture: { value: texture } },
      vertexShader: `attribute float alpha; varying float vAlpha; void main() { vAlpha = alpha; vec4 mvPosition = modelViewMatrix * vec4(position, 1.0); gl_PointSize = 15.0; gl_Position = projectionMatrix * mvPosition; }`,
      fragmentShader: `uniform sampler2D pointTexture; varying float vAlpha; void main() { gl_FragColor = vec4(1.0, 1.0, 1.0, vAlpha) * texture2D(pointTexture, gl_PointCoord); }`,
      transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, vertexColors: false,
    });
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    const ctx = scannerCanvas.getContext('2d')!;
    scannerCanvas.width = window.innerWidth;
    scannerCanvas.height = curCardHeight;
    let scannerParticles: any[] = [];
    const baseMaxParticles = 800;
    let currentMaxParticles = baseMaxParticles;
    const scanTargetMaxParticles = 2500;

    const createScannerParticle = () => {
      const mob = window.innerWidth < 768;
      const activeH = mob ? 200 : 250;
      let scannerX = window.innerWidth * (mob ? 0.1 : 0.2);
      
      if (scannerLineRef.current && scannerCanvasRef.current) {
        const lineRect = scannerLineRef.current.getBoundingClientRect();
        const canvasRect = scannerCanvasRef.current.getBoundingClientRect();
        scannerX = lineRect.left - canvasRect.left + lineRect.width / 2;
      }
      
      return {
        x: scannerX + (Math.random() - 0.5) * 4,
        y: Math.random() * activeH,
        vx: Math.random() * 0.8 + 0.2,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 0.6 + 0.4,
        alpha: Math.random() * 0.4 + 0.6,
        life: 1.0,
        decay: Math.random() * 0.02 + 0.005,
      };
    };

    for (let i = 0; i < baseMaxParticles; i++) scannerParticles.push(createScannerParticle());
    
    const runScrambleEffect = (element: HTMLElement, cardId: number) => {
        if (element.dataset.scrambling === 'true') return;
        element.dataset.scrambling = 'true';
        const originalText = originalAscii.current.get(cardId) || '';
        let scrambleCount = 0;
        const maxScrambles = 10;
        const interval = setInterval(() => {
            element.textContent = generateCode(Math.floor(400 / 6.5), Math.floor(250 / 13));
            scrambleCount++;
            if (scrambleCount >= maxScrambles) {
                clearInterval(interval);
                element.textContent = originalText;
                delete element.dataset.scrambling;
            }
        }, 30);
    };

    const updateCardEffects = () => {
      if (!scannerLineRef.current) return;
      const lineRect = scannerLineRef.current.getBoundingClientRect();
      const scannerX = lineRect.left + lineRect.width / 2;
      
      let anyCardIsScanning = false;
      cardLine.querySelectorAll<HTMLElement>(".card-wrapper").forEach((wrapper, index) => {
        const rect = wrapper.getBoundingClientRect();
        const normalCard = wrapper.querySelector<HTMLElement>(".card-normal")!;
        const asciiCard = wrapper.querySelector<HTMLElement>(".card-ascii")!;
        const asciiContent = asciiCard.querySelector<HTMLElement>('pre')!;
        
        const isCrossing = rect.left < scannerX && rect.right > scannerX;
        if (isCrossing) {
          anyCardIsScanning = true;
          if (scanEffect === 'scramble' && wrapper.dataset.scanned !== 'true') {
              runScrambleEffect(asciiContent, index);
          }
          wrapper.dataset.scanned = 'true';
        } else {
          delete wrapper.dataset.scanned;
        }

        const intersectX = Math.max(0, Math.min(rect.width, scannerX - rect.left));
        const pct = (intersectX / rect.width) * 100;
        normalCard.style.clipPath = `inset(0 0 0 ${pct}%)`;
        asciiCard.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
      });
      // Update state for scanner visibility
      setIsScanning(anyCardIsScanning);
      scannerState.current.isScanning = anyCardIsScanning;
    };
    
    // --- Mouse and Touch Dragging implementation ---
    let isDragging = false;
    let startX = 0;
    let startPos = 0;

    const handleMouseDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      cardStreamState.current.isDragging = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      startX = clientX;
      startPos = cardStreamState.current.position;
      cardStreamState.current.velocity = 0;
    };

    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const dx = clientX - startX;
      cardStreamState.current.position = startPos + dx;
    };

    const handleMouseUp = () => {
      if (!isDragging) return;
      isDragging = false;
      cardStreamState.current.isDragging = false;
      cardStreamState.current.velocity = initialSpeed;
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      cardStreamState.current.position += e.deltaY * 0.5;
    };

    const handleResize = () => {
      const parent = cardLine.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const mob = window.innerWidth < 768;
      const activeH = mob ? 200 : 250;
      
      // Update Three.js camera & renderer
      camera.left = -rect.width / 2;
      camera.right = rect.width / 2;
      camera.top = activeH / 2;
      camera.bottom = -activeH / 2;
      camera.updateProjectionMatrix();
      renderer.setSize(rect.width, activeH);
      
      // Update scanner canvas dimensions
      scannerCanvas.width = rect.width;
      scannerCanvas.height = activeH;

      // Update scanner line rounded pixel position
      if (scannerLineRef.current) {
        const ratio = mob ? 0.1 : 0.2;
        scannerLineRef.current.style.left = `${Math.round(rect.width * ratio)}px`;
      }
    };

    cardLine.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    cardLine.addEventListener("touchstart", handleMouseDown, { passive: true });
    window.addEventListener("touchmove", handleMouseMove, { passive: true });
    window.addEventListener("touchend", handleMouseUp);
    cardLine.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("resize", handleResize);

    // Call resize handler once initially to set proper width/height
    handleResize();

    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - cardStreamState.current.lastTime) / 1000;
      cardStreamState.current.lastTime = currentTime;
      if (!isPaused && !cardStreamState.current.isDragging) {
        if (cardStreamState.current.velocity > cardStreamState.current.minVelocity) {
            cardStreamState.current.velocity *= cardStreamState.current.friction;
        }
        cardStreamState.current.position += cardStreamState.current.velocity * cardStreamState.current.direction * deltaTime;
        setSpeed(Math.round(cardStreamState.current.velocity));
      }
      const mobVal = window.innerWidth < 768;
      const cardWidthVal = mobVal ? 320 : 400;
      const cardGapVal = mobVal ? 24 : cardGap;
      const cardLineWidth = (cardWidthVal + cardGapVal) * cards.length;
      
      const { position } = cardStreamState.current;
      const containerWidth = cardLine.parentElement?.offsetWidth || 0;
      if (position < -cardLineWidth) cardStreamState.current.position = containerWidth;
      else if (position > containerWidth) cardStreamState.current.position = -cardLineWidth;
      cardLine.style.transform = `translateX(${cardStreamState.current.position}px)`;
      updateCardEffects();
      const time = currentTime * 0.001;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] += velocities[i] * 0.016;
        if (positions[i * 3] > window.innerWidth / 2 + 100) positions[i * 3] = -window.innerWidth / 2 - 100;
        positions[i * 3 + 1] += Math.sin(time + i * 0.1) * 0.5;
        alphas[i] = Math.max(0.1, Math.min(1, alphas[i] + (Math.random() - 0.5) * 0.05));
      }
      geometry.attributes.position.needsUpdate = true;
      geometry.attributes.alpha.needsUpdate = true;
      renderer.render(scene, camera);
      ctx.clearRect(0, 0, scannerCanvas.width, scannerCanvas.height);
      const targetCount = scannerState.current.isScanning ? scanTargetMaxParticles : baseMaxParticles;
      currentMaxParticles += (targetCount - currentMaxParticles) * 0.05;
      while (scannerParticles.length < currentMaxParticles) scannerParticles.push(createScannerParticle());
      while (scannerParticles.length > currentMaxParticles) scannerParticles.pop();
      scannerParticles.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.life -= p.decay;
        if (p.life <= 0 || p.x > scannerCanvas.width) Object.assign(p, createScannerParticle());
        ctx.globalAlpha = p.alpha * p.life; ctx.fillStyle = "white";
        ctx.beginPath(); ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2); ctx.fill();
      });
      animationFrameId = requestAnimationFrame(animate);
    };
    animationFrameId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      cardLine.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      cardLine.removeEventListener("touchstart", handleMouseDown);
      window.removeEventListener("touchmove", handleMouseMove);
      window.removeEventListener("touchend", handleMouseUp);
      cardLine.removeEventListener("wheel", handleWheel);
      renderer.dispose();
    };
  }, [isPaused, cards, cardGap, friction, scanEffect, initialSpeed]);

  const containerHeight = isMobile ? 240 : 290;
  const scannerLeftPct = isMobile ? '10%' : '20%';

  return (
    <main 
      className="relative w-full flex items-center justify-center overflow-hidden bg-transparent"
      style={{ height: `${containerHeight}px` }}
    >
      <style>{`
        @keyframes glitch { 0%, 16%, 50%, 100% { opacity: 1; } 15%, 99% { opacity: 0.9; } 49% { opacity: 0.8; } }
        .animate-glitch { animation: glitch 0.1s infinite linear alternate-reverse; }
        
        @keyframes scanPulse {
          0% { opacity: 0.75; transform: scaleY(1); }
          100% { opacity: 1; transform: scaleY(1.03); }
        }
        .animate-scan-pulse {
          animation: scanPulse 1.5s infinite alternate ease-in-out;
        }
      `}</style>
      
      <canvas ref={particleCanvasRef} className="absolute top-1/2 left-0 -translate-y-1/2 w-full z-0 pointer-events-none" style={{ height: `${activeCardHeight}px` }} />
      <canvas ref={scannerCanvasRef} className="absolute top-1/2 left-0 -translate-y-1/2 w-full z-10 pointer-events-none" style={{ height: `${activeCardHeight}px` }} />
      
      <div
        ref={scannerLineRef}
        className="scanner-line absolute bg-gradient-to-b from-transparent via-violet-500 to-transparent rounded-full transition-opacity duration-300 z-20 pointer-events-none animate-scan-pulse"
        style={{
          left: scannerLeftPct,
          top: '50%',
          height: `${activeCardHeight}px`,
          width: '2px',
          transform: 'translate(-50%, -50%)',
          boxShadow: `
            0 0 10px #a78bfa, 0 0 20px #a78bfa, 
            0 0 30px #8b5cf6, 0 0 50px #6366f1`
        }}
      />

      <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 flex items-center" style={{ height: `${activeCardHeight}px` }}>
        <div ref={cardLineRef} className="flex items-center whitespace-nowrap cursor-grab select-none will-change-transform" style={{ gap: `${activeCardGap}px` }}>
          {cards.map(card => (
            <div 
              key={card.id} 
              className="card-wrapper relative shrink-0"
              style={{ width: `${activeCardWidth}px`, height: `${activeCardHeight}px` }}
            >
              
              {/* Normal card (Visible when scanned / right of scanner line) */}
              <div 
                className="card-normal card absolute top-0 left-0 w-full h-full rounded-[16px] sm:rounded-[24px] p-4 sm:p-6 flex flex-col justify-between overflow-hidden border border-white/10 backdrop-blur-2xl z-[2] transition-[border-color,box-shadow] duration-300 hover:border-white/25"
                style={{
                  background: `linear-gradient(135deg, ${card.bgFrom}ca 0%, ${card.bgTo}ea 100%)`,
                  boxShadow: `0 15px 40px rgba(0,0,0,0.5)`,
                  clipPath: 'inset(0 0 0 0%)',
                }}
              >
                {/* Subtle top inner glow line */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                
                {/* Top header row */}
                <div className="flex items-start justify-between z-10">
                  <div className="flex flex-col gap-1 sm:gap-1.5">
                    {/* Tag pill */}
                    <div className="inline-flex items-center gap-1.5 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/[0.04] border border-white/5 w-fit">
                      <span 
                        className="w-1.2 h-1.2 sm:w-1.5 sm:h-1.5 rounded-full animate-pulse" 
                        style={{ 
                          backgroundColor: card.accent,
                          boxShadow: `0 0 8px ${card.accent}` 
                        }} 
                      />
                      <span className="text-[8px] sm:text-[10px] uppercase tracking-[0.2em] font-semibold text-neutral-300">
                        {card.tag}
                      </span>
                    </div>
                    {/* Title */}
                    <h3 className="text-base sm:text-2xl font-bold text-white tracking-tight leading-tight mt-0.5 sm:mt-1">
                      {card.title}
                    </h3>
                  </div>
                  {/* GitHub Icon Link */}
                  <a 
                    href={card.link}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 sm:p-2.5 rounded-full bg-white/[0.03] border border-white/10 text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all hover:scale-110 active:scale-95 cursor-pointer"
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                    </svg>
                  </a>
                </div>

                {/* Description */}
                <p className="text-neutral-400 text-[10px] sm:text-[13px] leading-relaxed line-clamp-2 sm:line-clamp-3 w-full my-2 sm:my-3 z-10 whitespace-normal select-text">
                  {card.desc}
                </p>

                {/* Bottom row: Button & Index */}
                <div className="flex items-center justify-between z-10 mt-auto pt-2 sm:pt-3 border-t border-white/5">
                  <a
                    href={card.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 sm:gap-2 bg-white/5 hover:bg-white/15 text-white border border-white/10 px-3 sm:px-4 py-1 sm:py-2 rounded-full text-[9px] sm:text-xs font-semibold tracking-wide transition-all hover:scale-105 active:scale-95 group cursor-pointer"
                  >
                    <span>View Repository</span>
                    <svg className="w-3 sm:w-3.5 h-3 sm:h-3.5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                  
                  <span className="text-white/20 font-mono text-[10px] sm:text-xs tracking-wider">
                    {String(card.index + 1).padStart(2, '0')} / {String(projectsData.length).padStart(2, '0')}
                  </span>
                </div>
              </div>

              {/* Scrambled ASCII representation (Visible when unscanned / left of scanner line) */}
              <div 
                className="card-ascii card absolute top-0 left-0 w-full h-full rounded-[16px] sm:rounded-[24px] overflow-hidden bg-black/45 border border-white/5 z-[1]"
                style={{
                  clipPath: 'inset(0 100% 0 0)',
                }}
              >
                <pre className="ascii-content absolute top-0 left-0 w-full h-full text-[rgba(220,210,255,0.4)] font-mono text-[9px] sm:text-[11px] leading-[11px] sm:leading-[13px] overflow-hidden whitespace-pre m-0 p-4 sm:p-6 text-left align-top box-border [mask-image:linear-gradient(to_right,rgba(0,0,0,1)_0%,rgba(0,0,0,0.8)_30%,rgba(0,0,0,0.6)_50%,rgba(0,0,0,0.4)_80%,rgba(0,0,0,0.2)_100%)] animate-glitch">
                  {card.ascii}
                </pre>
              </div>

            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export {ScannerCardStream};