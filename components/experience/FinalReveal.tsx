"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { QRShareModal } from "@/components/ui/QRShareModal";
import { soundFx } from "@/lib/audio";
import { RotateCcw, Sparkles } from "lucide-react";

interface FinalRevealProps {
  onRestart: () => void;
}

export const FinalReveal: React.FC<FinalRevealProps> = ({ onRestart }) => {
  const handleRestart = () => {
    soundFx.playSeedDrop();
    onRestart();
  };

  return (
    <section className="relative py-24 sm:py-32 px-6 text-center bg-brand-forest text-brand-paper overflow-hidden">
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#72C48D_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="relative z-10 max-w-3xl mx-auto space-y-10">
        <div className="relative w-28 h-28 sm:w-36 sm:h-36 mx-auto rounded-3xl bg-brand-paper/95 p-3 sm:p-4 shadow-elevated border border-brand-leafLight/40 flex items-center justify-center animate-in zoom-in-95 duration-500">
          <Image
            src="/brand/logo.png"
            alt="Angles Natural Isotipo Oficial"
            width={120}
            height={120}
            className="object-contain"
          />
        </div>

        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-brand-leafLight text-xs font-mono tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CIENCIA · INNOVACIÓN · PROPÓSITO</span>
          </div>

          <h2 className="font-editorial text-3xl sm:text-5xl md:text-6xl font-light text-brand-paper leading-tight">
            “Esta empresa todavía está creciendo.”
          </h2>

          <p className="font-editorial text-2xl sm:text-4xl text-brand-leafLight font-light italic">
            “Pero sabemos con certeza hacia dónde queremos crecer.”
          </p>
        </div>

        <div className="pt-4 space-y-2">
          <h3 className="font-editorial text-2xl tracking-widest text-brand-paper uppercase">
            ANGLES NATURAL
          </h3>
          <p className="text-xs font-mono text-brand-paper/70 tracking-wider uppercase">
            Bolivia • Suplementación Funcional • Ecosistema Vivo
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-6">
          <Button
            variant="secondary"
            size="lg"
            onClick={handleRestart}
            className="w-full sm:w-auto bg-brand-paper text-brand-forest hover:bg-brand-cream shadow-elevated"
            icon={<RotateCcw className="w-4 h-4" />}
          >
            Repetir Experiencia
          </Button>

          <div className="w-full sm:w-auto">
            <QRShareModal />
          </div>
        </div>

        <footer className="pt-12 text-[11px] font-mono text-brand-paper/50 space-y-1">
          <p>© {new Date().getFullYear()} Angles Natural. Todos los derechos reservados.</p>
          <p>Desarrollado para presentación de innovación, emprendimiento y sostenibilidad.</p>
        </footer>
      </div>
    </section>
  );
};