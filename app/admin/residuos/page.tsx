"use client";

import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, Search, Trash, CheckCircle2 } from "lucide-react";
import { dbAdapter } from "@/lib/db";
import { WasteItem } from "@/content/circular";

export default function AdminResiduosPage() {
  const [items, setItems] = useState<WasteItem[]>([]);
  const [search, setSearch] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<WasteItem>>({});

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = () => {
    setItems(dbAdapter.getWasteItems());
  };

  const handleCreateNew = () => {
    setFormData({
      id: `waste_${Date.now()}`,
      name: "",
      category: "otros",
      destination: "Reciclable",
      instructions: "Limpio, seco y aplastado.",
      anglesAccepted: true,
      materialDetails: "PET / Cartón / Vidrio",
    });
    setIsEditing(true);
  };

  const handleEdit = (item: WasteItem) => {
    setFormData(item);
    setIsEditing(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;
    dbAdapter.saveWasteItem(formData as WasteItem);
    setIsEditing(false);
    loadItems();
  };

  const handleDelete = (id: string) => {
    if (!confirm("¿Eliminar este residuo de la guía?")) return;
    dbAdapter.deleteWasteItem(id);
    loadItems();
  };

  const filtered = items.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      (item.destination || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#2d4231]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#f4f7f4]">
            Guía de Clasificación de Residuos
          </h1>
          <p className="text-xs sm:text-sm text-[#a3b899] mt-1">
            Alimenta la herramienta interactiva &quot;¿Dónde Va Mi Residuo?&quot; y el minijuego de separación.
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#52b788] text-[#0d140e] font-bold text-xs hover:bg-[#74c69d] transition-colors"
        >
          <Plus className="w-4 h-4" /> Agregar Residuo
        </button>
      </div>

      <div className="space-y-4">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#a3b899]" />
          <input
            type="text"
            placeholder="Buscar residuo o contenedor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#142317] border border-[#2d4231] rounded-full pl-10 pr-4 py-2 text-xs text-[#f4f7f4] focus:outline-none focus:border-[#52b788]"
          />
        </div>

        <div className="bg-[#142317] border border-[#2d4231] rounded-2xl overflow-hidden shadow-lg shadow-black/30">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0d140e] text-[#a3b899] uppercase tracking-wider border-b border-[#2d4231]">
                <tr>
                  <th className="p-4">Elemento / Residuo</th>
                  <th className="p-4">Destino Correcto</th>
                  <th className="p-4">Instrucciones de Disposición</th>
                  <th className="p-4">Recibido en Angles</th>
                  <th className="p-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2d4231]">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-[#1b3d2b]/40 transition-colors">
                    <td className="p-4 font-bold text-[#f4f7f4]">{item.name}</td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                          item.destination === "Orgánico"
                            ? "bg-[#52b788]/20 text-[#52b788] border border-[#52b788]/30"
                            : item.destination === "Reciclable"
                            ? "bg-[#457b9d]/20 text-[#a8dadc] border border-[#457b9d]/30"
                            : "bg-[#e63946]/20 text-[#f4a261] border border-[#e63946]/30"
                        }`}
                      >
                        {item.destination}
                      </span>
                    </td>
                    <td className="p-4 text-[#a3b899] max-w-xs">{item.instructions}</td>
                    <td className="p-4">
                      {item.anglesAccepted ? (
                        <span className="text-[#52b788] font-bold text-[11px] flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Sí, oficial
                        </span>
                      ) : (
                        <span className="text-[#a3b899] text-[11px]">No directo</span>
                      )}
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="p-1.5 rounded-lg bg-[#1b3d2b] text-[#52b788] hover:bg-[#2d5a3f] transition-colors"
                        title="Editar"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 rounded-lg bg-[#2a1818] text-[#e63946] hover:bg-[#3d2020] transition-colors"
                        title="Eliminar"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#142317] border border-[#2d4231] rounded-3xl p-6 sm:p-8 max-w-xl w-full my-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#2d4231]">
              <h2 className="text-xl font-serif font-bold text-[#f4f7f4]">
                Ficha de Residuo
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
                <label className="block text-[#a3b899] font-medium mb-1">Nombre del Residuo</label>
                <input
                  type="text"
                  required
                  value={formData.name || ""}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#0d140e] border border-[#2d4231] rounded-xl px-3.5 py-2 text-[#f4f7f4] focus:outline-none focus:border-[#52b788]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#a3b899] font-medium mb-1">Destino / Contenedor</label>
                  <select
                    value={formData.destination || "Reciclable"}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value as any })}
                    className="w-full bg-[#0d140e] border border-[#2d4231] rounded-xl px-3.5 py-2 text-[#f4f7f4] focus:outline-none focus:border-[#52b788]"
                  >
                    <option value="Reciclable">Reciclable (Verde/Azul)</option>
                    <option value="Orgánico">Orgánico (Marrón/Verde)</option>
                    <option value="No Reciclable">No Reciclable (Negro)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#a3b899] font-medium mb-1">¿Aceptado en Puntos Angles?</label>
                  <select
                    value={formData.anglesAccepted ? "true" : "false"}
                    onChange={(e) => setFormData({ ...formData, anglesAccepted: e.target.value === "true" })}
                    className="w-full bg-[#0d140e] border border-[#2d4231] rounded-xl px-3.5 py-2 text-[#f4f7f4] focus:outline-none focus:border-[#52b788]"
                  >
                    <option value="true">Sí (Envase Angles)</option>
                    <option value="false">No (Guía general)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#a3b899] font-medium mb-1">Instrucciones de Disposición</label>
                <textarea
                  rows={2}
                  required
                  value={formData.instructions || ""}
                  onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
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
                  Guardar Residuo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
