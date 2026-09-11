import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Dna, Sprout, Heart, ShieldCheck, ArrowRight, Sparkles, Compass } from "lucide-react";

export default function NosotrosPage() {
  const steps = [
    { word: "INVESTIGAR", desc: "Explorar la riqueza fitoquímica de materias primas bolivianas desde la evidencia científica." },
    { word: "PROBAR", desc: "Desarrollar prototipos analíticos y evaluar perfiles de asimilación y estabilidad." },
    { word: "CORREGIR", desc: "Ajustar formulaciones eliminando aditivos superfluos o mejorando texturas naturales." },
    { word: "APRENDER", desc: "Escuchar a la comunidad y colaborar estrechamente con productores locales andinos." },
    { word: "CREAR", desc: "Formular soluciones nutricionales que resuelvan necesidades reales con valor agregado." },
    { word: "COMPARTIR", desc: "Educar con honestidad sin falsas promesas milagrosas ni greenwashing." },
    { word: "CRECER", desc: "Escalar con propósito: devolviendo a la comunidad y respaldando el bienestar animal." },
  ];

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-20">
      {/* 1. Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-cream border border-brand-border text-xs font-mono text-brand-emerald uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>NUESTRA HISTORIA & PROPÓSITO</span>
        </div>
        <h1 className="font-editorial text-4xl sm:text-6xl text-brand-forest font-light leading-tight">
          De la ciencia nace el impacto.
        </h1>
        <p className="text-brand-muted text-base sm:text-lg leading-relaxed">
          Angles Natural nació para demostrar que la suplementación funcional puede ser formulada con rigor bioquímico, ingredientes nativos y un compromiso ético innegociable.
        </p>
      </div>

      {/* 2. Andrea's Profile Story */}
      <div className="p-8 sm:p-12 rounded-3xl bg-brand-cream/60 border border-brand-border grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-5 flex justify-center">
          <div className="w-52 h-60 sm:w-60 sm:h-72 rounded-3xl bg-brand-sand/70 border border-brand-border p-6 flex flex-col items-center justify-center text-center space-y-3 shadow-card">
            <div className="w-20 h-20 rounded-full bg-brand-forest/10 border border-brand-forest/20 flex items-center justify-center text-brand-emerald">
              <Dna className="w-10 h-10" />
            </div>
            <div>
              <h3 className="font-editorial text-xl font-light text-brand-forest">Andrea Angles</h3>
              <p className="text-[11px] font-mono text-brand-muted uppercase">Bioquímica Farmacéutica</p>
              <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full bg-brand-paper text-[10px] font-mono text-brand-emerald border border-brand-border">
                Fundadora de Angles Natural
              </span>
            </div>
          </div>
        </div>

        <div className="md:col-span-7 space-y-4 text-xs sm:text-sm text-brand-muted leading-relaxed">
          <h2 className="font-editorial text-2xl sm:text-3xl text-brand-forest font-light">
            “No queríamos ser otra marca genérica de suplementos.”
          </h2>
          <p>
            Como bioquímica farmacéutica en Bolivia, Andrea observó una paradoja: mientras el mercado local consumía proteínas ultraprocesadas importadas con saborizantes artificiales, nuestros valles y altiplano albergaban materias primas con densidad proteica y mineral inigualable, como el Tarwi y la Cañahua.
          </p>
          <p>
            Angles Natural surge para tender un puente entre ese conocimiento ancestral del territorio y la rigurosidad analítica del laboratorio farmacéutico.
          </p>
        </div>
      </div>

      {/* 3. The 7-Step Method Storytelling */}
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono tracking-widest text-brand-emerald uppercase font-semibold">
            METODOLOGÍA DE TRABAJO
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl text-brand-forest font-light">
            Nuestro Ciclo de Innovación
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {steps.map((s, idx) => (
            <div key={s.word} className="p-5 rounded-2xl bg-brand-paper border border-brand-border space-y-2 shadow-soft hover:shadow-card transition-shadow">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-brand-emerald font-semibold">0{idx + 1}</span>
                <span className="font-editorial text-lg text-brand-forest font-light">{s.word}</span>
              </div>
              <p className="text-xs text-brand-muted leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Bottom CTAs */}
      <div className="p-8 sm:p-10 rounded-3xl bg-brand-forest text-brand-paper text-center space-y-6">
        <h3 className="font-editorial text-2xl sm:text-4xl font-light">
          Explora la visión en nuestro Ecosistema Vivo
        </h3>
        <p className="text-xs sm:text-sm text-brand-paper/80 max-w-lg mx-auto leading-relaxed">
          Vive la experiencia interactiva que diseñamos para mostrar el recorrido desde la semilla hasta el impacto comunitario.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/ecosistema">
            <Button variant="secondary" size="md" className="bg-brand-paper text-brand-forest hover:bg-brand-cream" icon={<Compass className="w-4 h-4 text-brand-emerald" />}>
              Entrar al Ecosistema Vivo
            </Button>
          </Link>
          <Link href="/productos">
            <Button variant="ghost" size="md" className="text-brand-paper border-white/20 hover:bg-white/10" icon={<ArrowRight className="w-4 h-4" />}>
              Ver Catálogo de Productos
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}