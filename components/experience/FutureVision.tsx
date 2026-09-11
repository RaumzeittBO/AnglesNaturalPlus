"use client";

import React, { useState } from "react";
import { SITE_CONTENT } from "@/content/site";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { User } from "lucide-react";

export const FutureVision: React.FC = () => {
  const [activePillar, setActivePillar] = useState<number | null>(null);

  return (
    <section id="vision" className="relative py-20 md:py-32 px-6 bg-brand-paper bg-grain border-t border-brand-border/50">
      <div className="max-w-5xl mx-auto space-y-16">
        <SectionTitle
          chapterNumber="06"
          category="Identidad, Liderazgo & Futuro"
          title="Una empresa no es solamente aquello que vende."
          subtitle="También es aquello que decide construir. La convergencia de cinco pilares fundamentales."
          alignment="center"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 max-w-4xl mx-auto">
          {SITE_CONTENT.founderSection.pillars.map((pillar, idx) => (
            <button
              key={pillar.word}
              onClick={() => setActivePillar(idx === activePillar ? null : idx)}
              className={`p-4 rounded-2xl border text-center transition-all duration-300 ${
                activePillar === idx
                  ? "bg-brand-forest text-brand-paper border-brand-forest shadow-card -translate-y-1"
                  : "bg-brand-cream/80 text-brand-forest border-brand-border hover:bg-brand-sand/80"
              }`}
            >
              <span className="block text-[10px] font-mono opacity-60 uppercase mb-1">
                Pilar 0{idx + 1}
              </span>
              <span className="font-editorial text-lg sm:text-xl font-light tracking-wide block">
                {pillar.word}
              </span>
              <p className={`text-[11px] mt-2 leading-tight ${activePillar === idx ? "text-brand-leafLight" : "text-brand-muted"}`}>
                {pillar.desc}
              </p>
            </button>
          ))}
        </div>

        <div className="max-w-4xl mx-auto bg-brand-cream/60 border border-brand-border rounded-3xl p-6 sm:p-10 shadow-soft">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-5 flex flex-col items-center">
              <div className="relative w-48 h-60 sm:w-56 sm:h-72 rounded-3xl bg-brand-sand/70 border-2 border-brand-border overflow-hidden shadow-card flex flex-col items-center justify-center p-4 text-center">
                <div className="w-20 h-20 rounded-full bg-brand-forest/10 border border-brand-forest/20 flex items-center justify-center text-brand-forest mb-3">
                  <User className="w-10 h-10 text-brand-emerald" />
                </div>
                <span className="font-editorial text-lg text-brand-forest font-light">
                  {SITE_CONTENT.brand.founder}
                </span>
                <span className="text-[11px] font-mono text-brand-muted mt-1 uppercase">
                  {SITE_CONTENT.brand.founderTitle}
                </span>
                <span className="text-[9px] font-mono text-brand-emerald mt-2 bg-brand-paper/80 px-2 py-0.5 rounded-full border border-brand-border">
                  Fundadora
                </span>
              </div>
            </div>

            <div className="md:col-span-7 space-y-4 text-left">
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-widest text-brand-emerald">
                  MANIFIESTO DE LA FUNDADORA
                </span>
                <h3 className="font-editorial text-3xl sm:text-4xl text-brand-forest font-light">
                  “{SITE_CONTENT.founderSection.greeting}”
                </h3>
              </div>

              <div className="space-y-1 text-sm font-mono text-brand-forest font-medium border-l-2 border-brand-emerald pl-3">
                {SITE_CONTENT.founderSection.credentials.map((cred) => (
                  <p key={cred}>{cred}</p>
                ))}
              </div>

              <p className="text-xs sm:text-sm text-brand-muted leading-relaxed pt-2">
                Angles Natural nació con la convicción de que los superalimentos nativos de Bolivia —como el Tarwi y la Cañahua— poseen un potencial bioquímico extraordinario que merece ser formulado con ciencia de vanguardia y honestidad productiva.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};