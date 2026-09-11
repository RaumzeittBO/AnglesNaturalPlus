import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { dbAdapter } from "@/lib/db";
import {
  Recycle,
  MapPin,
  HelpCircle,
  BarChart3,
  Users,
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  RotateCcw
} from "lucide-react";

export default function CircularHubPage() {
  const totals = dbAdapter.getImpactTotals();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-20">
      {/* 1. HERO ANGLES CIRCULAR */}
      <section className="text-center max-w-4xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-cream border border-brand-border text-xs font-mono text-brand-emerald uppercase">
          <Recycle className="w-3.5 h-3.5" />
          <span>PROGRAMA DE ECONOMÍA CIRCULAR COMUNITARIA</span>
        </div>

        <h1 className="font-editorial text-4xl sm:text-6xl text-brand-forest font-light leading-tight">
          El producto terminó. <br className="hidden sm:inline" />
          <span className="italic">Pero su historia no tiene por qué terminar aquí.</span>
        </h1>

        <p className="text-brand-muted text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed">
          No queremos que la sostenibilidad termine en nuestro taller de formulación. Queremos construir una comunidad activa que participe, separe y retorne sus envases.
        </p>

        <div className="pt-4 flex flex-wrap justify-center gap-3">
          <Link href="/circular/devuelve">
            <Button variant="primary" size="md" icon={<RotateCcw className="w-4 h-4" />}>
              Devolver mi Envase
            </Button>
          </Link>
          <Link href="/circular/puntos">
            <Button variant="secondary" size="md" icon={<MapPin className="w-4 h-4 text-brand-emerald" />}>
              Ver Puntos de Recolección
            </Button>
          </Link>
        </div>
      </section>

      {/* 2. LOS 4 CAMINOS INTERACTIVOS */}
      <section className="space-y-6">
        <div className="text-center space-y-1">
          <span className="text-xs font-mono tracking-widest text-brand-emerald uppercase font-semibold">
            ¿CÓMO QUIERES PARTICIPAR HOY?
          </span>
          <h2 className="font-editorial text-2xl sm:text-3xl text-brand-forest font-light">
            Cuatro Caminos de Acción
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Path 1 */}
          <Link href="/circular/devuelve" className="p-6 rounded-3xl bg-brand-cream/60 border border-brand-border hover:border-brand-emerald transition-all hover:-translate-y-1 space-y-4 flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-brand-forest text-brand-paper flex items-center justify-center shadow-sm">
                <RotateCcw className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono tracking-widest text-brand-emerald uppercase block">01 DEVOLVER</span>
              <h3 className="font-editorial text-2xl text-brand-forest font-light">Devuelve tu Envase</h3>
              <p className="text-xs text-brand-muted leading-relaxed">
                Selecciona tu producto Angles y aprende qué partes recibimos y cómo prepararlas limpias y secas.
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand-forest group-hover:text-brand-emerald pt-2">
              <span>Iniciar retorno</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>

          {/* Path 2 */}
          <Link href="/circular/puntos" className="p-6 rounded-3xl bg-brand-cream/60 border border-brand-border hover:border-brand-emerald transition-all hover:-translate-y-1 space-y-4 flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-brand-emerald text-brand-paper flex items-center justify-center shadow-sm">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono tracking-widest text-brand-emerald uppercase block">02 UBICAR</span>
              <h3 className="font-editorial text-2xl text-brand-forest font-light">Puntos de Acopio</h3>
              <p className="text-xs text-brand-muted leading-relaxed">
                Encuentra farmacias, gimnasios y tiendas aliadas donde entregar tus materiales en Bolivia.
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand-forest group-hover:text-brand-emerald pt-2">
              <span>Ver mapa y lista</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>

          {/* Path 3 */}
          <Link href="/circular/donde-va" className="p-6 rounded-3xl bg-brand-cream/60 border border-brand-border hover:border-brand-emerald transition-all hover:-translate-y-1 space-y-4 flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-900/80 text-brand-paper flex items-center justify-center shadow-sm">
                <HelpCircle className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono tracking-widest text-amber-800 uppercase block">03 APRENDER</span>
              <h3 className="font-editorial text-2xl text-brand-forest font-light">¿Dónde va esto?</h3>
              <p className="text-xs text-brand-muted leading-relaxed">
                Buscador educativo para clasificar residuos domésticos y minijuego de separación en 3 flujos.
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand-forest group-hover:text-brand-emerald pt-2">
              <span>Consultar guía y jugar</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>

          {/* Path 4 */}
          <Link href="/circular/impacto" className="p-6 rounded-3xl bg-brand-cream/60 border border-brand-border hover:border-brand-emerald transition-all hover:-translate-y-1 space-y-4 flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-brand-forest text-brand-paper flex items-center justify-center shadow-sm">
                <BarChart3 className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono tracking-widest text-brand-emerald uppercase block">04 MEDIR</span>
              <h3 className="font-editorial text-2xl text-brand-forest font-light">Trazabilidad Real</h3>
              <p className="text-xs text-brand-muted leading-relaxed">
                Indicadores reales de recuperación sin métricas ficticias. Todo impacto empieza en cero y se audita.
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand-forest group-hover:text-brand-emerald pt-2">
              <span>Ver métricas</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>
        </div>
      </section>

      {/* 3. ECO-PUNTOS & COMUNIDAD BANNER */}
      <section className="p-8 sm:p-12 rounded-3xl bg-brand-cream border border-brand-border space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-paper text-brand-emerald text-xs font-mono uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SISTEMA DE ECO-PUNTOS</span>
            </div>
            <h3 className="font-editorial text-3xl sm:text-4xl text-brand-forest font-light">
              Tus acciones sostenibles generan valor
            </h3>
            <p className="text-xs sm:text-sm text-brand-muted max-w-xl leading-relaxed">
              Cada envase retornado, reto completado y jornada atendida suma Eco-Puntos en tu cuenta para canjear muestras, descuentos o donaciones nutricionales a albergues de rescate.
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
            <Link href="/circular/eco-puntos">
              <Button variant="primary" size="md" className="w-full" icon={<ArrowRight className="w-3.5 h-3.5" />}>
                Conocer Eco-Puntos
              </Button>
            </Link>
            <Link href="/circular/aliados">
              <Button variant="secondary" size="md" className="w-full" icon={<Users className="w-3.5 h-3.5" />}>
                Quiero Ser Aliado
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}