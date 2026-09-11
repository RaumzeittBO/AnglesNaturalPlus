import React from "react";
import Link from "next/link";
import { dbAdapter } from "@/lib/db";
import { Button } from "@/components/ui/Button";
import { BarChart3, ShieldCheck, CheckCircle2, RotateCcw, Users, Calendar, ArrowRight } from "lucide-react";

export default function ImpactoPage() {
  const totals = dbAdapter.getImpactTotals();
  const records = dbAdapter.getImpactRecords();

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-cream border border-brand-border text-xs font-mono text-brand-emerald uppercase">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>TRAZABILIDAD & TRANSPARENCIA RADICAL</span>
        </div>
        <h1 className="font-editorial text-4xl sm:text-5xl text-brand-forest font-light">
          Impacto de Nuestra Comunidad
        </h1>
        <p className="text-brand-muted text-sm sm:text-base leading-relaxed">
          En Angles Natural no inflamos cifras con métricas inventadas. Cada número reportado a continuación se calcula estrictamente a partir de lotes de recolección y jornadas realizadas.
        </p>
      </div>

      {/* KPI Counters Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-6 rounded-3xl bg-brand-cream/60 border border-brand-border space-y-2">
          <span className="text-[10px] font-mono tracking-wider text-brand-muted uppercase block">Envases Recuperados</span>
          <span className="font-editorial text-3xl sm:text-4xl text-brand-forest font-light block">{totals.totalContainers}</span>
          <span className="text-[10px] font-mono text-brand-emerald">Doypacks & Frascos Angles</span>
        </div>

        <div className="p-6 rounded-3xl bg-brand-cream/60 border border-brand-border space-y-2">
          <span className="text-[10px] font-mono tracking-wider text-brand-muted uppercase block">Kg Material Retornado</span>
          <span className="font-editorial text-3xl sm:text-4xl text-brand-forest font-light block">{totals.totalKg} kg</span>
          <span className="text-[10px] font-mono text-brand-emerald">Plásticos & Vidrio Ámbar</span>
        </div>

        <div className="p-6 rounded-3xl bg-brand-cream/60 border border-brand-border space-y-2">
          <span className="text-[10px] font-mono tracking-wider text-brand-muted uppercase block">Puntos Aliados Activos</span>
          <span className="font-editorial text-3xl sm:text-4xl text-brand-forest font-light block">{totals.activePartners}</span>
          <span className="text-[10px] font-mono text-brand-emerald">En La Paz, Cbba y Santa Cruz</span>
        </div>

        <div className="p-6 rounded-3xl bg-brand-cream/60 border border-brand-border space-y-2">
          <span className="text-[10px] font-mono tracking-wider text-brand-muted uppercase block">Jornadas Realizadas</span>
          <span className="font-editorial text-3xl sm:text-4xl text-brand-forest font-light block">{totals.completedEvents}</span>
          <span className="text-[10px] font-mono text-brand-emerald">Eventos comunitarios</span>
        </div>
      </div>

      {/* Integrity Zero-Start Banner */}
      {totals.recordsCount === 0 && (
        <div className="p-8 rounded-3xl bg-brand-paper border border-brand-border text-center space-y-3 max-w-2xl mx-auto shadow-sm">
          <span className="font-editorial text-xl sm:text-2xl text-brand-forest font-light italic block">
            “Todo impacto real empieza en cero.”
          </span>
          <p className="text-xs text-brand-muted leading-relaxed">
            Estamos en fase de lanzamiento de nuestra primera red de aliados. Conforme se completen las primeras jornadas de retorno programadas, los registros auditados se publicarán en este libro mayor público.
          </p>
          <div className="pt-2">
            <Link href="/circular/devuelve">
              <Button variant="primary" size="sm" icon={<ArrowRight className="w-3.5 h-3.5" />}>
                Sé parte del primer lote de retorno
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* Traceability Explanation */}
      <div className="p-6 sm:p-8 rounded-3xl bg-brand-cream/60 border border-brand-border space-y-4">
        <h3 className="font-editorial text-2xl text-brand-forest font-light">
          ¿Cómo calculamos estas métricas?
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-brand-muted leading-relaxed">
          <div className="space-y-1">
            <strong className="text-brand-forest block">1. Pesaje y Conteo</strong>
            <p>Cada punto de recolección registra el peso y cantidad de envases recibidos en el panel administrativo.</p>
          </div>
          <div className="space-y-1">
            <strong className="text-brand-forest block">2. Trazabilidad por Lote</strong>
            <p>Los materiales se clasifican y se canalizan hacia gestores autorizados o el taller de esterilización Angles.</p>
          </div>
          <div className="space-y-1">
            <strong className="text-brand-forest block">3. Sin Métricas Ficticias</strong>
            <p>No usamos estimaciones teóricas de CO2 ahorrado sin certificación técnica previa.</p>
          </div>
        </div>
      </div>
    </main>
  );
}