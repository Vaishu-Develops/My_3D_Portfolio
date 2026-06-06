import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Briefcase, Cpu, Layers, Globe, Layout, Brain, TrendingUp, 
  ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Sparkles 
} from 'lucide-react';
import { ScrollRevealHeading } from '../ui/text-scroll-animation';
import { ScrollRevealElement } from '../ui/scroll-reveal-element';

const experiences = [
  {
    company: 'Infosys',
    role: 'Artificial Intelligence Intern',
    period: '2026',
    description: 'Developed an end-to-end deep learning system for detecting and classifying defects in Printed Circuit Boards (PCBs).',
    details: [
      'Custom-trained EfficientNet-B0 models on the DeepPCB dataset, achieving 96% classification accuracy across 6 PCB defect types.',
      'Developed real-time computer vision inference pipelines with OpenCV for automated visual inspection.',
      'Optimized model size and weight formats for edge device deployment, reducing inference latency.'
    ],
    metrics: ['96% Accuracy', 'EfficientNet-B0', 'OpenCV'],
    tags: ['Deep Learning', 'Computer Vision', 'Python', 'PyTorch'],
    iconName: 'cpu'
  },
  {
    company: 'Appin Technology',
    role: 'MERN Stack Developer Intern',
    period: '2025',
    description: 'Built full-stack web applications using MongoDB, Express.js, React.js, and Node.js.',
    details: [
      'Architected responsive frontend dashboards utilizing React, state managers, and custom hooks.',
      'Engineered secure RESTful APIs with JWT authentication, request validation, and password encryption.',
      'Integrated MongoDB with optimized schemas, improving write throughput and query index performance.'
    ],
    metrics: ['REST APIs', 'Full Stack', 'JWT Auth'],
    tags: ['MongoDB', 'Express', 'React', 'Node.js'],
    iconName: 'layers'
  },
  {
    company: 'Zaalima Development Pvt. Ltd',
    role: 'Web Development Intern',
    period: 'Oct – Dec 2025',
    description: 'Designed and implemented the architecture for the GigConnect platform, handling frontend interfaces and backend APIs.',
    details: [
      'Engineered database query models in MongoDB to optimize search speed by 35% for job postings.',
      'Developed real-time chat modules and live updates with Socket.io and Node.js backend.',
      'Implemented robust pagination and filtering algorithms to handle high-frequency API requests.'
    ],
    metrics: ['-35% Query Latency', 'GigConnect', 'WebSockets'],
    tags: ['MERN Stack', 'MongoDB', 'Socket.io', 'API Design'],
    iconName: 'globe'
  },
  {
    company: 'Tecforz Innovations Pvt Ltd',
    role: 'Frontend Developer Intern',
    period: 'Jul – Sep 2025',
    description: 'Developed interactive dashboards and AI-powered data querying systems for hospital SOC management.',
    details: [
      'Implemented high-performance interactive dashboards visualizing telemetry data using Chart.js/Recharts.',
      'Integrated natural language to SQL/querying interfaces using OpenAI API models.',
      'Improved page load times and initial bundle sizes by implementing lazy loading and code-splitting.'
    ],
    metrics: ['SOC Dashboard', 'AI Querying', 'Data Viz'],
    tags: ['React', 'API Integration', 'Data Visualization', 'UI/UX'],
    iconName: 'layout'
  },
  {
    company: 'Innomatics Research Labs',
    role: 'Advanced Generative AI Intern',
    period: 'Jan – Mar 2025',
    description: 'Developed advanced AI applications including conversational chatbots and RAG/Agentic systems using LangChain.',
    details: [
      'Created RAG (Retrieval-Augmented Generation) pipelines for domain-specific knowledge bases using Pinecone and ChromaDB.',
      'Orchestrated multi-agent workflows using LangGraph and LangChain to automate business research.',
      'Built interactive UI chatbot interfaces with streaming output to display model output step-by-step.'
    ],
    metrics: ['RAG Pipelines', 'Agentic Systems', 'Pinecone'],
    tags: ['LangChain', 'LLMs', 'Vector DB', 'Prompt Engineering'],
    iconName: 'brain'
  },
  {
    company: 'Innomatics Research Labs',
    role: 'Advanced Data Analysis Intern',
    period: 'Jan – Mar 2025',
    description: 'Performed end-to-end data analysis on real-world datasets, involving data wrangling, visualization, and dashboards.',
    details: [
      'Processed and cleaned complex raw datasets using Pandas, NumPy, and Scikit-learn.',
      'Created interactive storytelling dashboards to present business KPIs to key stakeholders.',
      'Applied statistical models and predictive algorithms to discover hidden customer churn patterns.'
    ],
    metrics: ['Python Data Stack', 'KPI Dashboards', 'Scikit-learn'],
    tags: ['Python', 'Data Wrangling', 'Visualization', 'Statistical Modeling'],
    iconName: 'trending-up'
  },
];

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'cpu': return <Cpu className="w-6 h-6 text-[#EDC967]" />;
    case 'layers': return <Layers className="w-6 h-6 text-[#EDC967]" />;
    case 'globe': return <Globe className="w-6 h-6 text-[#EDC967]" />;
    case 'layout': return <Layout className="w-6 h-6 text-[#EDC967]" />;
    case 'brain': return <Brain className="w-6 h-6 text-[#EDC967]" />;
    case 'trending-up': return <TrendingUp className="w-6 h-6 text-[#EDC967]" />;
    default: return <Briefcase className="w-6 h-6 text-[#EDC967]" />;
  }
};

function FlipCard({ 
  exp, 
  idx, 
  isActive = true, 
  onBecomeActive 
}: { 
  exp: typeof experiences[0]; 
  idx: number; 
  isActive?: boolean; 
  onBecomeActive?: () => void; 
}) {
  const [isFlipped, setIsFlipped] = useState(false);

  // Automatically flip back to front if it becomes inactive
  useEffect(() => {
    if (!isActive) {
      setIsFlipped(false);
    }
  }, [isActive]);

  const handleCardClick = (e: React.MouseEvent) => {
    if (!isActive && onBecomeActive) {
      e.stopPropagation();
      onBecomeActive();
    } else {
      setIsFlipped(!isFlipped);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      id={`exp-card-${idx}`}
      className="w-full h-[450px] max-w-[290px] sm:max-w-[320px] mx-auto relative cursor-pointer"
      style={{
        perspective: '1000px',
      }}
    >
      <div
        className="w-full h-full relative"
        style={{
          transformStyle: 'preserve-3d',
          WebkitTransformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          transition: 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {/* Front Side (Security Pass ID Card) */}
        <div
          className="absolute inset-0 w-full h-full rounded-[1.8rem] p-5 pt-8 pb-4 bg-gradient-to-b from-[#18181b] to-[#0c0c0d] border border-[#E0AA3E]/35 flex flex-col justify-between items-center select-none shadow-[0_12px_40px_rgba(0,0,0,0.9),0_0_20px_rgba(224,170,62,0.12)]"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            opacity: isFlipped ? 0 : 1,
            pointerEvents: isFlipped ? 'none' : 'auto',
            transition: 'opacity 0.3s ease-in-out',
          }}
        >
          {/* Lanyard Slot Hole at the top */}
          <div className="w-12 h-2.5 bg-black border border-[#E0AA3E]/20 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.9)] flex-shrink-0" />

          {/* Holographic Header */}
          <div className="w-full flex items-center justify-between px-2 mt-1 flex-shrink-0">
            <span className="text-[8px] font-mono font-bold tracking-widest text-[#E0AA3E]/60 uppercase">
              Security Access
            </span>
            <span className="text-[8px] font-mono font-bold tracking-widest text-emerald-500/80 uppercase flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Active
            </span>
          </div>

          {/* Photo ID Box with Security Chip & Avatar */}
          <div className="w-24 h-24 rounded-xl border border-[#E0AA3E]/30 bg-black/50 flex items-center justify-center relative overflow-hidden shadow-[inset_0_4px_12px_rgba(0,0,0,0.8)] mt-2 flex-shrink-0">
            {/* Security Chip */}
            <div className="absolute top-1.5 left-1.5 w-5 h-4 bg-gradient-to-br from-[#F7EF8A] via-[#AE8625] to-[#D2AC47] rounded-sm border border-black/30 flex flex-wrap p-0.5 gap-[1px]">
              <div className="w-[4px] h-[3px] bg-black/20" />
              <div className="w-[4px] h-[3px] bg-black/20" />
              <div className="w-[4px] h-[3px] bg-black/20" />
              <div className="w-[4px] h-[3px] bg-black/20" />
            </div>

            {/* Glowing Tech Avatar silhouette */}
            <svg xmlns="http://www.w3.org/2000/svg" className="w-14 h-14 text-white/10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>

            {/* Float company icon over avatar */}
            <div className="absolute bottom-1 right-1 w-7 h-7 rounded-full bg-black/80 border border-[#E0AA3E]/30 flex items-center justify-center scale-90">
              {getIcon(exp.iconName)}
            </div>
          </div>

          {/* Employee Name (Role) & Organization */}
          <div className="text-center flex flex-col gap-0.5 mt-2 w-full px-2">
            <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest block">
              Title / Role
            </span>
            <h3 className="font-extrabold text-sm text-white tracking-wide line-clamp-1">
              {exp.role}
            </h3>
            <p className="text-[11px] font-bold text-[#EDC967] tracking-wider">
              {exp.company} • {exp.period}
            </p>
          </div>

          {/* Horizontal divider */}
          <div className="w-11/12 h-[1px] bg-gradient-to-r from-transparent via-[#E0AA3E]/20 to-transparent my-1" />

          {/* Description */}
          <p className="text-[10px] text-gray-400 text-center leading-relaxed px-3 line-clamp-2 max-w-[240px]">
            {exp.description}
          </p>

          {/* Barcode & Serial ID */}
          <div className="w-full flex flex-col items-center gap-1 mt-2 flex-shrink-0">
            <div 
              className="w-40 h-6 opacity-85"
              style={{
                background: 'repeating-linear-gradient(90deg, #EDC967, #EDC967 1px, transparent 1px, transparent 3px, #EDC967 3px, #EDC967 4px, transparent 4px, transparent 6px)',
              }}
            />
            <span className="text-[8px] font-mono text-gray-500 uppercase tracking-[0.25em]">
              ID: VAISH-2026-0{idx + 1}
            </span>
          </div>

          {/* Prompt */}
          <div className="flex items-center gap-1 text-[9px] font-mono font-bold uppercase tracking-wider text-[#E0AA3E]/80 mt-1 flex-shrink-0">
            <span>Tap to View Details</span>
            <ChevronDown className="w-3 h-3 animate-bounce text-[#EDC967]" />
          </div>
        </div>

        {/* Back Side (Magnetic Stripe & Signature Block pass) */}
        <div
          className="absolute inset-0 w-full h-full rounded-[1.8rem] p-5 pt-8 pb-4 bg-gradient-to-b from-[#141416] to-[#080809] border border-[#E0AA3E]/40 flex flex-col justify-between items-center select-none shadow-[0_12px_40px_rgba(0,0,0,0.9),0_0_20px_rgba(224,170,62,0.15)]"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            opacity: isFlipped ? 1 : 0,
            pointerEvents: isFlipped ? 'auto' : 'none',
            transition: 'opacity 0.3s ease-in-out',
          }}
        >
          {/* Lanyard Slot Hole at the top */}
          <div className="w-12 h-2.5 bg-black border border-[#E0AA3E]/20 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.9)] flex-shrink-0" />

          {/* Magnetic Stripe */}
          <div className="w-[calc(100%+2.5rem)] h-6 bg-black border-y border-white/5 mt-1 -mx-5 flex-shrink-0" />

          {/* Core Impact Details */}
          <div className="w-full mt-2 flex-grow overflow-hidden flex flex-col">
            <h4 className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#E0AA3E] mb-2 pb-1.5 border-b border-white/5 flex items-center gap-1 flex-shrink-0">
              <Sparkles className="w-3 h-3 text-[#EDC967]" /> Core Contributions
            </h4>
            <ul className="list-none flex flex-col gap-1.5 pl-0.5 overflow-y-auto no-scrollbar">
              {exp.details.map((detail, dIdx) => (
                <li 
                  key={dIdx}
                  className="text-[10px] text-gray-300 leading-normal flex items-start gap-1.5 text-left"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E0AA3E] mt-1.5 flex-shrink-0 shadow-[0_0_6px_rgba(224,170,62,0.8)]" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Back Footer */}
          <div className="w-full flex flex-col items-center gap-2 mt-2 flex-shrink-0">
            <div className="flex flex-wrap justify-center gap-1 max-h-[44px] overflow-hidden">
              {exp.tags.map((tag) => (
                <span 
                  key={tag} 
                  className="px-1.5 py-0.5 text-[8px] uppercase tracking-wider bg-white/5 text-gray-400 border border-white/5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="flex items-center gap-1 text-[9px] font-mono font-bold uppercase tracking-wider text-[#E0AA3E]/80">
              <span>Tap to View Summary</span>
              <ChevronUp className="w-3 h-3 text-[#EDC967]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ExperienceSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Only use IntersectionObserver on desktop/tablet vertical scroll
    if (window.innerWidth < 768) return;

    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -40% 0px',
      threshold: 0.1,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = cardRefs.current.indexOf(entry.target as HTMLDivElement);
          if (index !== -1) {
            setActiveIndex(index);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % experiences.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + experiences.length) % experiences.length);
  };

  // 3D Concave Cylinder Wheel layout calculations
  const getCardStyles = (idx: number, activeIdx: number, totalCount: number) => {
    // Calculate circular distance wrapping
    let diff = idx - activeIdx;
    if (diff > totalCount / 2) diff -= totalCount;
    if (diff < -totalCount / 2) diff += totalCount;

    const absDiff = Math.abs(diff);

    // Hide cards that are far away
    if (absDiff > 2) {
      return {
        x: diff * 200,
        y: 120,
        z: -300,
        rotateY: diff * -45,
        rotateX: -30,
        scale: 0.6,
        opacity: 0,
        zIndex: 0,
        pointerEvents: 'none' as const,
      };
    }

    // Active Card (Front and Center)
    if (diff === 0) {
      return {
        x: 0,
        y: 0,
        z: 0,
        rotateY: 0,
        rotateX: 0,
        scale: 1,
        opacity: 1,
        zIndex: 20,
        pointerEvents: 'auto' as const,
      };
    }

    // Concave Cylinder bend parameters:
    // Pushes cards back (negative Z), translates left/right (X), drops down (Y),
    // and angles Y & X inward to form a concave 3D cylindrical wheel.
    const x = diff * 190;
    const y = 80; // significant vertical drop for "down to up" rotation
    const z = -150; // push sides back in depth
    const rotateY = diff * -35; // rotate inward to face the center
    const rotateX = -20; // tilt back on the sides
    const scale = 0.82;

    return {
      x,
      y,
      z,
      rotateY,
      rotateX,
      scale,
      opacity: 0,
      zIndex: 10 - absDiff,
      pointerEvents: 'none' as const,
    };
  };

  return (
    <section id="experience" className="py-24 w-full relative z-10">
      <div className="text-center mb-16">
        <ScrollRevealHeading
          text="Work"
          highlightText="Experience"
          gradient="from-[#F7EF8A] to-[#D2AC47]"
          subtitle="Building real-world products and systems across AI, Full-Stack & GenAI."
          align="center"
        />
      </div>

      <div className="flex flex-col md:flex-row gap-12 max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        
        {/* LEFT COLUMN: Sticky Navigation Track (Desktop only) */}
        <div className="hidden md:flex md:w-1/3 sticky top-32 h-[calc(100vh-16rem)] flex-col justify-center items-start pl-8 relative border-l border-white/5">
          {/* Active fill line */}
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-white/5">
            <div 
              className="w-full bg-gradient-to-b from-[#AE8625] via-[#E0AA3E] to-[#D2AC47] shadow-[0_0_12px_rgba(224,170,62,0.5)] transition-all duration-500 ease-out"
              style={{
                height: `${((activeIndex) / (experiences.length - 1)) * 100}%`,
              }}
            />
          </div>
          
          <div className="flex flex-col gap-8">
            {experiences.map((exp, idx) => {
              const isActive = activeIndex === idx;
              return (
                <button
                  key={`${exp.company}-${idx}`}
                  onClick={() => {
                    const el = document.getElementById(`exp-card-${idx}`);
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                  }}
                  className="group flex flex-col text-left focus:outline-none relative"
                >
                  {/* Indicator Dot */}
                  <div 
                    className={`absolute -left-8 -translate-x-[5px] top-1.5 w-3 h-3 rounded-full border transition-all duration-300 ${
                      isActive 
                        ? 'bg-[#E0AA3E] border-[#E0AA3E] scale-125 shadow-[0_0_12px_rgba(224,170,62,0.8)]' 
                        : 'bg-[#0C0C0C] border-white/20 group-hover:border-[#E0AA3E]/60'
                    }`}
                  />
                  
                  <div className="transition-all duration-300">
                    <span className={`block text-xs font-mono tracking-wider transition-colors ${
                      isActive ? 'text-[#E0AA3E]' : 'text-gray-500 group-hover:text-gray-400'
                    }`}>
                      {exp.period}
                    </span>
                    <h4 className={`text-base font-bold transition-colors ${
                      isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'
                    }`}>
                      {exp.company}
                    </h4>
                    <p className={`text-xs transition-colors ${
                      isActive ? 'text-[#EDC967]' : 'text-gray-500 group-hover:text-gray-400'
                    }`}>
                      {exp.role}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: Experience Cards Stack */}
        <div className="w-full md:w-2/3">
          
          {/* MOBILE 3D CONCAVE CYLINDER CAROUSEL */}
          <div 
            className="relative w-full flex items-center justify-center h-[450px] md:hidden overflow-hidden"
            style={{
              perspective: '1200px',
              transformStyle: 'preserve-3d',
            }}
          >
            {experiences.map((exp, idx) => {
              const isActive = activeIndex === idx;
              const styles = getCardStyles(idx, activeIndex, experiences.length);

              return (
                <motion.div
                  key={`${exp.company}-${idx}`}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.3}
                  onDragEnd={(_, info) => {
                    const threshold = 40;
                    if (info.offset.x > threshold) {
                      handlePrev();
                    } else if (info.offset.x < -threshold) {
                      handleNext();
                    }
                  }}
                  className={`absolute w-full max-w-[290px] sm:max-w-[320px] select-none ${isActive ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer'}`}
                  animate={{
                    x: styles.x,
                    y: styles.y,
                    z: styles.z,
                    rotateY: styles.rotateY,
                    rotateX: styles.rotateX,
                    scale: styles.scale,
                    opacity: styles.opacity,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 140,
                    damping: 18,
                    mass: 0.8,
                  }}
                  style={{
                    zIndex: styles.zIndex,
                    pointerEvents: styles.pointerEvents,
                    transformStyle: 'preserve-3d',
                    WebkitTransformStyle: 'preserve-3d',
                  }}
                >
                  <FlipCard 
                    exp={exp} 
                    idx={idx} 
                    isActive={isActive} 
                    onBecomeActive={() => setActiveIndex(idx)} 
                  />
                </motion.div>
              );
            })}
          </div>

          {/* MOBILE CONTROLS (Arrows & Dots Indicator) */}
          <div className="flex items-center justify-center gap-6 mt-4 md:hidden w-full select-none">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full border border-[#E0AA3E]/20 bg-[#E0AA3E]/5 flex items-center justify-center text-[#EDC967] active:bg-[#E0AA3E]/20 transition-colors focus:outline-none"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Pagination Dots */}
            <div className="flex justify-center items-center gap-2">
              {experiences.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveIndex(idx);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 focus:outline-none ${
                    activeIndex === idx ? 'w-6 bg-[#E0AA3E] shadow-[0_0_8px_rgba(224,170,62,0.4)]' : 'w-1.5 bg-white/20'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full border border-[#E0AA3E]/20 bg-[#E0AA3E]/5 flex items-center justify-center text-[#EDC967] active:bg-[#E0AA3E]/20 transition-colors focus:outline-none"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* DESKTOP VERTICAL STACK */}
          <div className="hidden md:flex md:flex-col gap-12">
            {experiences.map((exp, idx) => {
              return (
                <div
                  key={`${exp.company}-${exp.role}`}
                  ref={(el) => {
                    cardRefs.current[idx] = el;
                  }}
                  className="relative w-full"
                >
                  <ScrollRevealElement
                    direction="bottom"
                    delay={idx * 0.05}
                  >
                    <FlipCard exp={exp} idx={idx} />
                  </ScrollRevealElement>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
