"use client";

import React, { useState } from "react";
import { WasteItem } from "@/content/circular";
import { soundFx } from "@/lib/audio";
import { CheckCircle2, RotateCcw, Sparkles, HelpCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface WasteSortingGameProps {
  wasteItems: WasteItem[];
}

export const WasteSortingGame: React.FC<WasteSortingGameProps> = ({ wasteItems }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentItem = wasteItems[currentIndex % wasteItems.length];

  const handleSelectBin = (category: "ORGANICOS" | "APROVECHABLES" | "NO_APROVECHABLES") => {
    if (feedback) return;

    const isCorrect = currentItem.category === category;
    if (isCorrect) {
      soundFx.playTone(660, 0.2, "sine", 0.06);
      setScore((prev) => prev + 1);
      setFeedback({
        isCorrect: true,
        message: `¡Correcto! ${currentItem.whatToDo}`,
      });
    } else {
      soundFx.playTone(330, 0.15, "triangle", 0.04);
      setFeedback({
        isCorrect: false,
        message: `No exactamente. ${currentItem.name} va en ${currentItem.category === "ORGANICOS" ? "Orgánicos" : currentItem.category === "APROVECHABLES" ? "Aprovechables" : "No Aprovechables"}. ${currentItem.sourceNote}`,
      });
    }
  };

  const handleNext = () => {
    soundFx.playClick();
    setFeedback(null);
    if (currentIndex + 1 >= Math.min(6, wasteItems.length)) {
      setIsFinished(true);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleRestart = () => {
    soundFx.playSeedDrop();
    setCurrentIndex(0);
    setScore(0);
    setFeedback(null);
    setIsFinished(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-brand-cream/70 border border-brand-border rounded-3xl p-6 sm:p-8 shadow-soft space-y-6">
      {/* Game Header */}
      <div className="flex items-center justify-between border-b border-brand-border/60 pb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-brand-emerald" />
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-brand-forest">
            Minijuego: ¿Dónde va este residuo?
          </span>
        </div>
        <span className="text-xs font-mono text-brand-muted">
          Puntos: {score}
        </span>
      </div>

      {!isFinished ? (
        <div className="space-y-6">
          {/* Item Card */}
          <div className="p-6 rounded-2xl bg-brand-paper border border-brand-border text-center space-y-2 shadow-sm">
            <span className="text-[10px] font-mono tracking-widest text-brand-muted uppercase block">
              ¿QUÉ TIENES EN LA MANO?
            </span>
            <h4 className="font-editorial text-2xl text-brand-forest font-light">
              {currentItem.name}
            </h4>
            <p className="text-xs text-brand-muted max-w-md mx-auto">
              Ejemplos: {currentItem.commonExamples}
            </p>
          </div>

          {/* 3 Sorting Bins */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={() => handleSelectBin("ORGANICOS")}
              disabled={Boolean(feedback)}
              className="p-4 rounded-2xl bg-amber-950/5 hover:bg-amber-900/10 border border-amber-800/20 text-center transition-all hover:-translate-y-0.5 disabled:opacity-70"
            >
              <span className="w-3 h-3 rounded-full bg-amber-600 inline-block mb-1.5" />
              <span className="block font-semibold text-xs text-amber-950 uppercase tracking-wide">
                Orgánicos
              </span>
              <span className="block text-[10px] text-amber-900/70 mt-1">
                Compost & biomasa
              </span>
            </button>

            <button
              onClick={() => handleSelectBin("APROVECHABLES")}
              disabled={Boolean(feedback)}
              className="p-4 rounded-2xl bg-emerald-950/5 hover:bg-emerald-900/10 border border-emerald-800/20 text-center transition-all hover:-translate-y-0.5 disabled:opacity-70"
            >
              <span className="w-3 h-3 rounded-full bg-emerald-600 inline-block mb-1.5" />
              <span className="block font-semibold text-xs text-emerald-950 uppercase tracking-wide">
                Aprovechables
              </span>
              <span className="block text-[10px] text-emerald-900/70 mt-1">
                Reciclables limpios & secos
              </span>
            </button>

            <button
              onClick={() => handleSelectBin("NO_APROVECHABLES")}
              disabled={Boolean(feedback)}
              className="p-4 rounded-2xl bg-slate-950/5 hover:bg-slate-900/10 border border-slate-800/20 text-center transition-all hover:-translate-y-0.5 disabled:opacity-70"
            >
              <span className="w-3 h-3 rounded-full bg-slate-600 inline-block mb-1.5" />
              <span className="block font-semibold text-xs text-slate-950 uppercase tracking-wide">
                No Aprovechables
              </span>
              <span className="block text-[10px] text-slate-900/70 mt-1">
                Fracción no reciclable
              </span>
            </button>
          </div>

          {/* Feedback Area */}
          {feedback && (
            <div
              className={`p-4 rounded-2xl border text-xs leading-relaxed flex items-start gap-3 animate-in fade-in ${
                feedback.isCorrect
                  ? "bg-emerald-900/10 border-emerald-800/30 text-emerald-950"
                  : "bg-amber-900/10 border-amber-800/30 text-amber-950"
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {feedback.isCorrect ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                ) : (
                  <HelpCircle className="w-4 h-4 text-amber-700" />
                )}
              </div>
              <div className="space-y-2 flex-1">
                <p>{feedback.message}</p>
                <div className="text-right">
                  <Button variant="primary" size="sm" onClick={handleNext} icon={<ArrowRight className="w-3.5 h-3.5" />}>
                    Siguiente Residuo
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Finished State */
        <div className="text-center py-6 space-y-4 animate-in zoom-in-95">
          <div className="w-12 h-12 rounded-full bg-brand-emerald/10 text-brand-emerald flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h4 className="font-editorial text-2xl text-brand-forest font-light">
            ¡Completaste la ronda de clasificación!
          </h4>
          <p className="text-xs text-brand-muted max-w-sm mx-auto">
            Lograste clasificar {score} residuos correctamente. La separación consciente en origen reduce hasta un 80% los residuos que terminan en vertederos.
          </p>
          <Button variant="secondary" size="md" onClick={handleRestart} icon={<RotateCcw className="w-4 h-4" />}>
            Jugar de Nuevo
          </Button>
        </div>
      )}

      {/* Municipal / Contextual Disclaimer */}
      <p className="text-[10px] text-brand-muted/70 text-center italic border-t border-brand-border/60 pt-3">
        Nota de transparencia: Los colores, categorías y sistemas de separación pueden variar según la normativa y el gestor local de cada municipio.
      </p>
    </div>
  );
};