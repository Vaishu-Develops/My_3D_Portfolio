'use client';

import { useScroll, useTransform, motion } from 'framer-motion';

interface GradientLayer {
  id: string;
  gradient: string;
  input: number[];
  output: number[];
}

/** 
 * Strong, cinematic atmospheric layers for each portfolio section.
 * Multiple overlapping layers per section create rich depth.
 */
const LAYERS: GradientLayer[] = [
  // ── HERO (baseline warm amber space) ──
  {
    id: 'hero-base',
    gradient:
      'radial-gradient(ellipse 90% 60% at 50% 30%, rgba(174,134,37,0.50) 0%, rgba(140,110,30,0.30) 60%, transparent 100%)',
    input: [0, 0.08, 0.15],
    output: [1, 1, 0],
  },

  // ── ABOUT — warm gold coastal glow ──
  {
    id: 'about-glow',
    gradient:
      'radial-gradient(ellipse 80% 80% at 30% 50%, rgba(224,170,62,0.45) 0%, rgba(210,172,71,0.20) 50%, transparent 100%)',
    input: [0.08, 0.15, 0.22, 0.28],
    output: [0, 0.9, 0.9, 0],
  },
  {
    id: 'about-accent',
    gradient:
      'radial-gradient(ellipse 60% 60% at 70% 40%, rgba(210,172,71,0.35) 0%, transparent 80%)',
    input: [0.10, 0.18, 0.24, 0.28],
    output: [0, 0.7, 0.7, 0],
  },

  // ── EXPERIENCE — deep gold nebula ──
  {
    id: 'experience-primary',
    gradient:
      'radial-gradient(ellipse 100% 70% at 50% 60%, rgba(210,172,71,0.55) 0%, rgba(224,170,62,0.30) 45%, transparent 100%)',
    input: [0.25, 0.30, 0.38, 0.43],
    output: [0, 0.85, 0.85, 0],
  },
  {
    id: 'experience-side',
    gradient:
      'radial-gradient(ellipse 50% 80% at 10% 50%, rgba(224,170,62,0.30) 0%, transparent 70%)',
    input: [0.27, 0.33, 0.40, 0.43],
    output: [0, 0.6, 0.6, 0],
  },

  // ── SKILLS — warm gold wormhole ──
  {
    id: 'skills-core',
    gradient:
      'radial-gradient(ellipse 70% 90% at 50% 50%, rgba(237,201,103,0.60) 0%, rgba(174,134,37,0.25) 50%, transparent 100%)',
    input: [0.40, 0.45, 0.53, 0.58],
    output: [0, 0.90, 0.90, 0],
  },
  {
    id: 'skills-edge',
    gradient:
      'radial-gradient(ellipse 60% 40% at 80% 30%, rgba(174,134,37,0.30) 0%, transparent 70%)',
    input: [0.42, 0.47, 0.55, 0.58],
    output: [0, 0.60, 0.60, 0],
  },

  // ── PROJECTS — classic gold ocean ──
  {
    id: 'projects-primary',
    gradient:
      'radial-gradient(ellipse 85% 75% at 50% 45%, rgba(224,170,62,0.30) 0%, rgba(210,172,71,0.15) 50%, transparent 100%)',
    input: [0.55, 0.60, 0.68, 0.73],
    output: [0, 0.95, 0.95, 0],
  },
  {
    id: 'projects-top',
    gradient:
      'radial-gradient(ellipse 80% 40% at 50% 0%, rgba(210,172,71,0.15) 0%, transparent 80%)',
    input: [0.57, 0.63, 0.70, 0.73],
    output: [0, 0.65, 0.65, 0],
  },

  // ── GALLERY — amber cinematic ──
  {
    id: 'gallery-main',
    gradient:
      'radial-gradient(ellipse 90% 80% at 50% 50%, rgba(174,134,37,0.55) 0%, rgba(210,172,71,0.25) 55%, transparent 100%)',
    input: [0.70, 0.75, 0.82, 0.87],
    output: [0, 0.85, 0.85, 0],
  },
  {
    id: 'gallery-haze',
    gradient:
      'radial-gradient(ellipse 50% 70% at 80% 50%, rgba(210,172,71,0.30) 0%, transparent 70%)',
    input: [0.72, 0.78, 0.84, 0.87],
    output: [0, 0.60, 0.60, 0],
  },

  // ── EDUCATION — bright gold dawn ──
  {
    id: 'education-glow',
    gradient:
      'radial-gradient(ellipse 80% 80% at 50% 50%, rgba(247,239,138,0.50) 0%, rgba(224,170,62,0.20) 50%, transparent 100%)',
    input: [0.85, 0.90, 0.97, 1.0],
    output: [0, 0.90, 0.90, 0.80],
  },
  {
    id: 'education-sun',
    gradient:
      'radial-gradient(ellipse 60% 40% at 50% 80%, rgba(224,170,62,0.25) 0%, transparent 70%)',
    input: [0.87, 0.92, 0.98, 1.0],
    output: [0, 0.70, 0.70, 0.70],
  },
];

function GradientPane({
  layer,
  scrollYProgress,
}: {
  layer: GradientLayer;
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
}) {
  const opacity = useTransform(scrollYProgress, layer.input, layer.output, { clamp: true });
  
  // Create a drift effect (parallax travel) as the user scrolls
  const y = useTransform(
    scrollYProgress,
    [layer.input[0], layer.input[layer.input.length - 1]],
    [100, -100],
    { clamp: true }
  );

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: '-120px',
        bottom: '-120px',
        left: '-50px',
        right: '-50px',
        background: layer.gradient,
        opacity,
        y,
        willChange: 'opacity, transform',
      }}
    />
  );
}

/**
 * AtmosphereLayer — Cinematic scroll-linked color atmosphere.
 * Each portfolio section has a strong, distinct color identity.
 */
export function AtmosphereLayer() {
  const { scrollYProgress } = useScroll();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0"
      style={{ zIndex: -20 }}
    >
      {/* Permanent dark deep-space base */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 100% 100% at 50% 50%, #0a0a18 0%, #000005 100%)',
        }}
      />

      {/* Scroll-driven color layers */}
      {LAYERS.map((layer) => (
        <GradientPane
          key={layer.id}
          layer={layer}
          scrollYProgress={scrollYProgress}
        />
      ))}

      {/* Permanent edge vignette for depth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 85% 85% at 50% 50%, transparent 55%, rgba(0,0,0,0.85) 100%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}

export default AtmosphereLayer;
