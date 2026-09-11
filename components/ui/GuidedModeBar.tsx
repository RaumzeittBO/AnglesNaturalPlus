"use client";

import React from "react";
import { ChevronLeft, ChevronRight, X, Sparkles } from "lucide-react";
import { ChapterMeta } from "@/content/site";
import { soundFx } from "@/lib/audio";

interface GuidedModeBarProps {
  chapters: ChapterMeta[];
  currentChapterIndex: number;
  onSelectChapter: (index: number) => void;
  onExitGuided: () => void;
}

export const GuidedModeBar: React.FC<GuidedModeBarProps> = ({
  chapters,
  currentChapterIndex,
  onSelectChapter,
  onExitGuided,
}) => {
  const current = chapters[currentChapterIndex];
  const isFirst = currentChapterIndex === 0;
  const isLast = currentChapterIndex === chapters.length - 1;

  const handleNext = () => {
    if (!isLast) {
      soundFx.playClick();
      onSelectChapter(currentChapterIndex + 1);
    }
  };

  const handlePrev = () => {
    if (!isFirst) {
      soundFx.playClick();
      onSelectChapter(currentChapterIndex - 1);
    }
  };

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-2xl bg-brand-forest/95 backdrop-blur-md text-brand-paper rounded-2xl shadow-elevated border border-brand-forest/40 p-3 sm:p-4 animate-in slide-in-from-bottom-6">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-brand-emerald/40 flex items-center justify-center text-brand-leafLight shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="truncate">
            <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono tracking-widest text-brand-leafLight uppercase">
              <span>Capítulo {current.number} / 06</span>
              <span className="text-white/40 hidden sm:inline">•</span>
              <span className="text-white/70 truncate hidden sm:inline">{current.id}</span>
            </div>
            <p className="text-xs sm:text-sm font-medium text-white truncate max-w-[200px] sm:max-w-xs md:max-w-sm">
              {current.title}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            onClick={handlePrev}
            disabled={isFirst}
            aria-label="Capítulo anterior"
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:pointer-events-none transition-colors text-white"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={handleNext}
            disabled={isLast}
            aria-label="Siguiente capítulo"
            className="flex items-center gap-1 px-3.5 py-2 rounded-lg bg-brand-emerald text-white text-xs font-medium hover:bg-brand-leaf transition-colors shadow-sm disabled:opacity-30 disabled:pointer-events-none"
          >
            <span className="hidden sm:inline">Continuar</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          <div className="w-px h-6 bg-white/20 mx-0.5 sm:mx-1" />

          <button
            onClick={onExitGuided}
            aria-label="Salir a modo libre"
            title="Salir a modo libre"
            className="p-2 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};