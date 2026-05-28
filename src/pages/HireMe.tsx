import { motion } from 'framer-motion';
import LightRays from '../components/ui/LightRays';
import { SneakText } from '../components/ui/sneak';
import Lanyard from '../components/ui/Lanyard';

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: -10,
    transition: {
      duration: 0.3,
      ease: [0.7, 0, 0.84, 0] as const,
    },
  },
};

export default function HireMe() {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full min-h-screen relative"
    >
      {/* 3D Lanyard Card Overlay */}
      <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />

      {/* Isolated LightRays background for Hire Me Page */}
      <div className="fixed inset-0 -z-10 bg-slate-950">
        <LightRays
          raysOrigin="top-center"
          raysColor="#4fd1c5" // Teal tint to match portfolio theme
          raysSpeed={1.5}
          lightSpread={0.5}
          rayLength={3}
          followMouse={true}
          mouseInfluence={0.15}
          noiseAmount={0.02}
          distortion={0}
          className="custom-rays"
          pulsating={true}
          fadeDistance={1}
          saturation={1}
        />
      </div>

      <div className="min-h-screen pt-20 flex flex-col items-center justify-end relative z-10 w-full overflow-hidden">
        {/* Sneak text taking up the primary view space, acting as the 'floor' */}
        <div className="w-full h-[80vh] cursor-none relative pointer-events-none">
          <SneakText text="HIRE ME" />
        </div>
      </div>
    </motion.div>
  );
}
