"use client";

import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, CheckCircle2, XCircle, Search, MapPin } from "lucide-react";
import { dbAdapter } from "@/lib/db";
import { CollectionPoint } from "@/content/circular";

export default function AdminPuntosPage() {
  const [points, setPoints] = useState<CollectionPoint[]>([]);
  const [search, setSearch] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<CollectionPoint>>({});

  useEffect(() => {
    loadPoints();
  }, []);

  const loadPoints = () => {
    setPoints(dbAdapter.getCollectionPoints());
  };

  const handleCreateNew = () => {
    setFormData({
      id: `pt_${Date.now()}`,
      name: "",
      city: "Cochabamba",
      address: "",
      schedule: "Lun - Vie: 09:00 - 18:00",
      acceptedMaterials: ["Frascos de vidrio ámbar", "Tapas PEAD", "Blísteres limpios"],
      status: "ACTIVE",
      coordinates: { lat: -17.3935, lng: -66.157 },
      phone: "+591 70000000",
    });
    setIsEditing(true);
  };

  const handleEdit = (pt: CollectionPoint) => {
    setFormData(pt);
    setIsEditing(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.address) return;
    dbAdapter.saveCollectionPoint(formData as CollectionPoint);
    setIsEditing(false);
    loadPoints();
  };

  const handleDelete = (id: string) => {
    if (!confirm("¿Eliminar este punto de acopio?")) return;
    dbAdapter.deleteCollectionPoint(id);
    loadPoints();
  };

  const filtered = points.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.city.toLowerCase().includes(search.toLowerCase()) ||
      p.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#2d4231]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#f4f7f4]">
            Puntos de Acopio Oficiales
          </h1>
          <p className="text-xs sm:text-sm text-[#a3b899] mt-1">
            Gestiona los centros de retorno para devolución de envases de Angles Natural en Bolivia.
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#52b788] text-[#0d140e] font-bold text-xs hover:bg-[#74c69d] transition-colors"
        >
          <Plus className="w-4 h-4" /> Agregar Punto de Acopio
        </button>
      </div>

      <div className="space-y-4">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#a3b899]" />
          <input
            type="text"
            placeholder="Buscar por ciudad o nombre..."
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
                  <th className="p-4">Nombre y Ciudad</th>
                  <th className="p-4">Dirección</th>
                  <th className="p-4">Horario</th>
                  <th className="p-4">Estado</th>
                  <th className="p-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2d4231]">
                {filtered.map((pt) => (
                  <tr key={pt.id} className="hover:bg-[#1b3d2b]/40 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-[#f4f7f4]">{pt.name}</div>
                      <div className="text-[11px] text-[#52b788] font-semibold">{pt.city}</div>
                    </td>
                    <td className="p-4 text-[#a3b899] max-w-xs">{pt.address}</td>
                    <td className="p-4 text-[#a3b899]">{pt.schedule}</td>
                    <td className="p-4">
                      {pt.status === "active" ? (
                        <span className="inline-flex items-center gap-1 text-[#52b788] text-[11px] font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Activo
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[#e63946] text-[11px] font-semibold">
                          <XCircle className="w-3.5 h-3.5" /> Inactivo
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => handleEdit(pt)}
                        className="p-1.5 rounded-lg bg-[#1b3d2b] text-[#52b788] hover:bg-[#2d5a3f] transition-colors"
                        title="Editar"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(pt.id)}
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

      {/* Modal Form */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#142317] border border-[#2d4231] rounded-3xl p-6 sm:p-8 max-w-xl w-full my-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#2d4231]">
              <h2 className="text-xl font-serif font-bold text-[#f4f7f4]">
                Punto de Acopio
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
                <label className="block text-[#a3b899] font-medium mb-1">Nombre del Espacio / Tienda</label>
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
                  <label className="block text-[#a3b899] font-medium mb-1">Estado</label>
                  <select
                    value={formData.status || "active"}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full bg-[#0d140e] border border-[#2d4231] rounded-xl px-3.5 py-2 text-[#f4f7f4] focus:outline-none focus:border-[#52b788]"
                  >
                    <option value="active">Activo</option>
                    <option value="inactive">Inactivo</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#a3b899] font-medium mb-1">Dirección Exacta</label>
                <input
                  type="text"
                  required
                  value={formData.address || ""}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-[#0d140e] border border-[#2d4231] rounded-xl px-3.5 py-2 text-[#f4f7f4] focus:outline-none focus:border-[#52b788]"
                />
              </div>

              <div>
                <label className="block text-[#a3b899] font-medium mb-1">Horario de Atención</label>
                <input
                  type="text"
                  value={formData.schedule || ""}
                  onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
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
                  Guardar Punto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
