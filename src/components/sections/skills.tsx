"use client";

import { motion } from "framer-motion";
import {
  Cloud,
  BrainCircuit,
  Server,
  Layout,
  Code2,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { skillCategories, type SkillCategory } from "@/lib/portfolio-data";
import { SectionHeading } from "./section-heading";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  Cloud,
  BrainCircuit,
  Server,
  Layout,
  Code2,
  Workflow,
};

const colorMap: Record<string, { text: string; ring: string; bg: string; chipBg: string; chipText: string; chipRing: string }> = {
  cyan: {
    text: "text-cyan-400 dark:text-cyan-300",
    ring: "ring-cyan-500/30",
    bg: "bg-cyan-500/10",
    chipBg: "bg-cyan-500/15 dark:bg-cyan-500/10",
    chipText: "text-cyan-700 dark:text-cyan-300",
    chipRing: "ring-cyan-500/25",
  },
  purple: {
    text: "text-purple-400 dark:text-purple-300",
    ring: "ring-purple-500/30",
    bg: "bg-purple-500/10",
    chipBg: "bg-purple-500/15 dark:bg-purple-500/10",
    chipText: "text-purple-700 dark:text-purple-300",
    chipRing: "ring-purple-500/25",
  },
  emerald: {
    text: "text-emerald-400 dark:text-emerald-300",
    ring: "ring-emerald-500/30",
    bg: "bg-emerald-500/10",
    chipBg: "bg-emerald-500/15 dark:bg-emerald-500/10",
    chipText: "text-emerald-700 dark:text-emerald-300",
    chipRing: "ring-emerald-500/25",
  },
  pink: {
    text: "text-pink-400 dark:text-pink-300",
    ring: "ring-pink-500/30",
    bg: "bg-pink-500/10",
    chipBg: "bg-pink-500/15 dark:bg-pink-500/10",
    chipText: "text-pink-700 dark:text-pink-300",
    chipRing: "ring-pink-500/25",
  },
  amber: {
    text: "text-amber-400 dark:text-amber-300",
    ring: "ring-amber-500/30",
    bg: "bg-amber-500/10",
    chipBg: "bg-amber-500/15 dark:bg-amber-500/10",
    chipText: "text-amber-700 dark:text-amber-300",
    chipRing: "ring-amber-500/25",
  },
  rose: {
    text: "text-rose-400 dark:text-rose-300",
    ring: "ring-rose-500/30",
    bg: "bg-rose-500/10",
    chipBg: "bg-rose-500/15 dark:bg-rose-500/10",
    chipText: "text-rose-700 dark:text-rose-300",
    chipRing: "ring-rose-500/25",
  },
};

function SkillCard({ category, index }: { category: SkillCategory; index: number }) {
  const { lang } = useLanguage();
  const Icon = iconMap[category.icon] ?? Code2;
  const colors = colorMap[category.color] ?? colorMap.purple;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -4 }}
      data-cursor={category.id}
      className={cn(
        "group relative overflow-hidden rounded-2xl glass p-5 ring-1 ring-inset transition-all duration-300",
        colors.ring,
      )}
    >
      {/* Glow on hover */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100",
          colors.bg,
        )}
        style={{ filter: "blur(40px)" }}
      />

      <div className="relative">
        {/* Header */}
        <div className="mb-4 flex items-center gap-3">
          <div
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-xl ring-1 ring-inset",
              colors.bg,
              colors.ring,
              colors.text,
            )}
          >
            <Icon className="h-5 w-5" />
          </div>
          <h3 className="text-base font-semibold leading-tight">
            {category.title[lang]}
          </h3>
        </div>

        {/* Tag cloud (no percentages) */}
        <ul className="flex flex-wrap gap-1.5">
          {category.skills.map((s, i) => (
            <motion.li
              key={s}
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.05 + i * 0.03 }}
              className={cn(
                "rounded-lg px-2.5 py-1 text-xs font-medium ring-1 ring-inset transition-colors",
                colors.chipBg,
                colors.chipText,
                colors.chipRing,
              )}
            >
              {s}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export function SkillsSection() {
  const { lang } = useLanguage();

  return (
    <section id="skills" className="relative py-20 md:py-28">
      {/* Decorative grid */}
      <div className="absolute inset-0 cyber-grid opacity-20" aria-hidden />

      <div className="container relative mx-auto max-w-7xl px-4">
        <SectionHeading
          id="skills"
          index="03"
          title={{ it: "Competenze tecniche", en: "Technical skills" }}
          subtitle={{
            it: "Lo stack che uso per costruire architetture cloud-native, servizi serverless e pipeline DevOps.",
            en: "The stack I use to build cloud-native architectures, serverless services and DevOps pipelines.",
          }}
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((cat, i) => (
            <SkillCard key={cat.id} category={cat} index={i} />
          ))}
        </div>

        {/* Kubernetes highlight callout (Helm removed) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-8 flex flex-col items-start gap-3 rounded-2xl border border-dashed border-cyan-500/40 bg-cyan-500/5 p-5 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-400 ring-1 ring-inset ring-cyan-500/30">
              <Cloud className="h-5 w-5" />
            </div>
            <div>
              <div className="font-semibold">
                {lang === "it" ? "Kubernetes — orchestrazione container" : "Kubernetes — container orchestration"}
              </div>
              <div className="text-sm text-muted-foreground">
                {lang === "it"
                  ? "Deploy, scaling e gestione di workload containerizzati su cluster K8s."
                  : "Deploy, scaling and management of containerised workloads on K8s clusters."}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {["Pods", "Deployments", "Services", "Ingress"].map((t) => (
              <span
                key={t}
                className="rounded-full bg-cyan-500/10 px-2.5 py-0.5 text-[11px] font-medium text-cyan-300 ring-1 ring-inset ring-cyan-500/20"
              >
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
