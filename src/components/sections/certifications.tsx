"use client";

import { motion } from "framer-motion";
import {
  Cloud,
  Code2,
  ExternalLink,
  type LucideIcon,
  BadgeCheck,
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { certifications, type Certification } from "@/lib/portfolio-data";
import { SectionHeading } from "./section-heading";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  Cloud,
  Code2,
};

function CertificationCard({
  cert,
  index,
}: {
  cert: Certification;
  index: number;
}) {
  const { lang } = useLanguage();
  const Icon = iconMap[cert.icon] ?? Cloud;
  const achieved = cert.state === "achieved";

  return (
    <motion.a
      href={cert.credentialUrl ?? undefined}
      target={cert.credentialUrl ? "_blank" : undefined}
      rel={cert.credentialUrl ? "noopener noreferrer" : undefined}
      data-cursor={cert.credentialUrl ? "verify" : cert.id}
      initial={{ opacity: 0, y: 30, rotateY: -8 }}
      whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className={cn(
        "group relative block overflow-hidden rounded-2xl p-6 ring-1 ring-inset transition-colors",
        achieved
          ? "glass-strong ring-emerald-500/30 hover:ring-emerald-500/50"
          : "glass ring-border/40 hover:ring-primary/40",
      )}
    >
      {/* Decorative gradient */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full blur-3xl transition-opacity duration-300 group-hover:opacity-100",
          achieved ? "bg-emerald-500/15" : "bg-cyan-500/15",
        )}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-4 top-4 font-mono text-[10px] font-bold uppercase tracking-widest text-cyan-500/40"
      >
        {cert.code}
      </div>

      <div className="relative">
        {/* Icon with state-dependent color */}
        <div
          className={cn(
            "mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ring-1 ring-inset",
            achieved
              ? "bg-gradient-to-br from-emerald-500/25 to-teal-500/20 ring-emerald-500/40"
              : "bg-gradient-to-br from-cyan-500/20 to-primary/20 ring-cyan-500/30",
          )}
        >
          <Icon
            className={cn(
              "h-7 w-7",
              achieved ? "text-emerald-400" : "text-cyan-400",
            )}
          />
        </div>

        <h3 className="text-lg font-bold leading-tight">
          {cert.title[lang]}
        </h3>
        <div className="mt-1 text-sm text-accent">
          {cert.org[lang]} · <span className="font-mono">{cert.code}</span>
        </div>

        {/* Status badge */}
        <div className="mt-4">
          {achieved ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-3 py-1 text-[11px] font-semibold text-emerald-400 ring-1 ring-inset ring-emerald-500/30">
              <BadgeCheck className="h-3.5 w-3.5" />
              {cert.status[lang]}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 px-3 py-1 text-[11px] font-medium text-amber-400 ring-1 ring-inset ring-amber-500/30">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400" />
              {cert.status[lang]}
            </span>
          )}
        </div>

        {/* Credential link */}
        {achieved && cert.credentialUrl && (
          <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 transition-colors group-hover:text-emerald-300">
            <ExternalLink className="h-3 w-3" />
            {lang === "it" ? "Verifica credenziale" : "Verify credential"}
          </div>
        )}
      </div>

      {/* Decorative corner badge */}
      {achieved && (
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-3 right-3 text-emerald-500/30 transition-opacity group-hover:text-emerald-500/50"
        >
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2L14.5 8.5L21 9L16 13.5L17.5 20L12 16.5L6.5 20L8 13.5L3 9L9.5 8.5L12 2Z"
              fill="currentColor"
              opacity={0.3}
            />
            <path
              d="M9 12l2 2 4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}
    </motion.a>
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
            it: "Percorso di certificazione Microsoft Azure, focalizzato su fondamenta cloud e sviluppo di soluzioni native.",
            en: "Microsoft Azure certification path, focused on cloud fundamentals and native solution development.",
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
