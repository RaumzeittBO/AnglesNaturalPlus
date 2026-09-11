"use client";

import React from "react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ClaimBadge } from "@/components/ui/ClaimBadge";
import { Heart, ArrowRight } from "lucide-react";

export const AnimalImpact: React.FC = () => {
  return (
    <section id="bienestar-animal" className="relative py-20 md:py-28 px-6 bg-brand-paper bg-grain border-t border-brand-border/50">
      <div className="max-w-5xl mx-auto space-y-14">
        <SectionTitle
          chapterNumber="05"
          category="Propósito Social & Bienestar Integral"
          title="Crecer también puede significar devolver."
          subtitle="Dentro de la visión futura de Angles Natural también está crecer hacia el bienestar de las mascotas y utilizar ese crecimiento para generar impacto real."
          alignment="center"
        />

        <div className="max-w-4xl mx-auto bg-brand-cream/60 border border-brand-border rounded-3xl p-6 sm:p-10 shadow-soft space-y-10">
          <div className="flex items-center justify-between border-b border-brand-border/70 pb-4">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-brand-emerald" />
              <span className="text-xs font-mono text-brand-forest uppercase tracking-wider">
                COMPROMISO CON LA VIDA ANIMAL
              </span>
            </div>
            <ClaimBadge status="VISION" evidence="Proyectado para activarse tras consolidar la primera fase de comercialización." />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-5 flex flex-col items-center justify-center p-8 bg-brand-paper rounded-2xl border border-brand-border/80 shadow-sm text-center space-y-4">
              <div className="w-24 h-24 rounded-full bg-brand-sand/50 border border-brand-border flex items-center justify-center text-brand-forest">
                <svg
                  className="w-14 h-14 text-brand-emerald"
                  viewBox="0 0 48 48"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 28C10 24 10 16 14 14C18 12 22 16 24 18C26 16 30 12 34 14C38 16 38 24 36 28C34 32 30 36 24 38C18 36 14 32 12 28Z" />
                  <circle cx="19" cy="22" r="1.5" fill="currentColor" />
                  <circle cx="29" cy="22" r="1.5" fill="currentColor" />
                  <path d="M22 28C23 29 25 29 26 28" />
                  <path d="M14 14C12 10 8 10 8 16C8 20 12 24 12 24" />
                  <path d="M34 14C36 10 40 10 40 16C40 20 36 24 36 24" />
                </svg>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-widest text-brand-muted">
                  Visión Futura
                </span>
                <p className="font-editorial text-lg text-brand-forest font-light">
                  Salud animal y retribución ética
                </p>
              </div>
            </div>

            <div className="md:col-span-7 space-y-4 text-xs sm:text-sm text-brand-muted leading-relaxed">
              <p className="font-editorial text-xl sm:text-2xl text-brand-forest font-light leading-snug">
                “La salud y el respeto por los animales no son un anexo decorativo. Son el reflejo de la empatía con la que creamos cada fórmula.”
              </p>
              <p>
                Como parte de la evolución natural de la marca, Andrea proyecta el desarrollo de soluciones de nutrición funcional para mascotas, canalizando recursos hacia esterilizaciones y apoyo continuo a refugios independientes en Bolivia.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-brand-border/60">
            <span className="block text-[11px] font-mono text-brand-muted uppercase mb-4 text-center">
              RUTA DE IMPACTO Y RETRIBUCIÓN:
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3 text-center">
              <div className="p-3 rounded-xl bg-brand-paper border border-brand-border shadow-sm">
                <span className="block text-[10px] font-mono text-brand-muted">01</span>
                <span className="text-xs font-semibold text-brand-forest">ANGLES NATURAL</span>
              </div>

              <div className="hidden sm:flex items-center justify-center text-brand-muted">
                <ArrowRight className="w-4 h-4" />
              </div>

              <div className="p-3 rounded-xl bg-brand-paper border border-brand-border shadow-sm">
                <span className="block text-[10px] font-mono text-brand-muted">02</span>
                <span className="text-xs font-semibold text-brand-forest">CRECIMIENTO & BIENESTAR</span>
              </div>

              <div className="hidden sm:flex items-center justify-center text-brand-muted">
                <ArrowRight className="w-4 h-4" />
              </div>

              <div className="p-3 rounded-xl bg-brand-paper border border-brand-emerald shadow-sm col-span-2 sm:col-span-1">
                <span className="block text-[10px] font-mono text-brand-emerald">03 VISIÓN</span>
                <span className="text-xs font-semibold text-brand-emerald">ALBERGUES & REFUGIOS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};