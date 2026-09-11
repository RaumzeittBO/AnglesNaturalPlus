"use client";

import React, { useState } from "react";
import { INGREDIENTS, Ingredient } from "@/content/ingredients";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { IngredientModal } from "./IngredientModal";
import { soundFx } from "@/lib/audio";
import { Sparkles, Info } from "lucide-react";

interface BoliviaOriginProps {
  onIngredientToLab?: (ingredient: Ingredient) => void;
}

export const BoliviaOrigin: React.FC<BoliviaOriginProps> = ({ onIngredientToLab }) => {
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(null);

  const handleSelect = (item: Ingredient) => {
    soundFx.playClick();
    setSelectedIngredient(item);
  };

  const handleSendToLab = (item: Ingredient) => {
    setSelectedIngredient(null);
    if (onIngredientToLab) {
      onIngredientToLab(item);
    }
  };

  return (
    <section id="origen" className="relative py-20 md:py-28 px-6 bg-brand-paper bg-grain border-t border-brand-border/50">
      <div className="max-w-5xl mx-auto space-y-12">
        <SectionTitle
          chapterNumber="01"
          category="Territorio & Materias Primas"
          title="Todo comienza aquí."
          subtitle="Creemos que innovar también significa aprender a mirar lo que tenemos cerca."
          alignment="center"
        />

        <div className="relative w-full max-w-4xl mx-auto min-h-[420px] sm:min-h-[500px] bg-brand-cream/80 border border-brand-border rounded-3xl p-6 sm:p-10 shadow-soft overflow-hidden flex flex-col justify-between">
          <div className="absolute inset-0 pointer-events-none opacity-40">
            <svg
              className="w-full h-full object-cover"
              viewBox="0 0 800 600"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M120 180C240 140 380 200 480 160C580 120 700 220 740 300C780 380 720 480 620 520C520 560 380 500 280 540C180 580 80 480 60 400C40 320 60 220 120 180Z"
                stroke="#1E6B4C"
                strokeWidth="1.2"
                strokeDasharray="4 6"
              />
              <path
                d="M180 220C270 190 380 240 460 210C540 180 640 260 670 330C700 400 650 470 570 500C490 530 380 470 300 500C220 530 150 450 140 380C130 310 140 240 180 220Z"
                stroke="#3FA868"
                strokeWidth="1"
                opacity="0.6"
              />
              <path
                d="M240 260C310 240 400 280 460 260C520 240 590 300 610 360C630 420 590 470 520 490C450 510 370 460 300 480C230 500 190 430 190 370C190 310 200 270 240 260Z"
                stroke="#2D8A63"
                strokeWidth="0.8"
                opacity="0.4"
              />
              <circle cx="280" cy="280" r="3" fill="#1E6B4C" opacity="0.3" />
              <circle cx="480" cy="220" r="3" fill="#1E6B4C" opacity="0.3" />
              <circle cx="560" cy="420" r="3" fill="#1E6B4C" opacity="0.3" />
            </svg>
          </div>

          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-paper/90 border border-brand-border text-[11px] font-mono text-brand-forest shadow-sm">
              <span className="w-2 h-2 rounded-full bg-brand-leaf animate-pulse" />
              <span>MAPA BOTÁNICO & ELEVACIÓN ABSTRACTA</span>
            </div>
            <span className="text-[11px] font-mono text-brand-muted hidden sm:inline">
              Toca un ingrediente para abrir su ficha
            </span>
          </div>

          <div className="relative z-10 w-full h-64 sm:h-80 my-4">
            {INGREDIENTS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSelect(item)}
                className="group absolute -translate-x-1/2 -translate-y-1/2 p-2 focus-visible:ring-2 focus-visible:ring-brand-emerald rounded-2xl transition-all duration-300"
                style={{
                  left: `${item.coordinates.x}%`,
                  top: `${item.coordinates.y}%`,
                }}
                aria-label={`Ver ficha de ${item.name}`}
              >
                <div
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-paper shadow-soft border group-hover:scale-105 group-hover:shadow-card transition-all duration-200"
                  style={{ borderColor: `${item.color}80` }}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0 shadow-sm"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-xs font-semibold tracking-wider text-brand-forest">
                    {item.name}
                  </span>
                  {item.isProtagonist && (
                    <Sparkles className="w-3 h-3 text-brand-accent-gold" />
                  )}
                </div>

                <span className="block text-[10px] font-mono text-brand-muted mt-1 opacity-80 group-hover:opacity-100 transition-opacity">
                  {item.category}
                </span>
              </button>
            ))}
          </div>

          <div className="relative z-10 pt-4 border-t border-brand-border/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-brand-muted">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-brand-emerald shrink-0" />
              <span>
                Ingredientes andinos de alta densidad biológica bajo formulación de NutriQ.
              </span>
            </div>
            <div className="flex items-center gap-4 text-[11px] font-mono">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-brand-accent-gold" /> Protagonistas
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-brand-emerald" /> Complementos
              </span>
            </div>
          </div>
        </div>

        <div className="text-center max-w-xl mx-auto space-y-3 pt-6">
          <p className="font-editorial text-xl sm:text-2xl text-brand-forest font-light italic">
            “Pero un ingrediente no se convierte en un producto por sí solo.”
          </p>
          <p className="text-xs sm:text-sm text-brand-muted">
            Requiere la perspectiva bioquímica, investigación analítica y un método riguroso de formulación.
          </p>
        </div>
      </div>

      <IngredientModal
        ingredient={selectedIngredient}
        onClose={() => setSelectedIngredient(null)}
        onSendToLab={handleSendToLab}
      />
    </section>
  );
};