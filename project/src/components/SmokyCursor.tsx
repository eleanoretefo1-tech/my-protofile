import React, { useEffect, useRef } from 'react';

type SmokeParticle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  lifeMs: number;
  maxLifeMs: number;
  hue: number;
  size: number;
  alpha: number;
};

const SmokyCursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const particlesRef = useRef<SmokeParticle[]>([]);
  const mouseRef = useRef<{ x: number; y: number; active: boolean; lastEmit: number }>({ x: 0, y: 0, active: false, lastEmit: 0 });
  const dprRef = useRef<number>(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setSize = () => {
      const dpr = window.devicePixelRatio || 1;
      dprRef.current = dpr;
      const { clientWidth, clientHeight } = canvas;
      canvas.width = Math.floor(clientWidth * dpr);
      canvas.height = Math.floor(clientHeight * dpr);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    setSize();
    const onResize = () => setSize();
    window.addEventListener('resize', onResize);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };
    const onLeave = () => {
      mouseRef.current.active = false;
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);

    const now = () => performance.now();

    const emitParticles = (t: number) => {
      const emitIntervalMs = 14;
      if (!mouseRef.current.active) return;
      if (t - mouseRef.current.lastEmit < emitIntervalMs) return;
      mouseRef.current.lastEmit = t;

      const baseCount = 3;
      for (let i = 0; i < baseCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.4 + Math.random() * 0.8;
        const hue = 150 + Math.random() * 210;
        const maxLifeMs = 900 + Math.random() * 900;
        const size = 8 + Math.random() * 16;
        particlesRef.current.push({
          x: mouseRef.current.x,
          y: mouseRef.current.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.2,
          lifeMs: 0,
          maxLifeMs,
          hue,
          size,
          alpha: 0.6 + Math.random() * 0.35,
        });
      }
    };

    const step = () => {
      const t = now();
      emitParticles(t);

      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = 'rgba(17,24,39,0.06)';
      ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

      ctx.globalCompositeOperation = 'lighter';
      const particles = particlesRef.current;

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.lifeMs += 16;
        const lifeRatio = Math.min(1, p.lifeMs / p.maxLifeMs);
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.98;
        p.vy = p.vy * 0.985 - 0.005;

        const fade = 1 - lifeRatio;
        const alpha = Math.max(0, p.alpha * fade * 0.9);
        const size = p.size * (0.6 + 0.4 * fade);

        ctx.filter = 'blur(12px)';
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size);
        gradient.addColorStop(0, `hsla(${p.hue}, 80%, 60%, ${alpha})`);
        gradient.addColorStop(1, `hsla(${p.hue}, 80%, 60%, 0)`);
        ctx.fillStyle = gradient as unknown as string;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fill();
        ctx.filter = 'none';

        if (lifeRatio >= 1) {
          particles.splice(i, 1);
        }
      }

      animationIdRef.current = requestAnimationFrame(step);
    };

    animationIdRef.current = requestAnimationFrame(step);

    return () => {
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

export default SmokyCursor;

