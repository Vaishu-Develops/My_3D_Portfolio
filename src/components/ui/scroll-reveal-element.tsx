'use client';

import {
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { motion } from 'framer-motion';

/** Allowed reveal directions. */
export type RevealDirection = 'left' | 'right' | 'top' | 'bottom';

/** Props for the {@link ScrollRevealElement} component. */
export interface ScrollRevealElementProps {
  children: ReactNode;
  /**
   * Direction the element slides in from.
   * On mobile (< 768 px) all directions default to `'bottom'`.
   * @default 'bottom'
   */
  direction?: RevealDirection;
  /**
   * Extra delay expressed in scroll-progress units (0 – 1).
   * @default 0
   */
  delay?: number;
  /**
   * Distance in pixels the element is offset before it enters.
   * On mobile this is clamped to 50 px for smoother performance.
   * @default 100
   */
  distance?: number;
  /** Additional CSS classes applied to the wrapper. */
  className?: string;
  /**
   * When `true` the animation fires only once, then the element
   * stays fully visible.
   * @default true
   */
  once?: boolean;
}

/**
 * ScrollRevealElement — Animates any child element into view from a
 * specified direction as the user scrolls.
 *
 * Uses spring physics for a natural, elastic motion.
 *
 * @example
 * ```tsx
 * <ScrollRevealElement direction="left" delay={0.05}>
 *   <h2>Hello</h2>
 * </ScrollRevealElement>
 * ```
 */
export function ScrollRevealElement({
  children,
  direction = 'bottom',
  delay = 0,
  distance = 100,
  className = '',
  once = true,
}: ScrollRevealElementProps) {
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile width
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Resolved values (mobile overrides)
  const resolvedDirection: RevealDirection = isMobile ? 'bottom' : direction;
  const resolvedDistance = isMobile ? 50 : distance;

  const { initialStyle, animateStyle } = useMemo(() => {
    const isHorizontal = resolvedDirection === 'left' || resolvedDirection === 'right';
    const sign = resolvedDirection === 'right' || resolvedDirection === 'bottom' ? 1 : -1;
    const initialOffset = sign * resolvedDistance;

    if (isHorizontal) {
      return {
        initialStyle: { x: initialOffset, y: 0, opacity: 0 },
        animateStyle: { x: 0, y: 0, opacity: 1 }
      };
    }

    return {
      initialStyle: { x: 0, y: initialOffset, opacity: 0 },
      animateStyle: { x: 0, y: 0, opacity: 1 }
    };
  }, [resolvedDirection, resolvedDistance]);

  return (
    <motion.div
      className={className}
      initial={initialStyle}
      whileInView={animateStyle}
      viewport={{ once, amount: 0.3 }}
      transition={{
        delay,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }}
    >
      {children}
    </motion.div>
  );
}

export default ScrollRevealElement;
