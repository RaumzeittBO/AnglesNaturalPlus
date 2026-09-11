"use client";

import React, { useState } from "react";
import { dbAdapter } from "@/lib/db";
import { WasteItem } from "@/content/circular";
import { WasteSortingGame } from "@/components/circular/WasteSortingGame";
import { Search, HelpCircle, Sparkles, CheckCircle2, AlertTriangle, ShieldCheck } from "lucide-react";

export default function DondeVaPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const wasteItems = dbAdapter.getWasteItems();

  const filtered = wasteItems.filter((w) =>
    w.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (w.commonExamples || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (w.category || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-cream border border-brand-border text-xs font-mono text-brand-emerald uppercase">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>GUÍA EDUCATIVA DE SEPARACIÓN</span>
        </div>
        <h1 className="font-editorial text-4xl sm:text-5xl text-brand-forest font-light">
          ¿Dónde va esto?
        </h1>
        <p className="text-brand-muted text-sm sm:text-base leading-relaxed">
          Aprende qué hacer con cada residuo antes de tirarlo. Separa en origen para permitir el reciclaje local y la valorización de biomasa.
        </p>

        {/* Search Bar */}
        <div className="relative max-w-md mx-auto pt-2">
          <Search className="w-4 h-4 text-brand-muted absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="¿Qué tienes en la mano? (ej: botella, blíster, cáscaras...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-full bg-brand-cream border border-brand-border text-xs text-brand-forest focus:outline-none focus:ring-2 focus:ring-brand-emerald shadow-soft"
          />
        </div>
      </div>

      {/* Interactive Waste Sorting Minigame */}
      <WasteSortingGame wasteItems={wasteItems} />

      {/* Searchable Waste Directory */}
      <div className="space-y-6 pt-6">
        <div className="flex items-center justify-between border-b border-brand-border/60 pb-3">
          <h2 className="font-editorial text-2xl text-brand-forest font-light">
            Directorio de Residuos Frecuentes
          </h2>
          <span className="text-xs font-mono text-brand-muted">
            {filtered.length} materiales listados
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((item) => (
            <div key={item.id} className="p-5 rounded-2xl bg-brand-paper border border-brand-border space-y-3 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm text-brand-forest">{item.name}</span>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase font-medium ${
                  item.category === "ORGANICOS"
                    ? "bg-amber-900/10 text-amber-900 border border-amber-800/20"
                    : item.category === "APROVECHABLES"
                    ? "bg-emerald-900/10 text-emerald-900 border border-emerald-800/20"
                    : "bg-slate-900/10 text-slate-800 border border-slate-700/20"
                }`}>
                  {item.category === "ORGANICOS" ? "Orgánicos" : item.category === "APROVECHABLES" ? "Aprovechables" : "No Aprovechables"}
                </span>
              </div>

              <p className="text-xs text-brand-muted">
                <strong>Ejemplos:</strong> {item.commonExamples}
              </p>

              <div className="space-y-1.5 pt-1 text-xs border-t border-brand-border/60">
                <div className="flex items-start gap-2 text-emerald-950">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-emerald shrink-0 mt-0.5" />
                  <span><strong>Qué hacer:</strong> {item.whatToDo}</span>
                </div>
                <div className="flex items-start gap-2 text-rose-950">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-700 shrink-0 mt-0.5" />
                  <span><strong>Qué NO hacer:</strong> {item.whatNotToDo}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}