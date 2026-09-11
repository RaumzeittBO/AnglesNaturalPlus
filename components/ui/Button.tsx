"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { soundFx } from "@/lib/audio";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "gold";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  className,
  children,
  icon,
  onClick,
  ...props
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    soundFx.playClick();
    if (onClick) onClick(e);
  };

  const baseStyles =
    "inline-flex items-center justify-center gap-2.5 font-medium transition-all duration-200 focus-visible:ring-2 focus-visible:ring-brand-emerald disabled:opacity-50 disabled:pointer-events-none rounded-full select-none";

  const sizeStyles = {
    sm: "px-4 py-2 text-xs tracking-wider uppercase",
    md: "px-6 py-3 text-sm tracking-wide",
    lg: "px-8 py-4 text-base tracking-wide shadow-sm",
  };

  const variantStyles = {
    primary:
      "bg-brand-forest text-brand-paper hover:bg-brand-emerald hover:shadow-card active:translate-y-0.5 border border-brand-forest/90",
    secondary:
      "bg-brand-cream text-brand-ink hover:bg-brand-sand border border-brand-border active:translate-y-0.5",
    ghost:
      "bg-transparent text-brand-forest hover:bg-brand-cream/60 border border-transparent hover:border-brand-border",
    gold:
      "bg-brand-accent-gold text-brand-paper hover:brightness-110 shadow-sm active:translate-y-0.5",
  };

  return (
    <button
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      onClick={handleClick}
      {...props}
    >
      {children}
      {icon && <span className="transition-transform duration-200 group-hover:translate-x-0.5">{icon}</span>}
    </button>
  );
};