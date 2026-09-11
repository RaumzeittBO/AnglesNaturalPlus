"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { getWhatsAppProductLink } from "@/lib/whatsapp";
import { MessageCircle, ShieldCheck, Sparkles, MapPin, Mail, ArrowUpRight } from "lucide-react";

export const Footer: React.FC = () => {
  const pathname = usePathname();

  // Don't render on admin
  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="bg-brand-cream/60 border-t border-brand-border/60 text-brand-forest pt-16 pb-12 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full bg-brand-paper border border-brand-border flex items-center justify-center p-1 shadow-sm">
                <Image
                  src="/brand/logo.png"
                  alt="Angles Natural Logo"
                  width={36}
                  height={36}
                  className="object-contain"
                />
              </div>
              <div>
                <span className="block font-semibold text-sm tracking-widest text-brand-forest uppercase">
                  ANGLES NATURAL
                </span>
                <span className="block text-[10px] text-brand-muted font-mono uppercase">
                  Ciencia · Innovación · Propósito
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-brand-muted max-w-sm leading-relaxed">
              Empresa boliviana de bienestar y suplementación funcional fundada por Andrea Angles (Bioquímica Farmacéutica). Innovación responsable y valor agregado a nuestros recursos nativos.
            </p>

            <div className="pt-2">
              <a
                href={getWhatsAppProductLink("Información General")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-paper hover:bg-brand-sand border border-brand-border text-xs font-medium text-brand-forest shadow-soft transition-all"
              >
                <MessageCircle className="w-3.5 h-3.5 text-brand-emerald" />
                <span>Contacto Directo por WhatsApp</span>
                <ArrowUpRight className="w-3 h-3 text-brand-muted" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-2 space-y-3">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-brand-forest">
              Plataforma
            </span>
            <ul className="space-y-2 text-xs text-brand-muted">
              <li>
                <Link href="/" className="hover:text-brand-forest transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/productos" className="hover:text-brand-forest transition-colors">
                  Catálogo de Productos
                </Link>
              </li>
              <li>
                <Link href="/nosotros" className="hover:text-brand-forest transition-colors">
                  Nuestra Historia
                </Link>
              </li>
              <li>
                <Link href="/ecosistema" className="hover:text-brand-forest transition-colors flex items-center gap-1">
                  <span>Ecosistema Vivo</span>
                  <Sparkles className="w-3 h-3 text-brand-emerald" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Circular Community */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-brand-forest">
              Angles Circular
            </span>
            <ul className="space-y-2 text-xs text-brand-muted">
              <li>
                <Link href="/circular" className="hover:text-brand-forest transition-colors">
                  Hub Angles Circular
                </Link>
              </li>
              <li>
                <Link href="/circular/devuelve" className="hover:text-brand-forest transition-colors">
                  Devuelve tu Envase
                </Link>
              </li>
              <li>
                <Link href="/circular/puntos" className="hover:text-brand-forest transition-colors">
                  Puntos de Recolección
                </Link>
              </li>
              <li>
                <Link href="/circular/donde-va" className="hover:text-brand-forest transition-colors">
                  Guía ¿Dónde va esto?
                </Link>
              </li>
              <li>
                <Link href="/circular/impacto" className="hover:text-brand-forest transition-colors">
                  Métricas de Impacto
                </Link>
              </li>
              <li>
                <Link href="/circular/aliados" className="hover:text-brand-forest transition-colors">
                  Red de Aliados
                </Link>
              </li>
              <li>
                <Link href="/circular/eco-puntos" className="hover:text-brand-forest transition-colors">
                  Eco-Puntos & Recompensas
                </Link>
              </li>
            </ul>
          </div>

          {/* Transparency & Integrity */}
          <div className="md:col-span-2 space-y-3">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-brand-forest">
              Transparencia
            </span>
            <div className="p-3 rounded-2xl bg-brand-paper border border-brand-border/80 text-[11px] text-brand-muted space-y-1.5">
              <div className="flex items-center gap-1.5 font-semibold text-brand-forest">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-emerald" />
                <span>Anti-Greenwashing</span>
              </div>
              <p className="leading-tight text-[10px]">
                Clasificación estricta de claims entre lo que ya hacemos hoy y nuestra visión de futuro.
              </p>
            </div>

            <div className="pt-2 text-[10px] font-mono text-brand-muted/70">
              <Link href="/admin" className="hover:underline opacity-50 hover:opacity-100 transition-opacity">
                Acceso Administrativo
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-brand-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-muted">
          <p>© {new Date().getFullYear()} Angles Natural. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4 text-[11px] font-mono">
            <span>Hecho en Bolivia</span>
            <span>•</span>
            <span>Suplementación Funcional</span>
          </div>
        </div>
      </div>
    </footer>
  );
};