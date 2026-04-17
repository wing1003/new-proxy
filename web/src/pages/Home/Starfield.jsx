import React, { useRef, useEffect } from 'react';

const STAR_COUNT = 150;

function createStars(width, height) {
  return Array.from({ length: STAR_COUNT }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() * 2 + 1,
    speed: Math.random() * 0.02 + 0.005,
    phase: Math.random() * Math.PI * 2,
  }));
}

export default function Starfield({ theme }) {
  const canvasRef = useRef(null);
  const starsRef = useRef([]);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = canvas.offsetWidth * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
      starsRef.current = createStars(canvas.offsetWidth, canvas.offsetHeight);
    };
    resize();
    window.addEventListener('resize', resize);

    let t = 0;
    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      const isDark = theme === 'dark';

      starsRef.current.forEach((s) => {
        const alpha = 0.3 + 0.7 * ((Math.sin(t * s.speed * 60 + s.phase) + 1) / 2);
        if (isDark) {
          const hue = Math.random() > 0.9 ? 50 : 220;
          ctx.fillStyle = `hsla(${hue}, 80%, 85%, ${alpha})`;
        } else {
          ctx.fillStyle = `rgba(100, 120, 180, ${alpha * 0.35})`;
        }
        // Pixel-perfect: round to integer coords for crisp squares
        const px = Math.round(s.x);
        const py = Math.round(s.y);
        const sz = Math.round(s.size);
        ctx.fillRect(px, py, sz, sz);
      });

      t += 1 / 60;
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        imageRendering: 'pixelated',
      }}
    />
  );
}
