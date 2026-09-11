"use client";

import React, { useState } from "react";
import { ClaimStatus, CLAIM_STATUS_MAP } from "@/content/claims";
import { cn } from "@/lib/utils";
import { Info, X } from "lucide-react";

interface ClaimBadgeProps {
  status: ClaimStatus;
  label?: string;
  evidence?: string;
  className?: string;
  showInfoTrigger?: boolean;
}

export const ClaimBadge: React.FC<ClaimBadgeProps> = ({
  status,
  label,
  evidence,
  className,
  showInfoTrigger = true,
}) => {
  const meta = CLAIM_STATUS_MAP[status];
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  return (
    <div className="relative inline-flex items-center">
      <div
        className={cn(
          "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase border transition-colors select-none",
          meta.badgeClass,
          className
        )}
      >
        <span className={cn("w-1.5 h-1.5 rounded-full animate-pulse", meta.dotClass)} />
        <span>{label || meta.label}</span>
        {evidence && showInfoTrigger && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsTooltipOpen(!isTooltipOpen);
            }}
            aria-label="Ver criterio de transparencia"
            className="ml-0.5 hover:opacity-80 p-0.5 text-current"
          >
            <Info className="w-3 h-3" />
          </button>
        )}
      </div>

      {isTooltipOpen && evidence && (
        <div className="absolute left-0 top-full mt-2 z-50 w-64 p-3 bg-brand-forest text-brand-paper rounded-xl shadow-card text-xs space-y-1.5 animate-in fade-in zoom-in-95">
          <div className="flex items-center justify-between font-semibold border-b border-white/10 pb-1">
            <span className="text-brand-leafLight">{meta.label}</span>
            <button
              onClick={() => setIsTooltipOpen(false)}
              className="text-white/60 hover:text-white"
              aria-label="Cerrar"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-brand-paper/90 leading-normal">{evidence}</p>
          <p className="text-[10px] text-white/50 italic border-t border-white/10 pt-1">
            Transparencia Angles Natural: Criterio Anti-Greenwashing.
          </p>
        </div>
      )}
    </div>
  );
};