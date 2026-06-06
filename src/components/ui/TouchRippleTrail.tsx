import { useEffect, useRef } from 'react';

interface Ripple {
  id: number;
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
  color: string;
}

export default function TouchRippleTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ripplesRef = useRef<Ripple[]>([]);
  const nextIdRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle resize
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Color choices matching the new palette
    const colors = [
      'rgba(223, 190, 139, ', // Champagne Gold
      'rgba(143, 92, 100, ', // Dusty Rose
      'rgba(154, 188, 171, ', // Light Sage
    ];

    const addRipple = (x: number, y: number) => {
      const isMobile = window.innerWidth < 768;
      const maxRadius = isMobile ? 40 : 60;
      const color = colors[Math.floor(Math.random() * colors.length)];

      ripplesRef.current.push({
        id: nextIdRef.current++,
        x,
        y,
        radius: 0,
        maxRadius,
        opacity: 0.6,
        color,
      });

      // Start loop if not running
      if (animationFrameRef.current === null) {
        loop();
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      // Respect user choices regarding motion
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      addRipple(e.clientX, e.clientY);
    };

    window.addEventListener('pointerdown', handlePointerDown);

    const loop = () => {
      if (!canvas || !ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const activeRipples = ripplesRef.current;
      if (activeRipples.length === 0) {
        animationFrameRef.current = null;
        return;
      }

      for (let i = activeRipples.length - 1; i >= 0; i--) {
        const ripple = activeRipples[i];

        // Animate
        ripple.radius += (ripple.maxRadius - ripple.radius) * 0.15;
        ripple.opacity -= 0.035;

        if (ripple.opacity <= 0 || ripple.radius >= ripple.maxRadius - 1) {
          activeRipples.splice(i, 1);
          continue;
        }

        // Draw outer ring
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `${ripple.color}${ripple.opacity})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw inner glow
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `${ripple.color}${ripple.opacity * 0.25})`;
        ctx.fill();
      }

      animationFrameRef.current = requestAnimationFrame(loop);
    };

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('pointerdown', handlePointerDown);
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999] w-full h-full"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
