"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  X,
  Compass,
  Package,
  BookOpen,
  Recycle,
  Sparkles,
  MapPin,
  ChevronRight,
  ShieldCheck,
  Award,
  FlaskConical,
  Scale,
  Layers,
  Heart,
  User,
  Home,
  SlidersHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Inicio", icon: Home },
  { href: "/productos", label: "Productos", icon: Package, badge: "Catálogo" },
  { href: "/nosotros", label: "Nuestra Historia", icon: BookOpen },
  { href: "/ecosistema", label: "Ecosistema Vivo", icon: Compass, badge: "Interactivo" },
  { href: "/circular", label: "Angles Circular", icon: Recycle, badge: "Comunidad" },
];

const ECOSISTEMA_CHAPTERS = [
  { id: "origen", num: "01", title: "Origen Bolivia & Materias Primas", icon: Sparkles },
  { id: "laboratorio", num: "02", title: "Laboratorio NutriQ & Formulación", icon: FlaskConical },
  { id: "desafio", num: "03", title: "Simulador de Estrategia Sostenible", icon: Scale },
  { id: "sostenibilidad", num: "04", title: "Separación en 3 Flujos & Empaque", icon: Layers },
  { id: "bienestar-animal", num: "05", title: "Bienestar Animal & Retribución", icon: Heart },
  { id: "vision", num: "06", title: "Manifiesto de Andrea Angles", icon: User },
];

const CIRCULAR_MODULES = [
  { href: "/circular/devuelve", label: "Devuelve tu Envase", desc: "Instrucciones de entrega limpia" },
  { href: "/circular/puntos", label: "Puntos de Acopio & Mapa", desc: "Encuentra tu centro aliado" },
  { href: "/circular/donde-va", label: "¿Dónde va este residuo?", desc: "Buscador y minijuego" },
  { href: "/circular/impacto", label: "Trazabilidad de Impacto", desc: "Métricas reales auditadas" },
  { href: "/circular/aliados", label: "Red de Aliados", desc: "Comercios y centros verificados" },
  { href: "/circular/jornadas", label: "Jornadas Comunitarias", desc: "Eventos y recolección" },
  { href: "/circular/eco-puntos", label: "Eco-Puntos & Premios", desc: "Niveles botánicos y canje" },
];

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState<"nav" | "ecosistema" | "circular">("nav");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route change & prevent body scroll
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleNavigateChapter = (chapterId: string) => {
    setIsOpen(false);
    document.body.style.overflow = "";

    if (pathname === "/ecosistema") {
      const el = document.getElementById(chapterId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      router.push(`/ecosistema#${chapterId}`);
    }
  };

  // Don't render general navbar in admin area
  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      <nav
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-300",
          scrolled
            ? "bg-brand-paper/95 backdrop-blur-md shadow-soft border-b border-brand-border/60 py-3"
            : "bg-brand-paper/80 backdrop-blur-sm border-b border-brand-border/30 py-3.5 sm:py-4"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo & Title */}
          <Link href="/" className="flex items-center gap-2.5 group min-h-[44px]">
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-brand-cream border border-brand-border flex items-center justify-center p-1 shadow-sm group-hover:border-brand-emerald transition-colors">
              <Image
                src="/brand/logo.png"
                alt="Angles Natural Logo"
                width={32}
                height={32}
                className="object-contain"
                priority
              />
            </div>
            <div>
              <span className="block font-semibold text-xs sm:text-sm tracking-widest text-brand-forest uppercase font-sans-ui">
                ANGLES NATURAL
              </span>
              <span className="block text-[9px] text-brand-muted tracking-wider uppercase font-mono">
                Ciencia & Bienestar
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all min-h-[36px] flex items-center",
                    isActive
                      ? "text-brand-forest font-semibold bg-brand-cream/80 border border-brand-border"
                      : "text-brand-muted hover:text-brand-forest hover:bg-brand-sand/50"
                  )}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="ml-1.5 px-1.5 py-0.2 rounded-full bg-brand-forest/10 text-brand-emerald text-[9px] font-mono uppercase">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/ecosistema"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-forest text-brand-paper hover:bg-brand-emerald text-xs font-medium tracking-wide shadow-sm transition-all hover:shadow-card hover:-translate-y-0.5 group min-h-[36px]"
            >
              <Compass className="w-3.5 h-3.5 text-brand-leafLight group-hover:rotate-45 transition-transform" />
              <span>Ecosistema Vivo</span>
            </Link>
          </div>

          {/* Mobile Hamburger Toggle (44x44px touch target) */}
          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden w-11 h-11 flex items-center justify-center rounded-xl bg-brand-cream border border-brand-border text-brand-forest active:scale-95 transition-transform"
            aria-label="Abrir menú de navegación"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </nav>

      {/* Full-Screen Mobile Navigation Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[9999] bg-brand-paper flex flex-col w-full h-[100dvh] overflow-hidden animate-in fade-in duration-200">
          {/* Top Bar with Logo & Close Button */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-brand-border/60 bg-brand-paper shrink-0">
            <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 rounded-full bg-brand-cream border border-brand-border flex items-center justify-center p-1 shadow-sm">
                <Image
                  src="/brand/logo.png"
                  alt="Angles Natural Logo"
                  width={32}
                  height={32}
                  className="object-contain"
                  priority
                />
              </div>
              <div>
                <span className="block font-semibold text-xs tracking-widest text-brand-forest uppercase font-sans-ui">
                  ANGLES NATURAL
                </span>
                <span className="block text-[9px] text-brand-muted tracking-wider uppercase font-mono">
                  Menú de Navegación
                </span>
              </div>
            </Link>

            <button
              onClick={() => setIsOpen(false)}
              className="w-11 h-11 flex items-center justify-center rounded-xl bg-brand-cream border border-brand-border text-brand-forest active:scale-95 transition-transform"
              aria-label="Cerrar menú"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Filter Tabs for Mobile */}
          <div className="px-4 pt-3 pb-2 border-b border-brand-border/40 bg-brand-cream/50 flex gap-1.5 shrink-0 overflow-x-auto">
            <button
              onClick={() => setActiveTab("nav")}
              className={cn(
                "px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all",
                activeTab === "nav"
                  ? "bg-brand-forest text-brand-paper font-semibold shadow-sm"
                  : "bg-brand-paper text-brand-muted border border-brand-border/80"
              )}
            >
              Páginas Principales
            </button>
            <button
              onClick={() => setActiveTab("ecosistema")}
              className={cn(
                "px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1",
                activeTab === "ecosistema"
                  ? "bg-brand-forest text-brand-paper font-semibold shadow-sm"
                  : "bg-brand-paper text-brand-muted border border-brand-border/80"
              )}
            >
              <Sparkles className="w-3 h-3 text-brand-accent-gold" />
              <span>Capítulos Ecosistema</span>
            </button>
            <button
              onClick={() => setActiveTab("circular")}
              className={cn(
                "px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1",
                activeTab === "circular"
                  ? "bg-brand-forest text-brand-paper font-semibold shadow-sm"
                  : "bg-brand-paper text-brand-muted border border-brand-border/80"
              )}
            >
              <Recycle className="w-3 h-3 text-brand-emerald" />
              <span>Angles Circular</span>
            </button>
          </div>

          {/* Scrollable Nav Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 pb-[calc(3rem+env(safe-area-inset-bottom))]">
            {/* Tab 1: Main Pages */}
            {activeTab === "nav" && (
              <div className="space-y-2 animate-in fade-in">
                <span className="block text-[10px] font-mono uppercase tracking-widest text-brand-muted px-1">
                  SECCIONES GENERALES
                </span>
                {NAV_LINKS.map((link) => {
                  const Icon = link.icon;
                  const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex items-center justify-between p-3.5 rounded-2xl transition-all min-h-[52px]",
                        isActive
                          ? "bg-brand-forest text-brand-paper font-semibold shadow-card"
                          : "bg-brand-cream/60 hover:bg-brand-cream border border-brand-border/70 text-brand-forest"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "w-8 h-8 rounded-xl flex items-center justify-center",
                            isActive ? "bg-white/10 text-brand-leafLight" : "bg-brand-paper text-brand-forest shadow-xs"
                          )}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-sm sm:text-base font-medium">{link.label}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        {link.badge && (
                          <span
                            className={cn(
                              "px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase font-bold",
                              isActive
                                ? "bg-brand-leafLight/20 text-brand-leafLight"
                                : "bg-brand-emerald/10 text-brand-emerald"
                            )}
                          >
                            {link.badge}
                          </span>
                        )}
                        <ChevronRight className={cn("w-4 h-4 opacity-50", isActive ? "text-white" : "text-brand-muted")} />
                      </div>
                    </Link>
                  );
                })}

                <div className="pt-4 border-t border-brand-border/60">
                  <Link
                    href="/ecosistema"
                    onClick={() => setIsOpen(false)}
                    className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl bg-brand-forest text-brand-paper text-sm font-semibold shadow-elevated active:scale-98 transition-transform min-h-[52px]"
                  >
                    <Compass className="w-5 h-5 text-brand-leafLight" />
                    <span>Abrir Ecosistema Vivo Interactivo</span>
                  </Link>
                </div>
              </div>
            )}

            {/* Tab 2: Ecosistema Vivo Chapters */}
            {activeTab === "ecosistema" && (
              <div className="space-y-3 animate-in fade-in">
                <div className="p-3.5 rounded-2xl bg-brand-cream border border-brand-border/80 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-brand-forest block">Ecosistema Vivo</span>
                    <span className="text-[11px] text-brand-muted">6 Capítulos interactivos con audio y 3D</span>
                  </div>
                  <Link
                    href="/ecosistema"
                    onClick={() => setIsOpen(false)}
                    className="px-3 py-1 rounded-full bg-brand-forest text-brand-paper text-[11px] font-mono"
                  >
                    Ver Todo
                  </Link>
                </div>

                <div className="space-y-2">
                  {ECOSISTEMA_CHAPTERS.map((ch) => {
                    const Icon = ch.icon;
                    return (
                      <button
                        key={ch.id}
                        onClick={() => handleNavigateChapter(ch.id)}
                        className="w-full flex items-center justify-between p-3 rounded-2xl bg-brand-paper border border-brand-border hover:border-brand-emerald/60 shadow-soft text-left active:scale-98 transition-all min-h-[50px]"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 rounded-xl bg-brand-sand/60 border border-brand-border flex items-center justify-center text-xs font-mono font-bold text-brand-forest shrink-0">
                            {ch.num}
                          </span>
                          <div>
                            <span className="text-xs sm:text-sm font-semibold text-brand-forest block">
                              {ch.title}
                            </span>
                            <span className="text-[10px] font-mono text-brand-muted uppercase">
                              #{ch.id}
                            </span>
                          </div>
                        </div>

                        <div className="p-1.5 rounded-lg bg-brand-cream text-brand-emerald">
                          <Icon className="w-4 h-4" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Tab 3: Angles Circular Modules */}
            {activeTab === "circular" && (
              <div className="space-y-3 animate-in fade-in">
                <div className="p-3.5 rounded-2xl bg-brand-cream border border-brand-border/80 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-brand-forest block">Angles Circular</span>
                    <span className="text-[11px] text-brand-muted">Hub de economía circular y retorno en Bolivia</span>
                  </div>
                  <Link
                    href="/circular"
                    onClick={() => setIsOpen(false)}
                    className="px-3 py-1 rounded-full bg-brand-emerald text-brand-paper text-[11px] font-mono"
                  >
                    Hub Central
                  </Link>
                </div>

                <div className="space-y-2">
                  {CIRCULAR_MODULES.map((mod) => (
                    <Link
                      key={mod.href}
                      href={mod.href}
                      onClick={() => setIsOpen(false)}
                      className="w-full flex items-center justify-between p-3 rounded-2xl bg-brand-paper border border-brand-border hover:border-brand-emerald/60 shadow-soft text-left active:scale-98 transition-all min-h-[50px]"
                    >
                      <div>
                        <span className="text-xs sm:text-sm font-semibold text-brand-forest block">
                          {mod.label}
                        </span>
                        <span className="text-[11px] text-brand-muted block">
                          {mod.desc}
                        </span>
                      </div>

                      <ChevronRight className="w-4 h-4 text-brand-muted shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Brand footer inside drawer */}
            <div className="pt-4 border-t border-brand-border/60 flex items-center justify-between text-xs text-brand-muted">
              <span className="text-[11px] font-mono text-brand-muted/80">
                Angles Natural • Bolivia
              </span>
              <span className="text-[10px] font-mono text-brand-muted/70">
                Ciencia, Bienestar & Circularidad
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};