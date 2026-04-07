import { motion } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';
import LottieDefault from 'lottie-react';
import portalData from '../../animation/Portal time.json';

const Lottie = (LottieDefault as any).default || LottieDefault;

export default function HeroSection() {
  return (
    <section id="hero" className="min-h-screen flex flex-col lg:flex-row items-center justify-center w-full relative pt-20 px-6 md:px-12">
      {/* Left Content */}
      <motion.div 
        className="relative z-10 w-full lg:w-1/2 mt-12 lg:mt-0"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <div className="glass-panel p-8 md:p-12 rounded-3xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 border border-purple-500/20" />
          
          {/* Portal Lottie decoration */}
          <div className="absolute -top-10 -right-10 w-40 h-40 opacity-30 pointer-events-none">
            <Lottie animationData={portalData} loop={true} />
          </div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-sm text-purple-300 mb-8 border border-purple-500/30"
          >
            <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse border border-purple-200" />
            Available for new projects
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 animate-gradient">
              VAISHNAVI S
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 font-medium mb-2">
            Full Stack & AI Enthusiast | MERN & GenAI Specialist
          </p>

          <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
            <MapPin className="w-4 h-4 text-purple-400" />
            Coimbatore, Tamil Nadu, India
          </div>
          
          <p className="text-lg text-gray-400 max-w-lg mb-8 leading-relaxed font-light">
            Crafting intelligent systems and seamless digital experiences — from AI-powered security to real-time collaboration platforms.
          </p>

          <div className="flex flex-wrap gap-4">
            <a href="#projects" className="px-8 py-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.5)] border border-purple-400 flex items-center gap-2">
              Explore Work
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
            <a href="#contact" className="px-8 py-4 rounded-xl glass-panel hover:bg-white/10 font-medium transition-all duration-300 border border-white/5 hover:border-white/20 text-gray-300">
              Contact Me
            </a>
          </div>
        </div>
      </motion.div>

      {/* Right Content - Spline 3D Scene */}
      <motion.div
        className="relative z-10 w-full lg:w-1/2 h-[500px] lg:h-[700px] flex items-center justify-center mt-8 lg:mt-0"
        initial={{ opacity: 0, x: 50, scale: 0.9 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        <div className="w-full h-full relative pointer-events-auto">
          <iframe 
            src='https://my.spline.design/genkubgreetingrobot-HUk8SkT2YoiY9A1LTIjfKHcI/' 
            width='100%' 
            height='100%' 
            style={{ border: 'none', background: 'transparent' }}
            title="3D Greeting Robot"
            className="rounded-3xl"
          />
        </div>
      </motion.div>
    </section>
  );
}
