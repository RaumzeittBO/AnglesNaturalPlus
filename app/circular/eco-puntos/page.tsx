"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Award, Gift, Sparkles, Sprout, Trees, ShieldCheck, CheckCircle2, ArrowRight } from "lucide-react";
import { dbAdapter } from "@/lib/db";
import { Reward } from "@/content/circular";

export default function EcoPuntosPage() {
  const [rewards, setRewards] = useState<Reward[]>([]);

  useEffect(() => {
    setRewards(dbAdapter.getRewards());
  }, []);

  const levels = [
    { name: "Semilla", range: "0 - 49 pts", desc: "Iniciando tu camino de retorno responsable", icon: Sprout },
    { name: "Brote", range: "50 - 149 pts", desc: "Consistencia en hábitos y devolución regular", icon: Sparkles },
    { name: "Raíz", range: "150 - 299 pts", desc: "Pilar activo de la comunidad circular boliviana", icon: ShieldCheck },
    { name: "Bosque", range: "300+ pts", desc: "Embajador ambiental con acceso a experiencias VIP", icon: Trees },
  ];

  return (
    <div className="min-h-screen bg-[#0d140e] text-[#f4f7f4] pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b3d2b] border border-[#2d5a3f] text-[#52b788] text-xs font-semibold">
            <Award className="w-3.5 h-3.5" /> Próximamente • Sistema de Incentivos Verificados
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif text-[#f4f7f4] tracking-tight">
            Angles Eco-Puntos & Recompensas
          </h1>
          <p className="text-base text-[#a3b899] leading-relaxed">
            Cada envase de Microbiota, Artromag o Kit de Mascotas que retornes se convertirá en Eco-Puntos canjeables por descuentos, donaciones a albergues de rescate y beneficios exclusivos de la comunidad.
          </p>
          <div className="p-4 rounded-2xl bg-[#142317] border border-[#52b788]/30 text-xs text-[#52b788] max-w-lg mx-auto flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 shrink-0" />
            <span><strong>Fase 2 en Preparación:</strong> Este sistema se activará conjuntamente con la apertura del Taller Piloto de Cochabamba.</span>
          </div>
        </div>

        {/* Botanical Levels */}
        <div className="space-y-6">
          <h2 className="text-2xl font-serif text-[#f4f7f4] text-center">Niveles Botánicos de Impacto</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {levels.map((lvl) => {
              const Icon = lvl.icon;
              return (
                <div
                  key={lvl.name}
                  className="bg-[#142317] border border-[#2d4231] rounded-2xl p-6 flex flex-col items-center text-center space-y-3 relative overflow-hidden group hover:border-[#52b788] transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#1b3d2b] border border-[#2d5a3f] flex items-center justify-center text-[#52b788]">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-[#f4f7f4]">{lvl.name}</h3>
                  <span className="px-3 py-1 rounded-full bg-[#52b788]/20 text-[#52b788] text-xs font-bold">
                    {lvl.range}
                  </span>
                  <p className="text-xs text-[#a3b899]">{lvl.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Rewards Catalog */}
        <div className="space-y-8">
          <div className="flex items-center gap-3 border-b border-[#2d4231] pb-4">
            <Gift className="w-5 h-5 text-[#52b788]" />
            <h2 className="text-2xl font-serif text-[#f4f7f4]">Catálogo de Recompensas</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rewards.map((rw) => (
              <div
                key={rw.id}
                className="bg-[#142317] border border-[#2d4231] rounded-3xl p-6 flex flex-col justify-between space-y-4 hover:border-[#52b788]/40 transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-[#52b788]/20 border border-[#52b788]/40 text-[#52b788] text-xs font-bold">
                      {rw.pointsCost} PUNTOS
                    </span>
                    <span className="text-[11px] text-[#a3b899] uppercase tracking-wider font-semibold">
                      {rw.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-serif font-bold text-[#f4f7f4]">{rw.title}</h3>
                  <p className="text-sm text-[#a3b899]">{rw.description}</p>
                </div>

                <div className="pt-4 border-t border-[#2d4231] flex items-center justify-between">
                  <span className="text-xs text-[#74c69d] font-semibold">Canje disponible</span>
                  <button
                    onClick={() => alert(`Para canjear "${rw.title}", entrega tus envases en un punto oficial y solicita tu voucher con tu número de teléfono.`)}
                    className="px-4 py-2 rounded-full bg-[#1b3d2b] border border-[#2d5a3f] text-[#52b788] text-xs font-bold hover:bg-[#2d5a3f] transition-colors"
                  >
                    Cómo Canjear
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
