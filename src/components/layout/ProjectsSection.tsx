import React, { useRef, useState, useEffect } from 'react';
import { useInView } from 'framer-motion';
import { ScrollRevealHeading } from '../ui/text-scroll-animation';
import { ScannerCardStream } from '../ui/scanner-card-stream';

// Simple ErrorBoundary to handle ScannerCardStream WebGL crashes gracefully
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
    console.warn('ScannerCardStream load crash caught:', error);
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { margin: '200px', once: false });
  const [webglAvailable, setWebglAvailable] = useState(true);

  useEffect(() => {
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
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="text-white w-full">
      {/* Section Heading */}
      <div className="px-4 sm:px-8 md:px-16 pt-24 pb-8">
        <ScrollRevealHeading
          text="Featured"
          highlightText="Works"
          gradient="from-[#F7EF8A] to-[#D2AC47]"
        />
      </div>

      {/* Scanner Card Stream */}
      <div className="w-full bg-transparent">
        {!webglAvailable ? (
          <div className="w-full relative overflow-hidden select-none bg-black/10 rounded-2xl border border-white/5 flex flex-col items-center justify-center p-6" style={{ height: 290 }}>
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#E0AA3E]/20 to-[#AE8625]/20 blur-xl absolute" style={{ filter: 'blur(40px)' }} />
            <p className="text-gray-500 text-xs mt-2 relative z-10">Stream visualizer unavailable (WebGL disabled/unsupported)</p>
          </div>
        ) : isInView ? (
          <ErrorBoundary fallback={
            <div className="w-full relative overflow-hidden select-none bg-black/10 rounded-2xl border border-white/5 flex flex-col items-center justify-center p-6" style={{ height: 290 }}>
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#E0AA3E]/20 to-[#AE8625]/20 blur-xl absolute" style={{ filter: 'blur(40px)' }} />
              <p className="text-gray-500 text-xs mt-2 relative z-10">Stream visualizer unavailable (WebGL disabled/unsupported)</p>
            </div>
          }>
            <ScannerCardStream
              initialSpeed={150}
              direction={-1}
              repeat={6}
              cardGap={60}
              friction={0.95}
              scanEffect="scramble"
            />
          </ErrorBoundary>
        ) : (
          <div className="w-full relative overflow-hidden select-none bg-black/10 flex items-center justify-center" style={{ height: 290 }}>
            <div className="w-8 h-8 rounded-full border-2 border-[#E0AA3E] border-t-transparent animate-spin" />
          </div>
        )}
      </div>
    </section>
  );
}
