import { useRef, useEffect, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import LogoLoop from '../ui/LogoLoop';
import Macbook from '../ui/animated-3d-mac-book-air';
import { ScrollRevealHeading } from '../ui/text-scroll-animation';
import { GlobalSpotlight, ParticleCard } from '../ui/MagicBento';
import '../ui/MagicBento.css';
import { MapPin, Sparkles, Brain, Code2, Cpu, Zap, Target as TargetIcon, Lightbulb, Rocket } from 'lucide-react';
import {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs,
  SiPython, SiTensorflow, SiMongodb, SiExpress, SiVite,
  SiSocketdotio, SiGit, SiFigma, SiPytorch, SiDocker, SiFastapi
} from 'react-icons/si';

/* ── Animated Counter ─────────────────────────────────── */
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
      <span className="text-3xl md:text-4xl font-bold text-white tabular-nums">
        {count}{suffix}
      </span>
      <p className="text-xs md:text-sm text-gray-400 mt-1 uppercase tracking-wider">{label}</p>
    </div>
  );
}

/* ── Mindset Quotes ───────────────────────────────────── */
const mindsetQuotes = [
  { text: "The best code is code that tells a story.",         tag: "on craft"       },
  { text: "Build fast, learn faster, ship with purpose.",      tag: "on velocity"    },
  { text: "AI is a tool — the insight still comes from us.",   tag: "on perspective" },
  { text: "Every dataset is a puzzle waiting to be solved.",   tag: "on curiosity"   },
];

const coreTraits = [
  { icon: Zap,       label: 'Fast Learner',     color: '#FBBF24', glow: 'rgba(251,191,36,0.15)'  },
  { icon: TargetIcon,    label: 'Impact-Driven',    color: '#F87171', glow: 'rgba(248,113,113,0.15)' },
  { icon: Lightbulb, label: 'Problem Solver',   color: '#2DD4BF', glow: 'rgba(45,212,191,0.15)'  },
  { icon: Rocket,    label: 'Builder at Heart', color: '#A78BFA', glow: 'rgba(167,139,250,0.15)' },
];

const QUOTE_DURATION = 4500; // ms per quote

function MindsetCard() {
  const [index, setIndex]       = useState(0);
  const [progress, setProgress] = useState(0);
  const startRef                = useRef<number | null>(null);
  const rafRef                  = useRef<number>(0);

  // Smooth progress bar that drives auto-advance
  useEffect(() => {
    startRef.current = null;

    const tick = (ts: number) => {
      if (startRef.current === null) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const pct = Math.min((elapsed / QUOTE_DURATION) * 100, 100);
      setProgress(pct);
      if (pct < 100) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setIndex(prev => (prev + 1) % mindsetQuotes.length);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [index]);

  const goTo = (i: number) => {
    cancelAnimationFrame(rafRef.current);
    setProgress(0);
    setIndex(i);
  };

  return (
    <div className="flex flex-col flex-1 min-h-0 select-none">

      {/* ── Quote area ── */}
      <div className="flex-1 relative overflow-hidden flex flex-col justify-center">

        {/* Giant decorative " in background */}
        <span
          aria-hidden
          className="absolute -top-6 -left-3 font-serif font-black leading-none pointer-events-none"
          style={{ fontSize: '9rem', color: 'rgba(139,92,246,0.08)' }}
        >
          ❝
        </span>

        {/* Counter top-right */}
        <div className="absolute top-0 right-0 flex items-center gap-1 z-10">
          <span className="text-[10px] font-mono text-white/20 tabular-nums">
            {String(index + 1).padStart(2, '0')}&nbsp;/&nbsp;{mindsetQuotes.length}
          </span>
        </div>

        {/* Animated quote text */}
        <div className="relative z-10 pr-10 pt-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -18 }}
              transition={{ duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Left accent bar */}
              <div className="flex gap-4 items-start">
                <div
                  className="flex-shrink-0 w-[3px] rounded-full mt-1 self-stretch"
                  style={{ background: 'linear-gradient(to bottom, #7C3AED, #4F46E5)' }}
                />
                <div>
                  <p className="text-white font-semibold text-base md:text-[1.05rem] leading-relaxed tracking-[-0.01em]">
                    {mindsetQuotes[index].text}
                  </p>
                  <span className="inline-flex items-center gap-1.5 mt-2.5">
                    <span className="block w-3 h-px bg-purple-400/50" />
                    <span
                      className="text-[10px] font-mono uppercase tracking-[0.18em]"
                      style={{ color: 'rgba(167,139,250,0.65)' }}
                    >
                      {mindsetQuotes[index].tag}
                    </span>
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Progress + dots row ── */}
      <div className="mt-4 mb-3 flex items-center gap-3">
        {/* Thin animated progress bar */}
        <div className="flex-1 h-[2px] rounded-full overflow-hidden bg-white/[0.06]">
          <div
            className="h-full rounded-full"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #7C3AED, #6366F1)',
              transition: 'width 0.05s linear',
            }}
          />
        </div>
        {/* Clickable dot indicators */}
        <div className="flex gap-1.5 flex-shrink-0">
          {mindsetQuotes.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width:  i === index ? '18px' : '5px',
                height: '5px',
                background: i === index ? '#7C3AED' : 'rgba(255,255,255,0.15)',
              }}
            />
          ))}
        </div>
      </div>

      {/* ── Core traits — single row ── */}
      <div className="grid grid-cols-4 gap-1.5">
        {coreTraits.map(({ icon: Icon, label, color, glow }) => (
          <div
            key={label}
            className="flex flex-col items-center gap-1 py-2 px-1 rounded-xl text-center transition-transform hover:scale-105 cursor-default"
            style={{ background: glow, border: `1px solid ${color}20` }}
          >
            <Icon style={{ color, width: '14px', height: '14px', flexShrink: 0 }} />
            <span
              className="text-[9px] font-medium leading-tight"
              style={{ color: 'rgba(209,213,219,0.85)' }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}


/* ── Animated India Map / Location ───────────────────── */
function LocationCard() {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xs uppercase tracking-[0.2em] text-gray-500 font-medium">Location</span>
      </div>

      {/* Location Ping */}
      <div className="relative flex items-center gap-3 mb-5">
        <div className="relative flex-shrink-0">
          <MapPin className="w-5 h-5 text-teal-400" />
          {/* Pulsing rings */}
          <span className="absolute -inset-1 rounded-full bg-teal-400/20 animate-ping" />
        </div>
        <div>
          <p className="text-white font-semibold text-sm">Coimbatore, India</p>
          <p className="text-teal-400/70 text-xs">Tamil Nadu • Available remotely</p>
        </div>
      </div>

      {/* India map outline SVG with animated dot */}
      <div className="relative flex-1 flex items-center justify-center min-h-[90px]">
        <svg
          viewBox="0 0 200 220"
          className="w-full max-w-[160px] h-auto"
          aria-label="Map showing India with Coimbatore location"
        >
          {/* Simplified India outline path */}
          <path
            d="M95,10 L115,8 L130,15 L145,20 L155,35 L160,50 L165,65 L158,80 L165,95 L162,112 L155,130 L148,148 L138,162 L125,175 L115,190 L108,202 L100,210 L92,202 L82,188 L72,175 L62,158 L55,140 L48,120 L45,100 L50,80 L42,65 L45,50 L55,35 L65,22 L80,14 Z"
            fill="none"
            stroke="rgba(45,212,191,0.25)"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />

          {/* Internal state borders suggestion */}
          <path
            d="M95,10 L95,120 M75,50 L130,50 M60,90 L145,90 M70,130 L138,130"
            stroke="rgba(45,212,191,0.08)"
            strokeWidth="0.8"
          />

          {/* Coimbatore dot — bottom-left of Tamil Nadu */}
          <g>
            {/* Outer ping rings */}
            <circle cx="88" cy="162" r="10" fill="rgba(45,212,191,0.08)">
              <animate attributeName="r" values="6;14;6" dur="2.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.4;0;0.4" dur="2.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="88" cy="162" r="5" fill="rgba(45,212,191,0.15)">
              <animate attributeName="r" values="3;8;3" dur="2.5s" begin="0.4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.5;0;0.5" dur="2.5s" begin="0.4s" repeatCount="indefinite" />
            </circle>
            {/* Solid center dot */}
            <circle cx="88" cy="162" r="3.5" fill="rgb(45,212,191)" />
            <circle cx="88" cy="162" r="1.5" fill="white" />
          </g>

          {/* Label */}
          <text x="96" y="166" fontSize="7" fill="rgba(45,212,191,0.9)" fontFamily="monospace">Coimbatore</text>
        </svg>
      </div>

      {/* Status pill */}
      <div className="flex items-center gap-2 mt-3">
        <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
        <span className="text-teal-400/70 text-xs">Open to remote & hybrid roles</span>
      </div>
    </div>
  );
}

/* ── Glassmorphic Bento Card with MagicBento effects ─── */
function BentoCard({ children, className = '', innerClassName = '', delay = 0 }: {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      <ParticleCard
        className={`magic-bento-card magic-bento-card--border-glow magic-bento-no-ratio ${innerClassName}`}
        particleCount={12}
        glowColor="132, 0, 255"
        enableTilt={false}
        clickEffect={true}
        enableMagnetism={false}
      >
        {/* Subtle top highlight line */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="relative z-10 h-full flex flex-col">
          {children}
        </div>
      </ParticleCard>
    </motion.div>
  );
}

/* ── Skill Tag ────────────────────────────────────────── */
function SkillTag({ icon, label, color }: { icon: React.ReactNode; label: string; color: string }) {
  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border ${color} bg-white/[0.03]`}>
      <span className="text-sm">{icon}</span>
      {label}
    </div>
  );
}

/* ── Main About Section (Bento Grid) ──────────────────── */
export default function AboutSection() {
  const bentoGridRef = useRef<HTMLDivElement>(null);

  return (
    <section id="about" className="w-full relative z-10 py-16 md:py-24 px-4 sm:px-6 md:px-8 lg:px-16">
      {/* MagicBento global spotlight scoped to this grid */}
      <GlobalSpotlight
        gridRef={bentoGridRef}
        enabled={true}
        spotlightRadius={400}
        glowColor="132, 0, 255"
      />

      {/* Section Heading */}
      <div className="mb-10 md:mb-14">
        <ScrollRevealHeading
          text="About"
          highlightText="Me"
          gradient="from-teal-400 to-blue-500"
        />
      </div>

      {/* ── Bento Grid ── */}
      <div ref={bentoGridRef} className="bento-section grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 max-w-7xl mx-auto">

        {/* ── Row 1: Bio (2 col) + Stats (1 col) + Location (1 col) ── */}

        {/* Bio Card — 2 cols, auto height (no row-span) */}
        <BentoCard className="sm:col-span-2" innerClassName="p-6 md:p-8" delay={0}>
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-xs uppercase tracking-[0.2em] text-purple-300/70 font-medium">Who I Am</span>
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white mb-3 leading-snug">
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-400">Vaishnavi S.</span>
          </h3>
          <p className="text-gray-300 leading-relaxed text-sm mb-3">
            Final-year Computer Science undergraduate with hands-on experience building and deploying
            AI/ML systems across deep learning, large language models, and generative AI.
          </p>
          <p className="text-gray-400 leading-relaxed text-sm mb-4">
            Proven track record across <strong className="text-teal-300/90">6 internships</strong> — including{' '}
            <strong className="text-teal-300/90">Infosys</strong> and <strong className="text-teal-300/90">Innomatics</strong>{' '}
            — delivering production-level models (96% accuracy PCB defect classifier), RAG/Agentic pipelines,
            and multi-agent AI applications.
          </p>
          {/* Skill tags */}
          <div className="flex flex-wrap gap-2">
            <SkillTag icon={<SiPython className="text-[#3776AB]" />} label="Python" color="border-blue-500/20 text-blue-300" />
            <SkillTag icon={<SiPytorch className="text-[#EE4C2C]" />} label="PyTorch" color="border-orange-500/20 text-orange-300" />
            <SkillTag icon={<Brain className="w-3.5 h-3.5 text-purple-400" />} label="LangChain" color="border-purple-500/20 text-purple-300" />
            <SkillTag icon={<Cpu className="w-3.5 h-3.5 text-teal-400" />} label="GenAI & LLMs" color="border-teal-500/20 text-teal-300" />
            <SkillTag icon={<SiReact className="text-[#61DAFB]" />} label="React" color="border-cyan-500/20 text-cyan-300" />
            <SkillTag icon={<Code2 className="w-3.5 h-3.5 text-indigo-400" />} label="RAG Pipelines" color="border-indigo-500/20 text-indigo-300" />
            <SkillTag icon={<SiDocker className="text-[#2496ED]" />} label="Docker" color="border-sky-500/20 text-sky-300" />
            <SkillTag icon={<SiFastapi className="text-[#009688]" />} label="FastAPI" color="border-emerald-500/20 text-emerald-300" />
          </div>
        </BentoCard>

        {/* Stats Card */}
        <BentoCard innerClassName="p-5 md:p-6" delay={0.08}>
          <div className="flex items-center gap-2 mb-5">
            <span className="text-xs uppercase tracking-[0.2em] text-gray-500 font-medium">Stats</span>
          </div>
          <div className="space-y-5">
            <AnimatedCounter target={1} suffix="+" label="Years Exp" />
            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <AnimatedCounter target={12} suffix="+" label="Projects" />
            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <AnimatedCounter target={6} suffix="" label="Internships" />
          </div>
        </BentoCard>

        {/* Location Card — fixed with SVG India map */}
        <BentoCard innerClassName="p-5 md:p-6" delay={0.12}>
          <LocationCard />
        </BentoCard>

        {/* ── Row 2: Macbook (2 col) + Quote (2 col) ── */}

        {/* Macbook Card — fixed height, relative container for absolute macbook positioning */}
        <BentoCard className="sm:col-span-2" delay={0.15}>
          <div
            className="relative w-full flex items-center justify-center"
            style={{ height: '300px' }}
          >
            {/* 
              Macbook uses: absolute left-1/2 top-1/2 ml-[-78px]
              Wrapper is 150x96px (same size as Macbook container).
              By translating by -112px and scaling by 1.4, we center the visual span
              (from screen top to shadow bottom) perfectly inside the 300px card.
            */}
            <div
              style={{
                width: '150px',
                height: '96px',
                position: 'relative',
                transform: 'translateY(-112px) scale(1.4)',
                transformOrigin: 'center center',
              }}
            >
              <Macbook />
            </div>
          </div>
        </BentoCard>

        {/* Mindset Card */}
        <BentoCard className="sm:col-span-2" innerClassName="p-5 md:p-6 flex flex-col" delay={0.18}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4 text-purple-400" />
              <span className="text-xs uppercase tracking-[0.2em] text-purple-300/70 font-medium">Mindset</span>
            </div>
            {/* Live pulse indicator */}
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500" />
              </span>
              <span className="text-[9px] font-mono uppercase tracking-widest text-purple-400/50">live</span>
            </div>
          </div>
          <MindsetCard />
        </BentoCard>

        {/* ── Row 3: Tech Stack (full width) ── */}

        {/* Tech Stack Card */}
        <BentoCard className="col-span-1 sm:col-span-2 lg:col-span-4" innerClassName="p-4 md:p-5" delay={0.2}>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs uppercase tracking-[0.2em] text-gray-500 font-medium">Tech Stack</span>
          </div>
          <div className="w-full overflow-hidden">
            <div style={{ height: '80px', position: 'relative' }} className="flex items-center w-full">
              <LogoLoop
                logos={[
                  { node: <SiPython size={38} className="text-[#3776AB] mx-4" />, title: "Python", href: "#" },
                  { node: <SiPytorch size={38} className="text-[#EE4C2C] mx-4" />, title: "PyTorch", href: "#" },
                  { node: <SiTensorflow size={38} className="text-[#FF6F00] mx-4" />, title: "TensorFlow", href: "#" },
                  { node: <SiReact size={38} className="text-[#61DAFB] mx-4" />, title: "React", href: "#" },
                  { node: <SiNextdotjs size={38} className="text-white mx-4" />, title: "Next.js", href: "#" },
                  { node: <SiTypescript size={38} className="text-[#3178C6] mx-4" />, title: "TypeScript", href: "#" },
                  { node: <SiTailwindcss size={38} className="text-[#06B6D4] mx-4" />, title: "Tailwind", href: "#" },
                  { node: <SiNodedotjs size={38} className="text-[#339933] mx-4" />, title: "Node.js", href: "#" },
                  { node: <SiFastapi size={38} className="text-[#009688] mx-4" />, title: "FastAPI", href: "#" },
                  { node: <SiMongodb size={38} className="text-[#47A248] mx-4" />, title: "MongoDB", href: "#" },
                  { node: <SiDocker size={38} className="text-[#2496ED] mx-4" />, title: "Docker", href: "#" },
                  { node: <SiExpress size={38} className="text-white mx-4" />, title: "Express", href: "#" },
                  { node: <SiVite size={38} className="text-[#646CFF] mx-4" />, title: "Vite", href: "#" },
                  { node: <SiSocketdotio size={38} className="text-white mx-4" />, title: "Socket.IO", href: "#" },
                  { node: <SiGit size={38} className="text-[#F05032] mx-4" />, title: "Git", href: "#" },
                  { node: <SiFigma size={38} className="text-[#F24E1E] mx-4" />, title: "Figma", href: "#" },
                ]}
                speed={80}
                gap={24}
              />
            </div>
          </div>
        </BentoCard>

      </div>
    </section>
  );
}
