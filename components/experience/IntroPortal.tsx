"use client";

import React, { useState } from "react";
import Image from "next/image";
import { SITE_CONTENT } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { soundFx } from "@/lib/audio";
import { ArrowDown, Compass, Play, Sparkles, Volume2, VolumeX } from "lucide-react";

interface IntroPortalProps {
  onStartExplore: () => void;
  onStartGuided: () => void;
  isJurySource?: boolean;
}

export const IntroPortal: React.FC<IntroPortalProps> = ({
  onStartExplore,
  onStartGuided,
  isJurySource = false,
}) => {
  const [soundEnabled, setSoundEnabled] = useState(false);

  const handleExplore = () => {
    soundFx.playSeedDrop();
    onStartExplore();
  };

  const handleGuided = () => {
    soundFx.playSeedDrop();
    onStartGuided();
  };

  const handleSoundToggle = () => {
    const nextState = soundFx.toggle();
    setSoundEnabled(nextState);
  };

  return (
    <section className="relative min-h-[92vh] sm:min-h-screen flex flex-col items-center justify-between px-6 py-12 md:py-16 text-center overflow-hidden bg-brand-paper bg-grain">
      <header className="w-full max-w-5xl flex items-center justify-between z-20">
        <div className="flex items-center gap-3 text-left">
          <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-brand-cream border border-brand-border flex items-center justify-center shadow-soft overflow-hidden p-1">
            <Image
              src="/brand/logo.png"
              alt="Angles Natural Logo"
              width={40}
              height={40}
              className="object-contain"
              priority
            />
          </div>
          <div>
            <span className="block text-xs font-semibold tracking-widest text-brand-forest uppercase">
              ANGLES NATURAL
            </span>
            <span className="block text-[10px] text-brand-muted font-mono uppercase tracking-wider">
              {SITE_CONTENT.brand.descriptor}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {isJurySource && (
            <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1 rounded-full bg-brand-emerald/10 border border-brand-emerald/20 text-brand-emerald text-[11px] font-mono uppercase tracking-wider">
              <Sparkles className="w-3 h-3" />
              {SITE_CONTENT.videoJuryPrompt.badge}
            </span>
          )}

          <button
            onClick={handleSoundToggle}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-cream border border-brand-border text-[11px] text-brand-muted hover:text-brand-forest hover:bg-brand-sand transition-colors"
            aria-label="Control de sonido"
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-brand-emerald" />
                <span className="font-mono">SONIDO ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                <span className="font-mono">SONIDO OFF</span>
              </>
            )}
          </button>
        </div>
      </header>

      <div className="relative z-10 my-auto max-w-3xl flex flex-col items-center space-y-8 sm:space-y-10 py-8">
        <div className="relative group cursor-pointer" onClick={handleExplore}>
          <div className="absolute -inset-6 rounded-full bg-gradient-to-r from-brand-leafLight/20 via-brand-emerald/10 to-transparent blur-xl animate-pulse-slow pointer-events-none" />

          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-b from-brand-sand to-brand-cream border border-brand-border flex items-center justify-center shadow-soft transition-transform duration-500 group-hover:scale-105">
            <svg
              className="w-12 h-12 sm:w-14 sm:h-14 text-brand-emerald animate-float-gentle"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M32 8C32 8 48 20 48 36C48 44.8366 40.8366 52 32 52C23.1634 52 16 44.8366 16 36C16 20 32 8 32 8Z"
                fill="currentColor"
                fillOpacity="0.15"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M32 14V46M32 30C36 28 40 30 42 34M32 38C28 36 24 38 22 42"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <span className="block mt-2 text-[10px] font-mono tracking-widest text-brand-muted/70 uppercase">
            SEMILLA VIVA
          </span>
        </div>

        <div className="space-y-4">
          {isJurySource ? (
            <div className="space-y-2 animate-in fade-in">
              <span className="inline-block px-3 py-1 rounded-full bg-brand-forest text-brand-paper text-xs font-mono uppercase tracking-widest">
                {SITE_CONTENT.videoJuryPrompt.heading}
              </span>
              <h1 className="font-editorial text-3xl sm:text-5xl md:text-6xl text-brand-forest font-light leading-[1.1] tracking-tight">
                {SITE_CONTENT.videoJuryPrompt.subheading}
              </h1>
            </div>
          ) : (
            <div className="space-y-3">
              <span className="text-xs sm:text-sm font-mono tracking-[0.25em] text-brand-emerald uppercase font-semibold">
                {SITE_CONTENT.brand.name}
              </span>
              <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl text-brand-forest font-light leading-[1.08] tracking-tight">
                “{SITE_CONTENT.brand.tagline}”
              </h1>
            </div>
          )}

          <p className="text-brand-muted text-base sm:text-lg md:text-xl font-normal leading-relaxed max-w-xl mx-auto pt-2">
            {SITE_CONTENT.brand.visionStatement}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 pt-2 w-full sm:w-auto">
          <Button
            variant="primary"
            size="lg"
            onClick={handleExplore}
            className="w-full sm:w-auto text-sm sm:text-base group"
            icon={<Compass className="w-4 h-4 text-brand-leafLight group-hover:rotate-45 transition-transform" />}
          >
            {SITE_CONTENT.modes.free.label}
          </Button>

          <Button
            variant="secondary"
            size="lg"
            onClick={handleGuided}
            className="w-full sm:w-auto text-sm sm:text-base group"
            icon={<Play className="w-4 h-4 text-brand-forest group-hover:translate-x-0.5 transition-transform" />}
          >
            {SITE_CONTENT.modes.guided.label}
          </Button>
        </div>
      </div>

      <footer className="w-full max-w-5xl flex flex-col items-center justify-center gap-2 pt-6 text-brand-muted/70 text-xs font-mono tracking-widest uppercase z-20">
        <button
          onClick={handleExplore}
          className="flex flex-col items-center gap-1.5 hover:text-brand-forest transition-colors"
          aria-label="Desplazarse hacia el origen"
        >
          <span>Comenzar el recorrido</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </button>
      </footer>
    </section>
  );
};