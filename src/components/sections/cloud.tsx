"use client";

import { motion } from "framer-motion";
import {
  Zap,
  Boxes,
  FileCode2,
  GitBranch,
  Database,
  ShieldCheck,
  Code2,
  Hammer,
  Rocket,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { cloudCapabilities, type CloudCapability } from "@/lib/portfolio-data";
import { SectionHeading } from "./section-heading";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  Zap,
  Boxes,
  FileCode2,
  GitBranch,
  Database,
  ShieldCheck,
  Code2,
  Hammer,
  Rocket,
  TrendingUp,
};

function CapabilityCard({
  cap,
  index,
}: {
  cap: CloudCapability;
  index: number;
}) {
  const { lang } = useLanguage();
  const Icon = iconMap[cap.icon] ?? Boxes;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: -8 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      data-cursor={cap.id}
      className="group relative overflow-hidden rounded-2xl glass-strong p-6 ring-1 ring-inset ring-border/40"
    >
      {/* Hover gradient glow */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute -inset-px -z-10 rounded-2xl bg-gradient-to-br opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-25",
          cap.accent,
        )}
      />

      <div className="relative">
        {/* Icon with gradient */}
        <div
          className={cn(
            "mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3",
            cap.accent,
          )}
        >
          <Icon className="h-6 w-6" />
        </div>

        <h3 className="mb-2 text-base font-semibold leading-tight">
          {cap.title[lang]}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {cap.description[lang]}
        </p>

        {/* Animated underline */}
        <div className="mt-4 h-px w-full overflow-hidden bg-border/40">
          <div
            className={cn(
              "h-full w-0 bg-gradient-to-r transition-all duration-500 group-hover:w-full",
              cap.accent,
            )}
          />
        </div>
      </div>
    </motion.div>
  );
}

export function CloudSection() {
  const { lang } = useLanguage();

  return (
    <section id="cloud" className="relative py-20 md:py-28">
      <div className="container mx-auto max-w-7xl px-4">
        <SectionHeading
          id="cloud"
          index="02"
          title={{ it: "Cloud Capabilities", en: "Cloud Capabilities" }}
          subtitle={{
            it: "Come costruisco soluzioni Cloud-Native su Azure: dal serverless all'orchestrazione container, dall'IaC alla sicurezza.",
            en: "How I build Cloud-Native solutions on Azure: from serverless to container orchestration, from IaC to security.",
          }}
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cloudCapabilities.map((c, i) => (
            <CapabilityCard key={c.id} cap={c} index={i} />
          ))}
        </div>

        {/* Cloud-native lifecycle flow with REAL icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 overflow-hidden rounded-2xl glass p-6 md:p-8"
        >
          <div className="mb-6 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent">
            <span className="h-px w-6 bg-accent/60" />
            {lang === "it" ? "ciclo cloud-native" : "cloud-native lifecycle"}
          </div>
          <div className="flex flex-col items-stretch gap-3 md:flex-row md:items-center md:justify-between">
            {[
              {
                label: { it: "Codice", en: "Code" },
                desc: { it: "Bicep + app", en: "Bicep + app" },
                Icon: Code2,
                color: "from-purple-500 to-fuchsia-500",
              },
              {
                label: { it: "Build", en: "Build" },
                desc: { it: "CI pipeline", en: "CI pipeline" },
                Icon: Hammer,
                color: "from-amber-500 to-orange-500",
              },
              {
                label: { it: "Container", en: "Container" },
                desc: { it: "Docker image", en: "Docker image" },
                Icon: Boxes,
                color: "from-cyan-500 to-blue-500",
              },
              {
                label: { it: "Deploy", en: "Deploy" },
                desc: { it: "K8s / Azure", en: "K8s / Azure" },
                Icon: Rocket,
                color: "from-emerald-500 to-teal-500",
              },
              {
                label: { it: "Scale", en: "Scale" },
                desc: { it: "Auto-scaling", en: "Auto-scaling" },
                Icon: TrendingUp,
                color: "from-rose-500 to-pink-500",
              },
            ].map((step, i, arr) => {
              const StepIcon = step.Icon;
              return (
                <div key={step.label.en} className="flex items-center gap-2 md:flex-1">
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: i * 0.12,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    whileHover={{ y: -3 }}
                    className="flex flex-1 items-center gap-3 rounded-xl border border-border/50 bg-background/40 p-3 transition-colors hover:border-primary/40"
                  >
                    <div
                      className={cn(
                        "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-white shadow-lg",
                        step.color,
                      )}
                    >
                      <StepIcon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold leading-tight">
                        {step.label[lang]}
                      </div>
                      <div className="font-mono text-[10px] text-muted-foreground">
                        {step.desc[lang]}
                      </div>
                    </div>
                  </motion.div>
                  {i < arr.length - 1 && (
                    <motion.div
                      initial={{ scaleX: 0, opacity: 0 }}
                      whileInView={{ scaleX: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.4,
                        delay: i * 0.12 + 0.1,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="hidden h-px w-6 flex-shrink-0 origin-left bg-gradient-to-r from-accent/60 to-primary/60 md:block"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
