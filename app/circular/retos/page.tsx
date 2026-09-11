"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Flame, Trophy, Award, CheckCircle2, Clock, Users, ArrowRight, ShieldCheck } from "lucide-react";
import { dbAdapter } from "@/lib/db";
import { Challenge } from "@/content/circular";

export default function RetosPage() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [joined, setJoined] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setChallenges(dbAdapter.getChallenges());
    const saved = localStorage.getItem("angles_joined_challenges");
    if (saved) {
      try {
        setJoined(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  const handleJoin = (id: string) => {
    const updated = { ...joined, [id]: true };
    setJoined(updated);
    localStorage.setItem("angles_joined_challenges", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-[#0d140e] text-[#f4f7f4] pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b3d2b] border border-[#2d5a3f] text-[#52b788] text-xs font-semibold">
            <Flame className="w-3.5 h-3.5 text-[#f4a261]" /> Hábitos Circulares en Comunidad
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif text-[#f4f7f4] tracking-tight">
            Retos de Sostenibilidad
          </h1>
          <p className="text-base text-[#a3b899] leading-relaxed">
            Pequeños cambios cotidianos que generan grandes transformaciones colectivas. Participa, acumula Eco-Puntos y comparte tus logros.
          </p>
        </div>

        {/* Challenges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challenges.map((ch) => {
            const isJoined = !!joined[ch.id];
            return (
              <motion.div
                key={ch.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#142317] border border-[#2d4231] rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 hover:border-[#52b788]/50 transition-colors shadow-lg shadow-black/40"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-[#1b3d2b] border border-[#2d5a3f] text-[#52b788] text-xs font-bold">
                      +{ch.pointsReward} ECO-PUNTOS
                    </span>
                    <span className="text-xs text-[#a3b899] flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {ch.duration}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold font-serif text-[#f4f7f4]">
                    {ch.title}
                  </h3>
                  <p className="text-sm text-[#a3b899] leading-relaxed">
                    {ch.description}
                  </p>

                  <div className="space-y-2 pt-2">
                    <div className="text-xs font-semibold text-[#74c69d] uppercase tracking-wider">
                      Instrucciones Clave:
                    </div>
                    <ul className="space-y-1.5">
                      {ch.instructions?.map((inst: string, idx: number) => (
                        <li key={idx} className="text-xs text-[#c0d6b9] flex items-start gap-2">
                          <span className="w-4 h-4 rounded-full bg-[#1b3d2b] text-[#52b788] flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <span>{inst}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 border-t border-[#2d4231]">
                  {isJoined ? (
                    <div className="p-3 rounded-2xl bg-[#1b3d2b] border border-[#2d5a3f] text-[#52b788] text-xs font-bold flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-4 h-4" /> ¡Reto en Curso!
                    </div>
                  ) : (
                    <button
                      onClick={() => handleJoin(ch.id)}
                      className="w-full py-3 rounded-full bg-[#52b788] text-[#0d140e] font-bold text-xs hover:bg-[#74c69d] transition-colors shadow-lg shadow-[#52b788]/20 flex items-center justify-center gap-2"
                    >
                      Unirme al Reto <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
