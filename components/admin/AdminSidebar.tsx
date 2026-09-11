"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  MapPin,
  Trash2,
  Building2,
  Calendar,
  BarChart3,
  Flame,
  Award,
  ExternalLink,
  Menu,
  X,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/productos", label: "Productos", icon: Package },
  { href: "/admin/puntos", label: "Puntos de Acopio", icon: MapPin },
  { href: "/admin/residuos", label: "Guía ¿Dónde Va?", icon: Trash2 },
  { href: "/admin/aliados", label: "Postulaciones Aliados", icon: Building2 },
  { href: "/admin/jornadas", label: "Jornadas y Eventos", icon: Calendar },
  { href: "/admin/impacto", label: "Registro de Impacto", icon: BarChart3 },
  { href: "/admin/retos", label: "Retos de Hábitos", icon: Flame },
  { href: "/admin/eco-puntos", label: "Eco-Puntos & Premios", icon: Award },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const navContent = (
    <div className="flex flex-col justify-between h-full">
      <div>
        {/* Brand header */}
        <div className="p-5 sm:p-6 border-b border-[#2d4231] flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#52b788] flex items-center justify-center text-[#0d140e] font-bold text-sm font-serif">
              A
            </div>
            <div>
              <span className="font-serif font-bold text-base text-[#f4f7f4] tracking-tight block">
                ANGLES ADMIN
              </span>
              <span className="text-[10px] text-[#52b788] font-bold uppercase tracking-wider block">
                Panel de Control
              </span>
            </div>
          </Link>
          {mobileOpen && (
            <button
              onClick={() => setMobileOpen(false)}
              className="md:hidden p-2 text-[#a3b899] hover:text-white"
              aria-label="Cerrar panel"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation list */}
        <nav className="p-3 sm:p-4 space-y-1 sm:space-y-1.5">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors min-h-[44px] ${
                  isActive
                    ? "bg-[#52b788] text-[#0d140e] shadow-md shadow-[#52b788]/20"
                    : "text-[#a3b899] hover:bg-[#1b3d2b] hover:text-[#f4f7f4]"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer link to public site */}
      <div className="p-4 border-t border-[#2d4231] space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs text-[#a3b899] hover:text-[#52b788] hover:bg-[#1b3d2b] transition-colors min-h-[38px]"
        >
          <span>Ver Sitio Web</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
        <div className="px-3 py-2 rounded-xl bg-[#0d140e] border border-[#2d4231] text-[10px] text-[#74c69d]">
          Entorno: <span className="font-bold text-[#52b788]">Angles Hybrid Data</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Top Header */}
      <header className="md:hidden w-full bg-[#142317] border-b border-[#2d4231] px-4 py-3 flex items-center justify-between sticky top-0 z-30">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#52b788] flex items-center justify-center text-[#0d140e] font-bold text-xs font-serif">
            A
          </div>
          <span className="font-serif font-bold text-sm text-[#f4f7f4]">
            ANGLES ADMIN
          </span>
        </Link>
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 rounded-lg bg-[#1b3d2b] text-[#52b788] border border-[#2d4231]"
          aria-label="Abrir navegación de administración"
        >
          <Menu className="w-5 h-5" />
        </button>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden animate-in fade-in"
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="w-72 max-w-[85vw] bg-[#142317] h-full shadow-2xl overflow-y-auto animate-in slide-in-from-left duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {navContent}
          </div>
        </div>
      )}

      {/* Desktop Fixed Sidebar */}
      <aside className="hidden md:flex w-64 bg-[#142317] border-r border-[#2d4231] min-h-screen flex-col justify-between shrink-0 sticky top-0 h-screen">
        {navContent}
      </aside>
    </>
  );
}
