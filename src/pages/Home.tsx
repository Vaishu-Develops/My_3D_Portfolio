import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import Background3D from '../components/3d/Background3D';
import HeroSection from '../components/layout/HeroSection';
import AboutSection from '../components/layout/AboutSection';
import ExperienceSection from '../components/layout/ExperienceSection';
import SkillsSection from '../components/layout/SkillsSection';
import ProjectsSection from '../components/layout/ProjectsSection';
import GallerySection from '../components/layout/GallerySection';
import EducationSection from '../components/layout/EducationSection';
import ContactSection from '../components/layout/ContactSection';
import ScrollStack, { ScrollStackItem } from '../components/ui/ScrollStack';

export default function Home() {
  return (
    <>
      {/* Fixed R3F 3D Background specifically for Home */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <Background3D />
          <Stars radius={100} depth={50} count={1500} factor={4} saturation={0} fade speed={1} />
        </Canvas>
      </div>

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

        {/* ProjectsSection must NOT be inside ScrollStackItem — sticky positioning
            requires an unconstrained scroll parent with no overflow clipping */}
        <ProjectsSection />

        <ScrollStackItem>
          <GallerySection />
        </ScrollStackItem>

        <ScrollStackItem>
          <EducationSection />
        </ScrollStackItem>

        <ScrollStackItem>
          <ContactSection />
        </ScrollStackItem>
      </ScrollStack>
    </>
  );
}
