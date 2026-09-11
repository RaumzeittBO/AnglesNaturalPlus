"use client";

import React, { useState } from "react";
import { INGREDIENTS, Ingredient } from "@/content/ingredients";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ClaimBadge } from "@/components/ui/ClaimBadge";
import { soundFx } from "@/lib/audio";
import { Check, FlaskConical, Plus, RotateCcw, Sparkles } from "lucide-react";

export const LabExperience: React.FC = () => {
  const [formulation, setFormulation] = useState<string[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleAddIngredient = (item: Ingredient) => {
    if (formulation.includes(item.id)) return;

    soundFx.playTone(400 + formulation.length * 90, 0.15, "triangle", 0.05);
    const updated = [...formulation, item.id];
    setFormulation(updated);

    if (updated.length === INGREDIENTS.length) {
      soundFx.playTone(880, 0.4, "sine", 0.08);
      setIsCompleted(true);
    }
  };

  const handleReset = () => {
    soundFx.playClick();
    setFormulation([]);
    setIsCompleted(false);
  };

  const handleQuickComplete = () => {
    soundFx.playSeedDrop();
    setFormulation(INGREDIENTS.map((i) => i.id));
    setIsCompleted(true);
  };

  return (
    <section id="laboratorio" className="relative py-20 md:py-28 px-6 bg-brand-cream/40 bg-grain border-t border-brand-border/50">
      <div className="max-w-5xl mx-auto space-y-12">
        <SectionTitle
          chapterNumber="02"
          category="Formulación Científica & I+D"
          title="Investigar. Probar. Corregir. Volver a intentar."
          subtitle="Este capítulo representa la formación científica de Andrea Angles: donde la bioquímica traduce los ingredientes nativos en formulación funcional."
          alignment="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-4xl mx-auto">
          <div className="lg:col-span-5 space-y-3 order-2 lg:order-1">
            <div className="flex items-center justify-between text-xs font-mono text-brand-muted pb-1">
              <span>MATERIAS PRIMAS</span>
              <span>{formulation.length} de {INGREDIENTS.length} agregados</span>
            </div>

            <div className="space-y-2">
              {INGREDIENTS.map((item, idx) => {
                const isAdded = formulation.includes(item.id);
                return (
                  <button
                    key={item.id}
                    onClick={() => handleAddIngredient(item)}
                    disabled={isAdded}
                    className={`w-full flex items-center justify-between p-3.5 rounded-2xl border transition-all text-left group ${
                      isAdded
                        ? "bg-brand-sand/50 border-brand-border text-brand-muted opacity-60 cursor-default"
                        : "bg-brand-paper hover:bg-brand-sand border-brand-border/80 shadow-soft hover:shadow-card hover:-translate-y-0.5"
                    }`}
                    aria-label={`Añadir ${item.name} a la formulación`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="w-3 h-3 rounded-full shrink-0 shadow-sm"
                        style={{ backgroundColor: item.color }}
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-brand-muted">
                            0{idx + 1}
                          </span>
                          <span className="text-xs sm:text-sm font-semibold tracking-wide text-brand-forest">
                            {item.name}
                          </span>
                        </div>
                        <span className="block text-[11px] text-brand-muted">
                          {item.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-1.5 rounded-lg bg-brand-cream text-brand-forest">
                      {isAdded ? (
                        <Check className="w-4 h-4 text-brand-leaf" />
                      ) : (
                        <Plus className="w-4 h-4 text-brand-muted group-hover:text-brand-forest transition-colors" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 text-xs font-mono text-brand-muted hover:text-brand-forest transition-colors p-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reiniciar mesa</span>
              </button>

              {!isCompleted && (
                <button
                  onClick={handleQuickComplete}
                  className="text-xs font-mono text-brand-emerald hover:underline p-1"
                >
                  Formular todo rápido →
                </button>
              )}
            </div>
          </div>

          <div className="lg:col-span-7 bg-brand-paper border border-brand-border rounded-3xl p-6 sm:p-8 shadow-card flex flex-col items-center text-center space-y-6 order-1 lg:order-2">
            <div className="w-full flex items-center justify-between border-b border-brand-border/60 pb-3">
              <div className="flex items-center gap-2 text-xs font-mono text-brand-forest">
                <FlaskConical className="w-4 h-4 text-brand-emerald" />
                <span>MATRAZ DE FORMULACIÓN BIOQUÍMICA</span>
              </div>
              <ClaimBadge status="IN_PROGRESS" evidence="En etapa de investigación y estabilidad de lote." />
            </div>

            <div className="relative w-48 h-56 sm:w-56 sm:h-64 rounded-b-3xl border-2 border-t-0 border-brand-emerald/40 bg-gradient-to-b from-brand-paper via-brand-cream/30 to-brand-sand/50 p-3 flex flex-col justify-end overflow-hidden shadow-inner">
              <div className="absolute right-2 top-4 bottom-4 flex flex-col justify-between text-[9px] font-mono text-brand-muted/60 pointer-events-none">
                <span>500 ml</span>
                <span>400 ml</span>
                <span>300 ml</span>
                <span>200 ml</span>
                <span>100 ml</span>
              </div>

              <div
                className="w-full rounded-b-2xl transition-all duration-700 ease-out relative flex flex-col justify-end overflow-hidden"
                style={{
                  height: `${Math.max(8, (formulation.length / INGREDIENTS.length) * 85)}%`,
                  background:
                    formulation.length === 0
                      ? "transparent"
                      : "linear-gradient(to top, rgba(30, 107, 76, 0.4), rgba(78, 168, 106, 0.25))",
                }}
              >
                {formulation.length > 0 && (
                  <div className="absolute inset-0 flex items-center justify-around opacity-60 pointer-events-none">
                    <span className="w-2 h-2 rounded-full bg-brand-accent-gold animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-emerald animate-pulse" />
                    <span className="w-2 h-2 rounded-full bg-brand-leaf animate-ping" />
                  </div>
                )}
              </div>

              {formulation.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <p className="text-xs text-brand-muted/70 font-mono">
                    Selecciona o añade los ingredientes a la mesa
                  </p>
                </div>
              )}
            </div>

            <div className="w-full space-y-1.5 text-left font-mono text-xs bg-brand-cream/60 p-3.5 rounded-xl border border-brand-border/60">
              <span className="text-[10px] text-brand-muted uppercase block">
                REGISTRO CIENTÍFICO DE LOTE:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 pt-1">
                {INGREDIENTS.map((item, idx) => (
                  <div
                    key={item.id}
                    className={`flex items-center gap-1.5 ${
                      formulation.includes(item.id)
                        ? "text-brand-forest font-semibold"
                        : "text-brand-muted/50"
                    }`}
                  >
                    <span>0{idx + 1} {item.name}</span>
                    <span>{formulation.includes(item.id) ? "✓" : "○"}</span>
                  </div>
                ))}
              </div>
            </div>

            {isCompleted && (
              <div className="w-full p-5 rounded-2xl bg-brand-forest text-brand-paper text-center space-y-3 animate-in zoom-in-95 duration-300">
                <div className="flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4 text-brand-leafLight" />
                  <span className="text-xs font-mono tracking-widest text-brand-leafLight uppercase">
                    PROYECTO EN DESARROLLO
                  </span>
                </div>

                <h4 className="font-editorial text-3xl sm:text-4xl font-light tracking-wide text-brand-paper">
                  NUTRIQ
                </h4>

                <p className="text-xs sm:text-sm text-brand-paper/90 leading-relaxed max-w-md mx-auto">
                  NutriQ es una proteína funcional que Angles Natural busca desarrollar combinando ingredientes vegetales, formulación y una mirada hacia el valor de nuestros recursos.
                </p>

                <div className="pt-2 border-t border-white/10 text-xs font-mono tracking-wider text-brand-leafLight uppercase">
                  INNOVAR TAMBIÉN ES VALORAR LO NUESTRO.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};