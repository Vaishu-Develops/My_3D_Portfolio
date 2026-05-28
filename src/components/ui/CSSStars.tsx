import { useMemo } from 'react';

/**
 * Pure-CSS starfield background.
 * Renders three layers of tiny dots using box-shadow — no WebGL, no canvas, zero GPU contexts.
 * Each layer scrolls upward at a different speed for a subtle parallax effect.
 */
export default function CSSStars() {
  // Generate random star positions as box-shadows
  const [layer1, layer2, layer3] = useMemo(() => {
    const makeShadows = (count: number) => {
      const shadows: string[] = [];
      for (let i = 0; i < count; i++) {
        const x = Math.floor(Math.random() * 2560);
        const y = Math.floor(Math.random() * 2560);
        shadows.push(`${x}px ${y}px #fff`);
      }
      return shadows.join(', ');
    };
    return [makeShadows(700), makeShadows(200), makeShadows(80)];
  }, []);

  return (
    <>
      {/* Tiny stars — slow drift */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          width: 1,
          height: 1,
          boxShadow: layer1,
          animation: 'starScroll 150s linear infinite',
          borderRadius: '50%',
          background: 'transparent',
        }}
      />
      {/* Medium stars — medium drift */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          width: 2,
          height: 2,
          boxShadow: layer2,
          animation: 'starScroll 100s linear infinite',
          borderRadius: '50%',
          background: 'transparent',
        }}
      />
      {/* Large stars — fast drift */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          width: 3,
          height: 3,
          boxShadow: layer3,
          animation: 'starScroll 60s linear infinite',
          borderRadius: '50%',
          background: 'transparent',
        }}
      />
    </>
  );
}
