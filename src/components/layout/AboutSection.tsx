import { motion } from 'framer-motion';
import LogoLoop from '../ui/LogoLoop';
import Macbook from '../ui/AnimatedMacbook';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, SiPython, SiTensorflow, SiMongodb, SiExpress, SiVite, SiSocketdotio, SiGit, SiFigma } from 'react-icons/si';

export default function AboutSection() {
  return (
    <section id="about" className="min-h-screen flex flex-col md:flex-row items-center justify-between w-full relative pt-20">
      
      {/* MacBook Animation on Left */}
      <div className="w-full md:w-1/2 h-[350px] md:h-[500px] mb-12 md:mb-0 relative order-2 md:order-1 flex items-center justify-center">
        <div className="relative w-[300px] h-[250px] scale-[1.8] md:scale-[2.2]">
          <Macbook />
        </div>
      </div>
      
      {/* Text Content */}
      <motion.div 
        className="flex-1 min-w-0 space-y-6 order-1 md:order-2 w-full"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
          About <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">Me</span>
        </h2>
        <div className="glass-panel p-6 sm:p-8 rounded-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
          <p className="text-gray-300 leading-relaxed font-light text-lg mb-4 whitespace-normal">
            Hi, I'm <strong className="text-white">Vaishnavi S.</strong>, a Full Stack Developer & AI Enthusiast specializing in the MERN stack and Generative AI. I'm currently pursuing my B.E. in Computer Science at PPG Institute of Technology, Coimbatore.
          </p>
          <p className="text-gray-300 leading-relaxed font-light text-lg whitespace-normal">
            From building real-time collaboration platforms like <strong className="text-teal-300">SyncSpace</strong> to AI-powered security systems like <strong className="text-teal-300">SarpGuard</strong>, I combine intelligent architectures with polished user experiences. My work spans deep learning (PCB defect detection at 96% accuracy), RAG/Agentic AI systems, and interactive full-stack web apps.
          </p>
        </div>

        {/* Tech Stack LogoLoop */}
        <div className="mt-8 w-full">
          <h3 className="text-xl font-medium text-gray-400 mb-4 ml-2">Tech Stack</h3>
          <div className="glass-panel p-4 rounded-2xl w-full overflow-hidden">
            <div style={{ height: '100px', position: 'relative' }} className="flex items-center w-full">
              <LogoLoop
                logos={[
                  { node: <SiReact size={48} className="text-[#61DAFB] mx-6" />, title: "React", href: "#" },
                  { node: <SiNextdotjs size={48} className="text-white mx-6" />, title: "Next.js", href: "#" },
                  { node: <SiTypescript size={48} className="text-[#3178C6] mx-6" />, title: "TypeScript", href: "#" },
                  { node: <SiTailwindcss size={48} className="text-[#06B6D4] mx-6" />, title: "Tailwind CSS", href: "#" },
                  { node: <SiNodedotjs size={48} className="text-[#339933] mx-6" />, title: "Node.js", href: "#" },
                  { node: <SiPython size={48} className="text-[#3776AB] mx-6" />, title: "Python", href: "#" },
                  { node: <SiTensorflow size={48} className="text-[#FF6F00] mx-6" />, title: "AI/ML", href: "#" },
                  { node: <SiMongodb size={48} className="text-[#47A248] mx-6" />, title: "MongoDB", href: "#" },
                  { node: <SiExpress size={48} className="text-white mx-6" />, title: "Express", href: "#" },
                  { node: <SiVite size={48} className="text-[#646CFF] mx-6" />, title: "Vite", href: "#" },
                  { node: <SiSocketdotio size={48} className="text-white mx-6" />, title: "Socket.IO", href: "#" },
                  { node: <SiGit size={48} className="text-[#F05032] mx-6" />, title: "Git", href: "#" },
                  { node: <SiFigma size={48} className="text-[#F24E1E] mx-6" />, title: "Figma", href: "#" },
                ]}
                speed={80}
                gap={30}
              />
            </div>
          </div>
        </div>
      </motion.div>

    </section>
  );
}
