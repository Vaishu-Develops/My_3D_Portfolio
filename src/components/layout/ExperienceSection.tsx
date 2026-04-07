import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';

const experiences = [
  {
    company: 'Infosys',
    role: 'Artificial Intelligence Intern',
    period: '2025',
    description: 'Developed an end-to-end deep learning system for detecting and classifying defects in Printed Circuit Boards (PCBs). Custom-trained the model on the DeepPCB dataset using EfficientNet-B0 architecture, achieving 96% classification accuracy across 6 defect types.',
    tags: ['Deep Learning', 'EfficientNet-B0', 'PCB Detection', 'Python'],
  },
  {
    company: 'Appin Technology',
    role: 'MERN Stack Developer Intern',
    period: '2025',
    description: 'Built full-stack web applications using MongoDB, Express.js, React.js, and Node.js. Gained hands-on development experience implementing responsive front-end interfaces and secure back-end APIs.',
    tags: ['MongoDB', 'Express', 'React', 'Node.js'],
  },
  {
    company: 'Zaalima Development Pvt. Ltd',
    role: 'Web Development Intern',
    period: 'Oct – Dec 2025',
    description: 'Designed and implemented the architecture for the GigConnect platform, handling both frontend interfaces and backend APIs. Optimized database queries in MongoDB to improve platform search performance.',
    tags: ['MERN', 'GigConnect', 'MongoDB', 'API Design'],
  },
  {
    company: 'Tecforz Innovations Pvt Ltd',
    role: 'Frontend Developer Intern',
    period: 'Jul – Sep 2025',
    description: 'Developed interactive dashboards and AI-powered data querying systems for hospital SOC management. Gained hands-on experience in React frontend development, API integration, and data visualization.',
    tags: ['React', 'Dashboard', 'API Integration', 'Data Viz'],
  },
  {
    company: 'Innomatics Research Labs',
    role: 'Advanced Generative AI Intern',
    period: 'Jan – Mar 2025',
    description: 'Developed advanced AI applications including conversational chatbots and RAG/Agentic systems using LangChain, LLMs, and vector databases.',
    tags: ['LangChain', 'LLMs', 'RAG', 'Vector DB'],
  },
  {
    company: 'Innomatics Research Labs',
    role: 'Advanced Data Analysis Intern',
    period: 'Jan – Mar 2025',
    description: 'Performed end-to-end data analysis on real-world datasets, involving data wrangling, visualization, and creating insightful dashboards.',
    tags: ['Python', 'Data Analysis', 'Visualization', 'Dashboards'],
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-24 w-full relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
          Work <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Experience</span>
        </h2>
        <p className="text-neutral-400 mt-4">Building real-world products and systems across AI, Full-Stack & GenAI.</p>
      </motion.div>

      <div className="relative max-w-4xl mx-auto">
        {/* Timeline line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-pink-500 to-indigo-500 md:-translate-x-1/2" />

        {experiences.map((exp, i) => (
          <motion.div
            key={`${exp.company}-${exp.role}`}
            initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className={`relative flex flex-col md:flex-row items-start mb-12 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
          >
            {/* Timeline dot */}
            <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-purple-500 border-4 border-[#0a0a0a] md:-translate-x-1/2 z-10 shadow-[0_0_12px_rgba(168,85,247,0.6)]" />

            {/* Card */}
            <div className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${i % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}`}>
              <div className="glass-panel p-6 rounded-2xl hover:border-purple-500/30 transition-all duration-300 group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white group-hover:text-purple-300 transition-colors">{exp.role}</h3>
                    <p className="text-sm text-gray-400">{exp.company} • {exp.period}</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">{exp.description}</p>
                <div className="flex flex-wrap gap-2">
                  {exp.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 text-xs rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
