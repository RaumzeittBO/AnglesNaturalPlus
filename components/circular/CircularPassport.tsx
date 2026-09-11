"use client";

import React, { useState } from "react";
import { PackagingComponent } from "@/content/products";
import { Layers, ShieldCheck, CheckCircle2, HelpCircle } from "lucide-react";

interface CircularPassportProps {
  components: PackagingComponent[];
}

export const CircularPassport: React.FC<CircularPassportProps> = ({ components }) => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const activeComponent = components[selectedIdx] || components[0];

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-brand-cream/60 border border-brand-border space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-brand-border/60 pb-3">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-brand-emerald uppercase font-semibold">
            PASAPORTE CIRCULAR DEL PRODUCTO
          </span>
          <h4 className="font-editorial text-xl sm:text-2xl text-brand-forest font-light">
            “El producto puede terminar. Su historia no.”
          </h4>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-brand-paper border border-brand-border text-[10px] font-mono text-brand-muted">
          Transparencia de Materiales
        </span>
      </div>

      {/* Components Selector Pills */}
      <div className="flex flex-wrap gap-2">
        {components.map((c, idx) => (
          <button
            key={c.name}
            onClick={() => setSelectedIdx(idx)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
              selectedIdx === idx
                ? "bg-brand-forest text-brand-paper shadow-sm"
                : "bg-brand-paper hover:bg-brand-sand border border-brand-border text-brand-forest"
            }`}
          >
            <span>{c.name}</span>
          </button>
        ))}
      </div>

      {/* Selected Component Breakdown Card */}
      {activeComponent && (
        <div className="p-5 rounded-2xl bg-brand-paper border border-brand-border space-y-4 animate-in fade-in">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-brand-border/60 pb-3">
            <div>
              <span className="text-[10px] font-mono uppercase text-brand-muted block">Material Identificado</span>
              <span className="text-sm font-semibold text-brand-forest">{activeComponent.material}</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-emerald/10 text-brand-emerald text-xs font-mono font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{activeComponent.anglesCollects ? "Angles lo recibe para reuso/reciclaje" : "Disposición en reciclaje estándar"}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-brand-muted">
            <div className="space-y-1">
              <span className="font-semibold text-brand-forest block">¿Cómo separarlo y entregarlo?</span>
              <p className="leading-relaxed">{activeComponent.disposalAdvice}</p>
            </div>

            <div className="space-y-1">
              <span className="font-semibold text-brand-forest block">Criterio de Diseño Consciente:</span>
              <p className="leading-relaxed">{activeComponent.transparencyNote}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};