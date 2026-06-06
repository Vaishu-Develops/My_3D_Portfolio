import { motion } from 'framer-motion';
import CSSStars from '../components/ui/CSSStars';
// import AtmosphereLayer from '../components/ui/AtmosphereLayer';
import HeroSection from '../components/layout/HeroSection';
import AboutSection from '../components/layout/AboutSection';
import ExperienceSection from '../components/layout/ExperienceSection';
import SkillsSection from '../components/layout/SkillsSection';
import ProjectsSection from '../components/layout/ProjectsSection';
import GallerySection from '../components/layout/GallerySection';
import EducationSection from '../components/layout/EducationSection';
import ScrollStack, { ScrollStackItem } from '../components/ui/ScrollStack';


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

export default function Home() {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full min-h-screen"
      style={{ position: 'relative' }}
    >
      {/* Pure-CSS starfield background */}
      <CSSStars />

      {/* Atmospheric Background glow layers synced with scroll (Disabled for solid deep black) */}
      {/* <AtmosphereLayer /> */}

      {/* Main Content with ScrollStack smooth scroll */}
      <ScrollStack useWindowScroll={true}>
        <ScrollStackItem>
          <HeroSection />
        </ScrollStackItem>

        <ScrollStackItem>
          <AboutSection />
        </ScrollStackItem>

        <ScrollStackItem>
          <ExperienceSection />
        </ScrollStackItem>

        <ScrollStackItem>
          <SkillsSection />
        </ScrollStackItem>

        <ScrollStackItem>
          <ProjectsSection />
        </ScrollStackItem>

        <ScrollStackItem>
          <GallerySection />
        </ScrollStackItem>

        <ScrollStackItem>
          <EducationSection />
        </ScrollStackItem>
      </ScrollStack>
    </motion.div>
  );
}
