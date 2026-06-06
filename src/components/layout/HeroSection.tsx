import React, { Suspense, useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import LottieDefault from 'lottie-react';
import portalData from '../../animation/Portal time.json';
import { CardContainer, CardBody, CardItem } from '../ui/3d-card';
import { VaishnaviTextEffect } from '../ui/text-effect';

import { MagneticButton } from '../ui/MagneticButton';

const Lottie = (LottieDefault as any).default || LottieDefault;

// Lazy load the heavy Spline component to reduce memory spikes on initial load
const Spline = React.lazy(() => import('@splinetool/react-spline'));

// Simple ErrorBoundary to handle Spline WebGL load crashes gracefully
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.warn('Spline loading error (likely WebGL context failure):', error);
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}
export default function HeroSection() {
  const [isMobile, setIsMobile] = useState(false);
  const [webglAvailable, setWebglAvailable] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: '200px', once: true });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    try {
      const canvas = document.createElement('canvas');
      const available = !!(
        window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
      );
      setWebglAvailable(available);
    } catch (e) {
      setWebglAvailable(false);
    }

    return () => window.removeEventListener('resize', checkMobile);
  }, []);


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
            <CardBody className="p-8 md:p-12 md:px-16 relative group w-full h-auto">
              {/* Unshape (Blob) Design Backgrounds */}
              <div className="blob-card-outline" style={{ transform: "translateZ(-15px)" }} />
              <div className="blob-card-bg" style={{ transform: "translateZ(-10px)" }} />
              
              {/* Optional hover gradient effect constrained to the blob */}
              <div className="absolute inset-[-20px] bg-gradient-to-br from-[#E0AA3E]/20 via-transparent to-[#AE8625]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blob-shape-clip" style={{ transform: "translateZ(-9px)", borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" }} />
              <CardItem translateZ={20} className="absolute -top-10 -right-10 w-40 h-40 opacity-30 pointer-events-none hidden md:block">
                <Lottie animationData={portalData} loop={true} />
              </CardItem>

              <CardItem translateZ={40} className="w-full">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md glass-panel text-xs uppercase tracking-widest text-[#EDC967] mb-6 lg:mb-8 border border-[#E0AA3E]/30"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#E0AA3E] animate-pulse" />
                  Status: Available for hire
                </motion.div>
              </CardItem>

              <CardItem translateZ={60} className="w-full overflow-visible">
                <VaishnaviTextEffect className="h-16 md:h-20 lg:h-24 w-[110%] -ml-[5%] text-purple-400 mb-2" />
              </CardItem>

              <CardItem translateZ={50} className="w-full mb-6 text-left">
                <p className="text-lg md:text-xl text-gray-300 font-light tracking-wide uppercase">
                  Full Stack Engineer & <span className="text-[#EDC967] font-medium">GenAI Specialist</span>
                </p>
              </CardItem>

              <CardItem translateZ={30} className="w-full">
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-6 lg:mb-8">
                  <MapPin className="w-4 h-4 text-[#EDC967]" />
                  Coimbatore, Tamil Nadu, India
                </div>
              </CardItem>

              <CardItem translateZ={50} className="flex flex-col sm:flex-row flex-wrap gap-4 mt-8 w-full">
                <MagneticButton className="w-full sm:w-auto">
                  <a 
                    href="#projects" 
                    className={`px-10 py-4 rounded-lg bg-gradient-to-r from-[#AE8625] to-[#D2AC47] hover:from-[#D2AC47] hover:to-[#E0AA3E] text-white font-medium transition-all duration-300 shadow-xl hover:shadow-[#E0AA3E]/20 border border-white/10 flex items-center justify-center gap-2 w-full sm:w-auto ${isMobile ? 'animate-pulse-glow' : ''}`}
                  >
                    View Projects
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </MagneticButton>
                <MagneticButton className="w-full sm:w-auto">
                  <Link to="/contact" className="px-10 py-4 rounded-lg glass-panel hover:bg-white/5 font-medium transition-all duration-300 border border-white/10 hover:border-[#E0AA3E]/30 text-gray-300 flex items-center justify-center w-full sm:w-auto">
                    Get in Touch
                  </Link>
                </MagneticButton>
              </CardItem>
            </CardBody>
          </CardContainer>
        </motion.div>

        {/* Right Content - Spline 3D Scene */}
        <motion.div
          ref={containerRef}
          className="relative z-30 w-full lg:w-1/2 h-[280px] sm:h-[420px] lg:h-[800px] flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          {/* Expanded container width to stop clipping the hand */}
          <div className="absolute w-[110%] sm:w-[130%] lg:w-[150%] h-[110%] sm:h-[120%] left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:right-[-35%] top-[-5%] lg:top-[-10%] pointer-events-auto">
            {!webglAvailable ? (
              <div className="absolute inset-0 lg:right-[35%] flex flex-col items-center justify-center text-center p-4">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#E0AA3E]/20 to-[#AE8625]/20 blur-xl absolute animate-pulse" style={{ filter: 'blur(40px)' }} />
                <p className="text-gray-300 text-sm font-bold mt-2 relative z-10 uppercase tracking-wider">3D Robot Preview Unavailable</p>
                <p className="text-gray-500 text-xs mt-2 max-w-xs relative z-10 leading-relaxed">
                  WebGL is disabled/blocked in your browser. To show the 3D models, enable Hardware Acceleration in Chrome Settings (chrome://settings/system) and relaunch your browser.
                </p>
              </div>
            ) : (
              <Suspense fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full border-2 border-[#E0AA3E] border-t-transparent animate-spin" />
                </div>
              }>
                <ErrorBoundary fallback={
                  <div className="absolute inset-0 lg:right-[35%] flex flex-col items-center justify-center text-center p-4">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#E0AA3E]/20 to-[#AE8625]/20 blur-xl absolute animate-pulse" style={{ filter: 'blur(40px)' }} />
                    <p className="text-gray-300 text-sm font-bold mt-2 relative z-10 uppercase tracking-wider">3D Robot Preview Unavailable</p>
                    <p className="text-gray-500 text-xs mt-2 max-w-xs relative z-10 leading-relaxed">
                      WebGL is disabled/blocked in your browser. To show the 3D models, enable Hardware Acceleration in Chrome Settings (chrome://settings/system) and relaunch your browser.
                    </p>
                  </div>
                }>
                  {isInView ? (
                    <Spline
                      scene="/scene.splinecode"
                      style={{ width: '100%', height: '100%', border: 'none', background: 'transparent' }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full border-2 border-[#E0AA3E] border-t-transparent animate-spin" />
                    </div>
                  )}
                </ErrorBoundary>
              </Suspense>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
