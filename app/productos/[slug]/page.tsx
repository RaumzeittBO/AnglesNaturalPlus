import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { dbAdapter } from "@/lib/db";
import { PRODUCTS } from "@/content/products";
import { Button } from "@/components/ui/Button";
import { CircularPassport } from "@/components/circular/CircularPassport";
import { getWhatsAppProductLink } from "@/lib/whatsapp";
import { MessageCircle, ArrowLeft, ShieldCheck, CheckCircle2, Dna, Layers, RotateCcw } from "lucide-react";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({
    slug: p.slug,
  }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = dbAdapter.getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const whatsAppLink = getWhatsAppProductLink(product.name);

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      {/* Back link */}
      <div>
        <Link href="/productos" className="inline-flex items-center gap-1.5 text-xs font-mono text-brand-muted hover:text-brand-forest transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Volver al Catálogo</span>
        </Link>
      </div>

      {/* Main Product Overview */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left: Product Image Showcase */}
        <div className="md:col-span-5 p-4 sm:p-6 rounded-3xl bg-brand-cream/60 border border-brand-border flex items-center justify-center min-h-[380px] sm:min-h-[460px] overflow-hidden">
          <div className="relative w-full max-w-[340px] aspect-[4/5] rounded-2xl overflow-hidden shadow-card border border-brand-border/60 bg-brand-paper">
            <Image
              src={product.image || "/brand/logo.png"}
              alt={product.name}
              fill
              className="object-contain p-2"
              priority
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="md:col-span-7 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-brand-emerald uppercase tracking-wider font-semibold">
                {product.category}
              </span>
              {product.badge && (
                <span className="px-2.5 py-0.5 rounded-full bg-brand-forest/10 text-brand-forest text-[10px] font-mono font-medium">
                  {product.badge}
                </span>
              )}
            </div>

            <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-brand-forest font-light">
              {product.name}
            </h1>

            <p className="font-editorial text-lg text-brand-forest/80 font-light italic">
              “{product.tagline}”
            </p>
          </div>

          <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
            {product.fullDesc}
          </p>

          <div className="p-4 rounded-2xl bg-brand-cream/70 border border-brand-border text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-brand-muted font-mono uppercase text-[10px]">Presentación</span>
              <span className="font-semibold text-brand-forest">{product.presentation}</span>
            </div>
            <div className="flex items-center justify-between pt-1 border-t border-brand-border/60">
              <span className="text-brand-muted font-mono uppercase text-[10px]">Precio Estimado</span>
              <span className="text-base font-semibold text-brand-forest">{product.priceBs} Bs</span>
            </div>
          </div>

          {/* Buy by WhatsApp CTA */}
          <div className="pt-2 space-y-2">
            <a href={whatsAppLink} target="_blank" rel="noopener noreferrer" className="block w-full">
              <Button variant="primary" size="lg" className="w-full" icon={<MessageCircle className="w-4 h-4 text-brand-leafLight" />}>
                Comprar o Consultar por WhatsApp
              </Button>
            </a>
            <p className="text-[11px] font-mono text-brand-muted text-center">
              Atención directa y asesoramiento con nuestro equipo en Bolivia.
            </p>
          </div>
        </div>
      </div>

      {/* Scientific Ingredients Breakdown */}
      <div className="p-6 sm:p-8 rounded-3xl bg-brand-paper border border-brand-border space-y-6 shadow-soft">
        <div className="flex items-center gap-2 text-xs font-mono text-brand-forest uppercase tracking-wider">
          <Dna className="w-4 h-4 text-brand-emerald" />
          <span>FORMULACIÓN & COMPONENTES ACTIVOS</span>
        </div>

        <div className="space-y-3">
          <h3 className="font-editorial text-2xl text-brand-forest font-light">
            Ingredientes Seleccionados
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-brand-forest">
            {product.ingredients.map((ing) => (
              <li key={ing} className="p-3 rounded-xl bg-brand-cream/60 border border-brand-border/60 flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-emerald mt-0.5 shrink-0" />
                <span>{ing}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-brand-border/60 text-xs text-brand-muted">
          <div className="space-y-1">
            <span className="font-semibold text-brand-forest block">Modo de Uso Recomendado:</span>
            <p className="leading-relaxed">{product.usageInstructions}</p>
          </div>
          <div className="space-y-1">
            <span className="font-semibold text-brand-forest block">Recomendaciones & Conservación:</span>
            <p className="leading-relaxed">{product.cautions}</p>
          </div>
        </div>
      </div>

      {/* Pasaporte Circular Section */}
      <CircularPassport components={product.packagingPassport} />
    </main>
  );
}