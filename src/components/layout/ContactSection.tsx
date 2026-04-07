import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 w-full flex justify-center mb-10">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="glass-panel p-12 w-full max-w-4xl text-center flex flex-col items-center gap-8 relative overflow-hidden rounded-3xl"
      >
        <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
        
        <h2 className="text-4xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500">
          Ready to Build the Future?
        </h2>
        
        <p className="text-xl text-neutral-300 max-w-2xl">
          〔 open to collaborate · open to build · open to break things 〕
        </p>
        
        <div className="flex flex-wrap gap-4 mt-4 justify-center">
          <a href="mailto:vaishnavisudarsanam11@gmail.com" className="px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-full transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.5)] flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Email Me
          </a>
          <a href="https://github.com/Vaishu-Develops" target="_blank" rel="noreferrer" className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-neutral-200 transition-colors flex items-center gap-2">
            <FaGithub className="w-5 h-5" />
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/vaishnavi-s-pro/" target="_blank" rel="noreferrer" className="px-8 py-4 border border-white/20 glass-panel font-bold rounded-full hover:bg-white/10 transition-colors flex items-center gap-2">
            <FaLinkedin className="w-5 h-5" />
            LinkedIn
          </a>
        </div>
      </motion.div>
    </section>
  );
}
