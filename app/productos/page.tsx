"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { dbAdapter } from "@/lib/db";
import { Product } from "@/content/products";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Sparkles, Filter, CheckCircle2 } from "lucide-react";

export default function ProductosPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("TODOS");
  const products = dbAdapter.getProducts();

  const categories = [
    "TODOS",
    "SALUD DIGESTIVA & PROBIÓTICOS",
    "SALUD ARTICULAR & REGENERACIÓN",
    "BIENESTAR & CUIDADO ANIMAL"
  ];

  const filtered = selectedCategory === "TODOS"
    ? products
    : products.filter((p) => p.category === selectedCategory);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      {/* Page Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-cream border border-brand-border text-xs font-mono text-brand-emerald uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>CATÁLOGO OFICIAL • ANGLES NATURAL</span>
        </div>
        <h1 className="font-editorial text-4xl sm:text-5xl text-brand-forest font-light">
          Formulaciones de Bienestar Funcional
        </h1>
        <p className="text-brand-muted text-sm sm:text-base leading-relaxed">
          Suplementos y cuidados desarrollados desde la investigación bioquímica por Andrea Angles en Bolivia, con materias primas de alta pureza y pasaporte circular de empaque.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-brand-border/60 pb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all min-h-[40px] ${
              selectedCategory === cat
                ? "bg-brand-forest text-brand-paper shadow-sm font-semibold"
                : "bg-brand-cream hover:bg-brand-sand border border-brand-border text-brand-forest"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((p) => (
          <div
            key={p.id}
            className="p-5 sm:p-6 rounded-3xl bg-brand-cream/60 border border-brand-border hover:border-brand-emerald/40 transition-all duration-300 shadow-soft hover:shadow-card flex flex-col justify-between space-y-6 group"
          >
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

              {/* Product Image Container */}
              <div className="w-full aspect-[4/5] rounded-2xl bg-brand-paper border border-brand-border flex items-center justify-center p-2 relative overflow-hidden group-hover:scale-[1.02] transition-transform">
                <Image
                  src={p.image || "/brand/logo.png"}
                  alt={p.name}
                  fill
                  className="object-contain p-2"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              <div className="space-y-2">
                <h3 className="font-editorial text-2xl text-brand-forest font-light">
                  {p.name}
                </h3>
                <p className="text-xs text-brand-muted leading-relaxed line-clamp-3">
                  {p.shortDesc}
                </p>
              </div>

              <div className="text-xs font-mono text-brand-forest/80 pt-2 border-t border-brand-border/60">
                <span className="block text-[10px] text-brand-muted uppercase">Presentación</span>
                <span>{p.presentation}</span>
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
    </main>
  );
}