import React, { useEffect, useRef } from 'react';

interface TrailParticle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  vx: number;
  vy: number;
  color: string;
}

export const HeartCursorTrail: React.FC<{ enabled: boolean }> = ({ enabled }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles: TrailParticle[] = [];
    const colors = ['#F4A6B8', '#E2728D', '#D4AF37', '#FFCCD5'];

    const spawn = (x: number, y: number, spread = 1.5) => {
      particles.push({
        x,
        y,
        size: Math.random() * 8 + 8,
        opacity: 0.9,
        vx: (Math.random() - 0.5) * spread,
        vy: -Math.random() * 1.5 - 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
      });

      if (particles.length > 35) {
        particles.shift();
      }
    };

    let lastTime = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastTime < 35) return; // throttle particle creation
      lastTime = now;
      spawn(e.clientX, e.clientY);
    };

    // Touch screens: hearts follow the finger, and a tap bursts a few hearts
    const handleTouchMove = (e: TouchEvent) => {
      const now = performance.now();
      if (now - lastTime < 45) return;
      lastTime = now;
      const t = e.touches[0];
      if (t) spawn(t.clientX, t.clientY);
    };
    const handleTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      for (let i = 0; i < 5; i++) spawn(t.clientX, t.clientY, 3);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });

    function drawHeart(c: CanvasRenderingContext2D, size: number) {
      const s = size / 20;
      c.beginPath();
      c.moveTo(0, -5 * s);
      c.bezierCurveTo(-10 * s, -18 * s, -20 * s, 0, 0, 16 * s);
      c.bezierCurveTo(20 * s, 0, 10 * s, -18 * s, 0, -5 * s);
      c.fill();
    }

    let animId: number;
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.opacity -= 0.022;

        if (p.opacity > 0) {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.globalAlpha = p.opacity;
          ctx.fillStyle = p.color;
          drawHeart(ctx, p.size);
          ctx.restore();
        }
      }

      // Remove dead particles
      for (let i = particles.length - 1; i >= 0; i--) {
        if (particles[i].opacity <= 0) {
          particles.splice(i, 1);
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchStart);
      cancelAnimationFrame(animId);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 transition-opacity duration-300"
      aria-hidden="true"
    />
  );
};
