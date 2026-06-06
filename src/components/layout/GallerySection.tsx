import { useRef, useState, useEffect } from 'react';
import { useInView } from 'framer-motion';
import StellarCardGallerySingle from '../ui/3d-image-gallery';
import { ScrollRevealHeading } from '../ui/text-scroll-animation';
import { ScrollRevealElement } from '../ui/scroll-reveal-element';

export default function GallerySection() {
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
    <section ref={sectionRef} id="gallery" className="py-24 w-full flex flex-col gap-12 relative z-10">
      <div className="text-center">
        <ScrollRevealHeading
          text="Project"
          highlightText="Gallery"
          gradient="from-[#EDC967] to-[#AE8625]"
          subtitle="Interactive 3D exploration of my work."
          align="center"
        />
      </div>

      <ScrollRevealElement direction="bottom" className="w-full flex-grow mx-auto px-4 lg:px-8">
        {!webglAvailable ? (
          <div className="w-full h-[400px] relative overflow-hidden rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#E0AA3E]/20 to-[#AE8625]/20 blur-xl absolute" style={{ filter: 'blur(40px)' }} />
            <p className="text-gray-300 text-sm font-bold mt-2 relative z-10 uppercase tracking-wider">3D Gallery Preview Unavailable</p>
            <p className="text-gray-500 text-xs mt-2 max-w-xs relative z-10 leading-relaxed">
              WebGL is disabled/blocked in your browser. To show the 3D gallery, enable Hardware Acceleration in Chrome Settings (chrome://settings/system) and relaunch your browser.
            </p>
          </div>
        ) : isInView ? (
          <StellarCardGallerySingle />
        ) : (
          <div className="w-full h-[600px] md:h-[800px] relative overflow-hidden rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md flex items-center justify-center">
            <div className="w-8 h-8 rounded-full border-2 border-[#E0AA3E] border-t-transparent animate-spin" />
          </div>
        )}
      </ScrollRevealElement>
    </section>
  );
}
