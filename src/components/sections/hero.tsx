"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { profile, techStack } from "@/lib/portfolio-data";

/**
 * Animated particle network canvas background — subtle and only in the hero.
 * Lightweight 2D canvas (no Three.js), high-DPI aware, pauses when tab hidden.
 * Particles react GENTLY to the mouse (slight attraction) but otherwise flow
 * with a soft ambient drift — not random, not chaotic.
 */
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let t = 0;
    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      // original anchor for gentle wave drift
      ax: number;
      ay: number;
      phase: number;
    }[] = [];

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Re-seed particles — fewer than before for a cleaner look
      const count = Math.max(28, Math.min(70, Math.floor((w * h) / 22000)));
      particles.length = 0;
      for (let i = 0; i < count; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        particles.push({
          x,
          y,
          vx: 0,
          vy: 0,
          ax: x,
          ay: y,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    // Smoothed mouse for gentle reactivity (not jerky)
    const mouse = { x: -9999, y: -9999, active: false };
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const isDark = () =>
      typeof document !== "undefined" && document.documentElement.classList.contains("dark");

    const draw = () => {
      t += 0.004;
      ctx.clearRect(0, 0, w, h);
      const dark = isDark();

      // Softer, dimmer colors than before — but visible enough
      const dotColor = dark ? "rgba(168, 130, 255, 0.5)" : "rgba(124, 58, 237, 0.4)";
      const dotColorHot = dark ? "rgba(120, 220, 255, 0.85)" : "rgba(14, 165, 233, 0.75)";
      const lineColorNear = dark ? "rgba(168, 130, 255, 0.16)" : "rgba(124, 58, 237, 0.13)";
      const lineColorFar = dark ? "rgba(56, 189, 248, 0.09)" : "rgba(14, 165, 233, 0.08)";
      const lineColorHot = dark ? "rgba(120, 220, 255, 0.4)" : "rgba(14, 165, 233, 0.3)";

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Ambient gentle drift: small sinusoidal movement around anchor.
        // Deterministic, NOT random — produces a "breathing" wave pattern.
        const driftX = Math.sin(t + p.phase) * 0.22;
        const driftY = Math.cos(t * 0.8 + p.phase) * 0.22;

        // Mouse reactivity — noticeable but not chaotic. The cursor pulls nearby
        // particles toward it, and they light up. Far particles stay calm.
        let mouseHeat = 0;
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 220 && dist > 0) {
            const f = (1 - dist / 220) * 0.45; // noticeable attraction
            p.vx += (dx / dist) * f * 0.04;
            p.vy += (dy / dist) * f * 0.04;
            mouseHeat = 1 - dist / 220; // 0..1 — used to brighten the particle
          }
        }

        // Spring back to anchor + ambient drift → predictable, fluid motion.
        // Weaker spring so the mouse wake lingers longer before particles return.
        p.vx += (p.ax + driftX - p.x) * 0.006;
        p.vy += (p.ay + driftY - p.y) * 0.006;

        p.x += p.vx;
        p.y += p.vy;

        // Moderate friction → particles settle back but the wake lingers a bit
        p.vx *= 0.95;
        p.vy *= 0.95;

        // Draw dot — color depends on mouse proximity (heat)
        const radius = 1.3 + mouseHeat * 1.2;
        if (mouseHeat > 0.3) {
          // Hot particle near cursor — bright cyan glow
          ctx.fillStyle = dotColorHot;
          ctx.beginPath();
          ctx.arc(p.x, p.y, radius + mouseHeat * 2, 0, Math.PI * 2);
          ctx.fill();
          // Inner bright core
          ctx.fillStyle = dotColorHot;
          ctx.globalAlpha = mouseHeat;
          ctx.beginPath();
          ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1;
        } else {
          ctx.fillStyle = dotColor;
          ctx.beginPath();
          ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
          ctx.fill();
        }

        // Connect to nearby — lines brighten when either endpoint is hot
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const ddx = p.x - q.x;
          const ddy = p.y - q.y;
          const d = Math.hypot(ddx, ddy);
          if (d < 130) {
            const alpha = (1 - d / 130) * 0.9;
            // Use hot color if either particle is near the mouse
            const isHot = mouseHeat > 0.2;
            ctx.strokeStyle = isHot && d < 80 ? lineColorHot : d < 60 ? lineColorNear : lineColorFar;
            ctx.globalAlpha = alpha;
            ctx.lineWidth = isHot ? 0.8 : 0.55;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onLeave);

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else {
        raf = requestAnimationFrame(draw);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 h-full w-full"
      style={{ pointerEvents: "none" }}
    />
  );
}

// Cloud-focused rotating roles. Knowledge Graphs removed from typewriter.
const roles = {
  it: [
    "Cloud-Native",
    "Serverless Computing",
    "Azure Architectures",
    "Distributed Systems",
    "DevOps",
  ],
  en: [
    "Cloud-Native",
    "Serverless Computing",
    "Azure Architectures",
    "Distributed Systems",
    "DevOps",
  ],
};

export function HeroSection() {
  const { lang } = useLanguage();
  const [roleIdx, setRoleIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const word = roles[lang][roleIdx];
    if (typing) {
      if (typed.length < word.length) {
        const t = setTimeout(() => setTyped(word.slice(0, typed.length + 1)), 70);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setTyping(false), 1500);
      return () => clearTimeout(t);
    } else {
      if (typed.length > 0) {
        const t = setTimeout(() => setTyped(word.slice(0, typed.length - 1)), 35);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => {
        setTyping(true);
        setRoleIdx((i) => (i + 1) % roles[lang].length);
      }, 50);
      return () => clearTimeout(t);
    }
  }, [typed, typing, roleIdx, lang]);

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0 cyber-grid opacity-60" />
      <ParticleCanvas />
      {/* Aurora blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-primary/30 blur-3xl animate-blob"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-accent/25 blur-3xl animate-blob"
        style={{ animationDelay: "4s" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/3 top-1/2 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl animate-blob"
        style={{ animationDelay: "8s" }}
      />
      {/* Bottom fade */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent"
      />

      <div className="container relative z-10 mx-auto max-w-7xl px-4">
        <div className="flex flex-col items-start gap-6">
          {/* Status pill */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            {lang === "it"
              ? "Disponibile per opportunità"
              : "Open to opportunities"}
            <Sparkles className="h-3 w-3 text-accent" />
          </motion.div>

          {/* Name with glitch */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-3 font-mono text-sm uppercase tracking-[0.3em] text-accent"
            >
              {profile.role[lang]}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="font-sans text-5xl font-bold leading-none tracking-tight sm:text-7xl lg:text-8xl"
              aria-label={profile.name}
            >
              <span aria-hidden="true">
                <span
                  className="glitch text-gradient-cyber"
                  data-text={profile.name.split(" ")[0]}
                >
                  {profile.name.split(" ")[0]}
                </span>{" "}
                <span className="text-foreground">{profile.name.split(" ")[1]}</span>
              </span>
              <span className="sr-only">{profile.name}</span>
            </motion.h1>
          </div>

          {/* Rotating role */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex h-8 items-center font-mono text-lg text-muted-foreground sm:text-2xl"
          >
            <span className="text-accent">{"> "}</span>
            <span className="caret-blink">{typed}</span>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="max-w-2xl text-base text-muted-foreground sm:text-lg"
          >
            {profile.tagline[lang]}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="flex flex-wrap items-center gap-3"
          >
            <button
              onClick={() =>
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
              }
              data-cursor={lang === "it" ? "contattami" : "contact"}
              className="group relative inline-flex h-11 items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-primary to-accent px-6 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-transform hover:scale-[1.02] active:scale-95"
            >
              <Mail className="h-4 w-4" />
              {lang === "it" ? "Contattami" : "Get in touch"}
              <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-full" />
            </button>

            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="GitHub"
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-border/60 bg-background/40 px-5 text-sm font-medium transition-colors hover:border-primary/60 hover:text-primary"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>

            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="LinkedIn"
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-border/60 bg-background/40 px-5 text-sm font-medium transition-colors hover:border-primary/60 hover:text-primary"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
          </motion.div>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="flex items-center gap-2 text-xs text-muted-foreground"
          >
            <span className="font-mono">{">"}</span>
            <span>
              {profile.location} · {profile.email}
            </span>
          </motion.div>

          {/* Tech stack strip — animated chips of cloud/backend skills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mt-4 w-full max-w-3xl"
          >
            <div className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              <span className="h-px w-6 bg-accent/60" />
              {lang === "it" ? "tech stack" : "tech stack"}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {techStack.map((t, i) => (
                <motion.span
                  key={t}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 1.1 + i * 0.04 }}
                  className="rounded-md border border-border/50 bg-background/40 px-2.5 py-1 font-mono text-[11px] text-foreground/80 backdrop-blur-sm"
                >
                  {t}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue — scroll to about section */}
      <motion.button
        onClick={() =>
          document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
        }
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { delay: 1.2, duration: 0.5 },
          y: { delay: 1.2, duration: 1.6, repeat: Infinity, ease: "easeInOut" },
        }}
        aria-label={lang === "it" ? "Vai a Su di me" : "Go to About"}
        data-cursor="about"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-muted-foreground/70 hover:text-accent"
      >
        <ArrowDown className="h-5 w-5" />
      </motion.button>
    </section>
  );
}
