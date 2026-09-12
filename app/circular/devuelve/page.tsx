"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { dbAdapter } from "@/lib/db";
import { Product } from "@/content/products";
import { Button } from "@/components/ui/Button";
import { RotateCcw, CheckCircle2, MapPin, ArrowRight, ShieldCheck } from "lucide-react";

export default function DevuelveEnvasePage() {
  const products = dbAdapter.getProducts();
  const [selectedProduct, setSelectedProduct] = useState<Product>(products[0] || null);

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      <div className="space-y-3 max-w-3xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-cream border border-brand-border text-xs font-mono text-brand-emerald uppercase">
          <RotateCcw className="w-3.5 h-3.5" />
          <span>PROGRAMA DE RETORNO Y REUSO</span>
        </div>
        <h1 className="font-editorial text-4xl sm:text-5xl text-brand-forest font-light">
          Devuelve tu Envase Angles
        </h1>
        <p className="text-brand-muted text-sm sm:text-base leading-relaxed">
          Terminaste tu producto: no lo tires a la basura común. Conoce cómo prepararlo adecuadamente y dónde entregarlo para cerrar el ciclo de vida de los materiales.
        </p>
      </div>

      {/* Product Selector */}
      <div className="space-y-4">
        <span className="text-xs font-mono uppercase tracking-wider text-brand-forest font-semibold block">
          Paso 1: Selecciona el producto que deseas devolver
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {products.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedProduct(p)}
              className={`p-4 rounded-2xl border text-left transition-all ${
                selectedProduct?.id === p.id
                  ? "bg-brand-cream border-brand-emerald shadow-card -translate-y-1"
                  : "bg-brand-paper border-brand-border hover:bg-brand-cream/50"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-brand-sand/50 p-1 flex items-center justify-center shrink-0 relative overflow-hidden">
                  <Image src={p.image || "/brand/logo.png"} alt={p.name} fill className="object-contain p-1" sizes="48px" />
                </div>
                <div>
                  <h3 className="font-semibold text-xs sm:text-sm text-brand-forest">{p.name}</h3>
                  <span className="text-[10px] text-brand-muted font-mono">{p.presentation}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Return Instructions for Selected Product */}
      {selectedProduct && (
        <div className="p-6 sm:p-8 rounded-3xl bg-brand-paper border border-brand-border space-y-6 shadow-soft">
          <div className="flex items-center justify-between border-b border-brand-border/60 pb-3">
            <div>
              <span className="text-[10px] font-mono uppercase text-brand-muted">Paso 2: Componentes aceptados</span>
              <h3 className="font-editorial text-2xl text-brand-forest font-light">
                {selectedProduct.name}
              </h3>
            </div>
            <span className="text-xs font-mono text-brand-emerald bg-brand-cream px-3 py-1 rounded-full border border-brand-border">
              Recepción Activa
            </span>
          </div>

          <div className="space-y-3">
            {selectedProduct.packagingPassport.map((comp) => (
              <div key={comp.name} className="p-4 rounded-2xl bg-brand-cream/60 border border-brand-border/70 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-xs sm:text-sm text-brand-forest">{comp.name}</span>
                  <span className="text-[11px] font-mono text-brand-emerald flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Recibido en puntos Angles</span>
                  </span>
                </div>
                <div className="text-xs text-brand-muted space-y-1">
                  <p><strong>Material:</strong> {comp.material}</p>
                  <p><strong>Condición de entrega:</strong> {comp.disposalAdvice}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Step 3: Where to bring it */}
          <div className="pt-4 border-t border-brand-border/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-brand-forest block">Paso 3: Entrégalo y suma Eco-Puntos</span>
              <p className="text-xs text-brand-muted">Lleva tus envases limpios a cualquier farmacia o punto aliado registrado.</p>
            </div>
            <Link href="/circular/puntos">
              <Button variant="primary" size="md" icon={<MapPin className="w-3.5 h-3.5" />}>
                Ver Puntos Cercanos
              </Button>
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}