"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Building2, MapPin, Phone, Mail, Globe, ShieldCheck, CheckCircle2, Award, Calendar } from "lucide-react";
import { dbAdapter } from "@/lib/db";
import { Partner } from "@/content/circular";

export default function AliadoDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  const [partner, setPartner] = useState<Partner | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    const data = dbAdapter.getPartners();
    const found = data.find((p) => p.slug === slug || p.id === slug);
    setPartner(found || null);
    setLoading(false);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d140e] text-[#f4f7f4] pt-32 pb-20 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#52b788] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!partner) {
    return (
      <div className="min-h-screen bg-[#0d140e] text-[#f4f7f4] pt-32 pb-20 px-4 text-center">
        <h1 className="text-2xl font-serif text-[#f4f7f4]">Aliado no encontrado</h1>
        <p className="text-[#a3b899] mt-2">El aliado que buscas no existe o aún no ha sido verificado.</p>
        <Link href="/circular/aliados" className="inline-block mt-6 px-6 py-2.5 rounded-full bg-[#52b788] text-[#0d140e] font-bold text-sm">
          Volver al directorio
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d140e] text-[#f4f7f4] pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <Link
          href="/circular/aliados"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#a3b899] hover:text-[#52b788] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Volver a Aliados Circulares
        </Link>

        {/* Hero Card */}
        <div className="bg-[#142317] border border-[#2d4231] rounded-3xl p-6 sm:p-10 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-[#2d4231]">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#1b3d2b] border border-[#2d5a3f] flex items-center justify-center text-[#52b788] font-bold text-2xl font-serif">
                {partner.name.charAt(0)}
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#f4f7f4]">
                  {partner.name}
                </h1>
                <div className="inline-flex items-center gap-2 text-xs text-[#74c69d] mt-1">
                  <MapPin className="w-3.5 h-3.5" /> {partner.city}, Bolivia • {(partner.type || partner.businessType || "ALIADO").toUpperCase()}
                </div>
              </div>
            </div>

            {partner.verified && (
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#1b3d2b] border border-[#2d5a3f] text-[#52b788] text-xs font-bold">
                <ShieldCheck className="w-4 h-4" /> Aliado Oficial Verificado
              </span>
            )}
          </div>

          <div className="py-6 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#74c69d]">Sobre este Aliado</h3>
            <p className="text-sm sm:text-base text-[#a3b899] leading-relaxed">
              {partner.description}
            </p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-[#2d4231]">
            {partner.address && (
              <div className="p-4 rounded-xl bg-[#0d140e]/60 border border-[#2d4231] space-y-1">
                <div className="text-xs text-[#a3b899] flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#52b788]" /> Dirección
                </div>
                <div className="text-sm text-[#f4f7f4] font-medium">{partner.address}</div>
              </div>
            )}

            {partner.contactEmail && (
              <div className="p-4 rounded-xl bg-[#0d140e]/60 border border-[#2d4231] space-y-1">
                <div className="text-xs text-[#a3b899] flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#52b788]" /> Contacto
                </div>
                <div className="text-sm text-[#f4f7f4] font-medium">{partner.contactEmail}</div>
              </div>
            )}

            {partner.phone && (
              <div className="p-4 rounded-xl bg-[#0d140e]/60 border border-[#2d4231] space-y-1">
                <div className="text-xs text-[#a3b899] flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#52b788]" /> Teléfono
                </div>
                <div className="text-sm text-[#f4f7f4] font-medium">{partner.phone}</div>
              </div>
            )}

            {partner.website && (
              <div className="p-4 rounded-xl bg-[#0d140e]/60 border border-[#2d4231] space-y-1">
                <div className="text-xs text-[#a3b899] flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-[#52b788]" /> Sitio Web
                </div>
                <a
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#52b788] hover:underline font-medium break-all"
                >
                  {partner.website}
                </a>
              </div>
            )}
          </div>

          {partner.impactSummary && (
            <div className="mt-6 p-5 rounded-2xl bg-gradient-to-br from-[#1b3d2b] to-[#142317] border border-[#2d5a3f] flex items-start gap-4">
              <Award className="w-6 h-6 text-[#52b788] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-[#f4f7f4]">Aporte Comunitario</h4>
                <p className="text-xs sm:text-sm text-[#a3b899] mt-1">{partner.impactSummary}</p>
              </div>
            </div>
          )}
        </div>

        {/* Action button */}
        <div className="flex flex-wrap gap-4 justify-between items-center bg-[#142317] p-6 rounded-2xl border border-[#2d4231]">
          <div>
            <h3 className="text-sm font-bold text-[#f4f7f4]">¿Deseas entregar tus envases aquí?</h3>
            <p className="text-xs text-[#a3b899] mt-0.5">Revisa los puntos de acopio oficiales o consulta cómo preparar tu entrega.</p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/circular/devuelve"
              className="px-5 py-2.5 rounded-full bg-[#52b788] text-[#0d140e] font-bold text-xs hover:bg-[#74c69d] transition-colors"
            >
              Cómo preparar mi envase
            </Link>
            <Link
              href="/circular/puntos"
              className="px-5 py-2.5 rounded-full bg-[#1b3d2b] border border-[#2d5a3f] text-[#52b788] font-bold text-xs hover:bg-[#2d5a3f] transition-colors"
            >
              Ver en Mapa
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
