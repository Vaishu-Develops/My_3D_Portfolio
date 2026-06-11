import { motion } from 'framer-motion';
import LogoLoop from '../ui/LogoLoop';
import Macbook from '../ui/animated-3d-mac-book-air';
import { ScrollRevealHeading } from '../ui/text-scroll-animation';
import { Component as HalideTopoHero } from '../ui/halide-topo-hero';
import {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs,
  SiPython, SiTensorflow, SiMongodb, SiExpress, SiVite,
  SiSocketdotio, SiGit, SiFigma, SiPytorch, SiDocker, SiFastapi
} from 'react-icons/si';

export default function AboutSection() {

  return (
    <section
      id="about"
      className="w-full relative z-10 py-16 md:py-24 overflow-hidden"
      style={{ background: '#0a0a0a' }}
    >
      {/* ── Section Heading ── */}
      <div className="mb-10 md:mb-16 px-4 sm:px-6 md:px-8 lg:px-16">
        <ScrollRevealHeading
          text="About"
          highlightText="Me"
          gradient="from-[#F7EF8A] to-[#AE8625]"
        />
      </div>

      {/* ── 3D Parallax Canvas (Halide Topo Hero Layout) ── */}
      <div className="relative px-4 sm:px-6 md:px-8 lg:px-16">
        <HalideTopoHero />
      </div>

      {/* ── Macbook 3D Model ── */}
      <div
        className="relative w-full flex items-center justify-center md:justify-end mt-12 md:mt-16 px-4 sm:px-6 md:px-8 lg:px-24"
        style={{ height: '200px' }}
      >
        <Macbook
          style={{
            transform: 'translateY(-80px) scale(1.3)',
            transformOrigin: 'center center',
          }}
        />
      </div>

      {/* ── Tech Stack Logo Loop ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="w-full mt-8 md:mt-12"
      >
        <div className="px-4 sm:px-6 md:px-8 lg:px-16 mb-3">
          <span className="text-xs uppercase tracking-[0.2em] text-gray-500 font-medium font-mono">
            Tech Stack
          </span>
        </div>
        <div
          className="w-full overflow-hidden"
          style={{
            borderTop: '1px solid rgba(255,255,255,0.04)',
            borderBottom: '1px solid rgba(255,255,255,0.04)',
            background: 'rgba(255,255,255,0.01)',
          }}
        >
          <div style={{ height: '80px', position: 'relative' }} className="flex items-center w-full">
            <LogoLoop
              logos={[
                { node: <SiPython size={38} className="text-[#3776AB] mx-4" />, title: "Python", href: "#" },
                { node: <SiPytorch size={38} className="text-[#EE4C2C] mx-4" />, title: "PyTorch", href: "#" },
                { node: <SiTensorflow size={38} className="text-[#FF6F00] mx-4" />, title: "TensorFlow", href: "#" },
                { node: <SiReact size={38} className="text-[#61DAFB] mx-4" />, title: "React", href: "#" },
                { node: <SiNextdotjs size={38} className="text-white mx-4" />, title: "Next.js", href: "#" },
                { node: <SiTypescript size={38} className="text-[#3178C6] mx-4" />, title: "TypeScript", href: "#" },
                { node: <SiTailwindcss size={38} className="text-[#06B6D4] mx-4" />, title: "Tailwind", href: "#" },
                { node: <SiNodedotjs size={38} className="text-[#339933] mx-4" />, title: "Node.js", href: "#" },
                { node: <SiFastapi size={38} className="text-[#009688] mx-4" />, title: "FastAPI", href: "#" },
                { node: <SiMongodb size={38} className="text-[#47A248] mx-4" />, title: "MongoDB", href: "#" },
                { node: <SiDocker size={38} className="text-[#2496ED] mx-4" />, title: "Docker", href: "#" },
                { node: <SiExpress size={38} className="text-white mx-4" />, title: "Express", href: "#" },
                { node: <SiVite size={38} className="text-[#646CFF] mx-4" />, title: "Vite", href: "#" },
                { node: <SiSocketdotio size={38} className="text-white mx-4" />, title: "Socket.IO", href: "#" },
                { node: <SiGit size={38} className="text-[#F05032] mx-4" />, title: "Git", href: "#" },
                { node: <SiFigma size={38} className="text-[#F24E1E] mx-4" />, title: "Figma", href: "#" },
              ]}
              speed={80}
              gap={24}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
