import { useState } from 'react';
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
  const [activeCard, setActiveCard] = useState<string | null>(null);

  const toggleCard = (card: string) => {
    setActiveCard(prev => prev === card ? null : card);
  };

  return (
    <section id="education" className="w-full relative z-10 py-24">
      {/* Section Heading */}
      <div className="px-4 sm:px-8 md:px-16 pb-12">
        <ScrollRevealHeading
          text="Education &"
          highlightText="Certifications"
          gradient="from-[#F7EF8A] to-[#E0AA3E]"
          subtitle="My academic journey and professional credentials."
        />
      </div>

      {/* ─── Two-column layout: left LayeredText, right cards ─── */}
      <div className="flex flex-col md:flex-row justify-between px-4 sm:px-8 md:px-16 items-center">

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

        {/* RIGHT column: skewed glassmorphic cards (DESKTOP ONLY) */}
        <div className="hidden md:block w-full md:w-[50%] space-y-10 mt-12 md:mt-0">

          {/* ── Education Card ─────────────────────────── */}
          <ScrollRevealElement direction="right">
            <div className="edu-card edu-card-education">
              <div className="edu-card-inner">
                <TrafficDots />
                <div className="flex items-center gap-3">
                  <GraduationCap className="w-6 h-6 text-[#E0AA3E] flex-shrink-0" />
                  <h3 className="edu-card-title">Education</h3>
                </div>
                <div className="edu-card-body">
                  <div className="mt-3 space-y-1">
                    <p className="text-white font-semibold text-base">PPG Institute of Technology</p>
                    <p className="text-[#EDC967] text-sm font-medium">B.E. Computer Science & Engineering</p>
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
                  <Award className="w-6 h-6 text-[#D2AC47] flex-shrink-0" />
                  <h3 className="edu-card-title">Certifications</h3>
                </div>
                <div className="edu-card-body">
                  <div className="mt-3 space-y-2">
                    {certifications.map((cert) => (
                      <div
                        key={cert}
                        className="flex items-center gap-2.5"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-[#E0AA3E] flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ScrollRevealElement>

        </div>

        {/* MOBILE ONLY VIEW: 3D Book Cards */}
        <div className="flex md:hidden flex-col items-center gap-16 mt-16 w-full">
          
          {/* ── Education Book Card ─────────────────────────── */}
          <ScrollRevealElement direction="right">
            <div className="mobile-book-wrapper">
              <div 
                className={`mobile-book ${activeCard === 'education' ? 'active' : ''}`}
                onClick={() => toggleCard('education')}
              >
                {/* Inside page content (Base) */}
                <div className="flex flex-col items-start justify-start text-left p-5 w-full h-full overflow-y-auto">
                  <span className="text-[#EDC967] text-[10px] font-mono uppercase tracking-wider mb-2">Academic Journey</span>
                  <h4 className="text-white font-bold text-sm leading-snug mb-1 whitespace-normal">
                    PPG Institute of Technology
                  </h4>
                  <p className="text-[#EDC967] text-xs font-semibold mb-2 whitespace-normal">
                    B.E. Computer Science & Engineering
                  </p>
                  <p className="text-gray-400 text-[10px] font-mono mb-4">
                    2022 — 2026
                  </p>
                  <div className="w-full border-t border-white/10 my-2" />
                  <p className="text-[#EDC967] text-[10px] font-semibold uppercase tracking-wide mb-1">Location</p>
                  <p className="text-gray-300 text-xs mb-4">Coimbatore, Tamil Nadu</p>
                  <p className="text-gray-400 text-[10px] leading-relaxed italic whitespace-normal mt-auto">
                    "Every dataset is a puzzle waiting to be solved."
                  </p>
                </div>
                
                {/* Front page content (Cover) */}
                <div className="mobile-book-cover flex flex-col items-center justify-center text-center">
                  <GraduationCap className="w-8 h-8 text-[#E0AA3E] mb-2" />
                  <h3 className="mobile-book-title">Education</h3>
                  <span className="text-[9px] text-gray-500 uppercase tracking-widest mt-4 animate-pulse">Tap to open</span>
                </div>
              </div>
            </div>
          </ScrollRevealElement>

          {/* ── Certifications Book Card ────────────────────── */}
          <ScrollRevealElement direction="right" delay={0.05}>
            <div className="mobile-book-wrapper">
              <div 
                className={`mobile-book ${activeCard === 'certifications' ? 'active' : ''}`}
                onClick={() => toggleCard('certifications')}
              >
                {/* Inside page content (Base) */}
                <div className="flex flex-col items-start justify-start text-left p-5 w-full h-full overflow-y-auto">
                  <span className="text-[#EDC967] text-[10px] font-mono uppercase tracking-wider mb-3">Credentials</span>
                  <div className="space-y-2.5 w-full">
                    {certifications.map((cert) => (
                      <div key={cert} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#E0AA3E] mt-1 flex-shrink-0" />
                        <p className="text-gray-300 text-[11px] leading-snug whitespace-normal">{cert}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Front page content (Cover) */}
                <div className="mobile-book-cover flex flex-col items-center justify-center text-center">
                  <Award className="w-8 h-8 text-[#D2AC47] mb-2" />
                  <h3 className="mobile-book-title">Certifications</h3>
                  <span className="text-[9px] text-gray-500 uppercase tracking-widest mt-4 animate-pulse">Tap to open</span>
                </div>
              </div>
            </div>
          </ScrollRevealElement>

        </div>

      </div>
    </section>
  );
}
