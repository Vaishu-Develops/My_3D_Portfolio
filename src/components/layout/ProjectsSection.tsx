import { motion } from 'framer-motion';
import { CardContainer, CardBody, CardItem } from '../ui/3d-card';

const projects = [
  { title: 'SarpGuard', tag: 'AI Security', desc: 'AI-powered dual-layer security system for real-time snake detection and classification via uploaded video or live webcam.', link: 'https://github.com/Vaishu-Develops/SarpGuard' },
  { title: 'PCB Defect Detection', tag: 'Deep Learning', desc: 'End-to-end deep learning system using EfficientNet-B0 achieving 96% accuracy across 6 PCB defect types.', link: 'https://github.com/Vaishu-Develops/PCB-Defect-Detection-and-Classification-System' },
  { title: 'Multi-Agent Stock Analyzer', tag: 'AI/Finance', desc: 'Multi-Agent AI Financial Analyst powered by Llama 4 Maverick via SambaNova for global stock analysis.', link: 'https://github.com/Vaishu-Develops/Multi-Agent-Stock-Analyzer' },
  { title: 'SyncSpace', tag: 'MERN + Real-time', desc: 'All-in-one collaboration hub with Kanban boards, real-time document editing, project chat, and file versioning.', link: 'https://github.com/Vaishu-Develops/SyncSpace' },
  { title: 'GigConnect', tag: 'MERN', desc: 'Hyperlocal freelance marketplace connecting clients with nearby freelancers — gig posting, search, real-time chat.', link: 'https://github.com/Vaishu-Develops/GigConnect' },
  { title: 'Deep Secure Steganography', tag: 'AI + Crypto', desc: 'Full-stack steganography app combining Deep Learning and AES Cryptography to securely hide images and text.', link: 'https://github.com/Vaishu-Develops/AI_Powered_Deep_Secure_Steganography_Generator' },
  { title: 'Hospital SOC Dashboard', tag: 'React + AI', desc: 'Interactive dashboards and AI-powered data querying systems for hospital Schedule of Charges management.', link: 'https://github.com/Vaishu-Develops/Payer_Side' },
  { title: 'Audio Recognition Tool', tag: 'GenAI', desc: 'AI-driven app that transcribes audio and searches subtitles using semantic similarity — Shazam for speech.', link: 'https://github.com/Vaishu-Develops/Audio-To-Text-Conversion' },
  { title: 'Gen-AI Code Reviewer', tag: 'GenAI', desc: 'AI-powered code review tool that analyzes code quality, finds bugs, and suggests improvements using LLMs.', link: 'https://github.com/Vaishu-Develops/Gen-AI-Code-reviewer' },
  { title: 'AI Travel Planner', tag: 'AI', desc: 'AI-powered travel itinerary generator that creates personalized travel plans based on user preferences.', link: 'https://github.com/Vaishu-Develops/AI-Powered-Travel_Planner' },
  { title: 'RentMate', tag: 'Full-Stack', desc: 'Full-stack rental platform for finding and listing rental properties with search and filtering capabilities.', link: 'https://github.com/Vaishu-Develops/RentMate' },
  { title: 'MentalHealth Chatbot', tag: 'AI', desc: 'A supportive AI companion for mental well-being with healing poetry integration.', link: 'https://github.com/Vaishu-Develops/MentalHealth-Chatbot' },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-24 w-full flex flex-col gap-12 relative z-10">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
          Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">Projects</span>
        </h2>
        <p className="text-neutral-400 mt-4">Architecting intelligent systems and seamless experiences.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {projects.map((proj, i) => (
          <motion.div
            key={proj.title}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, type: "spring", stiffness: 100 }}
          >
            <CardContainer className="w-full">
              <CardBody className="glass-panel relative w-full h-72 p-6 border-white/[0.1] rounded-2xl hover:border-purple-500/30 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <CardItem translateZ="50" className="text-xl font-bold text-white group-hover/card:text-purple-300 transition-colors">
                    {proj.title}
                  </CardItem>
                  <CardItem as="p" translateZ="60" className="text-neutral-400 text-xs mt-1 font-medium uppercase tracking-wider">
                    {proj.tag}
                  </CardItem>
                  <CardItem as="p" translateZ="40" className="text-neutral-300 text-sm mt-3 leading-relaxed line-clamp-3">
                    {proj.desc}
                  </CardItem>
                </div>
                
                <CardItem translateZ="100" className="w-full mt-4 flex justify-between items-center">
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-colors"
                    >
                      View GitHub
                    </a>
                </CardItem>
              </CardBody>
            </CardContainer>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
