import { GraduationCap, Award } from 'lucide-react';
import { LayeredText } from '../ui/layered-text';
import { ScrollRevealHeading } from '../ui/text-scroll-animation';
import { ScrollRevealElement } from '../ui/scroll-reveal-element';
import './EducationCards.css';

const certifications = [
  'Intro to AI & GenAI — Infosys',
  'AI Fundamentals — IBM',
  'Web Development — Zaalima',
  'Introduction to Data Science — Infosys',
  'Introduction to Natural Language Processing — Infosys',
  'Introduction to Deep Learning — Infosys',
  'Generative Models for Developers — Infosys',
];

/* ── macOS-style traffic-light dots ─────────────────── */
const TrafficDots = () => (
  <div className="edu-dots">
    <span className="edu-dot edu-dot-red" />
    <span className="edu-dot edu-dot-yellow" />
    <span className="edu-dot edu-dot-green" />
  </div>
);

export default function EducationSection() {
  return (
    <section id="education" className="w-full relative z-10 py-24">
      {/* Section Heading */}
      <div className="px-8 md:px-16 pb-12">
        <ScrollRevealHeading
          text="Education &"
          highlightText="Certifications"
          gradient="from-teal-400 to-cyan-500"
          subtitle="My academic journey and professional credentials."
        />
      </div>

      {/* ─── Two-column layout: left LayeredText, right cards ─── */}
      <div className="flex flex-col md:flex-row justify-between px-8 md:px-16 items-center">

        {/* LEFT column: LayeredText animation */}
        <div className="w-full md:w-[45%] flex justify-center md:justify-start">
          <ScrollRevealElement direction="left">
            <LayeredText 
              fontSize="60px"
              fontSizeMd="30px"
              lineHeight={50}
              lineHeightMd={30}
            />
          </ScrollRevealElement>
        </div>

        {/* RIGHT column: skewed glassmorphic cards */}
        <div className="w-full md:w-[50%] space-y-10 mt-12 md:mt-0">

          {/* ── Education Card ─────────────────────────── */}
          <ScrollRevealElement direction="right">
            <div className="edu-card edu-card-education">
              <div className="edu-card-inner">
                <TrafficDots />
                <div className="flex items-center gap-3">
                  <GraduationCap className="w-6 h-6 text-teal-400 flex-shrink-0" />
                  <h3 className="edu-card-title">Education</h3>
                </div>
                <div className="edu-card-body">
                  <div className="mt-3 space-y-1">
                    <p className="text-white font-semibold text-base">PPG Institute of Technology</p>
                    <p className="text-teal-300 text-sm font-medium">B.E. Computer Science & Engineering</p>
                    <p className="text-gray-400 text-xs">2022 — 2026 • Coimbatore, Tamil Nadu</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollRevealElement>

          {/* ── Certifications Card ────────────────────── */}
          <ScrollRevealElement direction="right" delay={0.05}>
            <div className="edu-card edu-card-cert">
              <div className="edu-card-inner">
                <TrafficDots />
                <div className="flex items-center gap-3">
                  <Award className="w-6 h-6 text-purple-400 flex-shrink-0" />
                  <h3 className="edu-card-title">Certifications</h3>
                </div>
                <div className="edu-card-body">
                  <div className="mt-3 space-y-2">
                    {certifications.map((cert) => (
                      <div
                        key={cert}
                        className="flex items-center gap-2.5"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ScrollRevealElement>

        </div>
      </div>
    </section>
  );
}
