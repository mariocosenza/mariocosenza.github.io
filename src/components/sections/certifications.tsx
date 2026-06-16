"use client";

import { motion } from "framer-motion";
import { Cloud, Code2, type LucideIcon, ExternalLink } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { certifications, type Certification } from "@/lib/portfolio-data";
import { SectionHeading } from "./section-heading";

const iconMap: Record<string, LucideIcon> = {
  Cloud,
  Code2,
};

function CertificationCard({ cert, index }: { cert: Certification; index: number }) {
  const { lang } = useLanguage();
  const Icon = iconMap[cert.icon] ?? Cloud;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateY: -8 }}
      whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      data-cursor={cert.id}
      className="group relative overflow-hidden rounded-2xl glass-strong p-6 ring-1 ring-inset ring-cyan-500/20"
    >
      {/* Decorative gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-cyan-500/15 blur-3xl transition-opacity duration-300 group-hover:opacity-100"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-4 top-4 font-mono text-[10px] font-bold uppercase tracking-widest text-cyan-500/40"
      >
        {cert.code}
      </div>

      <div className="relative">
        {/* Icon */}
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/20 to-primary/20 ring-1 ring-inset ring-cyan-500/30">
          <Icon className="h-7 w-7 text-cyan-400" />
        </div>

        <h3 className="text-lg font-bold leading-tight">
          {cert.title[lang]}
        </h3>
        <div className="mt-1 text-sm text-accent">
          {cert.org[lang]} · <span className="font-mono">{cert.code}</span>
        </div>

        <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-3 py-1 text-[11px] font-medium text-amber-400 ring-1 ring-inset ring-amber-500/20">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400" />
          {cert.status[lang]}
        </div>
      </div>

      {/* Decorative corner badge */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-3 right-3 opacity-20 transition-opacity group-hover:opacity-40"
      >
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2L14.5 8.5L21 9L16 13.5L17.5 20L12 16.5L6.5 20L8 13.5L3 9L9.5 8.5L12 2Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
            className="text-cyan-400"
          />
        </svg>
      </div>
    </motion.div>
  );
}

export function CertificationsSection() {
  const { lang } = useLanguage();

  return (
    <section id="certifications" className="relative py-20 md:py-28">
      <div className="container mx-auto max-w-7xl px-4">
        <SectionHeading
          id="certifications"
          index="06"
          title={{ it: "Certificazioni", en: "Certifications" }}
          subtitle={{
            it: "Percorso di certificazione Microsoft Azure in corso, focalizzato su fondamenta cloud e sviluppo di soluzioni native.",
            en: "Ongoing Microsoft Azure certification path, focused on cloud fundamentals and native solution development.",
          }}
        />

        <div className="grid gap-5 sm:grid-cols-2">
          {certifications.map((c, i) => (
            <CertificationCard key={c.id} cert={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
