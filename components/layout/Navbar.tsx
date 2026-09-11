"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Sparkles, ArrowRight, Compass } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/productos", label: "Productos" },
  { href: "/nosotros", label: "Nuestra Historia" },
  { href: "/ecosistema", label: "Ecosistema Vivo", badge: "Interactivo" },
  { href: "/circular", label: "Angles Circular", badge: "Comunidad" },
];

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  // Don't render general navbar in admin area
  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
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
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden w-11 h-11 flex items-center justify-center rounded-xl bg-brand-cream border border-brand-border text-brand-forest active:scale-95 transition-transform"
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden fixed inset-x-0 top-[60px] bottom-0 z-50 bg-brand-paper/98 backdrop-blur-lg border-t border-brand-border/60 p-5 space-y-3 overflow-y-auto pb-[calc(2rem+env(safe-area-inset-bottom))] animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="space-y-1.5">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center justify-between p-3.5 rounded-2xl text-sm font-medium transition-colors min-h-[48px]",
                    isActive
                      ? "bg-brand-cream font-semibold text-brand-forest border border-brand-border"
                      : "text-brand-muted hover:bg-brand-sand/40"
                  )}
                >
                  <span className="text-base">{link.label}</span>
                  {link.badge && (
                    <span className="px-2.5 py-0.5 rounded-full bg-brand-emerald/10 text-brand-emerald text-[11px] font-mono uppercase font-semibold">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          <div className="pt-4 border-t border-brand-border/60">
            <Link
              href="/ecosistema"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl bg-brand-forest text-brand-paper text-base font-medium shadow-elevated active:scale-98 transition-transform min-h-[52px]"
            >
              <Compass className="w-5 h-5 text-brand-leafLight" />
              <span>Explorar Ecosistema Vivo</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};