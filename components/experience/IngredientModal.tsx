"use client";

import React from "react";
import { Ingredient } from "@/content/ingredients";
import { X, Dna, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface IngredientModalProps {
  ingredient: Ingredient | null;
  onClose: () => void;
  onSendToLab: (ingredient: Ingredient) => void;
}

export const IngredientModal: React.FC<IngredientModalProps> = ({
  ingredient,
  onClose,
  onSendToLab,
}) => {
  if (!ingredient) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-brand-forest/60 backdrop-blur-sm animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-brand-paper rounded-3xl p-6 sm:p-8 shadow-elevated border border-brand-border space-y-6 text-left animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-brand-cream text-brand-muted hover:text-brand-forest transition-colors"
          aria-label="Cerrar ficha de ingrediente"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-2 pr-8">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-brand-emerald uppercase">
            <MapPin className="w-3.5 h-3.5" />
            <span>{ingredient.originBadge}</span>
            <span>•</span>
            <span className="text-brand-muted">{ingredient.category}</span>
          </div>

          <h3 className="font-editorial text-3xl sm:text-4xl text-brand-forest font-light">
            {ingredient.name}
          </h3>

          {ingredient.scientificName && (
            <p className="text-xs font-mono text-brand-muted/80 italic">
              {ingredient.scientificName}
            </p>
          )}
        </div>

        <div
          className="w-full h-32 rounded-2xl p-4 flex items-center justify-between border overflow-hidden relative"
          style={{
            backgroundColor: `${ingredient.color}15`,
            borderColor: `${ingredient.color}40`,
          }}
        >
          <div className="space-y-1 z-10">
            <span className="text-[10px] font-mono tracking-widest text-brand-muted uppercase">
              COMPONENTE NUTRIQ
            </span>
            <p className="text-xs text-brand-forest font-medium max-w-xs">
              {ingredient.roleInNutriQ}
            </p>
          </div>

          <div className="relative w-20 h-20 flex items-center justify-center shrink-0">
            <div
              className="absolute inset-0 rounded-full blur-md opacity-40 animate-pulse-slow"
              style={{ backgroundColor: ingredient.color }}
            />
            <div
              className="w-12 h-12 rounded-2xl rotate-45 border flex items-center justify-center shadow-inner"
              style={{
                backgroundColor: ingredient.accentColor,
                borderColor: ingredient.color,
              }}
            >
              <Dna className="w-5 h-5 text-brand-forest -rotate-45" />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <p className="font-editorial text-lg text-brand-forest font-light italic">
            “{ingredient.shortDesc}”
          </p>
          <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
            {ingredient.fullDesc}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-1 border-t border-brand-border/60">
          <div className="p-2.5 rounded-xl bg-brand-cream/70 border border-brand-border/60">
            <span className="block text-[10px] font-mono uppercase text-brand-muted">
              Aporte Proteico
            </span>
            <span className="text-xs font-medium text-brand-forest">
              {ingredient.macroProfile.protein}
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-brand-cream/70 border border-brand-border/60">
            <span className="block text-[10px] font-mono uppercase text-brand-muted">
              Fibra & Asimilación
            </span>
            <span className="text-xs font-medium text-brand-forest">
              {ingredient.macroProfile.fiber}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 pt-2">
          <span className="text-[11px] text-brand-muted/80">
            Ficha botánica en investigación
          </span>
          <Button
            variant="primary"
            size="sm"
            onClick={() => onSendToLab(ingredient)}
            icon={<ArrowRight className="w-3.5 h-3.5" />}
          >
            Formular en Lab
          </Button>
        </div>
      </div>
    </div>
  );
};