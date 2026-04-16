import React from 'react';
import GeometricBlurMesh from '../ui/geometric-blur-mesh';

const projects = [
  { title: 'SarpGuard', tag: 'AI Security', desc: 'AI-powered dual-layer security system for real-time snake detection and classification via uploaded video or live webcam.', link: 'https://github.com/Vaishu-Develops/SarpGuard', color: '#0f172a', rotation: 'rotate-6' },
  { title: 'PCB Defect Detection', tag: 'Deep Learning', desc: 'End-to-end deep learning system using EfficientNet-B0 achieving 96% accuracy across 6 PCB defect types.', link: 'https://github.com/Vaishu-Develops/PCB-Defect-Detection-and-Classification-System', color: '#1e1b4b', rotation: '-rotate-3' },
  { title: 'Multi-Agent Stock Analyzer', tag: 'AI / Finance', desc: 'Multi-Agent AI Financial Analyst powered by Llama 4 Maverick via SambaNova for global stock analysis.', link: 'https://github.com/Vaishu-Develops/Multi-Agent-Stock-Analyzer', color: '#172554', rotation: 'rotate-0' },
  { title: 'SyncSpace', tag: 'MERN + Real-time', desc: 'All-in-one collaboration hub with Kanban boards, real-time doc editing, project chat, and file versioning.', link: 'https://github.com/Vaishu-Develops/SyncSpace', color: '#09090b', rotation: '-rotate-6' },
  { title: 'GigConnect', tag: 'MERN', desc: 'Hyperlocal freelance marketplace connecting clients with nearby freelancers — gig posting, search, real-time chat.', link: 'https://github.com/Vaishu-Develops/GigConnect', color: '#1a1a2e', rotation: 'rotate-3' },
  { title: 'Deep Secure Steganography', tag: 'AI + Crypto', desc: 'Full-stack steganography app combining Deep Learning and AES Cryptography to securely hide images and text.', link: 'https://github.com/Vaishu-Develops/AI_Powered_Deep_Secure_Steganography_Generator', color: '#0d0d1a', rotation: '-rotate-6' },
  { title: 'Hospital SOC Dashboard', tag: 'React + AI', desc: 'Interactive dashboards and AI-powered data querying systems for hospital Schedule of Charges management.', link: 'https://github.com/Vaishu-Develops/Payer_Side', color: '#111827', rotation: 'rotate-6' },
  { title: 'Audio Recognition Tool', tag: 'GenAI', desc: 'AI-driven app that transcribes audio and searches subtitles using semantic similarity — like Shazam for speech.', link: 'https://github.com/Vaishu-Develops/Audio-To-Text-Conversion', color: '#161d2f', rotation: 'rotate-0' },
  { title: 'Gen-AI Code Reviewer', tag: 'GenAI', desc: 'AI-powered code review tool that analyzes quality, finds bugs, and suggests improvements using LLMs.', link: 'https://github.com/Vaishu-Develops/Gen-AI-Code-reviewer', color: '#1a1f2c', rotation: '-rotate-3' },
  { title: 'AI Travel Planner', tag: 'AI', desc: 'AI-powered travel itinerary generator that creates personalized travel plans based on user preferences.', link: 'https://github.com/Vaishu-Develops/AI-Powered-Travel_Planner', color: '#1b1b2e', rotation: 'rotate-6' },
  { title: 'RentMate', tag: 'Full-Stack', desc: 'Full-stack rental platform for finding and listing rental properties with search and filtering capabilities.', link: 'https://github.com/Vaishu-Develops/RentMate', color: '#0f172a', rotation: '-rotate-6' },
  { title: 'MentalHealth Chatbot', tag: 'AI', desc: 'A supportive AI companion for mental well-being with healing poetry and empathetic responses.', link: 'https://github.com/Vaishu-Develops/MentalHealth-Chatbot', color: '#172554', rotation: 'rotate-0' },
];

/*
  EXACT structure from the reference component:
  
  <section>
    <div className='flex justify-between px-16'>
      <div className='grid gap-2'>
        {cards.map => <figure className='sticky top-0 h-screen grid place-content-center'>}
      </div>
      <div className='sticky top-0 h-screen grid place-content-center'>
        Right side content
      </div>
    </div>
  </section>
*/

export default function ProjectsSection() {
  return (
    <section id="projects" className="text-white w-full">
      {/* Section Heading */}
      <div className="px-8 md:px-16 pt-24 pb-8">
        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">
          Featured{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
            Works
          </span>
        </h2>
      </div>

      {/* ─── Stacking cards area ─── */}
      <div className="flex justify-between px-8 md:px-16">

        {/* LEFT column: grid of sticky figures — EXACT same pattern as reference */}
        <div className="grid gap-2">
          {projects.map((card, i) => (
            <figure key={i} className="sticky top-0 h-screen grid place-content-center">
              <article
                className={`group relative h-[380px] w-full max-w-[32rem] rounded-3xl ${card.rotation} p-8 flex flex-col justify-between overflow-hidden border border-white/10 backdrop-blur-xl shadow-[0_30px_100px_rgba(0,0,0,0.8)] transition-all duration-500 hover:border-white/20`}
                style={{ 
                  background: `linear-gradient(135deg, ${card.color}d9 0%, rgba(5, 5, 10, 0.95) 100%)` 
                }}
              >
                {/* Subtle top inner glow line */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                
                {/* Large Background Number for visual interest */}
                <div className="absolute -right-6 -bottom-6 text-[200px] font-black text-white/[0.04] select-none leading-none z-0 transition-transform duration-500 group-hover:scale-105">
                  {String(i + 1).padStart(2, '0')}
                </div>

                {/* Content */}
                <div className="relative z-10">
                   {/* Tag Pill */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-5">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse shadow-[0_0_8px_rgba(45,212,191,0.8)]" />
                    <span className="text-teal-300 text-[10px] uppercase tracking-[0.2em] font-semibold">
                      {card.tag}
                    </span>
                  </div>
                  
                  <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4 tracking-tight drop-shadow-md">
                    {card.title}
                  </h3>
                  
                  <p className="text-neutral-400 text-sm md:text-base leading-relaxed line-clamp-3 w-[90%]">
                    {card.desc}
                  </p>
                </div>
                
                {/* Bottom Bar: Button & Counter */}
                <div className="relative z-10 flex items-center justify-between mt-auto pt-6 border-t border-white/5">
                  <a
                    href={card.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/10 backdrop-blur-md px-6 py-3 rounded-full text-sm font-medium transition-all group-hover:border-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                  >
                    View Project
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                  
                  <span className="text-white/20 font-mono text-sm tracking-widest hidden md:block">
                    {String(i + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                  </span>
                </div>
              </article>
            </figure>
          ))}
        </div>

        {/* RIGHT column: sticky 3D mesh — same sticky pattern as reference's right side */}
        <div className="hidden md:grid sticky top-0 h-screen place-content-center w-[45%]">
          <div className="w-full h-[500px] relative">
            <GeometricBlurMesh />
          </div>
        </div>

      </div>
    </section>
  );
}
