"use client";

import React, { useState } from "react";
import { QrCode, X, Copy, Check } from "lucide-react";

interface QRShareModalProps {
  url?: string;
}

export const QRShareModal: React.FC<QRShareModalProps> = ({
  url = typeof window !== "undefined" ? window.location.href : "https://angles-natural-plus.vercel.app",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
    url
  )}&color=0F3E2E&bgcolor=FBF9F5&margin=1`;

  const handleCopy = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-cream border border-brand-border text-brand-forest text-xs font-medium hover:bg-brand-sand transition-colors shadow-soft"
      >
        <QrCode className="w-4 h-4 text-brand-emerald" />
        <span>Abrir en móvil / QR Jurado</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-forest/60 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-sm bg-brand-paper rounded-3xl p-6 sm:p-8 shadow-elevated border border-brand-border text-center space-y-5">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-brand-cream text-brand-muted hover:text-brand-forest transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1.5 pt-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-forest/5 text-brand-emerald text-xs font-mono uppercase tracking-wider">
                ANGLES NATURAL
              </div>
              <h3 className="font-editorial text-2xl text-brand-forest font-light">
                Recorrer en tu Celular
              </h3>
              <p className="text-xs text-brand-muted max-w-xs mx-auto">
                Escanea el código QR con la cámara de tu teléfono para explorar la experiencia interactiva.
              </p>
            </div>

            <div className="p-4 bg-brand-cream/80 border border-brand-border rounded-2xl inline-block shadow-inner">
              <img
                src={qrApiUrl}
                alt="Código QR para abrir Angles Natural"
                className="w-48 h-48 sm:w-56 sm:h-56 rounded-xl mx-auto mix-blend-multiply"
              />
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-brand-cream border border-brand-border text-xs text-brand-muted">
              <span className="truncate max-w-[200px] text-left font-mono">{url}</span>
              <button
                onClick={handleCopy}
                className="p-1.5 rounded-lg hover:bg-brand-sand text-brand-forest transition-colors shrink-0 flex items-center gap-1 font-medium"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-brand-leaf" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copiado" : "Copiar"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};