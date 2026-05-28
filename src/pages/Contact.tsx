import { useState } from 'react';
import RetroGrid from '../components/ui/retro-grid';
import { WaveAnimation } from '../components/ui/wave-animation';
import { Palette, X, Settings2, Activity, Grid } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Contact.css';

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

export default function Contact() {
  const [gridColor, setGridColor] = useState("#ff00ff");
  const [backgroundType, setBackgroundType] = useState<'retro' | 'wave'>('wave');
  const [showScanlines, setShowScanlines] = useState(true);
  const [glowEffect, setGlowEffect] = useState(true);
  const [isControlsOpen, setIsControlsOpen] = useState(false);

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="relative w-full h-screen overflow-hidden bg-black font-sans"
    >
      {/* Background Selection */}
      <AnimatePresence mode="wait">
        {backgroundType === 'retro' ? (
          <motion.div
            key="retro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 w-full h-full"
          >
            <RetroGrid
              gridColor={gridColor}
              showScanlines={showScanlines}
              glowEffect={glowEffect}
              className="w-full h-full"
            />
          </motion.div>
        ) : (
          <motion.div
            key="wave"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 w-full h-full"
          >
            <WaveAnimation 
              pointSize={2}
              waveSpeed={2}
              waveIntensity={15}
              particleColor={gridColor}
              gridDistance={4}
              className="w-full h-full"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Social Icons */}
      <motion.div
        className="social-icons-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* ===== LinkedIn ===== */}
        <div className="tooltip-container">
          <div className="tooltip">
            <div className="profile">
              <div className="user">
                <div className="img li-img">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 448 512" fill="#0077b5">
                    <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
                  </svg>
                </div>
                <div className="details">
                  <div className="name">Vaishnavi</div>
                  <div className="about">@vaishnavi • LinkedIn</div>
                </div>
              </div>
            </div>
          </div>
          <a href="https://www.linkedin.com/in/vaishnavi-s-pro/" target="_blank" rel="noreferrer" className="icon linkedin">
            <div className="layer">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" fill="#0077b5">
                  <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
                </svg>
              </span>
            </div>
            <span className="text">LinkedIn</span>
          </a>
        </div>

        {/* ===== GitHub ===== */}
        <div className="tooltip-container">
          <div className="tooltip">
            <div className="profile">
              <div className="user">
                <div className="img gh-img">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 496 512" fill="#24292e">
                    <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
                  </svg>
                </div>
                <div className="details">
                  <div className="name">Vaishnavi</div>
                  <div className="about">@vaishnavi • GitHub</div>
                </div>
              </div>
            </div>
          </div>
          <a href="https://github.com/Vaishu-Develops" target="_blank" rel="noreferrer" className="icon github">
            <div className="layer">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 496 512" fill="#c9c9c9">
                  <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
                </svg>
              </span>
            </div>
            <span className="text">GitHub</span>
          </a>
        </div>

        {/* ===== Email ===== */}
        <div className="tooltip-container">
          <div className="tooltip">
            <div className="profile">
              <div className="user">
                <div className="img em-img">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 512 512" fill="#ea4335">
                    <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
                  </svg>
                </div>
                <div className="details">
                  <div className="name">Vaishnavi</div>
                  <div className="about">vaishnavisudarsanam11@gmail.com</div>
                </div>
              </div>
            </div>
          </div>
          <a href="mailto:[vaishnavisudarsanam11@gmail.com]" target="_blank" rel="noreferrer" className="icon email">
            <div className="layer">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" fill="#ea4335">
                  <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
                </svg>
              </span>
            </div>
            <span className="text">Email</span>
          </a>
        </div>

        {/* ===== Instagram ===== */}
        <div className="tooltip-container">
          <div className="tooltip">
            <div className="profile">
              <div className="user">
                <div className="img ig-img">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 448 512" fill="url(#ig-tooltip-grad)">
                    <defs>
                      <linearGradient id="ig-tooltip-grad" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#f09433" />
                        <stop offset="25%" stopColor="#e6683c" />
                        <stop offset="50%" stopColor="#dc2743" />
                        <stop offset="75%" stopColor="#cc2366" />
                        <stop offset="100%" stopColor="#bc1888" />
                      </linearGradient>
                    </defs>
                    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                  </svg>
                </div>
                <div className="details">
                  <div className="name">Vaishnavi</div>
                  <div className="about">@vaishnavi • Instagram</div>
                </div>
              </div>
            </div>
          </div>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="icon instagram">
            <div className="layer">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span className="instagramSVG">
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" fill="url(#ig-grad)">
                  <defs>
                    <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#f09433" />
                      <stop offset="25%" stopColor="#e6683c" />
                      <stop offset="50%" stopColor="#dc2743" />
                      <stop offset="75%" stopColor="#cc2366" />
                      <stop offset="100%" stopColor="#bc1888" />
                    </linearGradient>
                  </defs>
                  <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                </svg>
              </span>
            </div>
            <span className="text">Instagram</span>
          </a>
        </div>
      </motion.div>

      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsControlsOpen(!isControlsOpen)}
        className="fixed bottom-8 right-8 z-50 p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-2xl hover:bg-white/20 transition-colors"
      >
        {isControlsOpen ? <X size={24} /> : <Palette size={24} />}
      </motion.button>

      {/* Retro Controls Panel */}
      <AnimatePresence>
        {isControlsOpen && (
          <motion.div
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.9 }}
            className="fixed bottom-24 right-8 z-40 w-72 bg-black/80 backdrop-blur-xl p-6 rounded-2xl border border-white/20 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
          >
            <div className="flex items-center gap-2 mb-6">
              <Settings2 size={18} className="text-white/70" />
              <h2 className="text-white font-bold text-sm tracking-widest uppercase">
                Retro Interface
              </h2>
            </div>

            <div className="space-y-6">
              {/* Background Selection */}
              <div>
                <label className="text-white/50 text-[10px] font-bold uppercase tracking-widest block mb-3">
                  Environment Engine
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setBackgroundType('retro')}
                    className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg border transition-all ${
                      backgroundType === 'retro' 
                        ? "bg-white/20 border-white text-white shadow-[0_0_15px_rgba(255,255,255,0.2)]" 
                        : "bg-transparent border-white/10 text-white/40 hover:border-white/30 hover:text-white/60"
                    }`}
                  >
                    <Grid size={14} />
                    <span className="text-[10px] font-bold uppercase">Retro Grid</span>
                  </button>
                  <button
                    onClick={() => setBackgroundType('wave')}
                    className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg border transition-all ${
                      backgroundType === 'wave' 
                        ? "bg-white/20 border-white text-white shadow-[0_0_15px_rgba(255,255,255,0.2)]" 
                        : "bg-transparent border-white/10 text-white/40 hover:border-white/30 hover:text-white/60"
                    }`}
                  >
                    <Activity size={14} />
                    <span className="text-[10px] font-bold uppercase">Wave Motion</span>
                  </button>
                </div>
              </div>

              {/* Color Selection */}
              <div>
                <label className="text-white/50 text-[10px] font-bold uppercase tracking-widest block mb-3">
                  Grid Frequency
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {["#ff00ff", "#00ffff", "#ff0066", "#00ff00", "#ffff00", "#ff6600", "#7c3aed", "#ffffff"].map(
                    (color) => (
                      <button
                        key={color}
                        onClick={() => setGridColor(color)}
                        className={`w-full aspect-square rounded-lg border-2 transition-all ${gridColor === color ? "border-white scale-110 shadow-[0_0_15px_rgba(255,255,255,0.3)]" : "border-transparent opacity-50 hover:opacity-100"
                          }`}
                        style={{ backgroundColor: color }}
                      />
                    )
                  )}
                </div>
              </div>

              {/* Toggles */}
              <div className="space-y-3">
                <label className="flex items-center justify-between group cursor-pointer">
                  <span className="text-white/70 text-xs font-medium group-hover:text-white transition-colors">CRT Scanlines</span>
                  <input
                    type="checkbox"
                    checked={showScanlines}
                    onChange={(e) => setShowScanlines(e.target.checked)}
                    className="w-4 h-4 accent-white rounded-none cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between group cursor-pointer">
                  <span className="text-white/70 text-xs font-medium group-hover:text-white transition-colors">Neon Glow</span>
                  <input
                    type="checkbox"
                    checked={glowEffect}
                    onChange={(e) => setGlowEffect(e.target.checked)}
                    className="w-4 h-4 accent-white rounded-none cursor-pointer"
                  />
                </label>
              </div>

              <div className="pt-4 border-t border-white/10 text-center">
                <p className="text-[10px] text-white/30 font-mono italic">
                  Vaporwave Protocol v1.0.4
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
