"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Package,
  MapPin,
  Trash2,
  Building2,
  Calendar,
  BarChart3,
  Award,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { dbAdapter } from "@/lib/db";
import { Product } from "@/content/products";
import { CollectionPoint, WasteItem, Partner, CircularEvent } from "@/content/circular";

export default function AdminDashboardPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [points, setPoints] = useState<CollectionPoint[]>([]);
  const [wasteItems, setWasteItems] = useState<WasteItem[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [events, setEvents] = useState<CircularEvent[]>([]);
  const [impactTotals, setImpactTotals] = useState({
    totalPackagesRecovered: 0,
    totalKgDiverted: 0,
    totalCo2SavedKg: 0,
    activeVolunteers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setProducts(dbAdapter.getProducts());
    setPoints(dbAdapter.getCollectionPoints());
    setWasteItems(dbAdapter.getWasteItems());
    setPartners(dbAdapter.getPartners());
    setEvents(dbAdapter.getEvents());
    setImpactTotals(dbAdapter.getImpactTotals());
    setLoading(false);
  }, []);

  const pendingPartners = partners.filter((p) => p.status === "pending");

  const statCards = [
    {
      label: "Productos en Catálogo",
      value: products.length,
      icon: Package,
      href: "/admin/productos",
      color: "text-[#52b788]",
      desc: "Con pasaporte circular asignado",
    },
    {
      label: "Puntos de Acopio",
      value: points.filter((p) => p.status === "active").length,
      icon: MapPin,
      href: "/admin/puntos",
      color: "text-[#74c69d]",
      desc: "Activos en el mapa nacional",
    },
    {
      label: "Residuos Clasificados",
      value: wasteItems.length,
      icon: Trash2,
      href: "/admin/residuos",
      color: "text-[#95d5b2]",
      desc: "En la guía interactiva",
    },
    {
      label: "Postulaciones Pendientes",
      value: pendingPartners.length,
      icon: Building2,
      href: "/admin/aliados",
      color: pendingPartners.length > 0 ? "text-[#f4a261]" : "text-[#52b788]",
      desc: pendingPartners.length > 0 ? "Requieren revisión" : "Al día",
    },
    {
      label: "Envases Recuperados",
      value: impactTotals.totalPackagesRecovered,
      icon: BarChart3,
      href: "/admin/impacto",
      color: "text-[#52b788]",
      desc: "Trazabilidad real en registros",
    },
    {
      label: "Jornadas Programadas",
      value: events.filter((e) => e.status === "upcoming").length,
      icon: Calendar,
      href: "/admin/jornadas",
      color: "text-[#b7e4c7]",
      desc: "Activaciones comunitarias",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#2d4231]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#f4f7f4]">
            Panel de Administración
          </h1>
          <p className="text-xs sm:text-sm text-[#a3b899] mt-1">
            Gestión en tiempo real de productos, trazabilidad circular, puntos de acopio y comunidad.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1b3d2b] border border-[#2d5a3f] text-[#52b788] text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" /> Administrador Autorizado
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className="bg-[#142317] border border-[#2d4231] rounded-2xl p-6 hover:border-[#52b788]/50 transition-colors group flex flex-col justify-between"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <span className="text-xs text-[#a3b899] font-medium">{card.label}</span>
                  <div className={`text-3xl font-bold font-serif ${card.color}`}>
                    {loading ? "..." : card.value}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-[#1b3d2b] border border-[#2d5a3f] text-[#52b788]">
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-[#2d4231] flex items-center justify-between text-xs">
                <span className="text-[#a3b899]">{card.desc}</span>
                <span className="text-[#52b788] font-bold inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Gestionar <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick shortcuts & Pending tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Applications Box */}
        <div className="bg-[#142317] border border-[#2d4231] rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold font-serif text-[#f4f7f4] flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#52b788]" /> Postulaciones Recientes
            </h3>
            <Link
              href="/admin/aliados"
              className="text-xs text-[#52b788] hover:underline font-semibold"
            >
              Ver todas ({partners.length})
            </Link>
          </div>

          {pendingPartners.length === 0 ? (
            <div className="p-6 rounded-xl bg-[#0d140e]/60 border border-[#2d4231] text-center text-xs text-[#a3b899]">
              <CheckCircle2 className="w-6 h-6 text-[#52b788] mx-auto mb-2" />
              No hay solicitudes pendientes de aprobación.
            </div>
          ) : (
            <div className="space-y-2">
              {pendingPartners.slice(0, 3).map((p) => (
                <div
                  key={p.id}
                  className="p-3.5 rounded-xl bg-[#0d140e] border border-[#2d4231] flex items-center justify-between text-xs"
                >
                  <div>
                    <div className="font-bold text-[#f4f7f4]">{p.name}</div>
                    <div className="text-[#a3b899]">{p.city} • {p.contactEmail}</div>
                  </div>
                  <Link
                    href="/admin/aliados"
                    className="px-3 py-1.5 rounded-lg bg-[#52b788] text-[#0d140e] font-bold text-[11px]"
                  >
                    Revisar
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Circular System Integrity */}
        <div className="bg-[#142317] border border-[#2d4231] rounded-2xl p-6 space-y-4">
          <h3 className="text-base font-bold font-serif text-[#f4f7f4] flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#52b788]" /> Integridad de Trazabilidad
          </h3>
          <div className="space-y-3 text-xs text-[#a3b899]">
            <p className="leading-relaxed">
              El sistema de trazabilidad de Angles Natural calcula sus métricas de impacto exclusivamente desde registros verificados en la base de datos (fechas, pesajes, códigos de lote y firmas de entrega).
            </p>
            <div className="p-4 rounded-xl bg-[#1b3d2b]/40 border border-[#2d5a3f] space-y-2">
              <div className="flex justify-between text-[#f4f7f4]">
                <span>Kg Totales Desviados de Vertedero:</span>
                <span className="font-bold text-[#52b788]">{impactTotals.totalKgDiverted} kg</span>
              </div>
              <div className="flex justify-between text-[#f4f7f4]">
                <span>CO2e Estimado Ahorrado:</span>
                <span className="font-bold text-[#52b788]">{impactTotals.totalCo2SavedKg} kg CO2e</span>
              </div>
            </div>
            <Link
              href="/admin/impacto"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#52b788] hover:underline"
            >
              Registrar nuevo lote o pesaje de acopio <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
