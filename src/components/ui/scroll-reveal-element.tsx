'use client';

import {
  useRef,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from 'framer-motion';

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
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

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

  // Scroll tracking — trigger earlier so animation is more visible
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 95%', 'start 30%'],
  });

  // Clamp ranges to [0, 1]
  const clamp = (v: number) => Math.min(1, Math.max(0, v));
  const tStart = clamp(0 + delay);
  const tEnd = clamp(0.6 + delay);

  // Build initial offset based on direction
  const isHorizontal = resolvedDirection === 'left' || resolvedDirection === 'right';
  // 'left' means element comes from the left (starts at negative x)
  // 'right' means element comes from the right (starts at positive x)
  const sign = resolvedDirection === 'right' || resolvedDirection === 'bottom' ? 1 : -1;
  const initialOffset = sign * resolvedDistance;

  // Transform scroll progress → visual properties
  const translateRaw = useTransform(
    scrollYProgress,
    [tStart, tEnd],
    [initialOffset, 0],
    { clamp: true }
  );
  const opacityRaw = useTransform(
    scrollYProgress,
    [tStart, clamp(tStart + 0.4)],
    [0, 1],
    { clamp: true }
  );

  // Apply spring physics for elastic, natural feel
  const translateSpring = useSpring(translateRaw, {
    stiffness: 80,
    damping: 20,
    mass: 0.8,
  });
  const opacitySpring = useSpring(opacityRaw, {
    stiffness: 120,
    damping: 30,
  });

  // Freeze after first reveal when `once` is true
  useMotionValueEvent(opacityRaw, 'change', (latest) => {
    if (once && latest >= 0.99 && !hasAnimated) {
      setHasAnimated(true);
    }
  });

  const motionStyle = isHorizontal
    ? {
        x: hasAnimated ? 0 : translateSpring,
        y: 0,
        opacity: hasAnimated ? 1 : opacitySpring,
      }
    : {
        x: 0,
        y: hasAnimated ? 0 : translateSpring,
        opacity: hasAnimated ? 1 : opacitySpring,
      };

  return (
    <motion.div
      ref={containerRef}
      className={className}
      style={motionStyle}
    >
      {children}
    </motion.div>
  );
}

export default ScrollRevealElement;
