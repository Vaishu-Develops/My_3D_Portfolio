import React, { useRef, useState, useEffect } from 'react';
import { useInView } from 'framer-motion';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, SiPython, SiTensorflow, SiMongodb, SiExpress, SiSocketdotio, SiGit, SiFigma, SiVite, SiDocker, SiFirebase, SiPostgresql, SiGithub } from 'react-icons/si';
import { Brain, Code2, Database, Layout, Wrench } from 'lucide-react';
import { WovenCanvas } from '../ui/woven-light-hero';
import { ScrollRevealHeading } from '../ui/text-scroll-animation';
import { ScrollRevealElement } from '../ui/scroll-reveal-element';

// Simple ErrorBoundary to handle WovenCanvas context failure gracefully
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.warn('WovenCanvas load crash caught:', error);
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

const categories = [
  {
    title: 'Frontend',
    icon: <Layout className="w-5 h-5" />,
    gradientFrom: '#072D33', // Deep Teal
    gradientTo: '#1e3b33',   // Dark Teal-Sage
    accent: '#9ABCAB',       // Light Sage
    borderGlow: 'rgba(154, 188, 171, 0.35)',
    rotation: -6, // rotated left
    skills: [
      { name: 'React', icon: <SiReact /> },
      { name: 'Next.js', icon: <SiNextdotjs /> },
      { name: 'TypeScript', icon: <SiTypescript /> },
      { name: 'TailwindCSS', icon: <SiTailwindcss /> },
      { name: 'Framer Motion', icon: <Code2 className="w-4 h-4" /> },
      { name: 'Three.js', icon: <Code2 className="w-4 h-4" /> },
    ],
  },
  {
    title: 'Backend',
    icon: <Code2 className="w-5 h-5" />,
    gradientFrom: '#122622', // Dark Sage
    gradientTo: '#3A7564',   // Muted Teal
    accent: '#9ABCAB',       // Light Sage
    borderGlow: 'rgba(154, 188, 171, 0.35)',
    rotation: 6, // rotated right
    skills: [
      { name: 'Node.js', icon: <SiNodedotjs /> },
      { name: 'Express', icon: <SiExpress /> },
      { name: 'Python', icon: <SiPython /> },
      { name: 'REST APIs', icon: <Code2 className="w-4 h-4" /> },
      { name: 'Socket.IO', icon: <SiSocketdotio /> },
    ],
  },
  {
    title: 'AI / GenAI',
    icon: <Brain className="w-5 h-5" />,
    gradientFrom: '#33091B', // Deep Wine
    gradientTo: '#8F5C64',   // Dusty Rose
    accent: '#DFBE8B',       // Champagne Gold
    borderGlow: 'rgba(223, 190, 139, 0.35)',
    rotation: -6, // rotated left
    skills: [
      { name: 'TensorFlow', icon: <SiTensorflow /> },
      { name: 'LangChain', icon: <Brain className="w-4 h-4" /> },
      { name: 'OpenAI', icon: <Brain className="w-4 h-4" /> },
      { name: 'RAG Systems', icon: <Brain className="w-4 h-4" /> },
      { name: 'Whisper', icon: <Brain className="w-4 h-4" /> },
      { name: 'EfficientNet', icon: <Brain className="w-4 h-4" /> },
    ],
  },
  {
    title: 'Database',
    icon: <Database className="w-5 h-5" />,
    gradientFrom: '#1c0510', // Dark Wine
    gradientTo: '#33091B',   // Deep Wine
    accent: '#8F5C64',       // Dusty Rose
    borderGlow: 'rgba(143, 92, 100, 0.35)',
    rotation: 6, // rotated right
    skills: [
      { name: 'MongoDB', icon: <SiMongodb /> },
      { name: 'PostgreSQL', icon: <SiPostgresql /> },
      { name: 'Firebase', icon: <SiFirebase /> },
      { name: 'Vector DB', icon: <Database className="w-4 h-4" /> },
    ],
  },
  {
    title: 'Tools',
    icon: <Wrench className="w-5 h-5" />,
    gradientFrom: '#072D33', // Deep Teal
    gradientTo: '#33091B',   // Deep Wine
    accent: '#DFBE8B',       // Champagne Gold
    borderGlow: 'rgba(223, 190, 139, 0.35)',
    rotation: -2, // slightly rotated left for top card look
    skills: [
      { name: 'Git', icon: <SiGit /> },
      { name: 'GitHub', icon: <SiGithub /> },
      { name: 'Figma', icon: <SiFigma /> },
      { name: 'Vite', icon: <SiVite /> },
      { name: 'Docker', icon: <SiDocker /> },
    ],
  },
];

export default function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { margin: '200px', once: false });
  const [webglAvailable, setWebglAvailable] = useState(true);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    try {
      const canvas = document.createElement('canvas');
      const available = !!(
        window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
      );
      setWebglAvailable(available);
    } catch (e) {
      setWebglAvailable(false);
    }

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="w-full relative z-10 text-white">
      {/* Section Heading */}
      <div className="px-4 sm:px-8 md:px-16 pt-24 pb-8">
        <ScrollRevealHeading
          text="Technical"
          highlightText="Skills"
          gradient="from-[#DFBE8B] to-[#9ABCAB]"
          subtitle="Technologies and tools I work with to build amazing products."
        />
      </div>

      {/* ─── Stacking cards area ─── */}
      <div className="flex justify-between px-4 sm:px-8 md:px-16">
        
        <div className="hidden md:flex sticky top-0 h-screen w-[45%] items-center justify-center overflow-hidden">
          <div className="w-full h-[80%] pointer-events-auto">
            {!webglAvailable ? (
              <div className="w-full h-full flex flex-col items-center justify-center text-center p-4">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#DFBE8B]/20 to-[#8F5C64]/20 blur-xl absolute" style={{ filter: 'blur(40px)' }} />
                <p className="text-gray-500 text-xs mt-2 relative z-10">3D Visualizer unavailable (WebGL disabled/unsupported)</p>
              </div>
            ) : (
              <ErrorBoundary fallback={
                <div className="w-full h-full flex flex-col items-center justify-center text-center p-4">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#DFBE8B]/20 to-[#8F5C64]/20 blur-xl absolute" style={{ filter: 'blur(40px)' }} />
                  <p className="text-gray-500 text-xs mt-2 relative z-10">3D Visualizer unavailable (WebGL disabled/unsupported)</p>
                </div>
              }>
                {isInView ? <WovenCanvas /> : <div className="w-full h-full" />}
              </ErrorBoundary>
            )}
          </div>
        </div>

        {/* RIGHT column: sticky skill cards with flying reveal */}
        <div className="grid gap-2 w-full md:w-[50%]">
          {/* Mobile-only 3D Woven Canvas visualizer */}
          <div className="md:hidden w-full h-[220px] mb-4 pointer-events-auto flex items-center justify-center relative rounded-3xl border border-white/5 bg-black/40 overflow-hidden">
            {!webglAvailable ? (
              <div className="w-full h-full flex flex-col items-center justify-center text-center p-4">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#DFBE8B]/20 to-[#8F5C64]/20 blur-xl absolute" style={{ filter: 'blur(30px)' }} />
                <p className="text-gray-500 text-xs mt-2 relative z-10">3D Visualizer unavailable (WebGL disabled/unsupported)</p>
              </div>
            ) : (
              <ErrorBoundary fallback={
                <div className="w-full h-full flex flex-col items-center justify-center text-center p-4">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#DFBE8B]/20 to-[#8F5C64]/20 blur-xl absolute" style={{ filter: 'blur(30px)' }} />
                  <p className="text-gray-500 text-xs mt-2 relative z-10">3D Visualizer unavailable (WebGL disabled/unsupported)</p>
                </div>
              }>
                {(isMobile || isInView) ? <WovenCanvas /> : <div className="w-full h-full" />}
              </ErrorBoundary>
            )}
          </div>

          {categories.map((cat, i) => {
            const isHovered = hoveredIdx === i;
            const rot = isMobile ? 0 : cat.rotation;
            
            return (
              <figure 
                key={cat.title} 
                className="sticky top-0 h-screen grid place-content-center group/card"
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <ScrollRevealElement
                  direction={i % 2 === 0 ? 'left' : 'right'}
                  delay={0.05}
                >
                  <article
                    className="relative w-full max-w-[32rem] rounded-3xl p-6 sm:p-8 flex flex-col overflow-hidden border backdrop-blur-2xl"
                    style={{ 
                      background: `linear-gradient(135deg, ${cat.gradientFrom}f2 0%, ${cat.gradientTo}fc 100%)`,
                      borderColor: isHovered ? cat.accent : 'rgba(255, 255, 255, 0.08)',
                      boxShadow: isHovered 
                        ? `0 20px 80px -10px ${cat.borderGlow}, inset 0 1px 1px rgba(255, 255, 255, 0.15)` 
                        : '0 30px 100px rgba(0, 0, 0, 0.8), inset 0 1px 1px rgba(255, 255, 255, 0.05)',
                      transform: isHovered 
                        ? `translateY(-12px) scale(1.03) rotate(${rot}deg)` 
                        : `translateY(0) scale(1) rotate(${rot}deg)`,
                      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  >
                    {/* Glowing halo behind card inside article */}
                    <div 
                      className="absolute -inset-4 rounded-3xl blur-3xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none z-0"
                      style={{
                        background: `radial-gradient(circle, ${cat.accent}1f 0%, transparent 70%)`
                      }}
                    />

                    {/* Subtle top inner glow line */}
                    <div 
                      className="absolute inset-x-0 top-0 h-px transition-colors duration-500" 
                      style={{
                        background: `linear-gradient(90deg, transparent, ${isHovered ? cat.accent : 'rgba(255,255,255,0.1)'}, transparent)`
                      }}
                    />
                    
                    {/* Large Background Number for visual interest */}
                    <div 
                      className="absolute -right-6 -bottom-6 text-[180px] font-black select-none leading-none z-0 transition-all duration-700 font-mono"
                      style={{
                        color: 'transparent',
                        WebkitTextStroke: `1px ${cat.accent}1a`,
                        transform: isHovered ? 'scale(1.08) translate(-10px, -10px)' : 'scale(1) translate(0, 0)',
                        opacity: isHovered ? 0.3 : 0.12
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-8">
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 shadow-md"
                          style={{
                            backgroundColor: `${cat.accent}1a`,
                            border: `1px solid ${cat.accent}4d`,
                            color: cat.accent,
                            boxShadow: isHovered ? `0 0 20px ${cat.accent}33` : 'none'
                          }}
                        >
                          {cat.icon}
                        </div>
                        <div>
                          <h3 className="text-3xl font-bold text-white tracking-tight drop-shadow-md">
                            {cat.title}
                          </h3>
                          <div 
                            className="h-0.5 mt-1.5 rounded-full transition-all duration-500" 
                            style={{ 
                              backgroundColor: cat.accent, 
                              width: isHovered ? '48px' : '24px',
                              boxShadow: `0 0 8px ${cat.accent}`
                            }} 
                          />
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        {cat.skills.map(skill => (
                          <div
                            key={skill.name}
                            className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.07] transition-all duration-300 text-sm font-medium text-gray-300 hover:text-white backdrop-blur-sm group/pill"
                            style={{
                              borderColor: isHovered ? `${cat.accent}33` : 'rgba(255, 255, 255, 0.04)',
                            }}
                          >
                            {/* Glowing dot matching card's accent color */}
                            <span 
                              className="w-1.5 h-1.5 rounded-full transition-all duration-300" 
                              style={{ 
                                backgroundColor: cat.accent, 
                                boxShadow: `0 0 8px ${cat.accent}`,
                                opacity: isHovered ? 1 : 0.6
                              }} 
                            />
                            <span className="text-lg text-white/90 transition-transform duration-300 group-hover/pill:scale-110">{skill.icon}</span>
                            <span className="text-gray-300 group-hover/pill:text-white transition-colors">{skill.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Bottom Bar: Counter */}
                    <div className="relative z-10 flex justify-end mt-12 pt-6 border-t border-white/5">
                      <span className="text-white/20 font-mono text-sm tracking-widest">
                        {String(i + 1).padStart(2, '0')} / {String(categories.length).padStart(2, '0')}
                      </span>
                    </div>
                  </article>
                </ScrollRevealElement>
              </figure>
            );
          })}
        </div>

      </div>
    </section>
  );
}
