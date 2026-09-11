"use client";

import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, Award, Gift, Sparkles, Sprout, Trees, ShieldCheck, CheckCircle2 } from "lucide-react";
import { dbAdapter } from "@/lib/db";
import { Reward } from "@/content/circular";

export default function AdminEcoPuntosPage() {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<Reward>>({});

  useEffect(() => {
    loadRewards();
  }, []);

  const loadRewards = () => {
    setRewards(dbAdapter.getRewards());
  };

  const handleCreateNew = () => {
    setFormData({
      id: `rw_${Date.now()}`,
      title: "",
      description: "",
      pointsCost: 50,
      category: "Descuentos",
      active: true,
    });
    setIsEditing(true);
  };

  const handleEdit = (rw: Reward) => {
    setFormData(rw);
    setIsEditing(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;
    dbAdapter.saveReward(formData as Reward);
    setIsEditing(false);
    loadRewards();
  };

  const handleDelete = (id: string) => {
    if (!confirm("¿Eliminar esta recompensa del catálogo?")) return;
    dbAdapter.deleteReward(id);
    loadRewards();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#2d4231]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#f4f7f4]">
            Catálogo de Recompensas & Eco-Puntos
          </h1>
          <p className="text-xs sm:text-sm text-[#a3b899] mt-1">
            Administra los premios e incentivos canjeables por puntos de retorno ecológico.
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#52b788] text-[#0d140e] font-bold text-xs hover:bg-[#74c69d] transition-colors"
        >
          <Plus className="w-4 h-4" /> Nueva Recompensa
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rewards.map((rw) => (
          <div
            key={rw.id}
            className="bg-[#142317] border border-[#2d4231] rounded-2xl p-6 flex flex-col justify-between space-y-4 hover:border-[#52b788]/40 transition-colors"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-[#52b788]/20 border border-[#52b788]/30 text-[#52b788] text-xs font-bold">
                  {rw.pointsCost} PUNTOS
                </span>
                <span className="text-[11px] text-[#a3b899] uppercase font-semibold">
                  {rw.category}
                </span>
              </div>
              <h3 className="text-lg font-bold font-serif text-[#f4f7f4]">{rw.title}</h3>
              <p className="text-xs text-[#a3b899]">{rw.description}</p>
            </div>

            <div className="pt-4 border-t border-[#2d4231] flex justify-end gap-2">
              <button
                onClick={() => handleEdit(rw)}
                className="p-1.5 rounded-lg bg-[#1b3d2b] text-[#52b788] hover:bg-[#2d5a3f] transition-colors"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleDelete(rw.id)}
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
                Detalles de Recompensa
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
                <label className="block text-[#a3b899] font-medium mb-1">Título del Beneficio</label>
                <input
                  type="text"
                  required
                  value={formData.title || ""}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-[#0d140e] border border-[#2d4231] rounded-xl px-3.5 py-2 text-[#f4f7f4] focus:outline-none focus:border-[#52b788]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#a3b899] font-medium mb-1">Costo en Eco-Puntos</label>
                  <input
                    type="number"
                    required
                    value={formData.pointsCost || 0}
                    onChange={(e) => setFormData({ ...formData, pointsCost: Number(e.target.value) })}
                    className="w-full bg-[#0d140e] border border-[#2d4231] rounded-xl px-3.5 py-2 text-[#f4f7f4] focus:outline-none focus:border-[#52b788]"
                  />
                </div>
                <div>
                  <label className="block text-[#a3b899] font-medium mb-1">Categoría</label>
                  <select
                    value={formData.category || "Descuentos"}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-[#0d140e] border border-[#2d4231] rounded-xl px-3.5 py-2 text-[#f4f7f4] focus:outline-none focus:border-[#52b788]"
                  >
                    <option value="Descuentos">Descuentos</option>
                    <option value="Impacto">Impacto / Árboles</option>
                    <option value="Merchandising">Merchandising Sostenible</option>
                    <option value="Experiencias">Experiencias / Laboratorio</option>
                  </select>
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
                  Guardar Recompensa
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
