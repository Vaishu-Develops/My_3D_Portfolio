import { motion } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';
import LottieDefault from 'lottie-react';
import portalData from '../../animation/Portal time.json';
import Spline from '@splinetool/react-spline';
import { CardContainer, CardBody, CardItem } from '../ui/3d-card';
import { VaishnaviTextEffect } from '../ui/text-effect';
import { TextRotator } from '../ui/TextRotator';

const Lottie = (LottieDefault as any).default || LottieDefault;

export default function HeroSection() {
  const customPhrases = [
    "Welcome to my creative digital space.",
    "Let's turn your bold visions into reality.",
    "Building intelligent systems with a human touch.",
    "Empowering the future through AI & Full-Stack code."
  ];

  return (
    <section id="hero" className="min-h-screen w-full relative pt-24 pb-12 px-6 md:px-12 flex justify-center items-center overflow-hidden">
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-0 mt-8 lg:mt-0">
        
        {/* Left Content */}
        <motion.div 
          className="relative z-10 w-full lg:w-1/2 mt-12 lg:mt-0"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <CardContainer className="inter-var w-full">
            <CardBody className="p-8 md:p-12 rounded-xl relative group w-full h-auto border border-white/10 shadow-[0_0_50px_-12px_rgba(168,85,247,0.2)]">
              <div className="absolute inset-0 glass-panel rounded-xl" style={{ transform: "translateZ(-10px)" }} />
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 border border-purple-500/30 rounded-xl" style={{ transform: "translateZ(-9px)" }} />
              
              <CardItem translateZ={20} className="absolute -top-10 -right-10 w-40 h-40 opacity-30 pointer-events-none hidden md:block">
                <Lottie animationData={portalData} loop={true} />
              </CardItem>

              <CardItem translateZ={40} className="w-full">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md glass-panel text-xs uppercase tracking-widest text-purple-300 mb-6 lg:mb-8 border border-purple-500/30"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                  Status: Available for hire
                </motion.div>
              </CardItem>

              <CardItem translateZ={60} className="w-full overflow-visible">
                <VaishnaviTextEffect className="h-16 md:h-20 lg:h-24 w-[110%] -ml-[5%] text-purple-400 mb-2" />
              </CardItem>

              <CardItem translateZ={50} className="w-full mb-6 text-left">
                <p className="text-lg md:text-xl text-gray-300 font-light tracking-wide uppercase">
                  Full Stack Engineer & <span className="text-indigo-400 font-medium">GenAI Specialist</span>
                </p>
              </CardItem>

              <CardItem translateZ={30} className="w-full">
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-6 lg:mb-8">
                  <MapPin className="w-4 h-4 text-purple-400" />
                  Coimbatore, Tamil Nadu, India
                </div>
              </CardItem>
              
              <CardItem translateZ={40} className="w-full">
                <TextRotator words={customPhrases} className="h-20 mb-8 border-l-2 border-purple-500/30 pl-6" />
              </CardItem>

              <CardItem translateZ={50} className="flex flex-col sm:flex-row flex-wrap gap-4 mt-8 w-full">
                <a href="#projects" className="px-10 py-4 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium transition-all duration-300 shadow-xl hover:shadow-purple-500/20 border border-white/10 flex items-center justify-center gap-2 w-full sm:w-auto">
                  View Projects
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a href="#contact" className="px-10 py-4 rounded-lg glass-panel hover:bg-white/5 font-medium transition-all duration-300 border border-white/10 hover:border-purple-500/30 text-gray-300 flex items-center justify-center w-full sm:w-auto">
                  Get in Touch
                </a>
              </CardItem>
            </CardBody>
          </CardContainer>
        </motion.div>

        {/* Right Content - Spline 3D Scene */}
        <motion.div
          className="relative z-30 w-full lg:w-1/2 h-[500px] lg:h-[800px] flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          {/* Expanded container width to stop clipping the hand */}
          <div className="absolute w-[130%] lg:w-[150%] h-[120%] right-[-15%] lg:right-[-35%] top-[-10%] pointer-events-auto">
            <Spline
              scene="/scene.splinecode"
              style={{ width: '100%', height: '100%', border: 'none', background: 'transparent' }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
