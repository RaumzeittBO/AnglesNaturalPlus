"use client";

import { useEffect, useState } from "react";
import { Plus, BarChart3, ShieldCheck, CheckCircle2, Calendar, MapPin, Scale, FileText } from "lucide-react";
import { dbAdapter } from "@/lib/db";
import { ImpactRecord } from "@/content/circular";

export default function AdminImpactoPage() {
  const [records, setRecords] = useState<ImpactRecord[]>([]);
  const [totals, setTotals] = useState({
    totalPackagesRecovered: 0,
    totalKgDiverted: 0,
    totalCo2SavedKg: 0,
    activeVolunteers: 0,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<ImpactRecord>>({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setRecords(dbAdapter.getImpactRecords());
    setTotals(dbAdapter.getImpactTotals());
  };

  const handleCreateNew = () => {
    setFormData({
      id: `imp_${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
      materialType: "Vidrio Ámbar",
      unitsCount: 50,
      weightKg: 7.5,
      co2SavedKg: 5.2,
      location: "Punto Central Angles",
      city: "Cochabamba",
      batchCode: `LOTE-${Date.now().toString().slice(-6)}`,
      verifiedBy: "Lic. Andrea Angles",
      notes: "Devolución clasificada y pesada en balanza calibrada.",
    });
    setIsEditing(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.batchCode || !formData.date) return;
    dbAdapter.saveImpactRecord(formData as ImpactRecord);
    setIsEditing(false);
    loadData();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#2d4231]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#f4f7f4]">
            Libro de Trazabilidad e Impacto
          </h1>
          <p className="text-xs sm:text-sm text-[#a3b899] mt-1">
            Cada entrada aquí alimenta en tiempo real la página pública de impacto sin cifras infladas.
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#52b788] text-[#0d140e] font-bold text-xs hover:bg-[#74c69d] transition-colors"
        >
          <Plus className="w-4 h-4" /> Registrar Lote / Pesaje
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-[#142317] border border-[#2d4231] rounded-2xl p-5">
          <div className="text-xs text-[#a3b899]">Envases Totales Registrados</div>
          <div className="text-2xl font-serif font-bold text-[#52b788] mt-1">
            {totals.totalPackagesRecovered} unidades
          </div>
        </div>
        <div className="bg-[#142317] border border-[#2d4231] rounded-2xl p-5">
          <div className="text-xs text-[#a3b899]">Peso Desviado de Basurales</div>
          <div className="text-2xl font-serif font-bold text-[#74c69d] mt-1">
            {totals.totalKgDiverted} kg
          </div>
        </div>
        <div className="bg-[#142317] border border-[#2d4231] rounded-2xl p-5">
          <div className="text-xs text-[#a3b899]">Ahorro de Huella Estimado</div>
          <div className="text-2xl font-serif font-bold text-[#95d5b2] mt-1">
            {totals.totalCo2SavedKg} kg CO2e
          </div>
        </div>
      </div>

      {/* Ledger Table */}
      <div className="bg-[#142317] border border-[#2d4231] rounded-2xl overflow-hidden shadow-lg shadow-black/30">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0d140e] text-[#a3b899] uppercase tracking-wider border-b border-[#2d4231]">
              <tr>
                <th className="p-4">Fecha & Lote</th>
                <th className="p-4">Material</th>
                <th className="p-4">Unidades</th>
                <th className="p-4">Peso (kg)</th>
                <th className="p-4">Ubicación</th>
                <th className="p-4">Verificado Por</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2d4231]">
              {records.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-[#a3b899]">
                    Aún no hay registros cargados. Haz clic en &quot;Registrar Lote / Pesaje&quot; para crear la primera entrada verificada.
                  </td>
                </tr>
              ) : (
                records.map((rec) => (
                  <tr key={rec.id} className="hover:bg-[#1b3d2b]/40 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-[#f4f7f4]">{rec.batchCode}</div>
                      <div className="text-[11px] text-[#a3b899]">{rec.date}</div>
                    </td>
                    <td className="p-4 font-semibold text-[#74c69d]">{rec.materialType}</td>
                    <td className="p-4 font-bold text-[#f4f7f4]">{rec.unitsCount} u.</td>
                    <td className="p-4 font-bold text-[#52b788]">{rec.weightKg} kg</td>
                    <td className="p-4 text-[#a3b899]">{rec.location}, {rec.city}</td>
                    <td className="p-4 text-[#52b788] font-medium flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> {rec.verifiedBy}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#142317] border border-[#2d4231] rounded-3xl p-6 sm:p-8 max-w-xl w-full my-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#2d4231]">
              <h2 className="text-xl font-serif font-bold text-[#f4f7f4]">
                Registrar Lote de Recuperación
              </h2>
              <button
                onClick={() => setIsEditing(false)}
                className="text-xs text-[#a3b899] hover:text-[#f4f7f4]"
              >
                Cerrar
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#a3b899] font-medium mb-1">Código de Lote</label>
                  <input
                    type="text"
                    required
                    value={formData.batchCode || ""}
                    onChange={(e) => setFormData({ ...formData, batchCode: e.target.value })}
                    className="w-full bg-[#0d140e] border border-[#2d4231] rounded-xl px-3.5 py-2 text-[#f4f7f4] focus:outline-none focus:border-[#52b788]"
                  />
                </div>
                <div>
                  <label className="block text-[#a3b899] font-medium mb-1">Fecha de Pesaje</label>
                  <input
                    type="date"
                    required
                    value={formData.date || ""}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-[#0d140e] border border-[#2d4231] rounded-xl px-3.5 py-2 text-[#f4f7f4] focus:outline-none focus:border-[#52b788]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[#a3b899] font-medium mb-1">Material</label>
                  <select
                    value={formData.materialType || "Vidrio Ámbar"}
                    onChange={(e) => setFormData({ ...formData, materialType: e.target.value })}
                    className="w-full bg-[#0d140e] border border-[#2d4231] rounded-xl px-3.5 py-2 text-[#f4f7f4] focus:outline-none focus:border-[#52b788]"
                  >
                    <option value="Vidrio Ámbar">Vidrio Ámbar</option>
                    <option value="Plástico PEAD">Plástico PEAD</option>
                    <option value="Blíster Aluminio">Blíster Aluminio</option>
                    <option value="Cartón y Papel">Cartón y Papel</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#a3b899] font-medium mb-1">Unidades</label>
                  <input
                    type="number"
                    required
                    value={formData.unitsCount || 0}
                    onChange={(e) => setFormData({ ...formData, unitsCount: Number(e.target.value) })}
                    className="w-full bg-[#0d140e] border border-[#2d4231] rounded-xl px-3.5 py-2 text-[#f4f7f4] focus:outline-none focus:border-[#52b788]"
                  />
                </div>
                <div>
                  <label className="block text-[#a3b899] font-medium mb-1">Peso (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={formData.weightKg || 0}
                    onChange={(e) => setFormData({ ...formData, weightKg: Number(e.target.value) })}
                    className="w-full bg-[#0d140e] border border-[#2d4231] rounded-xl px-3.5 py-2 text-[#f4f7f4] focus:outline-none focus:border-[#52b788]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#a3b899] font-medium mb-1">Ubicación / Punto</label>
                  <input
                    type="text"
                    required
                    value={formData.location || ""}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full bg-[#0d140e] border border-[#2d4231] rounded-xl px-3.5 py-2 text-[#f4f7f4] focus:outline-none focus:border-[#52b788]"
                  />
                </div>
                <div>
                  <label className="block text-[#a3b899] font-medium mb-1">Verificado Por (Responsable)</label>
                  <input
                    type="text"
                    required
                    value={formData.verifiedBy || ""}
                    onChange={(e) => setFormData({ ...formData, verifiedBy: e.target.value })}
                    className="w-full bg-[#0d140e] border border-[#2d4231] rounded-xl px-3.5 py-2 text-[#f4f7f4] focus:outline-none focus:border-[#52b788]"
                  />
                </div>
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
                  Guardar en Trazabilidad
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
