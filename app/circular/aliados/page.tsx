"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Award, Building2, MapPin, ExternalLink, PlusCircle, ShieldCheck, ArrowRight } from "lucide-react";
import { PartnerApplicationModal } from "@/components/circular/PartnerApplicationModal";
import { dbAdapter } from "@/lib/db";
import { Partner } from "@/content/circular";

export default function AliadosPage() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [selectedType, setSelectedType] = useState<string>("all");
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const data = dbAdapter.getPartners();
    setPartners(data.filter((p) => p.status === "approved" || p.status === "APPROVED" || p.verified));
  }, []);

  const partnerTypes = [
    { id: "all", label: "Todos los Aliados" },
    { id: "acopio", label: "Puntos de Acopio" },
    { id: "transformacion", label: "Transformadores de Materia" },
    { id: "educacion", label: "Educación y Comunidad" },
    { id: "recoleccion", label: "Operadores Logísticos" },
  ];

  const filteredPartners = selectedType === "all"
    ? partners
    : partners.filter((p) => p.type === selectedType);

  return (
    <div className="min-h-screen bg-[#0d140e] text-[#f4f7f4] pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#2d4231]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b3d2b] border border-[#2d5a3f] text-[#52b788] text-xs font-semibold mb-3">
              <Building2 className="w-3.5 h-3.5" /> Red de Economía Circular
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif text-[#f4f7f4] tracking-tight">
              Aliados Circulares
            </h1>
            <p className="mt-3 text-base text-[#a3b899] max-w-2xl">
              Negocios, tiendas saludables, transformadores locales y centros educativos que impulsan junto a nosotros la recuperación de envases y la educación sostenible en Bolivia.
            </p>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#2d6a4f] to-[#52b788] text-[#0d140e] font-bold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-[#52b788]/20"
          >
            <PlusCircle className="w-4 h-4" /> Postular mi Espacio / Negocio
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {partnerTypes.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedType(t.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                selectedType === t.id
                  ? "bg-[#52b788] text-[#0d140e] shadow-md shadow-[#52b788]/20"
                  : "bg-[#142317] text-[#a3b899] border border-[#2d4231] hover:border-[#52b788]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPartners.map((partner) => (
            <motion.div
              key={partner.id}
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#142317] border border-[#2d4231] rounded-2xl p-6 flex flex-col justify-between hover:border-[#52b788]/50 transition-colors group"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#1b3d2b] border border-[#2d5a3f] flex items-center justify-center text-[#52b788] font-bold text-lg font-serif">
                    {partner.name.charAt(0)}
                  </div>
                  {partner.verified && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1b3d2b] border border-[#2d5a3f] text-[#52b788] text-xs font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5" /> Aliado Verificado
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold font-serif text-[#f4f7f4] group-hover:text-[#52b788] transition-colors">
                  {partner.name}
                </h3>
                <div className="inline-flex items-center gap-1.5 text-xs text-[#74c69d] mt-1 mb-3">
                  <MapPin className="w-3.5 h-3.5" /> {partner.city}, Bolivia
                </div>
                <p className="text-sm text-[#a3b899] line-clamp-3">
                  {partner.description}
                </p>

                {partner.impactSummary && (
                  <div className="mt-4 p-3 rounded-xl bg-[#0d140e]/60 border border-[#2d4231] text-xs space-y-1">
                    <span className="text-[#a3b899] font-medium block">Aporte a la red:</span>
                    <span className="text-[#52b788] font-bold">{partner.impactSummary}</span>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-[#2d4231] flex items-center justify-between">
                <Link
                  href={`/circular/aliados/${partner.slug || partner.id}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#52b788] hover:text-[#74c69d] transition-colors"
                >
                  Ver Perfil de Aliado <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                {partner.website && (
                  <a
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#a3b899] hover:text-[#f4f7f4] transition-colors flex items-center gap-1"
                  >
                    Web <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-[#142317] to-[#1b3d2b] border border-[#2d5a3f] rounded-3xl p-8 sm:p-12 text-center max-w-3xl mx-auto space-y-6">
          <div className="w-16 h-16 rounded-full bg-[#52b788]/20 border border-[#52b788]/40 flex items-center justify-center mx-auto text-[#52b788]">
            <Award className="w-8 h-8" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#f4f7f4]">
            ¿Tienes un espacio comprometido con el ambiente?
          </h2>
          <p className="text-[#a3b899] text-sm sm:text-base leading-relaxed">
            Súmate como Punto Oficial de Retorno de Envases o Aliado de Transformación. Visibilizaremos tu espacio en nuestro mapa interactivo y recibirás incentivos ecológicos para tu comunidad.
          </p>
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#52b788] text-[#0d140e] font-bold text-sm hover:bg-[#74c69d] transition-colors shadow-lg shadow-[#52b788]/20"
          >
            Comenzar Postulación
          </button>
        </div>
      </div>

      <PartnerApplicationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
