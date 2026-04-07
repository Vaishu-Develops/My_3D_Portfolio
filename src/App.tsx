import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import Background3D from './components/3d/Background3D';
import Navbar from './components/layout/Navbar';
import HeroSection from './components/layout/HeroSection';
import AboutSection from './components/layout/AboutSection';
import ExperienceSection from './components/layout/ExperienceSection';
import SkillsSection from './components/layout/SkillsSection';
import ProjectsSection from './components/layout/ProjectsSection';
import GallerySection from './components/layout/GallerySection';
import EducationSection from './components/layout/EducationSection';
import ContactSection from './components/layout/ContactSection';
import LoadingScreen from './components/ui/LoadingScreen';
import ScrollStack, { ScrollStackItem } from './components/ui/ScrollStack';

function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden text-white">
      {/* Loading Screen */}
      <LoadingScreen />
      
      {/* Fixed R3F 3D Background */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <Background3D />
          <Stars radius={100} depth={50} count={1500} factor={4} saturation={0} fade speed={1} />
        </Canvas>
      </div>

      {/* Navigation */}
      <Navbar />

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

        <ScrollStackItem>
          <ContactSection />
        </ScrollStackItem>
      </ScrollStack>
    </div>
  );
}

export default App;
