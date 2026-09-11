"use client";

import React, { useState } from "react";
import Link from "next/link";
import { dbAdapter } from "@/lib/db";
import { CollectionPoint } from "@/content/circular";
import { Button } from "@/components/ui/Button";
import { PartnerApplicationModal } from "@/components/circular/PartnerApplicationModal";
import { getWhatsAppPartnerLink } from "@/lib/whatsapp";
import {
  MapPin,
  Clock,
  Phone,
  CheckCircle2,
  Filter,
  Users,
  Search,
  MessageCircle,
  Building2
} from "lucide-react";

export default function PuntosRecoleccionPage() {
  const [selectedCity, setSelectedCity] = useState<string>("TODAS");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const points = dbAdapter.getCollectionPoints();
  const cities = ["TODAS", "La Paz", "Cochabamba", "Santa Cruz"];

  const filtered = points.filter((p) => {
    const matchesCity = selectedCity === "TODAS" || p.city === selectedCity;
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.partnerName || "").toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCity && matchesSearch;
  });

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 max-w-4xl">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-cream border border-brand-border text-xs font-mono text-brand-emerald uppercase">
            <MapPin className="w-3.5 h-3.5" />
            <span>DIRECTORIO DE PUNTOS ALIADOS</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-5xl text-brand-forest font-light">
            Puntos de Recolección & Retorno
          </h1>
          <p className="text-brand-muted text-sm sm:text-base leading-relaxed">
            Espacios aliados donde puedes entregar tus envases Angles y otros residuos secos clasificados para garantizar su trazabilidad y reuso.
          </p>
        </div>

        <Button variant="primary" size="md" onClick={() => setIsModalOpen(true)} icon={<Users className="w-4 h-4" />}>
          Quiero Ser Aliado
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-3xl bg-brand-cream/60 border border-brand-border">
        {/* City Tabs */}
        <div className="flex flex-wrap gap-1.5">
          {cities.map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                selectedCity === city
                  ? "bg-brand-forest text-brand-paper shadow-sm font-semibold"
                  : "bg-brand-paper hover:bg-brand-sand border border-brand-border text-brand-forest"
              }`}
            >
              {city}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-brand-muted absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por nombre o zona..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-full bg-brand-paper border border-brand-border text-xs text-brand-forest focus:outline-none focus:ring-1 focus:ring-brand-emerald"
          />
        </div>
      </div>

      {/* Points Grid / Directory */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((point) => (
            <div key={point.id} className="p-6 rounded-3xl bg-brand-cream/50 border border-brand-border space-y-5 flex flex-col justify-between shadow-soft hover:shadow-card transition-shadow">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-brand-paper border border-brand-border text-[10px] font-mono text-brand-emerald">
                    {point.city}
                  </span>
                  {point.verifiedPartner && (
                    <span className="flex items-center gap-1 text-[10px] font-mono text-brand-leaf font-semibold">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Aliado Verificado</span>
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="font-editorial text-xl text-brand-forest font-light">{point.name}</h3>
                  <p className="text-xs font-mono text-brand-muted">{point.partnerName}</p>
                </div>

                <div className="text-xs text-brand-muted space-y-1.5 pt-1">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-brand-emerald shrink-0 mt-0.5" />
                    <span>{point.address}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="w-3.5 h-3.5 text-brand-muted shrink-0 mt-0.5" />
                    <span>{point.schedule}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-brand-border/60">
                  <span className="block text-[10px] font-mono uppercase text-brand-muted mb-1.5">Materiales que recibe:</span>
                  <div className="flex flex-wrap gap-1">
                    {point.acceptedMaterials.map((mat) => (
                      <span key={mat} className="px-2 py-0.5 rounded-md bg-brand-paper border border-brand-border/60 text-[10px] text-brand-forest">
                        {mat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {point.notes && (
                <p className="text-[11px] text-brand-muted/80 italic border-t border-brand-border/40 pt-2">
                  Nota: {point.notes}
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="p-12 rounded-3xl bg-brand-cream/40 border border-dashed border-brand-border text-center space-y-4 max-w-md mx-auto">
          <Building2 className="w-10 h-10 text-brand-muted mx-auto" />
          <div className="space-y-1">
            <h3 className="font-editorial text-2xl text-brand-forest font-light">Estamos construyendo nuestra red</h3>
            <p className="text-xs text-brand-muted">
              Todavía no existen puntos públicos registrados en esta selección. ¿Tienes un comercio, gimnasio o farmacia?
            </p>
          </div>
          <Button variant="primary" size="sm" onClick={() => setIsModalOpen(true)}>
            Postula tu espacio como aliado
          </Button>
        </div>
      )}

      {/* Partner Modal Form */}
      <PartnerApplicationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}