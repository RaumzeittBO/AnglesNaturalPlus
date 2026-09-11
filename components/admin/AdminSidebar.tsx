"use client";

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
  ShieldAlert,
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

  return (
    <aside className="w-64 bg-[#142317] border-r border-[#2d4231] min-h-screen flex flex-col justify-between shrink-0">
      <div>
        {/* Brand header */}
        <div className="p-6 border-b border-[#2d4231]">
          <Link href="/admin" className="flex items-center gap-2">
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
        </div>

        {/* Navigation list */}
        <nav className="p-4 space-y-1.5">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
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
          className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs text-[#a3b899] hover:text-[#52b788] hover:bg-[#1b3d2b] transition-colors"
        >
          <span>Ver Sitio Web</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
        <div className="px-3 py-2 rounded-xl bg-[#0d140e] border border-[#2d4231] text-[10px] text-[#74c69d]">
          Entorno: <span className="font-bold text-[#52b788]">Angles Hybrid Data</span>
        </div>
      </div>
    </aside>
  );
}
