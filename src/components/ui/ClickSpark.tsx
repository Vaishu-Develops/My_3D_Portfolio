import { useRef, useEffect, useCallback } from 'react';

const ClickSpark = ({
  sparkColor = '#fff',
  sparkSize = 10,
  sparkRadius = 15,
  sparkCount = 8,
  duration = 400,
  extraScale = 1.0,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparksRef = useRef<any[]>([]);
  const startTimeRef = useRef<number | null>(null);

  const drawSparks = useCallback(
    (timestamp: number) => {
      if (!canvasRef.current) return;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;

      if (elapsed > duration) {
        sparksRef.current = [];
        startTimeRef.current = null;
        return; // Stop animation
      }

      const progress = elapsed / duration;
      const easeOut = 1 - Math.pow(1 - progress, 3); // Cubic ease out

      sparksRef.current.forEach((spark) => {
        const radius = sparkRadius * extraScale + (sparkRadius * 2 * easeOut);
        const x = spark.x + Math.cos(spark.angle) * radius;
        const y = spark.y + Math.sin(spark.angle) * radius;
        
        ctx.beginPath();
        ctx.arc(x, y, sparkSize * (1 - easeOut), 0, Math.PI * 2);
        ctx.fillStyle = sparkColor;
        ctx.fill();
      });

      requestAnimationFrame(drawSparks);
    },
    [duration, sparkColor, sparkRadius, sparkSize, extraScale]
  );

  const handleClick = useCallback(
    (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const newSparks = Array.from({ length: sparkCount }).map((_, i) => ({
        x,
        y,
        angle: (Math.PI * 2 * i) / sparkCount,
      }));

      sparksRef.current = newSparks;
      startTimeRef.current = null; // Reset start time
      requestAnimationFrame(drawSparks);
    },
    [drawSparks, sparkCount]
  );

  useEffect(() => {
    window.addEventListener('click', handleClick);
    
    // Resize handling
    const handleResize = () => {
      if(canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
    };
  }, [handleClick]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 mix-blend-screen"
      style={{ width: '100vw', height: '100vh' }}
    />
  );
};

export default ClickSpark;
