import { useState, useEffect } from 'react';
import LottieDefault from 'lottie-react';
import bouncingLoaderData from '../../animation/The Bouncing Loader.json';
import VaporizeTextCycle, { Tag } from './vapour-text-effect';

const Lottie = (LottieDefault as any).default || LottieDefault;

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [stage, setStage] = useState<'loading' | 'welcome' | 'fadeOut'>('loading');

  useEffect(() => {
    // Stage 1: Standard loading (2.5s)
    const loadTimer = setTimeout(() => {
      setStage('welcome');
    }, 2500);

    // Stage 2: Welcome animation duration (7s total = 2.5 + 4.5)
    // We give it 4.5s to ensure particles fully dissipate
    const welcomeTimer = setTimeout(() => {
      setStage('fadeOut');
    }, 7000);

    // Final Stage: Hide component (8s total)
    const hideTimer = setTimeout(() => {
      setVisible(false);
    }, 8000);

    return () => {
      clearTimeout(loadTimer);
      clearTimeout(welcomeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0a0a] transition-opacity duration-1000 ${stage === 'fadeOut' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
    >
      {stage === 'loading' ? (
        <div className="flex flex-col items-center justify-center animate-in fade-in duration-700">
          <div className="w-32 h-32">
            <Lottie animationData={bouncingLoaderData} loop={true} />
          </div>
          <p className="mt-6 text-sm text-gray-400 tracking-widest uppercase animate-pulse">
            Loading Portfolio...
          </p>
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center animate-in zoom-in-95 duration-1000">
          <VaporizeTextCycle
            texts={["WELCOME"]}
            font={{
              fontFamily: "Inter, sans-serif",
              fontSize: "120px",
              fontWeight: 900
            }}
            color="rgb(255, 255, 255)"
            spread={2}
            density={10}
            animation={{
              vaporizeDuration: 3.5,
              fadeInDuration: 0.5,
              waitDuration: 0.1
            }}
            direction="left-to-right"
            alignment="center"
            tag={Tag.H1}
          />
        </div>
      )}
    </div>
  );
}
