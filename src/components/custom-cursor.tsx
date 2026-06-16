"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Custom cursor with:
 * - Smooth follow with spring easing
 * - Ring grows when hovering interactive elements
 * - Floating label chip above the cursor (NOT inside the ring) when hovering
 *   [data-cursor] elements.
 *
 * Label design:
 * - Rectangular rounded chip
 * - Positioned with an OFFSET toward the top-right of the cursor so it never
 *   overlaps the central dot or ring
 * - Uses --accent (cyan) as background with dark text → high contrast, not white
 * - Hidden on touch devices (pointer: coarse)
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(true);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    // Skip on touch devices
    if (typeof window === "undefined") return;
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    if (isCoarse) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const labelEl = labelRef.current;
    if (!dot || !ring || !labelEl) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (hidden) setHidden(false);

      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      // Label offset: 22px right, 28px up (top-right of cursor)
      labelEl.style.transform = `translate3d(${mouseX + 18}px, ${mouseY - 34}px, 0)`;

      // Detect hoverable element under cursor
      const target = e.target as HTMLElement | null;
      const interactive = target?.closest(
        'a, button, [role="button"], input, textarea, select, [data-cursor], summary',
      );
      if (interactive) {
        setHovering(true);
        const cursorLabel = interactive.getAttribute("data-cursor");
        setLabel(cursorLabel);
      } else {
        setHovering(false);
        setLabel(null);
      }
    };

    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);
    const onLeave = () => setHidden(true);
    const onEnter = () => setHidden(false);

    const tick = () => {
      // Spring follow for ring (slower than dot for trail effect)
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, [hidden]);

  return (
    <>
      {/* Center dot — brand accent, small */}
      <div
        ref={dotRef}
        aria-hidden
        className={`pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 rounded-full bg-primary transition-opacity duration-200 ${
          hidden ? "opacity-0" : "opacity-100"
        }`}
        style={{
          boxShadow: "0 0 10px var(--primary), 0 0 20px var(--primary)",
          willChange: "transform",
        }}
      />
      {/* Outer ring — stays as a thin outline (no label inside anymore) */}
      <div
        ref={ringRef}
        aria-hidden
        className={`pointer-events-none fixed left-0 top-0 z-[9998] rounded-full border transition-[width,height,border-color,background-color,opacity] duration-200 ${
          hidden ? "opacity-0" : "opacity-100"
        } ${
          clicking
            ? "h-7 w-7 border-accent bg-accent/15"
            : hovering
              ? "h-12 w-12 border-accent/80 bg-accent/5"
              : "h-8 w-8 border-primary/50 bg-transparent"
        }`}
        style={{
          willChange: "transform",
        }}
      />
      {/* Floating label chip — offset top-right, accent background, dark text */}
      <div
        ref={labelRef}
        aria-hidden
        className={`pointer-events-none fixed left-0 top-0 z-[10000] origin-bottom-left transition-opacity duration-150 ${
          label && hovering && !hidden ? "opacity-100" : "opacity-0"
        }`}
        style={{ willChange: "transform" }}
      >
        {label ? (
          <div className="flex items-center rounded-md border border-accent/40 bg-accent px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-background shadow-lg shadow-accent/30">
            {label}
          </div>
        ) : null}
      </div>
    </>
  );
}
