'use client';

import { useRef, useEffect, useState, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/** Props for the {@link MagneticButton} component. */
export interface MagneticButtonProps {
  /** The element(s) to wrap with the magnetic effect. */
  children: ReactNode;
  /**
   * How strongly the element follows the cursor (0–1).
   * @default 0.3
   */
  strength?: number;
  /**
   * Pixel radius within which the magnetic pull activates.
   * @default 100
   */
  radius?: number;
  /** Additional CSS classes applied to the wrapper. */
  className?: string;
}

/**
 * MagneticButton — Wraps any child element so it magnetically
 * attracts toward the user's cursor on hover.
 *
 * On **touch devices** the magnetic effect is disabled and replaced
 * with a subtle scale-down press animation (`active:scale-95`).
 *
 * @example
 * ```tsx
 * <MagneticButton strength={0.4} radius={120}>
 *   <button className="px-6 py-3">Click me</button>
 * </MagneticButton>
 * ```
 */
export function MagneticButton({
  children,
  strength = 0.3,
  radius = 100,
  className = '',
}: MagneticButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // Default false: show magnetic effect immediately on desktop, disable only after detecting touch
  const [isTouchDevice, setIsTouchDevice] = useState(
    typeof window !== 'undefined' ? window.matchMedia('(hover: none)').matches : false
  );

  useEffect(() => {
    const mq = window.matchMedia('(hover: none)');
    setIsTouchDevice(mq.matches);

    const handler = (e: MediaQueryListEvent) => setIsTouchDevice(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // --- Motion values for smooth magnetic pull ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15, mass: 0.6 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    if (isTouchDevice) return;

    const handleGlobalMouseMove = (e: MouseEvent) => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      // Center coordinates of the actual button
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const dist = Math.sqrt(distX * distX + distY * distY);

      if (dist < radius) {
        x.set(distX * strength);
        y.set(distY * strength);
      } else if (x.get() !== 0 || y.get() !== 0) {
        // Only trigger update if values are currently non-zero
        x.set(0);
        y.set(0);
      }
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
    };
  }, [isTouchDevice, radius, strength, x, y]);

  // --- Touch-device fallback: simple scale press ---
  if (isTouchDevice) {
    return (
      <div
        className={`inline-block transition-transform active:scale-95 ${className}`}
      >
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={containerRef}
      className={className}
      style={{ x: springX, y: springY }}
    >
      {children}
    </motion.div>
  );
}

export default MagneticButton;
