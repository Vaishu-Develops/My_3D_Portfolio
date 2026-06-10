import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, Briefcase } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export default function ContactSection() {
  const navigate = useNavigate();
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-8 md:px-16 w-full flex justify-center">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: '-100px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-5xl rounded-[2.5rem] border border-white/5 overflow-hidden group select-none shadow-[0_30px_100px_rgba(0,0,0,0.8)]"
        style={{
          background: 'rgba(10, 10, 12, 0.65)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
        }}
      >
        {/* Dynamic Interactive Mouse Glow Background */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out z-0"
          style={{
            background: 'radial-gradient(500px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(224, 170, 62, 0.08), transparent 80%)',
          }}
        />

        {/* Top/Side Border Glow Effect */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out z-0"
          style={{
            background: 'radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(224, 170, 62, 0.12), transparent 100%)',
            maskImage: 'linear-gradient(to bottom, black, transparent)',
            WebkitMaskImage: 'linear-gradient(to bottom, black, transparent)',
            padding: '1px',
            borderRadius: 'inherit',
          }}
        />

        {/* Content Container */}
        <div className="relative z-10 p-8 sm:p-12 md:p-16 flex flex-col items-center text-center gap-6 md:gap-8">
          
          {/* Header Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-[#E0AA3E]/20 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-[#E0AA3E] animate-pulse shadow-[0_0_8px_#E0AA3E]" />
            <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] font-semibold text-[#EDC967]/90">
              Let's Collaborate
            </span>
          </div>

          {/* Title */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight max-w-3xl">
            Ready to Build the{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F7EF8A] via-[#E0AA3E] to-[#AE8625] drop-shadow-sm">
              Future?
            </span>
          </h2>

          {/* Description */}
          <p className="text-sm sm:text-base md:text-lg text-neutral-400 max-w-2xl leading-relaxed">
            Looking for an engineer specialized in AI, Deep Learning, and Full-Stack systems? Let's connect to discuss your projects, internship opportunities, or remote contracts.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-4 w-full sm:w-auto justify-center items-center">
            
            {/* Hire Me CTA */}
            <button
              onClick={() => navigate('/hire-me')}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-br from-[#F7EF8A] via-[#E0AA3E] to-[#AE8625] text-black font-extrabold rounded-full transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_10px_30px_rgba(224,170,62,0.2)] hover:shadow-[0_15px_35px_rgba(224,170,62,0.35)] flex items-center justify-center gap-2 cursor-pointer animate-none"
            >
              <Briefcase className="w-4 h-4" />
              <span>Hire Me</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Contact CTA */}
            <button
              onClick={() => navigate('/contact')}
              className="w-full sm:w-auto px-8 py-4 border border-[#E0AA3E]/35 text-white font-bold rounded-full hover:bg-[#E0AA3E]/5 hover:border-[#E0AA3E] transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 hover:shadow-[0_10px_25px_rgba(224,170,62,0.1)] cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>Get in Touch</span>
            </button>
            
          </div>

          {/* Divider */}
          <div className="w-2/3 h-px bg-gradient-to-r from-transparent via-[#E0AA3E]/15 to-transparent my-4" />

          {/* Social Links Row */}
          <div className="flex items-center gap-6">
            <a 
              href="mailto:vaishnavisudarsanam11@gmail.com" 
              className="p-3 rounded-full bg-white/[0.02] border border-white/5 text-[#E0AA3E]/70 hover:text-[#E0AA3E] hover:bg-white/[0.08] hover:border-[#E0AA3E]/30 transition-all hover:scale-110 active:scale-95 cursor-pointer shadow-md"
              title="Email Me"
            >
              <Mail className="w-5 h-5" />
            </a>
            
            <a 
              href="https://github.com/Vaishu-Develops" 
              target="_blank" 
              rel="noreferrer"
              className="p-3 rounded-full bg-white/[0.02] border border-white/5 text-[#E0AA3E]/70 hover:text-[#E0AA3E] hover:bg-white/[0.08] hover:border-[#E0AA3E]/30 transition-all hover:scale-110 active:scale-95 cursor-pointer shadow-md"
              title="GitHub Profile"
            >
              <FaGithub className="w-5 h-5" />
            </a>

            <a 
              href="https://www.linkedin.com/in/vaishnavi-s-pro/" 
              target="_blank" 
              rel="noreferrer"
              className="p-3 rounded-full bg-white/[0.02] border border-white/5 text-[#E0AA3E]/70 hover:text-[#E0AA3E] hover:bg-white/[0.08] hover:border-[#E0AA3E]/30 transition-all hover:scale-110 active:scale-95 cursor-pointer shadow-md"
              title="LinkedIn Profile"
            >
              <FaLinkedin className="w-5 h-5" />
            </a>
          </div>

        </div>
      </motion.div>
    </section>
  );
}
