import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface ParallaxLayerProps {
  children: React.ReactNode;
  speed?: number; // negative moves up, positive moves down
  className?: string;
}

export default function ParallaxLayer({ children, speed = -0.15, className = '' }: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Track scroll relative to this element's viewport intersection
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Calculate translation distance
  // Typically, speed * 200px provides a subtle, premium parallax effect
  const yRange = useTransform(scrollYProgress, [0, 1], [150 * speed, -150 * speed]);
  
  // Smooth spring physics to prevent scroll jank
  const y = useSpring(yRange, {
    stiffness: 80,
    damping: 18,
    restDelta: 0.001
  });

  // Disable on devices with prefers-reduced-motion active
  const isReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <div ref={ref} className={`relative overflow-visible ${className}`}>
      <motion.div style={{ y: isReduced ? 0 : y }} className="w-full h-full">
        {children}
      </motion.div>
    </div>
  );
}
