"use client";

import React, { useEffect, useRef } from "react";

export const AmbientEcoBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize, { passive: true });

    // Floating botanical spores / light motes
    const isMobile = width < 768;
    const particleCount = isMobile ? 18 : 36;

    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * (isMobile ? 2 : 2.8) + 0.8,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: -Math.random() * 0.4 - 0.15,
      opacity: Math.random() * 0.4 + 0.15,
      maxOpacity: Math.random() * 0.45 + 0.25,
      pulseSpeed: Math.random() * 0.02 + 0.008,
      pulseVal: Math.random() * Math.PI * 2,
      color:
        Math.random() > 0.65
          ? "rgba(114, 196, 141, " // Emerald light
          : Math.random() > 0.3
          ? "rgba(228, 168, 83, " // Golden sun
          : "rgba(45, 138, 99, ", // Deep botanical
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.pulseVal += p.pulseSpeed;

        // Current opacity with soft breathing pulse
        const currentOpacity =
          p.opacity + Math.sin(p.pulseVal) * (p.maxOpacity - p.opacity);

        // Wrap around boundaries
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Draw soft glowing mote
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${Math.max(0.05, currentOpacity)})`;
        ctx.shadowBlur = isMobile ? 6 : 10;
        ctx.shadowColor = p.color.includes("228") ? "rgba(228, 168, 83, 0.4)" : "rgba(114, 196, 141, 0.4)";
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none">
      {/* Soft Ambient 3D Glass Orbs */}
      {/* Orb 1: Upper right warm emerald light */}
      <div
        className="absolute -top-[10%] -right-[10%] w-[320px] sm:w-[540px] h-[320px] sm:h-[540px] rounded-full opacity-35 sm:opacity-45 blur-[70px] sm:blur-[120px] animate-pulse-slow"
        style={{
          background: "radial-gradient(circle, rgba(63,168,104,0.4) 0%, rgba(30,107,76,0.15) 60%, transparent 80%)",
        }}
      />

      {/* Orb 2: Middle left golden sunlight aura */}
      <div
        className="absolute top-[35%] -left-[15%] w-[280px] sm:w-[480px] h-[280px] sm:h-[480px] rounded-full opacity-25 sm:opacity-35 blur-[80px] sm:blur-[130px]"
        style={{
          background: "radial-gradient(circle, rgba(228,168,83,0.35) 0%, rgba(200,140,60,0.1) 60%, transparent 80%)",
          animation: "floatSlow 14s ease-in-out infinite alternate",
        }}
      />

      {/* Orb 3: Bottom right deep forest glow */}
      <div
        className="absolute bottom-[5%] -right-[5%] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full opacity-30 sm:opacity-40 blur-[80px] sm:blur-[120px]"
        style={{
          background: "radial-gradient(circle, rgba(45,138,99,0.35) 0%, rgba(15,62,46,0.15) 60%, transparent 80%)",
          animation: "floatSlow 18s ease-in-out infinite alternate-reverse",
        }}
      />

      {/* Canvas for lightweight organic floating spores */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-70" />

      {/* Subtle organic noise/grain overlay */}
      <div className="absolute inset-0 bg-grain opacity-25" />
    </div>
  );
};
