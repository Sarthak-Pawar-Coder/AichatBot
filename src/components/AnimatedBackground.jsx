import React, { useRef, useEffect } from 'react';

export default function AnimatedBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    let mists = [];
    let ripples = [];

    const init = () => {
      const w = canvas.width;
      const h = canvas.height;
      const lakeY = h * 0.58;

      // Realistic, slow drifting atmospheric mist across mountain base and lake
      mists = Array.from({ length: 3 }).map(() => ({
        x: Math.random() * w,
        y: lakeY - 30 + Math.random() * 45,
        width: w * 0.7 + Math.random() * (w * 0.4),
        height: 50 + Math.random() * 40,
        speed: 0.04 + Math.random() * 0.06,
        alpha: 0.025 + Math.random() * 0.02,
      }));

      // Subtle water perspective ripples on lake
      ripples = [
        { x: w * 0.48, y: lakeY + h * 0.16, maxR: 135, speed: 0.28, currentR: 0 },
        { x: w * 0.48, y: lakeY + h * 0.16, maxR: 135, speed: 0.28, currentR: 45 },
        { x: w * 0.48, y: lakeY + h * 0.16, maxR: 135, speed: 0.28, currentR: 90 },
      ];
    };

    const render = () => {
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      // 1. Gentle Mountain & Lake Mist
      mists.forEach((m) => {
        m.x += m.speed;
        if (m.x - m.width > w) m.x = -m.width;
        
        ctx.save();
        ctx.translate(m.x, m.y);
        ctx.scale(m.width / m.height, 1);
        ctx.beginPath();
        ctx.arc(0, 0, m.height, 0, Math.PI * 2);
        
        const mistGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, m.height);
        mistGrad.addColorStop(0, `rgba(255, 248, 235, ${m.alpha})`);
        mistGrad.addColorStop(1, 'rgba(255, 248, 235, 0)');
        ctx.fillStyle = mistGrad;
        ctx.fill();
        ctx.restore();
      });

      // 2. Realistic Water Perspective Ripples
      ripples.forEach((r) => {
        r.currentR += r.speed;
        if (r.currentR > r.maxR) {
          r.currentR = 0;
        }

        const progress = r.currentR / r.maxR;
        const currentAlpha = (1 - progress) * 0.18;

        ctx.save();
        ctx.translate(r.x, r.y);
        ctx.scale(2.6, 0.38); // Perspective perspective on lake surface
        ctx.beginPath();
        ctx.arc(0, 0, r.currentR, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 245, 220, ${currentAlpha})`;
        ctx.lineWidth = 1.0;
        ctx.stroke();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full min-h-[100dvh] overflow-hidden pointer-events-none select-none bg-black">
      {/* Pristine Full-Screen Mountain-and-Lake Landscape with Smooth Continuous Cinematic Camera Motion */}
      <img
        src="/background.jpg"
        alt="Cinematic Mountain and Lake Landscape"
        className="absolute inset-0 w-full h-full object-cover object-center animate-cinematic-landscape will-change-transform"
      />

      {/* Atmospheric Mist and Water Ripples Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
    </div>
  );
}
