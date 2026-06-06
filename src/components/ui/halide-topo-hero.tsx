'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useInView } from 'framer-motion';
import { Sparkles, MapPin, Brain, Code2, Cpu } from 'lucide-react';
import { SiPython, SiPytorch, SiReact, SiDocker, SiFastapi } from 'react-icons/si';

/* ═══════════════════════════════════════════════════════════
   ANIMATED COUNTER
   ═══════════════════════════════════════════════════════════ */
function AnimatedCounter({ target, suffix = '', label }: {
  target: number; suffix?: string; label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1800;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, target]);

  return (
    <div ref={ref} className="text-center">
      <span className="text-2xl md:text-3xl font-bold text-white tabular-nums">
        {count}{suffix}
      </span>
      <p className="text-[10px] md:text-xs text-gray-400 mt-1 uppercase tracking-wider">{label}</p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SKILL TAGS
   ═══════════════════════════════════════════════════════════ */
function SkillTag({ icon, label, color }: {
  icon: React.ReactNode; label: string; color: string;
}) {
  return (
    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/40 border ${color} backdrop-blur-md`}>
      <span className="text-xs">{icon}</span>
      <span className="text-xs font-medium text-white/90">{label}</span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MINDSET CAROUSEL
   ═══════════════════════════════════════════════════════════ */
const mindsetQuotes = [
  { text: "The best code is code that tells a story.",       tag: "on craft"       },
  { text: "Build fast, learn faster, ship with purpose.",    tag: "on velocity"    },
  { text: "AI is a tool — the insight still comes from us.", tag: "on perspective" },
  { text: "Every dataset is a puzzle waiting to be solved.", tag: "on curiosity"   },
];

function MindsetCard() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % mindsetQuotes.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-20 w-full overflow-hidden flex flex-col justify-center">
      {mindsetQuotes.map((quote, i) => (
        <div
          key={quote.text}
          className="absolute inset-x-0 transition-all duration-700 ease-in-out flex flex-col"
          style={{
            opacity: i === index ? 1 : 0,
            transform: i === index ? 'translateY(0px)' : 'translateY(15px)',
            pointerEvents: i === index ? 'auto' : 'none',
          }}
        >
          <blockquote className="text-gray-200 font-medium italic text-xs sm:text-sm pl-4 border-l-2 border-[#E0AA3E]">
            "{quote.text}"
          </blockquote>
          <cite className="text-[10px] font-mono text-[#E0AA3E] uppercase tracking-widest mt-2 pl-4">
            — {quote.tag}
          </cite>
        </div>
      ))}
      <div className="absolute right-0 bottom-0 flex gap-1">
        {mindsetQuotes.map((_, i) => (
          <div
            key={i}
            className={`h-1 rounded-full transition-all duration-300 ${i === index ? 'w-4 bg-[#E0AA3E]' : 'w-1 bg-white/20'}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   LOCATION INDICATOR
   ═══════════════════════════════════════════════════════════ */
function LocationIndicator() {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/60 border border-[#E0AA3E]/20 backdrop-blur-md">
      <MapPin className="w-3.5 h-3.5 text-[#E0AA3E]" />
      <div className="text-left">
        <p className="text-[10px] font-semibold text-white leading-none">Coimbatore, India</p>
        <p className="text-[8px] text-[#EDC967]/70 tracking-wide mt-0.5 leading-none">Available remotely</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   HALIDE TOPO HERO COMPONENT
   ═══════════════════════════════════════════════════════════ */
export const Component = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<HTMLDivElement[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  const setLayerRef = useCallback((el: HTMLDivElement | null, index: number) => {
    if (el) layersRef.current[index] = el;
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (isMobile) {
      canvas.style.opacity = '1';
      canvas.style.transform = 'none';
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const x = (window.innerWidth / 2 - e.pageX) / 25;
      const y = (window.innerHeight / 2 - e.pageY) / 25;

      // Exact Halide 3D slanted plane: X tilt-back (50deg) + Z tilt (20deg)
      canvas.style.transform = `
        perspective(1500px)
        rotateX(${50 + y / 2}deg)
        rotateY(${x / 4}deg)
        rotateZ(${-20 + x / 2}deg)
        scale(0.96)
      `;

      layersRef.current.forEach((layer, index) => {
        if (!layer) return;
        const depth = (index + 1) * 12;
        const moveX = x * (index + 1) * 0.15;
        const moveY = y * (index + 1) * 0.15;
        layer.style.transform = `translateZ(${depth}px) translate(${moveX}px, ${moveY}px)`;
      });
    };

    canvas.style.opacity = '0';
    canvas.style.transform = 'perspective(1500px) rotateX(60deg) rotateZ(-30deg) scale(0.90)';

    const timeout = setTimeout(() => {
      canvas.style.transition = 'transform 1.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.5s ease-out';
      canvas.style.opacity = '1';
      canvas.style.transform = 'perspective(1500px) rotateX(50deg) rotateZ(-20deg) scale(0.96)';
    }, 200);

    // Disable inline transition after entrance animation to prevent mouse-tilt lag
    const transitionTimeout = setTimeout(() => {
      canvas.style.transition = 'opacity 1s ease-out';
    }, 2000);

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeout);
      clearTimeout(transitionTimeout);
    };
  }, [isMobile]);

  return (
    <div ref={sectionRef} className="w-full relative py-8 select-none" style={{ perspective: '1500px' }}>
      
      {/* Visual background details */}
      <div className="absolute top-4 left-4 font-mono text-left z-20">
        <span className="text-white font-bold text-xs tracking-[0.2em]">VAISHNAVI_CORE</span>
      </div>

      <div className="absolute top-4 right-4 font-mono text-right z-20">
        <p className="text-orange-400/80 text-[10px] tracking-wider">LATITUDE: 11.0168° N</p>
        <p className="text-orange-400/60 text-[10px] tracking-wider">FOCAL DEPTH: 85MM</p>
      </div>

      <div className="absolute bottom-4 left-4 font-mono text-left z-20">
        <p className="text-gray-500 text-[10px] tracking-wider">[ ARCHIVE 2026 ]</p>
        <p className="text-gray-400/70 text-[10px] tracking-wider">FULL STACK & GENAI SPECIALIST</p>
      </div>

      {/* Tilted Parallax Container */}
      <div
        ref={canvasRef}
        className="max-w-5xl mx-auto relative will-change-transform"
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Tilted Concentric contour circles (tilted background layer behind the card) */}
        <div
          className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center"
          style={{
            transform: 'translateZ(-90px) scale(1.65)',
            transformStyle: 'preserve-3d',
          }}
        >
          <svg className="w-[1000px] h-[1000px] opacity-[0.06] stroke-white" viewBox="0 0 1000 1000" fill="none">
            <circle cx="500" cy="500" r="80" strokeWidth="0.8" />
            <circle cx="500" cy="500" r="140" strokeWidth="0.8" />
            <circle cx="500" cy="500" r="200" strokeWidth="0.8" />
            <circle cx="500" cy="500" r="260" strokeWidth="0.8" />
            <circle cx="500" cy="500" r="320" strokeWidth="0.8" />
            <circle cx="500" cy="500" r="380" strokeWidth="0.8" />
            <circle cx="500" cy="500" r="440" strokeWidth="0.8" />
            <circle cx="500" cy="500" r="500" strokeWidth="0.8" />
            <circle cx="500" cy="500" r="560" strokeWidth="0.8" />
            <circle cx="500" cy="500" r="620" strokeWidth="0.8" />
            <circle cx="500" cy="500" r="680" strokeWidth="0.8" />
            <circle cx="500" cy="500" r="740" strokeWidth="0.8" />
            <circle cx="500" cy="500" r="800" strokeWidth="0.8" />
          </svg>
        </div>

        {/* Tilted Card Content Wrapper (contains overlay images and details) */}
        <div
          className="relative rounded-3xl overflow-hidden border border-white/10"
          style={{
            transformStyle: 'preserve-3d',
            background: 'rgba(10, 10, 14, 0.70)',
            backdropFilter: 'blur(30px)',
            WebkitBackdropFilter: 'blur(30px)',
            transform: 'translateZ(0px)',
          }}
        >
          {/* Layer 0: Grayscale topographic background */}
          <div
            ref={(el) => setLayerRef(el, 0)}
            className="absolute inset-0 bg-cover bg-center pointer-events-none select-none mix-blend-luminosity filter grayscale contrast-[1.8] brightness-[0.22] opacity-50"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200')`,
              transformStyle: 'preserve-3d',
            }}
          />

          {/* Topographic Lines Overlay */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.2] z-0"
            viewBox="0 0 1000 600"
            preserveAspectRatio="none"
          >
            <path d="M -100,200 C 100,120 300,320 500,220 C 700,120 900,320 1100,220" fill="none" stroke="#fff" strokeWidth="1" />
            <path d="M -100,225 C 100,145 300,345 500,245 C 700,145 900,345 1100,245" fill="none" stroke="#fff" strokeWidth="1" />
            <path d="M -100,250 C 100,170 300,370 500,270 C 700,170 900,370 1100,270" fill="none" stroke="#fff" strokeWidth="1" />
            <path d="M -100,275 C 100,195 300,395 500,295 C 700,195 900,395 1100,295" fill="none" stroke="#fff" strokeWidth="1" />
            <path d="M -100,300 C 100,220 300,420 500,320 C 700,220 900,420 1100,320" fill="none" stroke="#fff" strokeWidth="1" />
            
            <path d="M 750,150 C 800,180 830,120 880,200 C 930,280 850,320 820,350" fill="none" stroke="#fff" strokeWidth="1.2" />
            <path d="M 730,165 C 780,195 810,135 860,215 C 910,295 830,335 800,365" fill="none" stroke="#fff" strokeWidth="1.2" />
            <path d="M 710,180 C 760,210 790,150 840,230 C 890,310 810,350 780,380" fill="none" stroke="#fff" strokeWidth="1.2" />
          </svg>

          {/* Ambient Darkener Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/80 pointer-events-none z-0" />

          {/* Layer 1: Content Overlay */}
          <div
            ref={(el) => setLayerRef(el, 1)}
            className="relative z-10 p-6 md:p-10"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#E0AA3E]" />
                <span className="text-xs uppercase tracking-[0.2em] text-[#EDC967]/80 font-medium">Who I Am</span>
              </div>
              <LocationIndicator />
            </div>

            {/* Name */}
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 leading-snug">
              Hi, I'm{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F7EF8A] via-[#E0AA3E] to-[#AE8625]">
                Vaishnavi S.
              </span>
            </h3>

            {/* Bio Description */}
            <p className="text-gray-300 leading-relaxed text-sm md:text-[0.92rem] mb-3 max-w-3xl">
              Final-year Computer Science undergraduate with hands-on experience building and deploying
              AI/ML systems across deep learning, large language models, and generative AI.
            </p>
            <p className="text-gray-400 leading-relaxed text-sm md:text-[0.92rem] mb-6 max-w-3xl">
              Proven track record across <strong className="text-[#EDC967]/90">6 internships</strong> — including <strong className="text-[#EDC967]/90">Infosys</strong> and <strong className="text-[#EDC967]/90">Innomatics</strong> — delivering production-level models (96% accuracy PCB defect classifier), RAG/Agentic pipelines, and multi-agent AI applications.
            </p>

            {/* Staggered Stats Row */}
            <div
              className="flex items-center justify-around py-4 px-4 rounded-xl mb-6"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.04)',
              }}
            >
              <AnimatedCounter target={1} suffix="+" label="Years Exp" />
              <div className="w-px h-10 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
              <AnimatedCounter target={12} suffix="+" label="Projects" />
              <div className="w-px h-10 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
              <AnimatedCounter target={6} suffix="" label="Internships" />
            </div>

            {/* Tech Skill Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              <SkillTag icon={<SiPython className="text-[#3776AB]" />} label="Python" color="border-blue-500/20 text-blue-300" />
              <SkillTag icon={<SiPytorch className="text-[#EE4C2C]" />} label="PyTorch" color="border-orange-500/20 text-orange-300" />
              <SkillTag icon={<Brain className="w-3.5 h-3.5 text-purple-400" />} label="LangChain" color="border-purple-500/20 text-purple-300" />
              <SkillTag icon={<Cpu className="w-3.5 h-3.5 text-[#E0AA3E]" />} label="GenAI & LLMs" color="border-[#E0AA3E]/20 text-[#EDC967]" />
              <SkillTag icon={<SiReact className="text-[#61DAFB]" />} label="React" color="border-cyan-500/20 text-cyan-300" />
              <SkillTag icon={<Code2 className="w-3.5 h-3.5 text-indigo-400" />} label="RAG Pipelines" color="border-indigo-500/20 text-indigo-300" />
              <SkillTag icon={<SiDocker className="text-[#2496ED]" />} label="Docker" color="border-sky-500/20 text-sky-300" />
              <SkillTag icon={<SiFastapi className="text-[#009688]" />} label="FastAPI" color="border-emerald-500/20 text-emerald-300" />
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent mb-6" />

            {/* Carousel */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-[#E0AA3E]" />
                <span className="text-xs uppercase tracking-[0.2em] text-[#EDC967]/70 font-medium">Mindset</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E0AA3E] opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E0AA3E]" />
                </span>
                <span className="text-[9px] font-mono uppercase tracking-widest text-[#E0AA3E]/50">live</span>
              </div>
            </div>
            <MindsetCard />
          </div>
        </div>
      </div>
    </div>
  );
};
