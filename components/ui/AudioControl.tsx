"use client";

import React, { useState, useEffect } from "react";
import { soundFx } from "@/lib/audio";
import { Volume2, VolumeX } from "lucide-react";

export const AudioControl: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setIsPlaying(soundFx.getEnabled());
  }, []);

  const handleToggle = () => {
    const newState = soundFx.toggle();
    setIsPlaying(newState);
  };

  return (
    <button
      onClick={handleToggle}
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 px-3.5 py-2 bg-brand-cream/90 backdrop-blur-md text-brand-forest border border-brand-border/80 rounded-full shadow-soft hover:bg-brand-sand transition-all text-xs font-medium tracking-wide group"
      aria-label={isPlaying ? "Silenciar experiencia" : "Activar sonido ambiental"}
    >
      <span className="relative flex h-2 w-2">
        {isPlaying ? (
          <>
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-leaf opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-leaf" />
          </>
        ) : (
          <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-muted/40" />
        )}
      </span>
      <span className="text-[11px] uppercase tracking-wider text-brand-muted group-hover:text-brand-forest">
        {isPlaying ? "Sonido ON" : "Sonido OFF"}
      </span>
      {isPlaying ? (
        <Volume2 className="w-3.5 h-3.5 text-brand-emerald" />
      ) : (
        <VolumeX className="w-3.5 h-3.5 text-brand-muted" />
      )}
    </button>
  );
};