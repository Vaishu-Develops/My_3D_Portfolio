// @ts-nocheck
import { useLayoutEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';

export const ScrollStackItem = ({ children, itemClassName = '' }: { children: React.ReactNode; itemClassName?: string }) => (
  <div className={`relative w-full mb-12 rounded-[40px] shadow-[0_0_30px_rgba(0,0,0,0.1)] box-border ${itemClassName}`.trim()}>
    {children}
  </div>
);

const ScrollStack = ({ children, className = '', useWindowScroll = true }: { children: React.ReactNode; className?: string; useWindowScroll?: boolean; }) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lenisRef = useRef<any>(null);

  const setupLenis = useCallback(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
      infinite: false,
      lerp: 0.1,
      syncTouch: true,
      syncTouchLerp: 0.075
    });

    const raf = (time: number) => {
      lenis.raf(time);
      animationFrameRef.current = requestAnimationFrame(raf);
    };
    animationFrameRef.current = requestAnimationFrame(raf);
    lenisRef.current = lenis;
  }, []);

  useLayoutEffect(() => {
    setupLenis();

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (lenisRef.current) lenisRef.current.destroy();
    };
  }, [setupLenis]);

  return (
    <div className={`relative w-full ${className}`.trim()} ref={scrollerRef}>
      <div className="w-full mx-auto pb-32">
        {children}
      </div>
    </div>
  );
};

export default ScrollStack;
