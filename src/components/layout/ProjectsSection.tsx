import React from 'react';
import GeometricBlurMesh from '../ui/geometric-blur-mesh';

const projects = [
  { title: 'SarpGuard', tag: 'AI Security', desc: 'AI-powered dual-layer security system for real-time snake detection and classification via uploaded video or live webcam.', link: 'https://github.com/Vaishu-Develops/SarpGuard', color: '#0f172a', rotation: 'rotate-1' },
  { title: 'PCB Defect Detection', tag: 'Deep Learning', desc: 'End-to-end deep learning system using EfficientNet-B0 achieving 96% accuracy across 6 PCB defect types.', link: 'https://github.com/Vaishu-Develops/PCB-Defect-Detection-and-Classification-System', color: '#1e1b4b', rotation: '-rotate-2' },
  { title: 'Multi-Agent Stock Analyzer', tag: 'AI / Finance', desc: 'Multi-Agent AI Financial Analyst powered by Llama 4 Maverick via SambaNova for global stock analysis.', link: 'https://github.com/Vaishu-Develops/Multi-Agent-Stock-Analyzer', color: '#172554', rotation: 'rotate-2' },
  { title: 'SyncSpace', tag: 'MERN + Real-time', desc: 'All-in-one collaboration hub with Kanban boards, real-time doc editing, project chat, and file versioning.', link: 'https://github.com/Vaishu-Develops/SyncSpace', color: '#09090b', rotation: '-rotate-1' },
  { title: 'GigConnect', tag: 'MERN', desc: 'Hyperlocal freelance marketplace connecting clients with nearby freelancers — gig posting, search, real-time chat.', link: 'https://github.com/Vaishu-Develops/GigConnect', color: '#1a1a2e', rotation: 'rotate-3' },
  { title: 'Deep Secure Steganography', tag: 'AI + Crypto', desc: 'Full-stack steganography app combining Deep Learning and AES Cryptography to securely hide images and text.', link: 'https://github.com/Vaishu-Develops/AI_Powered_Deep_Secure_Steganography_Generator', color: '#0d0d1a', rotation: '-rotate-3' },
  { title: 'Hospital SOC Dashboard', tag: 'React + AI', desc: 'Interactive dashboards and AI-powered data querying systems for hospital Schedule of Charges management.', link: 'https://github.com/Vaishu-Develops/Payer_Side', color: '#111827', rotation: 'rotate-1' },
  { title: 'Audio Recognition Tool', tag: 'GenAI', desc: 'AI-driven app that transcribes audio and searches subtitles using semantic similarity — like Shazam for speech.', link: 'https://github.com/Vaishu-Develops/Audio-To-Text-Conversion', color: '#161d2f', rotation: '-rotate-1' },
  { title: 'Gen-AI Code Reviewer', tag: 'GenAI', desc: 'AI-powered code review tool that analyzes quality, finds bugs, and suggests improvements using LLMs.', link: 'https://github.com/Vaishu-Develops/Gen-AI-Code-reviewer', color: '#1a1f2c', rotation: 'rotate-1' },
  { title: 'AI Travel Planner', tag: 'AI', desc: 'AI-powered travel itinerary generator that creates personalized travel plans based on user preferences.', link: 'https://github.com/Vaishu-Develops/AI-Powered-Travel_Planner', color: '#1b1b2e', rotation: '-rotate-2' },
  { title: 'RentMate', tag: 'Full-Stack', desc: 'Full-stack rental platform for finding and listing rental properties with search and filtering capabilities.', link: 'https://github.com/Vaishu-Develops/RentMate', color: '#0f172a', rotation: 'rotate-2' },
  { title: 'MentalHealth Chatbot', tag: 'AI', desc: 'A supportive AI companion for mental well-being with healing poetry and empathetic responses.', link: 'https://github.com/Vaishu-Develops/MentalHealth-Chatbot', color: '#172554', rotation: '-rotate-1' },
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
      {/* ─── Stacking cards area ─── */}
      <div className="flex justify-between px-8 md:px-16">

        {/* LEFT column: grid of sticky figures — EXACT same pattern as reference */}
        <div className="grid gap-2">
          {projects.map((card, i) => (
            <figure key={i} className="sticky top-0 h-screen grid place-content-center">
              <article
                className={`h-80 w-[30rem] rounded-2xl ${card.rotation} p-6 grid place-content-center gap-4 border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.6)]`}
                style={{ backgroundColor: card.color }}
              >
                <div>
                  <span className="text-teal-400/60 text-[10px] uppercase tracking-[0.25em] font-bold block mb-2">
                    {card.tag}
                  </span>
                  <h1 className="text-3xl font-bold text-white leading-tight mb-3">
                    {card.title}
                  </h1>
                  <p className="text-white/65 text-sm leading-relaxed">
                    {card.desc}
                  </p>
                </div>
                <a
                  href={card.link}
                  target="_blank"
                  rel="noreferrer"
                  className="w-fit bg-white text-black font-bold px-5 py-2.5 rounded-full text-sm hover:bg-teal-300 transition-colors"
                >
                  View Project
                </a>
              </article>
            </figure>
          ))}
        </div>

        {/* RIGHT column: sticky 3D mesh — same sticky pattern as reference's right side */}
        <div className="hidden md:grid sticky top-0 h-screen place-content-center w-[45%]">
          <div className="w-full h-[500px] relative" style={{ mixBlendMode: 'screen' }}>
            <GeometricBlurMesh />
          </div>
        </div>

      </div>
    </section>
  );
}
