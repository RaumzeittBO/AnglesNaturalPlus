import React from "react";
import Link from "next/link";
import Image from "next/image";
import { PRODUCTS } from "@/content/products";
import { Button } from "@/components/ui/Button";
import { ClaimBadge } from "@/components/ui/ClaimBadge";
import { getWhatsAppProductLink } from "@/lib/whatsapp";
import {
  Compass,
  ArrowRight,
  Sparkles,
  Recycle,
  ShieldCheck,
  Dna,
  Sprout,
  CheckCircle2,
  Heart,
  MessageCircle
} from "lucide-react";

export default function HomePage() {
  const featuredProducts = PRODUCTS.slice(0, 3);

  return (
    <main className="space-y-24 sm:space-y-32">
      {/* 1. HERO PRINCIPAL */}
      <section className="relative min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 text-center bg-grain overflow-hidden pt-8 pb-16">
        {/* Soft Organic Ambient Glowing Background Mesh */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[34rem] sm:w-[48rem] h-[34rem] rounded-full bg-gradient-to-br from-brand-leafLight/15 via-brand-emerald/10 to-transparent blur-3xl pointer-events-none animate-pulse-slow" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-cream border border-brand-border text-xs font-mono tracking-widest text-brand-forest shadow-soft">
            <span className="w-2 h-2 rounded-full bg-brand-leaf animate-ping" />
            <span>BIENESTAR DESARROLLADO DESDE BOLIVIA</span>
          </div>

          <div className="space-y-4">
            <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-light text-brand-forest leading-[1.08] tracking-tight">
              De la ciencia nace el impacto.
            </h1>
            <p className="text-brand-muted text-base sm:text-xl font-normal max-w-2xl mx-auto leading-relaxed">
              Combinamos investigación bioquímica farmacéutica, materias primas nativas andinas y una mirada de economía circular para construir bienestar responsable.
            </p>
          </div>

          {/* Dual Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2">
            <Link href="/productos">
              <Button variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
                Conoce Nuestros Productos
              </Button>
            </Link>

            <Link href="/ecosistema">
              <Button variant="secondary" size="lg" icon={<Compass className="w-4 h-4 text-brand-emerald" />}>
                Explora el Ecosistema Vivo
              </Button>
            </Link>
          </div>

          {/* 3 Core Value Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-10 text-left max-w-3xl mx-auto">
            <div className="p-4 rounded-2xl bg-brand-cream/80 border border-brand-border space-y-1 shadow-sm">
              <div className="w-8 h-8 rounded-xl bg-brand-forest/10 flex items-center justify-center text-brand-forest mb-2">
                <Dna className="w-4 h-4" />
              </div>
              <h3 className="font-semibold text-xs text-brand-forest uppercase tracking-wider">Formulación Científica</h3>
              <p className="text-xs text-brand-muted">Bioquímica aplicada a superalimentos andinos con rigor analítico.</p>
            </div>

            <div className="p-4 rounded-2xl bg-brand-cream/80 border border-brand-border space-y-1 shadow-sm">
              <div className="w-8 h-8 rounded-xl bg-brand-forest/10 flex items-center justify-center text-brand-forest mb-2">
                <Sprout className="w-4 h-4" />
              </div>
              <h3 className="font-semibold text-xs text-brand-forest uppercase tracking-wider">Origen Boliviano</h3>
              <p className="text-xs text-brand-muted">Tarwi, Cañahua y Arveja: revalorización de la biodiversidad local.</p>
            </div>

            <div className="p-4 rounded-2xl bg-brand-cream/80 border border-brand-border space-y-1 shadow-sm">
              <div className="w-8 h-8 rounded-xl bg-brand-forest/10 flex items-center justify-center text-brand-forest mb-2">
                <Recycle className="w-4 h-4" />
              </div>
              <h3 className="font-semibold text-xs text-brand-forest uppercase tracking-wider">Angles Circular</h3>
              <p className="text-xs text-brand-muted">Programa comunitario de retorno de envases y Eco-Puntos.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATÁLOGO DESTACADO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-brand-border/60 pb-4">
          <div className="space-y-2">
            <span className="text-xs font-mono tracking-widest text-brand-emerald uppercase font-semibold">
              FORMULACIONES FUNCIONALES
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-brand-forest font-light">
              Nuestros Productos en Desarrollo & Línea
            </h2>
          </div>
          <Link href="/productos" className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-emerald hover:underline">
            <span>Ver catálogo completo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProducts.map((p) => (
            <div key={p.id} className="group p-5 sm:p-6 rounded-3xl bg-brand-cream/60 border border-brand-border hover:border-brand-emerald/40 transition-all duration-300 shadow-soft hover:shadow-card flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono tracking-wider text-brand-emerald font-semibold uppercase">
                    {p.category}
                  </span>
                  {p.badge && (
                    <span className="px-2.5 py-0.5 rounded-full bg-brand-forest/10 text-brand-forest text-[10px] font-mono font-medium truncate">
                      {p.badge}
                    </span>
                  )}
                </div>

                <div className="w-full aspect-[4/5] rounded-2xl bg-brand-paper border border-brand-border flex items-center justify-center p-2 relative overflow-hidden group-hover:scale-[1.02] transition-transform">
                  <Image
                    src={p.image || "/brand/logo.png"}
                    alt={p.name}
                    fill
                    className="object-contain p-2"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-editorial text-2xl text-brand-forest font-light">
                    {p.name}
                  </h3>
                  <p className="text-xs text-brand-muted leading-relaxed line-clamp-3">
                    {p.shortDesc}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-brand-border/60 flex items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] font-mono text-brand-muted block">Precio</span>
                  <span className="text-base font-semibold text-brand-forest">{p.priceBs} Bs</span>
                </div>
                <Link href={`/productos/${p.slug}`}>
                  <Button variant="primary" size="sm" icon={<ArrowRight className="w-3.5 h-3.5" />}>
                    Ver Detalle
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. SECCIÓN FUNDADORA: ANDREA ANGLES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 lg:p-16 rounded-3xl bg-brand-forest text-brand-paper shadow-elevated relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-brand-leafLight text-xs font-mono tracking-widest uppercase">
                BIOQUÍMICA & EMPRENDIMIENTO
              </span>

              <h2 className="font-editorial text-3xl sm:text-5xl font-light leading-tight">
                “Investigar, probar, corregir y volver a intentar.”
              </h2>

              <div className="space-y-2 text-brand-paper/85 text-xs sm:text-sm leading-relaxed max-w-xl">
                <p className="font-mono text-brand-leafLight text-xs">
                  Andrea Angles — Bioquímica Farmacéutica & Fundadora de Angles Natural
                </p>
                <p>
                  Fundé Angles Natural con la convicción de que los recursos andinos bolivianos poseen una densidad biológica excepcional. Nuestro compromiso es transformar esa riqueza en bienestar tangible mediante formulación científica honesta.
                </p>
              </div>

              <div className="pt-2">
                <Link href="/nosotros">
                  <Button variant="secondary" size="md" className="bg-brand-paper text-brand-forest hover:bg-brand-cream" icon={<ArrowRight className="w-3.5 h-3.5" />}>
                    Conoce Nuestra Historia
                  </Button>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-56 h-64 sm:w-64 sm:h-72 rounded-3xl bg-white/5 border border-white/20 p-6 flex flex-col items-center justify-center text-center space-y-4 shadow-inner">
                <div className="w-20 h-20 rounded-full bg-brand-emerald/40 border border-brand-leafLight/40 flex items-center justify-center text-brand-leafLight">
                  <Dna className="w-10 h-10" />
                </div>
                <div>
                  <span className="font-editorial text-xl font-light text-brand-paper block">Andrea Angles</span>
                  <span className="text-[11px] font-mono text-brand-leafLight uppercase block">Bioquímica Farmacéutica</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ACCESO AL ECOSISTEMA VIVO INTERACTIVO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-brand-cream/70 border border-brand-border text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-paper border border-brand-border text-xs font-mono text-brand-forest">
            <Compass className="w-3.5 h-3.5 text-brand-emerald" />
            <span>EXPERIENCIA DIGITAL INTERACTIVA</span>
          </div>

          <h2 className="font-editorial text-3xl sm:text-5xl text-brand-forest font-light max-w-2xl mx-auto">
            Recorre el Ecosistema Vivo
          </h2>

          <p className="text-xs sm:text-sm text-brand-muted max-w-xl mx-auto leading-relaxed">
            Una narrativa inmersiva que conecta la semilla, el origen boliviano, el laboratorio de formulación NutriQ, el simulador de decisiones y el compromiso con el bienestar animal.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link href="/ecosistema">
              <Button variant="primary" size="md" icon={<Sparkles className="w-4 h-4 text-brand-leafLight" />}>
                Entrar al Ecosistema Vivo
              </Button>
            </Link>

            <Link href="/ecosistema?mode=jury">
              <Button variant="secondary" size="md">
                Modo Jurado (90 Segundos)
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. HUB ANGLES CIRCULAR TEASER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-brand-border/60 pb-4">
          <div className="space-y-1">
            <span className="text-xs font-mono tracking-widest text-brand-emerald uppercase font-semibold">
              COMUNIDAD & ECONOMÍA CIRCULAR
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-brand-forest font-light">
              Angles Circular: Haz que el Ciclo Continúe
            </h2>
          </div>
          <Link href="/circular" className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-emerald hover:underline">
            <span>Explorar programa circular</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/circular/devuelve" className="p-5 rounded-2xl bg-brand-cream/60 border border-brand-border hover:border-brand-emerald transition-all hover:-translate-y-1 space-y-2 block">
            <span className="text-xs font-mono text-brand-emerald font-semibold">01 DEVOLVER</span>
            <h3 className="font-semibold text-sm text-brand-forest">Devuelve tu Envase</h3>
            <p className="text-xs text-brand-muted">Instrucciones de limpieza y entrega para reuso.</p>
          </Link>

          <Link href="/circular/puntos" className="p-5 rounded-2xl bg-brand-cream/60 border border-brand-border hover:border-brand-emerald transition-all hover:-translate-y-1 space-y-2 block">
            <span className="text-xs font-mono text-brand-emerald font-semibold">02 PUNTOS</span>
            <h3 className="font-semibold text-sm text-brand-forest">Mapa de Recolección</h3>
            <p className="text-xs text-brand-muted">Encuentra farmacias y puntos aliados cercanos.</p>
          </Link>

          <Link href="/circular/donde-va" className="p-5 rounded-2xl bg-brand-cream/60 border border-brand-border hover:border-brand-emerald transition-all hover:-translate-y-1 space-y-2 block">
            <span className="text-xs font-mono text-brand-emerald font-semibold">03 APRENDER</span>
            <h3 className="font-semibold text-sm text-brand-forest">¿Dónde va esto?</h3>
            <p className="text-xs text-brand-muted">Buscador de residuos y minijuego educativo.</p>
          </Link>

          <Link href="/circular/impacto" className="p-5 rounded-2xl bg-brand-cream/60 border border-brand-border hover:border-brand-emerald transition-all hover:-translate-y-1 space-y-2 block">
            <span className="text-xs font-mono text-brand-emerald font-semibold">04 IMPACTO</span>
            <h3 className="font-semibold text-sm text-brand-forest">Trazabilidad Real</h3>
            <p className="text-xs text-brand-muted">Métricas basadas estrictamente en registros.</p>
          </Link>
        </div>
      </section>
    </main>
  );
}