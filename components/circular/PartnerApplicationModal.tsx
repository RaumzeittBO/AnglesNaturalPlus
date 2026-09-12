"use client";

import React, { useState } from "react";
import { dbAdapter } from "@/lib/db";
import { soundFx } from "@/lib/audio";
import { X, CheckCircle2, Building2, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface PartnerApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PartnerApplicationModal: React.FC<PartnerApplicationModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    businessType: "COMERCIO" as const,
    city: "La Paz",
    description: "",
    acceptedMaterials: ["Envases Angles Doypack", "Frascos de Vidrio"],
    contactEmail: "",
    contactPhone: "",
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playTone(700, 0.2, "sine", 0.05);

    dbAdapter.submitPartnerApplication({
      slug: formData.name.toLowerCase().replace(/\s+/g, "-"),
      name: formData.name,
      businessType: formData.businessType,
      city: formData.city,
      description: formData.description || `Punto Aliado propuesto en ${formData.city}.`,
      acceptedMaterials: formData.acceptedMaterials,
    });

    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-brand-forest/60 backdrop-blur-sm animate-in fade-in" onClick={onClose}>
      <div className="relative w-full sm:max-w-lg bg-brand-paper rounded-t-3xl sm:rounded-3xl p-5 sm:p-8 shadow-elevated border border-brand-border space-y-5 max-h-[90dvh] overflow-y-auto pb-[calc(1.5rem+env(safe-area-inset-bottom))] animate-in slide-in-from-bottom-6 sm:zoom-in-95" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-brand-cream text-brand-muted hover:text-brand-forest transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center" aria-label="Cerrar modal">
          <X className="w-5 h-5" />
        </button>

        <div className="text-center py-6 space-y-5 animate-in zoom-in-95">
          <div className="w-14 h-14 rounded-full bg-brand-emerald/10 text-brand-emerald flex items-center justify-center mx-auto">
            <Building2 className="w-7 h-7" />
          </div>

          <div className="space-y-2">
            <span className="inline-block px-3 py-1 rounded-full bg-brand-cream border border-brand-border text-[10px] font-mono text-brand-emerald uppercase tracking-wider font-semibold">
              Fase Piloto en Adecuación Técnica
            </span>
            <h3 className="font-editorial text-2xl sm:text-3xl text-brand-forest font-light">
              Red de Aliados • Próximamente
            </h3>
            <p className="text-xs sm:text-sm text-brand-muted max-w-md mx-auto leading-relaxed">
              Estamos preparando la infraestructura del <strong>Taller Piloto en Cochabamba</strong> (calle San Felipe de Austria entre Melchor Pérez de Olguín y Av. Madrid) para la recepción, control y reciclaje de envases.
            </p>
            <p className="text-xs text-brand-forest/80 font-medium pt-1">
              Las postulaciones públicas para comercios, farmacias y centros aliados se habilitarán próximamente.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="https://wa.me/59176529243?text=Hola%20Angles%20Natural,%20quisiera%20recibir%20informaci%C3%B3n%20para%20ser%20Punto%20Aliado%20en%20la%20fase%20piloto."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button variant="primary" size="md" className="w-full">
                Consultar Avances por WhatsApp
              </Button>
            </a>
            <Button variant="secondary" size="md" onClick={onClose} className="w-full sm:w-auto">
              Entendido
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};