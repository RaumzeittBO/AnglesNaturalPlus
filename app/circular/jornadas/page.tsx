"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, Users, Award, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import { dbAdapter } from "@/lib/db";
import { CircularEvent } from "@/content/circular";

export default function JornadasPage() {
  const [events, setEvents] = useState<CircularEvent[]>([]);
  const [registered, setRegistered] = useState<string | null>(null);
  const [emailInput, setEmailInput] = useState<Record<string, string>>({});

  useEffect(() => {
    setEvents(dbAdapter.getEvents());
  }, []);

  const handleRegister = (eventId: string) => {
    const email = emailInput[eventId];
    if (!email) return;
    setRegistered(eventId);
  };

  const upcomingEvents = events.filter((e) => e.status === "upcoming");
  const pastEvents = events.filter((e) => e.status === "completed");

  return (
    <div className="min-h-screen bg-[#0d140e] text-[#f4f7f4] pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b3d2b] border border-[#2d5a3f] text-[#52b788] text-xs font-semibold">
            <Calendar className="w-3.5 h-3.5" /> Activaciones Presenciales
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif text-[#f4f7f4] tracking-tight">
            Jornadas de Acopio Comunitario
          </h1>
          <p className="text-base text-[#a3b899] leading-relaxed">
            Encuentros presenciales en ferias, plazas y universidades de Bolivia para devolver envases, recibir asesoría nutricional, ganar Eco-Puntos y conectar con la comunidad sostenible.
          </p>
        </div>

        {/* Upcoming Events */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-[#2d4231] pb-4">
            <Sparkles className="w-5 h-5 text-[#52b788]" />
            <h2 className="text-2xl font-serif text-[#f4f7f4]">Próximas Jornadas</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingEvents.map((evt) => (
              <motion.div
                key={evt.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#142317] border border-[#2d5a3f] rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-xl shadow-black/40"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-[#52b788]/20 border border-[#52b788]/40 text-[#52b788] text-xs font-bold">
                      JORNADA ABIERTA
                    </span>
                    <span className="text-xs text-[#a3b899] flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#52b788]" /> {evt.time}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold font-serif text-[#f4f7f4]">{evt.title}</h3>
                  <p className="text-sm text-[#a3b899] leading-relaxed">{evt.description}</p>

                  <div className="space-y-2 pt-2 text-xs text-[#c0d6b9]">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#52b788] shrink-0" />
                      <span className="font-semibold text-[#f4f7f4]">Fecha:</span> {new Date(evt.date).toLocaleDateString("es-BO", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#52b788] shrink-0" />
                      <span className="font-semibold text-[#f4f7f4]">Lugar:</span> {evt.location}, {evt.city}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-[#2d4231]">
                  {registered === evt.id ? (
                    <div className="p-3 rounded-xl bg-[#1b3d2b] border border-[#2d5a3f] text-[#52b788] text-xs font-bold flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-4 h-4" /> ¡Registro confirmado! Te esperamos.
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="email"
                        placeholder="Tu correo para recordatorio..."
                        value={emailInput[evt.id] || ""}
                        onChange={(e) => setEmailInput({ ...emailInput, [evt.id]: e.target.value })}
                        className="flex-1 bg-[#0d140e] border border-[#2d4231] rounded-full px-4 py-2.5 text-xs text-[#f4f7f4] focus:outline-none focus:border-[#52b788]"
                      />
                      <button
                        onClick={() => handleRegister(evt.id)}
                        className="px-5 py-2.5 rounded-full bg-[#52b788] text-[#0d140e] font-bold text-xs hover:bg-[#74c69d] transition-colors shrink-0"
                      >
                        Anotarme
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Past Events & Impact */}
        {pastEvents.length > 0 && (
          <div className="space-y-6 pt-12 border-t border-[#2d4231]">
            <h2 className="text-2xl font-serif text-[#f4f7f4]">Jornadas Concluidas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pastEvents.map((evt) => (
                <div
                  key={evt.id}
                  className="bg-[#142317]/60 border border-[#2d4231] rounded-2xl p-6 space-y-3 opacity-90"
                >
                  <div className="flex items-center justify-between text-xs text-[#a3b899]">
                    <span>{evt.city}</span>
                    <span>{evt.date}</span>
                  </div>
                  <h3 className="text-lg font-bold font-serif text-[#f4f7f4]">{evt.title}</h3>
                  <p className="text-xs text-[#a3b899]">{evt.description}</p>
                  {evt.resultSummary && (
                    <div className="p-3 rounded-xl bg-[#1b3d2b]/50 border border-[#2d5a3f] text-xs text-[#52b788] font-semibold flex items-center gap-2">
                      <Award className="w-4 h-4 shrink-0" />
                      <span>{evt.resultSummary}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
