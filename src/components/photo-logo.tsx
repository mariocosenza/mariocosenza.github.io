"use client";

import { profile } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

type Size = "sm" | "md" | "lg" | "xl";

const sizeMap: Record<Size, string> = {
  sm: "h-9 w-9",
  md: "h-11 w-11",
  lg: "h-24 w-24",
  xl: "h-32 w-32",
};

/**
 * Photo logo: uses Mario's real image instead of the "MC" placeholder.
 * Includes a subtle gradient overlay for visual consistency with the cyber theme.
 */
export function PhotoLogo({
  size = "md",
  className,
  rounded = "rounded-lg",
  ring = true,
  glow = false,
}: {
  size?: Size;
  className?: string;
  rounded?: string;
  ring?: boolean;
  glow?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-gradient-to-br from-primary/30 to-accent/30",
        sizeMap[size],
        rounded,
        ring && "ring-1 ring-inset ring-white/20",
        glow && "shadow-lg shadow-primary/30",
        className,
      )}
    >
      <img
        src={profile.photo}
        alt={profile.name}
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
        decoding="async"
      />
      {/* Subtle gradient overlay for cyber feel */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-accent/10 mix-blend-overlay"
      />
    </div>
  );
}
