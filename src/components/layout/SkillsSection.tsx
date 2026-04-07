import { motion } from 'framer-motion';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, SiPython, SiTensorflow, SiMongodb, SiExpress, SiSocketdotio, SiGit, SiFigma, SiVite, SiDocker, SiFirebase, SiPostgresql, SiGithub } from 'react-icons/si';
import { Brain, Code2, Database, Layout, Wrench } from 'lucide-react';

const categories = [
  {
    title: 'Frontend',
    icon: <Layout className="w-5 h-5" />,
    color: 'from-blue-400 to-cyan-400',
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
    color: 'from-green-400 to-emerald-400',
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
    color: 'from-purple-400 to-pink-400',
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
    color: 'from-orange-400 to-amber-400',
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
    color: 'from-indigo-400 to-violet-400',
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
    <section id="skills" className="py-24 w-full relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
          Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">Skills</span>
        </h2>
        <p className="text-neutral-400 mt-4">Technologies and tools I work with to build amazing products.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-panel p-6 rounded-2xl hover:border-purple-500/30 transition-all duration-300 group"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white`}>
                {cat.icon}
              </div>
              <h3 className="text-lg font-bold text-white">{cat.title}</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {cat.skills.map(skill => (
                <div
                  key={skill.name}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500/30 hover:bg-purple-500/10 transition-all duration-300 text-sm text-gray-300 hover:text-white"
                >
                  <span className="text-lg">{skill.icon}</span>
                  {skill.name}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
