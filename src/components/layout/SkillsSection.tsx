import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, SiPython, SiTensorflow, SiMongodb, SiExpress, SiSocketdotio, SiGit, SiFigma, SiVite, SiDocker, SiFirebase, SiPostgresql, SiGithub } from 'react-icons/si';
import { Brain, Code2, Database, Layout, Wrench } from 'lucide-react';
import { WovenCanvas } from '../ui/woven-light-hero';
import { ScrollRevealHeading } from '../ui/text-scroll-animation';
import { ScrollRevealElement } from '../ui/scroll-reveal-element';

const categories = [
  {
    title: 'Frontend',
    icon: <Layout className="w-5 h-5" />,
    color: '#1e1b4b', // Deep indigo
    rotation: '-rotate-6',
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
    color: '#064e3b', // Deep emerald
    rotation: 'rotate-6',
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
    color: '#4a044e', // Deep fuchsia
    rotation: '-rotate-3',
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
    color: '#78350f', // Deep amber
    rotation: 'rotate-3',
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
    color: '#2e1065', // Deep violet
    rotation: 'rotate-0',
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
  return (
    <section id="skills" className="w-full relative z-10 text-white">
      {/* Section Heading */}
      <div className="px-4 sm:px-8 md:px-16 pt-24 pb-8">
        <ScrollRevealHeading
          text="Technical"
          highlightText="Skills"
          gradient="from-indigo-400 to-purple-500"
          subtitle="Technologies and tools I work with to build amazing products."
        />
      </div>

      {/* ─── Stacking cards area ─── */}
      <div className="flex justify-between px-4 sm:px-8 md:px-16">
        
        {/* LEFT column: Woven Light 3D Canvas — stays sticky, no scroll-reveal wrapper */}
        <div className="hidden md:flex sticky top-0 h-screen w-[45%] items-center justify-center overflow-hidden">
          <div className="w-full h-[80%] pointer-events-auto">
            <WovenCanvas />
          </div>
        </div>

        {/* RIGHT column: sticky skill cards with flying reveal */}
        <div className="grid gap-2 w-full md:w-[50%]">
          {categories.map((cat, i) => (
            <figure key={cat.title} className="sticky top-0 h-screen grid place-content-center">
              <ScrollRevealElement
                direction={i % 2 === 0 ? 'left' : 'right'}
                delay={0.05}
              >
                <article
                  className={`group relative w-full max-w-[32rem] rounded-3xl ${cat.rotation === 'rotate-6' ? 'md:rotate-6' : cat.rotation === '-rotate-6' ? 'md:-rotate-6' : cat.rotation === 'rotate-3' ? 'md:rotate-3' : cat.rotation === '-rotate-3' ? 'md:-rotate-3' : ''} rotate-0 p-6 sm:p-8 flex flex-col overflow-hidden border border-white/10 backdrop-blur-xl shadow-[0_30px_100px_rgba(0,0,0,0.8)] transition-all duration-500 hover:border-white/20`}
                  style={{ 
                    background: `linear-gradient(135deg, ${cat.color}d9 0%, rgba(5, 5, 10, 0.95) 100%)` 
                  }}
                >
                  {/* Subtle top inner glow line */}
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  
                  {/* Large Background Number for visual interest */}
                  <div className="absolute -right-6 -bottom-6 text-[200px] font-black text-white/[0.04] select-none leading-none z-0 transition-transform duration-500 group-hover:scale-105">
                    {String(i + 1).padStart(2, '0')}
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white shadow-lg backdrop-blur-md">
                        {cat.icon}
                      </div>
                      <h3 className="text-3xl font-bold text-white tracking-tight drop-shadow-md">
                        {cat.title}
                      </h3>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      {cat.skills.map(skill => (
                        <div
                          key={skill.name}
                          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all duration-300 text-sm font-medium text-gray-200 hover:text-white backdrop-blur-sm"
                        >
                          <span className="text-xl">{skill.icon}</span>
                          {skill.name}
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
          ))}
        </div>

      </div>
    </section>
  );
}
