import { useEffect, useRef } from 'react';

const COLORS = ['#9FD89C', '#FEE188', '#FFD1BD', '#B7E3FF'];
const PARTICLE_COUNT = 30;
const CROSS_COUNT = 6;

function rand(min, max) {
  return min + Math.random() * (max - min);
}

function makeParticle(w, h) {
  return {
    x: rand(0, w),
    y: rand(0, h),
    r: rand(1.5, 4),
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    opacity: rand(0.3, 0.5),
    speed: rand(0.4, 1.2),
  };
}

function makeCross(w, h) {
  return {
    x: rand(0, w),
    y: rand(0, h),
    arm: 4,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    opacity: rand(0.15, 0.35),
    speed: rand(0.15, 0.5),
  };
}

export default function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let rafId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const w = () => canvas.width;
    const h = () => canvas.height;

    const dots  = Array.from({ length: PARTICLE_COUNT }, () => makeParticle(w(), h()));
    const cross = Array.from({ length: CROSS_COUNT },    () => makeCross(w(), h()));

    const tick = () => {
      ctx.clearRect(0, 0, w(), h());

      for (const p of dots) {
        p.y -= p.speed;
        if (p.y < -p.r) { p.y = h() + p.r; p.x = rand(0, w()); }
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      for (const c of cross) {
        c.y -= c.speed;
        if (c.y < -10) { c.y = h() + 10; c.x = rand(0, w()); }
        ctx.globalAlpha = c.opacity;
        ctx.strokeStyle = c.color;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(c.x - c.arm, c.y);
        ctx.lineTo(c.x + c.arm, c.y);
        ctx.moveTo(c.x, c.y - c.arm);
        ctx.lineTo(c.x, c.y + c.arm);
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    const onResize = () => resize();
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
