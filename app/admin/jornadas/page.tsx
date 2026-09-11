"use client";

import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, Calendar, MapPin, Award, CheckCircle2, Clock } from "lucide-react";
import { dbAdapter } from "@/lib/db";
import { CircularEvent } from "@/content/circular";

export default function AdminJornadasPage() {
  const [events, setEvents] = useState<CircularEvent[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<CircularEvent>>({});

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = () => {
    setEvents(dbAdapter.getEvents());
  };

  const handleCreateNew = () => {
    setFormData({
      id: `evt_${Date.now()}`,
      title: "",
      date: new Date().toISOString().split("T")[0],
      time: "09:00 - 15:00",
      location: "",
      city: "Cochabamba",
      description: "",
      status: "upcoming",
      resultSummary: "",
    });
    setIsEditing(true);
  };

  const handleEdit = (evt: CircularEvent) => {
    setFormData(evt);
    setIsEditing(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.date) return;
    dbAdapter.saveEvent(formData as CircularEvent);
    setIsEditing(false);
    loadEvents();
  };

  const handleDelete = (id: string) => {
    if (!confirm("¿Eliminar este evento/jornada?")) return;
    dbAdapter.deleteEvent(id);
    loadEvents();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#2d4231]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#f4f7f4]">
            Jornadas de Acopio y Eventos
          </h1>
          <p className="text-xs sm:text-sm text-[#a3b899] mt-1">
            Crea nuevas jornadas presenciales y registra los resultados de impacto logrados.
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#52b788] text-[#0d140e] font-bold text-xs hover:bg-[#74c69d] transition-colors"
        >
          <Plus className="w-4 h-4" /> Programar Jornada
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((evt) => (
          <div
            key={evt.id}
            className="bg-[#142317] border border-[#2d4231] rounded-2xl p-6 space-y-4 flex flex-col justify-between hover:border-[#52b788]/40 transition-colors"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span
                  className={`px-3 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                    evt.status === "upcoming"
                      ? "bg-[#52b788]/20 text-[#52b788] border border-[#52b788]/30"
                      : "bg-[#a3b899]/20 text-[#a3b899] border border-[#a3b899]/30"
                  }`}
                >
                  {evt.status === "upcoming" ? "Próxima" : "Concluida"}
                </span>
                <span className="text-xs text-[#a3b899] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#52b788]" /> {evt.time}
                </span>
              </div>

              <h3 className="text-lg font-bold font-serif text-[#f4f7f4]">{evt.title}</h3>
              <p className="text-xs text-[#a3b899]">{evt.description}</p>

              <div className="text-xs text-[#74c69d] space-y-1 pt-1">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#52b788]" /> {evt.date}
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#52b788]" /> {evt.location}, {evt.city}
                </div>
              </div>

              {evt.resultSummary && (
                <div className="p-3 rounded-xl bg-[#1b3d2b]/60 border border-[#2d5a3f] text-xs text-[#52b788] flex items-center gap-2">
                  <Award className="w-4 h-4 shrink-0" />
                  <span>{evt.resultSummary}</span>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-[#2d4231] flex justify-end gap-2">
              <button
                onClick={() => handleEdit(evt)}
                className="px-3 py-1.5 rounded-lg bg-[#1b3d2b] text-[#52b788] text-xs font-semibold hover:bg-[#2d5a3f] transition-colors flex items-center gap-1"
              >
                <Edit2 className="w-3 h-3" /> Editar / Registrar Resultados
              </button>
              <button
                onClick={() => handleDelete(evt.id)}
                className="p-1.5 rounded-lg bg-[#2a1818] text-[#e63946] hover:bg-[#3d2020] transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#142317] border border-[#2d4231] rounded-3xl p-6 sm:p-8 max-w-xl w-full my-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#2d4231]">
              <h2 className="text-xl font-serif font-bold text-[#f4f7f4]">
                Detalles de Jornada
              </h2>
              <button
                onClick={() => setIsEditing(false)}
                className="text-xs text-[#a3b899] hover:text-[#f4f7f4]"
              >
                Cerrar
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#a3b899] font-medium mb-1">Título de la Jornada</label>
                <input
                  type="text"
                  required
                  value={formData.title || ""}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-[#0d140e] border border-[#2d4231] rounded-xl px-3.5 py-2 text-[#f4f7f4] focus:outline-none focus:border-[#52b788]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[#a3b899] font-medium mb-1">Fecha</label>
                  <input
                    type="date"
                    required
                    value={formData.date || ""}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-[#0d140e] border border-[#2d4231] rounded-xl px-3.5 py-2 text-[#f4f7f4] focus:outline-none focus:border-[#52b788]"
                  />
                </div>
                <div>
                  <label className="block text-[#a3b899] font-medium mb-1">Horario</label>
                  <input
                    type="text"
                    value={formData.time || ""}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full bg-[#0d140e] border border-[#2d4231] rounded-xl px-3.5 py-2 text-[#f4f7f4] focus:outline-none focus:border-[#52b788]"
                  />
                </div>
                <div>
                  <label className="block text-[#a3b899] font-medium mb-1">Estado</label>
                  <select
                    value={formData.status || "upcoming"}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full bg-[#0d140e] border border-[#2d4231] rounded-xl px-3.5 py-2 text-[#f4f7f4] focus:outline-none focus:border-[#52b788]"
                  >
                    <option value="upcoming">Próxima</option>
                    <option value="completed">Concluida</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#a3b899] font-medium mb-1">Ciudad</label>
                  <select
                    value={formData.city || "Cochabamba"}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-[#0d140e] border border-[#2d4231] rounded-xl px-3.5 py-2 text-[#f4f7f4] focus:outline-none focus:border-[#52b788]"
                  >
                    <option value="Cochabamba">Cochabamba</option>
                    <option value="La Paz">La Paz</option>
                    <option value="Santa Cruz">Santa Cruz</option>
                    <option value="Sucre">Sucre</option>
                    <option value="Tarija">Tarija</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#a3b899] font-medium mb-1">Lugar Exacto</label>
                  <input
                    type="text"
                    required
                    value={formData.location || ""}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full bg-[#0d140e] border border-[#2d4231] rounded-xl px-3.5 py-2 text-[#f4f7f4] focus:outline-none focus:border-[#52b788]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#a3b899] font-medium mb-1">Descripción</label>
                <textarea
                  rows={2}
                  value={formData.description || ""}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-[#0d140e] border border-[#2d4231] rounded-xl px-3.5 py-2 text-[#f4f7f4] focus:outline-none focus:border-[#52b788]"
                />
              </div>

              <div>
                <label className="block text-[#a3b899] font-medium mb-1">
                  Resumen de Resultados (Al concluir la jornada)
                </label>
                <input
                  type="text"
                  placeholder="Ej: 140 envases recuperados, 28 participantes registrados"
                  value={formData.resultSummary || ""}
                  onChange={(e) => setFormData({ ...formData, resultSummary: e.target.value })}
                  className="w-full bg-[#0d140e] border border-[#2d4231] rounded-xl px-3.5 py-2 text-[#f4f7f4] focus:outline-none focus:border-[#52b788]"
                />
              </div>

              <div className="pt-4 border-t border-[#2d4231] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-5 py-2 rounded-full bg-[#1b3d2b] text-[#a3b899] font-bold hover:text-[#f4f7f4]"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-[#52b788] text-[#0d140e] font-bold hover:bg-[#74c69d]"
                >
                  Guardar Jornada
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
