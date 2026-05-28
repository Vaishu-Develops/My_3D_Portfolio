'use client';

import { useEffect, useState } from 'react';

/**
 * FilmGrain — A fixed-position overlay that adds a subtle cinematic
 * film grain / noise texture across the entire viewport.
 *
 * Uses a base64 encoded inline SVG background image with CSS keyframe translation.
 *
 * - **z-index 9999** — renders above all content but never blocks interaction.
 * - **Disabled on touch / mobile devices** to save GPU cycles.
 */
export function FilmGrain() {
  const [isTouchDevice, setIsTouchDevice] = useState(
    typeof window !== 'undefined' ? window.matchMedia('(hover: none)').matches : true
  );

  useEffect(() => {
    const mq = window.matchMedia('(hover: none)');
    setIsTouchDevice(mq.matches);

    const handler = (e: MediaQueryListEvent) => setIsTouchDevice(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Keyframe animation for moving background texture */}
      <style>{`
        @keyframes filmGrainShift {
          0%   { background-position: 0px 0px; }
          10%  { background-position: -5px 10px; }
          20%  { background-position: 15px -5px; }
          30%  { background-position: -10px -15px; }
          40%  { background-position: 15px 5px; }
          50%  { background-position: -5px 10px; }
          60%  { background-position: -15px 5px; }
          75%  { background-position: 5px -10px; }
          90%  { background-position: -10px 15px; }
          100% { background-position: 0px 0px; }
        }
      `}</style>

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0"
        style={{
          zIndex: 9999,
          opacity: 0.045,
          mixBlendMode: 'overlay',
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          animation: 'filmGrainShift 0.4s steps(6) infinite',
          willChange: 'background-position',
        }}
      />
    </>
  );
}

export default FilmGrain;
