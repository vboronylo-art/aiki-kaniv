import React, { useEffect, useRef } from 'react';

interface DustMoteCanvasProps {
  isPlaying: boolean;
  playbackSpeed: number;
  intensity?: number;
}

interface Particle {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  baseAlpha: number;
  vx: number;
  vy: number;
  pulsePhase: number;
}

export const DustMoteCanvas: React.FC<DustMoteCanvasProps> = ({
  isPlaying,
  playbackSpeed,
  intensity = 1.0,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const count = Math.floor(55 * intensity);
    const particles: Particle[] = [];

    const resize = () => {
      if (!canvas) return;
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    // Initialize particles
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2.2 + 0.6,
        baseAlpha: Math.random() * 0.45 + 0.15,
        alpha: 0.3,
        vx: (Math.random() - 0.5) * 0.25,
        vy: -Math.random() * 0.35 - 0.1, // gently rising like warm air
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    let lastTime = performance.now();

    const render = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const effectiveSpeed = isPlaying ? playbackSpeed : 0.05;

      particles.forEach((p) => {
        p.pulsePhase += dt * 1.5;
        p.alpha = p.baseAlpha + Math.sin(p.pulsePhase) * 0.15;

        // Move particles according to slow-motion speed
        p.x += p.vx * (effectiveSpeed * 60) * dt;
        p.y += p.vy * (effectiveSpeed * 60) * dt;

        // Wrap around boundaries
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.y > canvas.height + 10) p.y = -10;

        // Draw warm golden mote
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 2);
        gradient.addColorStop(0, `rgba(247, 214, 153, ${Math.max(0, p.alpha * 1.2)})`);
        gradient.addColorStop(0.5, `rgba(224, 168, 92, ${Math.max(0, p.alpha * 0.6)})`);
        gradient.addColorStop(1, 'rgba(180, 115, 38, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 2, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPlaying, playbackSpeed, intensity]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none mix-blend-screen z-10"
      style={{ opacity: 0.85 }}
    />
  );
};
