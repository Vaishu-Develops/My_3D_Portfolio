import { motion } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';
import LottieDefault from 'lottie-react';
import portalData from '../../animation/Portal time.json';
import Spline from '@splinetool/react-spline';
import { CardContainer, CardBody, CardItem } from '../ui/3d-card';

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
        <CardContainer className="inter-var w-full">
          <CardBody className="p-8 md:p-12 rounded-3xl relative group w-full h-auto">
            {/* Background elements moved to child divulges to prevent backdrop-blur from flattening the 3D context */}
            <div className="absolute inset-0 glass-panel rounded-3xl shadow-2xl" style={{ transform: "translateZ(-10px)" }} />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 border border-purple-500/20 rounded-3xl" style={{ transform: "translateZ(-9px)" }} />
            
            {/* Portal Lottie decoration */}
            <CardItem translateZ={20} className="absolute -top-10 -right-10 w-40 h-40 opacity-30 pointer-events-none">
              <Lottie animationData={portalData} loop={true} />
            </CardItem>

            <CardItem translateZ={40} className="w-full">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-sm text-purple-300 mb-8 border border-purple-500/30"
              >
                <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse border border-purple-200" />
                Available for new projects
              </motion.div>
            </CardItem>

            <CardItem translateZ={60} className="w-full">
              <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 animate-gradient">
                  VAISHNAVI S
                </span>
              </h1>
            </CardItem>

            <CardItem translateZ={50} className="w-full">
              <p className="text-lg md:text-xl text-gray-300 font-medium mb-2">
                Full Stack & AI Enthusiast | MERN & GenAI Specialist
              </p>
            </CardItem>

            <CardItem translateZ={30} className="w-full">
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
                <MapPin className="w-4 h-4 text-purple-400" />
                Coimbatore, Tamil Nadu, India
              </div>
            </CardItem>
            
            <CardItem translateZ={40} className="w-full">
              <p className="text-lg text-gray-400 max-w-lg mb-8 leading-relaxed font-light">
                Crafting intelligent systems and seamless digital experiences — from AI-powered security to real-time collaboration platforms.
              </p>
            </CardItem>

            <CardItem translateZ={50} className="flex flex-wrap gap-4 mt-8 w-full">
              <a href="#projects" className="px-8 py-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.5)] border border-purple-400 flex items-center gap-2">
                Explore Work
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
              <a href="#contact" className="px-8 py-4 rounded-xl glass-panel hover:bg-white/10 font-medium transition-all duration-300 border border-white/5 hover:border-white/20 text-gray-300">
                Contact Me
              </a>
            </CardItem>
          </CardBody>
        </CardContainer>
      </motion.div>

      {/* Right Content - Spline 3D Scene */}
      <motion.div
        className="relative z-30 w-full lg:w-1/2 h-[500px] lg:h-[700px] flex items-center justify-center mt-8 lg:mt-0"
        initial={{ opacity: 0, x: 50, scale: 0.9 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        <div className="w-full h-full relative pointer-events-auto lg:translate-x-[15%] xl:translate-x-[25%] lg:scale-110">
          <Spline
            scene="/scene.splinecode"
            style={{ width: '100%', height: '100%', border: 'none', background: 'transparent' }}
          />
        </div>
      </motion.div>
    </section>
  );
}
