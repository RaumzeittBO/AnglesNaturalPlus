import React from "react";
import { cn } from "@/lib/utils";

interface SectionTitleProps {
  chapterNumber?: string;
  category?: string;
  title: string;
  subtitle?: string;
  alignment?: "left" | "center";
  className?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  chapterNumber,
  category,
  title,
  subtitle,
  alignment = "left",
  className,
}) => {
  const isCenter = alignment === "center";

  return (
    <div className={cn("relative space-y-3 mb-10 md:mb-14", isCenter && "text-center mx-auto max-w-3xl", className)}>
      {(chapterNumber || category) && (
        <div className={cn("flex items-center gap-2.5 text-xs font-mono tracking-widest text-brand-emerald uppercase", isCenter && "justify-center")}>
          {chapterNumber && (
            <span className="px-2 py-0.5 rounded bg-brand-forest/5 border border-brand-forest/10 font-semibold">
              CAPÍTULO {chapterNumber}
            </span>
          )}
          {chapterNumber && category && <span className="text-brand-border">•</span>}
          {category && <span className="text-brand-muted font-sans font-medium">{category}</span>}
        </div>
      )}

      <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl lg:text-5xl text-brand-forest font-light leading-[1.15] tracking-tight">
        {title}
      </h2>

      {subtitle && (
        <p className={cn("text-brand-muted text-base sm:text-lg md:text-xl font-normal leading-relaxed max-w-2xl", isCenter && "mx-auto")}>
          {subtitle}
        </p>
      )}
    </div>
  );
};