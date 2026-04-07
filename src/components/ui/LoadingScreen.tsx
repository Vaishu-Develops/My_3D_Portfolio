import { useState, useEffect } from 'react';
import LottieDefault from 'lottie-react';
import bouncingLoaderData from '../../animation/The Bouncing Loader.json';

const Lottie = (LottieDefault as any).default || LottieDefault;

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFadeOut(true), 2500);
    const hideTimer = setTimeout(() => setVisible(false), 3200);
    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0a0a] transition-opacity duration-700 ${fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
    >
      <div className="w-32 h-32">
        <Lottie animationData={bouncingLoaderData} loop={true} />
      </div>
      <p className="mt-6 text-sm text-gray-400 tracking-widest uppercase animate-pulse">Loading Portfolio...</p>
    </div>
  );
}
