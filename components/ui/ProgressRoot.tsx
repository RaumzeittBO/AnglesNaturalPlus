"use client";

import React, { useEffect, useState } from "react";

export const ProgressRoot: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed left-3 sm:left-6 top-0 bottom-0 z-40 pointer-events-none hidden md:flex flex-col items-center justify-between py-12">
      <div className="relative w-4 h-full flex flex-col items-center">
        <div className="absolute top-0 bottom-0 w-[2px] bg-brand-border/40 rounded-full" />
        <div
          className="absolute top-0 w-[3px] bg-gradient-to-b from-brand-leafLight via-brand-emerald to-brand-forest rounded-full transition-all duration-150 ease-out shadow-[0_0_8px_rgba(46,138,99,0.3)]"
          style={{ height: `${scrollProgress}%` }}
        />
        <div
          className="absolute w-3 h-3 rounded-full bg-brand-paper border-2 border-brand-emerald shadow-sm transition-all duration-150 -ml-[5px] flex items-center justify-center"
          style={{ top: `${scrollProgress}%`, transform: "translateY(-50%)" }}
        >
          <div className="w-1 h-1 rounded-full bg-brand-leaf animate-ping" />
        </div>
      </div>
    </div>
  );
};