"use client";

import React, { useState } from "react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ClaimBadge } from "@/components/ui/ClaimBadge";
import { Button } from "@/components/ui/Button";
import { soundFx } from "@/lib/audio";
import { Layers, Recycle, ShieldCheck, Trash2, Sprout } from "lucide-react";

export const SustainabilitySection: React.FC = () => {
  const [showLayers, setShowLayers] = useState(false);
  const [activeStream, setActiveStream] = useState<string>("organicos");

  const handleToggleLayers = () => {
    soundFx.playClick();
    setShowLayers(!showLayers);
  };

  const handleStreamClick = (id: string) => {
    soundFx.playClick();
    setActiveStream(id);
  };

  return (
    <section id="sostenibilidad" className="relative py-20 md:py-28 px-6 bg-brand-cream/30 bg-grain border-t border-brand-border/50">
      <div className="max-w-5xl mx-auto space-y-16">
        <SectionTitle
          chapterNumber="04"
          category="Gestión de Residuos & Empaque Consciente"
          title="Responsabilidad también significa diseñar mejor."
          subtitle="Angles Natural busca incorporar la separación y gestión responsable de residuos dentro de su forma de trabajo, sin retórica vacía."
          alignment="center"
        />

        <div className="bg-brand-paper border border-brand-border rounded-3xl p-6 sm:p-10 shadow-soft space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-brand-border/60 pb-4">
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-wider text-brand-emerald">
                GESTIÓN OPERATIVA INTERNA
              </span>
              <h3 className="font-editorial text-2xl text-brand-forest font-light">
                Separación en Tres Flujos
              </h3>
            </div>
            <ClaimBadge status="CURRENT" evidence="Implementado en el taller de formulación y laboratorio de pruebas." />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => handleStreamClick("organicos")}
              className={`p-5 rounded-2xl border text-left transition-all duration-200 ${
                activeStream === "organicos"
                  ? "bg-brand-cream border-brand-emerald shadow-card -translate-y-1"
                  : "bg-brand-paper border-brand-border hover:bg-brand-cream/50"
              }`}
            >
              <div className="w-9 h-9 rounded-xl bg-amber-900/10 text-amber-800 flex items-center justify-center mb-3">
                <Sprout className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono tracking-widest text-brand-muted uppercase block">
                01 FLUJO
              </span>
              <h4 className="font-semibold text-base text-brand-forest mt-0.5">
                Residuos Orgánicos
              </h4>
              <p className="text-xs text-brand-muted mt-2 leading-relaxed">
                Restos botánicos, cutículas de grano y subproductos del lavado que retornan como compostaje y biomasa vegetal.
              </p>
            </button>

            <button
              onClick={() => handleStreamClick("reciclables")}
              className={`p-5 rounded-2xl border text-left transition-all duration-200 ${
                activeStream === "reciclables"
                  ? "bg-brand-cream border-brand-emerald shadow-card -translate-y-1"
                  : "bg-brand-paper border-brand-border hover:bg-brand-cream/50"
              }`}
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-900/10 text-emerald-800 flex items-center justify-center mb-3">
                <Recycle className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono tracking-widest text-brand-muted uppercase block">
                02 FLUJO
              </span>
              <h4 className="font-semibold text-base text-brand-forest mt-0.5">
                Reciclables Limpios
              </h4>
              <p className="text-xs text-brand-muted mt-2 leading-relaxed">
                Papel kraft, cartón corrugado secundario y polímeros limpios clasificados para centros de reciclaje local.
              </p>
            </button>

            <button
              onClick={() => handleStreamClick("no-aprovechables")}
              className={`p-5 rounded-2xl border text-left transition-all duration-200 ${
                activeStream === "no-aprovechables"
                  ? "bg-brand-cream border-brand-emerald shadow-card -translate-y-1"
                  : "bg-brand-paper border-brand-border hover:bg-brand-cream/50"
              }`}
            >
              <div className="w-9 h-9 rounded-xl bg-slate-900/10 text-slate-800 flex items-center justify-center mb-3">
                <Trash2 className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono tracking-widest text-brand-muted uppercase block">
                03 FLUJO
              </span>
              <h4 className="font-semibold text-base text-brand-forest mt-0.5">
                No Aprovechables
              </h4>
              <p className="text-xs text-brand-muted mt-2 leading-relaxed">
                Fracción mínima no recuperable identificada para contabilizar y buscar activamente su sustitución técnica.
              </p>
            </button>
          </div>
        </div>

        <div className="bg-brand-paper border border-brand-border rounded-3xl p-6 sm:p-10 shadow-soft space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-brand-border/60 pb-4">
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-wider text-brand-emerald">
                INGENIERÍA DE EMPAQUE
              </span>
              <h3 className="font-editorial text-2xl text-brand-forest font-light">
                “Cada material que no necesitamos también es una decisión.”
              </h3>
            </div>
            <ClaimBadge status="IN_PROGRESS" evidence="Búsqueda de reducción del gramaje plástico y diseño monocapa." />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 flex flex-col items-center justify-center p-8 bg-brand-cream/60 rounded-2xl border border-brand-border min-h-[300px] relative overflow-hidden">
              <div className="relative w-48 space-y-3 transition-all duration-500">
                <div
                  className={`p-3 rounded-xl bg-brand-forest text-brand-paper text-xs font-mono text-center shadow-md transition-all duration-500 ${
                    showLayers ? "-translate-y-4 opacity-90 scale-105" : "translate-y-0"
                  }`}
                >
                  <span>01. CAPA PROTECTORA LUZ/HUMEDAD</span>
                </div>

                <div
                  className={`p-3 rounded-xl bg-brand-emerald text-brand-paper text-xs font-mono text-center shadow-md transition-all duration-500 ${
                    showLayers ? "translate-y-0 scale-100" : "translate-y-0"
                  }`}
                >
                  <span>02. ESTRUCTURA FUNCIONAL</span>
                </div>

                <div
                  className={`p-3 rounded-xl bg-brand-leafLight text-brand-forest text-xs font-mono text-center shadow-md transition-all duration-500 ${
                    showLayers ? "translate-y-4 opacity-90 scale-95" : "translate-y-0"
                  }`}
                >
                  <span>03. CONTACTO ALIMENTARIO</span>
                </div>
              </div>

              <div className="mt-8">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleToggleLayers}
                  icon={<Layers className="w-3.5 h-3.5 text-brand-emerald" />}
                >
                  {showLayers ? "Unir Capas del Empaque" : "Ver Separación de Capas"}
                </Button>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-4 text-xs sm:text-sm text-brand-muted leading-relaxed">
              <p className="font-editorial text-lg text-brand-forest font-light leading-snug">
                Evitamos claims absolutistas de “100% ecológico”. La suplementación en polvo requiere preservar la bioactividad de los nutrientes.
              </p>
              <div className="space-y-2.5 pt-2">
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-brand-emerald shrink-0 mt-0.5" />
                  <span><strong>Funcionalidad:</strong> Garantizar la inocuidad sin conservantes artificiales añadidos.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-brand-emerald shrink-0 mt-0.5" />
                  <span><strong>Protección:</strong> Barrera estricta frente al oxígeno y la radiación ultravioleta.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-brand-emerald shrink-0 mt-0.5" />
                  <span><strong>Material Necesario:</strong> Eliminación de cajas secundarias y adornos prescindibles.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};