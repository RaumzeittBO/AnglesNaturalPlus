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

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <span className="text-xs font-mono tracking-widest text-brand-emerald uppercase">
                RED ANGLES CIRCULAR
              </span>
              <h3 className="font-editorial text-2xl text-brand-forest font-light">
                Postular como Punto Aliado
              </h3>
              <p className="text-xs text-brand-muted">
                Farmacias, gimnasios, tiendas saludables y centros educativos pueden sumarse como puntos de retorno certificados.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-brand-forest font-medium mb-1">Nombre del Establecimiento / Organización *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ej: Gimnasio Vitality, Farmacia Naturalis..."
                  className="w-full p-2.5 rounded-xl bg-brand-cream border border-brand-border text-brand-forest focus:outline-none focus:ring-1 focus:ring-brand-emerald"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-brand-forest font-medium mb-1">Tipo de Espacio</label>
                  <select
                    value={formData.businessType}
                    onChange={(e) => setFormData({ ...formData, businessType: e.target.value as any })}
                    className="w-full p-2.5 rounded-xl bg-brand-cream border border-brand-border text-brand-forest focus:outline-none focus:ring-1 focus:ring-brand-emerald"
                  >
                    <option value="COMERCIO">Comercio / Tienda</option>
                    <option value="GESTOR_RECICLADOR">Gestor / Reciclador</option>
                    <option value="INSTITUCION">Institución / Centro</option>
                    <option value="CONSUMIDOR_LIDER">Comunidad / Consumidor</option>
                  </select>
                </div>

                <div>
                  <label className="block text-brand-forest font-medium mb-1">Ciudad *</label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-brand-cream border border-brand-border text-brand-forest focus:outline-none focus:ring-1 focus:ring-brand-emerald"
                  >
                    <option value="La Paz">La Paz</option>
                    <option value="Cochabamba">Cochabamba</option>
                    <option value="Santa Cruz">Santa Cruz</option>
                    <option value="Tarija">Tarija</option>
                    <option value="Sucre">Sucre</option>
                    <option value="Otra">Otra ciudad</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-brand-forest font-medium mb-1">Breve Descripción o Mensaje</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="¿Por qué te gustaría sumarte a la red de retorno?"
                  className="w-full p-2.5 rounded-xl bg-brand-cream border border-brand-border text-brand-forest focus:outline-none focus:ring-1 focus:ring-brand-emerald"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <Button variant="ghost" size="sm" type="button" onClick={onClose}>
                Cancelar
              </Button>
              <Button variant="primary" size="md" type="submit" icon={<Send className="w-3.5 h-3.5" />}>
                Enviar Postulación
              </Button>
            </div>
          </form>
        ) : (
          <div className="text-center py-8 space-y-4 animate-in zoom-in-95">
            <div className="w-12 h-12 rounded-full bg-brand-emerald/10 text-brand-emerald flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="font-editorial text-2xl text-brand-forest font-light">
              ¡Postulación Registrada!
            </h4>
            <p className="text-xs text-brand-muted max-w-sm mx-auto">
              Revisaremos los datos en el panel de administración. Una vez aprobada, tu punto aparecerá en el mapa de Angles Circular con el sello de Aliado Verificado.
            </p>
            <Button variant="secondary" size="sm" onClick={onClose}>
              Cerrar
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};