"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, XCircle, ShieldCheck, Mail, Phone, MapPin, Building2, ExternalLink, Search } from "lucide-react";
import { dbAdapter } from "@/lib/db";
import { Partner } from "@/content/circular";

export default function AdminAliadosPage() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [filter, setFilter] = useState<"all" | "pending" | "approved">("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadPartners();
  }, []);

  const loadPartners = () => {
    setPartners(dbAdapter.getPartners());
  };

  const handleUpdateStatus = (partner: Partner, status: "approved" | "rejected", verified: boolean) => {
    const updated: Partner = {
      ...partner,
      status,
      verified,
    };
    dbAdapter.savePartner(updated);
    loadPartners();
  };

  const filtered = partners.filter((p) => {
    const matchesFilter =
      filter === "all" ? true : filter === "pending" ? p.status === "pending" || p.status === "PENDING" : p.status === "approved" || p.status === "APPROVED";
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      (p.city || "").toLowerCase().includes(search.toLowerCase()) ||
      (p.contactEmail || "").toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#2d4231]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#f4f7f4]">
            Postulaciones de Aliados Circulares
          </h1>
          <p className="text-xs sm:text-sm text-[#a3b899] mt-1">
            Revisa, aprueba y otorga la insignia de Aliado Verificado a empresas y centros de acopio en Bolivia.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex gap-2">
          {(["all", "pending", "approved"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-xs font-semibold capitalize transition-all ${
                filter === f
                  ? "bg-[#52b788] text-[#0d140e] shadow-md shadow-[#52b788]/20"
                  : "bg-[#142317] text-[#a3b899] border border-[#2d4231] hover:border-[#52b788]"
              }`}
            >
              {f === "all" ? "Todos" : f === "pending" ? "Pendientes de Revisión" : "Aprobados"}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#a3b899]" />
          <input
            type="text"
            placeholder="Buscar aliado..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#142317] border border-[#2d4231] rounded-full pl-10 pr-4 py-2 text-xs text-[#f4f7f4] focus:outline-none focus:border-[#52b788]"
          />
        </div>
      </div>

      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="bg-[#142317] border border-[#2d4231] rounded-2xl p-12 text-center text-xs text-[#a3b899]">
            No se encontraron postulaciones en esta categoría.
          </div>
        ) : (
          filtered.map((partner) => (
            <div
              key={partner.id}
              className="bg-[#142317] border border-[#2d4231] rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-[#52b788]/40 transition-colors"
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-bold font-serif text-[#f4f7f4]">{partner.name}</h3>
                  {partner.status === "pending" && (
                    <span className="px-2.5 py-0.5 rounded-full bg-[#f4a261]/20 border border-[#f4a261]/30 text-[#f4a261] text-[10px] font-bold">
                      PENDIENTE
                    </span>
                  )}
                  {partner.verified && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#1b3d2b] border border-[#2d5a3f] text-[#52b788] text-[10px] font-bold">
                      <ShieldCheck className="w-3 h-3" /> VERIFICADO
                    </span>
                  )}
                </div>

                <p className="text-xs text-[#a3b899] line-clamp-2">{partner.description}</p>

                <div className="flex flex-wrap gap-4 text-[11px] text-[#74c69d] pt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#52b788]" /> {partner.city}, {partner.address || "Bolivia"}
                  </span>
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-[#52b788]" /> {partner.contactEmail}
                  </span>
                  {partner.phone && (
                    <span className="flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-[#52b788]" /> {partner.phone}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                {partner.status === "pending" ? (
                  <>
                    <button
                      onClick={() => handleUpdateStatus(partner, "approved", true)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#52b788] text-[#0d140e] font-bold text-xs hover:bg-[#74c69d] transition-colors"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" /> Aprobar y Verificar
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(partner, "rejected", false)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#2a1818] text-[#e63946] font-bold text-xs hover:bg-[#3d2020] transition-colors"
                    >
                      <XCircle className="w-3.5 h-3.5" /> Rechazar
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleUpdateStatus(partner, "approved", !partner.verified)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1b3d2b] border border-[#2d5a3f] text-[#52b788] font-bold text-xs hover:bg-[#2d5a3f] transition-colors"
                  >
                    {partner.verified ? "Desactivar Verificación" : "Marcar Verificado"}
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
