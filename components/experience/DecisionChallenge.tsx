"use client";

import React, { useState } from "react";
import { DECISION_CHALLENGE, DecisionOption } from "@/content/decisions";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";
import { soundFx } from "@/lib/audio";
import { ArrowRight, CheckCircle2, RotateCcw, Scale } from "lucide-react";

export const DecisionChallenge: React.FC = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, DecisionOption>>({});
  const [isFinished, setIsFinished] = useState(false);

  const [metrics, setMetrics] = useState({
    nutrition: 50,
    viability: 50,
    sustainability: 50,
    impact: 50,
  });

  const currentStep = DECISION_CHALLENGE[currentStepIndex];

  const handleSelectOption = (opt: DecisionOption) => {
    soundFx.playTone(550, 0.1, "sine", 0.04);
    const updatedAnswers = { ...selectedAnswers, [currentStepIndex]: opt };
    setSelectedAnswers(updatedAnswers);

    let n = 50;
    let v = 50;
    let s = 50;
    let i = 50;

    Object.values(updatedAnswers).forEach((choice) => {
      n = Math.min(100, Math.max(10, n + choice.effects.nutrition));
      v = Math.min(100, Math.max(10, v + choice.effects.viability));
      s = Math.min(100, Math.max(10, s + choice.effects.sustainability));
      i = Math.min(100, Math.max(10, i + choice.effects.impact));
    });

    setMetrics({ nutrition: n, viability: v, sustainability: s, impact: i });

    if (currentStepIndex < DECISION_CHALLENGE.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      soundFx.playTone(780, 0.3, "sine", 0.06);
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    soundFx.playClick();
    setCurrentStepIndex(0);
    setSelectedAnswers({});
    setMetrics({ nutrition: 50, viability: 50, sustainability: 50, impact: 50 });
    setIsFinished(false);
  };

  return (
    <section id="desafio" className="relative py-20 md:py-28 px-6 bg-brand-paper bg-grain border-t border-brand-border/50">
      <div className="max-w-5xl mx-auto space-y-12">
        <SectionTitle
          chapterNumber="03"
          category="Simulador de Estrategia Sostenible"
          title="Crear un producto es solamente una parte del problema."
          subtitle="Ahora te toca decidir: cómo equilibrar 100 recursos simbólicos entre ciencia, operaciones, comunidad y medio ambiente."
          alignment="center"
        />

        <div className="max-w-4xl mx-auto bg-brand-cream/60 border border-brand-border rounded-3xl p-6 sm:p-10 shadow-soft space-y-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-brand-muted border-b border-brand-border/70 pb-3">
              <span className="flex items-center gap-1.5 font-semibold text-brand-forest">
                <Scale className="w-4 h-4 text-brand-emerald" />
                <span>DECISIÓN {currentStepIndex + 1} DE {DECISION_CHALLENGE.length}</span>
              </span>
              <span>100 RECURSOS ESTRATÉGICOS</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-2xl bg-brand-paper border border-brand-border/80 space-y-1.5 shadow-sm">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-[10px] text-brand-muted uppercase">Nutrición</span>
                  <span className="font-semibold text-brand-forest">{metrics.nutrition}%</span>
                </div>
                <div className="w-full bg-brand-sand/60 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand-accent-gold transition-all duration-500 rounded-full"
                    style={{ width: `${metrics.nutrition}%` }}
                  />
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-brand-paper border border-brand-border/80 space-y-1.5 shadow-sm">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-[10px] text-brand-muted uppercase">Viabilidad</span>
                  <span className="font-semibold text-brand-forest">{metrics.viability}%</span>
                </div>
                <div className="w-full bg-brand-sand/60 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand-forest transition-all duration-500 rounded-full"
                    style={{ width: `${metrics.viability}%` }}
                  />
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-brand-paper border border-brand-border/80 space-y-1.5 shadow-sm">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-[10px] text-brand-muted uppercase">Sostenibilidad</span>
                  <span className="font-semibold text-brand-forest">{metrics.sustainability}%</span>
                </div>
                <div className="w-full bg-brand-sand/60 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand-emerald transition-all duration-500 rounded-full"
                    style={{ width: `${metrics.sustainability}%` }}
                  />
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-brand-paper border border-brand-border/80 space-y-1.5 shadow-sm">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-[10px] text-brand-muted uppercase">Impacto</span>
                  <span className="font-semibold text-brand-forest">{metrics.impact}%</span>
                </div>
                <div className="w-full bg-brand-sand/60 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand-leaf transition-all duration-500 rounded-full"
                    style={{ width: `${metrics.impact}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {!isFinished ? (
            <div className="space-y-6 pt-2">
              <div className="space-y-2">
                <span className="inline-block px-3 py-1 rounded-full bg-brand-paper text-brand-emerald text-xs font-mono uppercase tracking-wider border border-brand-border">
                  Área: {currentStep.category}
                </span>
                <h3 className="font-editorial text-2xl sm:text-3xl text-brand-forest font-light">
                  {currentStep.title}
                </h3>
                <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                  {currentStep.context}
                </p>
              </div>

              <div className="space-y-3">
                {currentStep.options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleSelectOption(option)}
                    className="w-full p-4 sm:p-5 rounded-2xl bg-brand-paper hover:bg-brand-sand/80 border border-brand-border/80 hover:border-brand-emerald/40 text-left transition-all duration-200 shadow-soft hover:shadow-card hover:-translate-y-0.5 group flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <span className="font-semibold text-sm sm:text-base text-brand-forest group-hover:text-brand-emerald transition-colors block">
                        {option.label}
                      </span>
                      <p className="text-xs text-brand-muted leading-relaxed">
                        {option.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                      <span className="text-[11px] font-mono text-brand-muted px-2.5 py-1 rounded-lg bg-brand-cream border border-brand-border">
                        {option.cost} pts
                      </span>
                      <div className="p-1.5 rounded-full bg-brand-forest text-brand-paper group-hover:bg-brand-emerald transition-colors">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center space-y-6 py-6 animate-in zoom-in-95 duration-300">
              <div className="w-12 h-12 rounded-full bg-brand-emerald/10 text-brand-emerald flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>

              <div className="space-y-3 max-w-xl mx-auto">
                <h3 className="font-editorial text-3xl sm:text-4xl text-brand-forest font-light">
                  Tu Equilibrio Estratégico
                </h3>
                <p className="font-editorial text-lg sm:text-xl text-brand-forest font-light italic leading-relaxed">
                  “Construir responsablemente no significa maximizar un solo indicador. Significa aprender a tomar mejores decisiones.”
                </p>
                <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                  En Angles Natural evaluamos cada paso productivo desde esta perspectiva de balance holístico: ciencia rigurosa, viabilidad económica, empaque honesto y retribución social.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                <Button variant="secondary" size="md" onClick={handleRestart} icon={<RotateCcw className="w-4 h-4" />}>
                  Reintentar Simulación
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};