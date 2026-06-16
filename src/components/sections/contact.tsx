"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Github,
  Linkedin,
  Download,
  Check,
  Copy,
  ArrowUpRight,
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { profile } from "@/lib/portfolio-data";
import { SectionHeading } from "./section-heading";
import { toast } from "sonner";

export function ContactSection() {
  const { lang } = useLanguage();
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      toast.success(lang === "it" ? "Email copiata!" : "Email copied!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error(lang === "it" ? "Copia non riuscita" : "Copy failed");
    }
  };

  const channels = [
    {
      icon: Mail,
      label: "Email",
      value: profile.email,
      href: `mailto:${profile.email}`,
      dataCursor: "mail",
    },
    {
      icon: Github,
      label: "GitHub",
      value: `@${profile.githubUser}`,
      href: profile.github,
      dataCursor: "GitHub",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "in/mariocosenza",
      href: profile.linkedin,
      dataCursor: "LinkedIn",
    },
  ];

  return (
    <section id="contact" className="relative py-20 md:py-28">
      {/* Decorative */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[60%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl"
      />

      <div className="container relative mx-auto max-w-7xl px-4">
        <SectionHeading
          id="contact"
          index="08"
          title={{ it: "Contatti", en: "Contact" }}
          subtitle={{
            it: "Hai un progetto, una proposta o una domanda? Sono a un'email di distanza.",
            en: "Got a project, a proposal or a question? I'm one email away.",
          }}
        />

        <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          {/* Left: big LinkedIn CTA + email + CV */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            {/* Big LinkedIn CTA */}
            <motion.a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="LinkedIn"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="group relative block overflow-hidden rounded-2xl bg-gradient-to-br from-[#0A66C2]/20 via-primary/15 to-accent/15 p-6 ring-1 ring-inset ring-[#0A66C2]/30 md:p-8"
            >
              {/* Decorative blobs */}
              <div
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#0A66C2]/30 blur-3xl"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-12 -left-8 h-40 w-40 rounded-full bg-accent/20 blur-3xl"
              />

              <div className="relative flex items-center gap-5">
                <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-[#0A66C2] text-white shadow-lg shadow-[#0A66C2]/30 transition-transform duration-300 group-hover:scale-110">
                  <Linkedin className="h-8 w-8" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-accent">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                    {lang === "it" ? "connettiamoci" : "let's connect"}
                  </div>
                  <h3 className="mt-1 text-xl font-bold">
                    {lang === "it" ? "Trovi su LinkedIn" : "Find me on LinkedIn"}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {lang === "it"
                      ? "Il modo migliore per contattarmi: messaggi, proposte e opportunità professionali."
                      : "The best way to reach me: messages, proposals and professional opportunities."}
                  </p>
                </div>
                <ArrowUpRight className="h-6 w-6 flex-shrink-0 text-foreground/60 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent" />
              </div>
            </motion.a>

            {/* Email copy + CV download */}
            <div className="grid gap-3 sm:grid-cols-2">
              <button
                onClick={copyEmail}
                data-cursor={copied ? "copied" : "copy"}
                className="group inline-flex h-14 items-center justify-center gap-2 rounded-2xl border border-border/60 bg-background/40 px-4 text-sm font-medium transition-all hover:border-primary/60 hover:text-primary"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-emerald-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                <span className="flex flex-col items-start">
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    {lang === "it" ? "email" : "email"}
                  </span>
                  <span className="font-mono text-xs">
                    {copied
                      ? lang === "it"
                        ? "Copiata!"
                        : "Copied!"
                      : profile.email}
                  </span>
                </span>
              </button>

              <a
                href="/Mario_Cosenza_CV.pdf"
                download="Mario_Cosenza_CV.pdf"
                data-cursor="cv"
                className="group inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-accent px-4 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-transform hover:scale-[1.02] active:scale-95"
              >
                <Download className="h-4 w-4" />
                <span className="flex flex-col items-start">
                  <span className="text-[10px] uppercase tracking-widest opacity-80">
                    PDF
                  </span>
                  <span>{lang === "it" ? "Scarica CV" : "Download CV"}</span>
                </span>
              </a>
            </div>

            {/* Other channels */}
            <div className="grid gap-3 sm:grid-cols-2">
              {channels.map((c, i) => (
                <motion.a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  data-cursor={c.dataCursor}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  whileHover={{ y: -3 }}
                  className="group flex items-center gap-3 rounded-xl glass p-4 ring-1 ring-inset ring-border/40 transition-colors hover:ring-primary/40"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary/15 to-accent/15 text-primary ring-1 ring-inset ring-primary/20 transition-transform group-hover:scale-110">
                    <c.icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                      {c.label}
                    </div>
                    <div className="truncate text-sm font-medium">{c.value}</div>
                  </div>
                </motion.a>
              ))}

              {/* Location */}
              <div className="flex items-start gap-3 rounded-xl glass p-4 text-sm text-muted-foreground">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    {lang === "it" ? "posizione" : "location"}
                  </div>
                  <div className="text-sm font-medium text-foreground">
                    {profile.location}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: availability card + quote */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="glass-strong relative overflow-hidden rounded-2xl p-6">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-emerald-500/15 blur-3xl"
              />
              <div className="relative">
                <div className="mb-4 flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  </span>
                  <h3 className="text-base font-semibold">
                    {lang === "it" ? "Disponibile" : "Available"}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {lang === "it"
                    ? "Aperto a opportunità full-time, collaborazioni freelance e progetti open-source. Particolarmente interessato a ruoli cloud-focused con sfide su architetture distribuite, serverless e DevOps."
                    : "Open to full-time roles, freelance collaborations and open-source projects. Particularly interested in cloud-focused roles with challenges on distributed architectures, serverless and DevOps."}
                </p>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-500/20">
                    Full-time
                  </span>
                  <span className="rounded-full bg-cyan-500/15 px-2.5 py-0.5 text-[11px] font-semibold text-cyan-700 ring-1 ring-inset ring-cyan-500/30 dark:bg-cyan-500/10 dark:text-cyan-400 dark:ring-cyan-500/20">
                    Freelance
                  </span>
                  <span className="rounded-full bg-purple-500/15 px-2.5 py-0.5 text-[11px] font-semibold text-purple-700 ring-1 ring-inset ring-purple-500/30 dark:bg-purple-500/10 dark:text-purple-400 dark:ring-purple-500/20">
                    Open-source
                  </span>
                  <span className="rounded-full bg-amber-500/15 px-2.5 py-0.5 text-[11px] font-semibold text-amber-700 ring-1 ring-inset ring-amber-500/30 dark:bg-amber-500/10 dark:text-amber-400 dark:ring-amber-500/20">
                    {lang === "it" ? "Remote OK" : "Remote OK"}
                  </span>
                </div>
              </div>
            </div>

            {/* Quote / signature */}
            <div className="glass rounded-2xl p-6">
              <div className="mb-3 font-mono text-xs uppercase tracking-widest text-accent">
                {"//"} {lang === "it" ? "filosofia" : "philosophy"}
              </div>
              <p className="text-base italic leading-relaxed text-foreground/80">
                {lang === "it"
                  ? "“Automatizza il ripetitivo, osserva i sistemi, semplifica le architetture. Il cloud non è un posto, è un modo di pensare l'infrastruttura.”"
                  : "“Automate the repetitive, observe the systems, simplify the architectures. The cloud is not a place, it's a way of thinking about infrastructure.”"}
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                <span className="h-px flex-1 bg-border/40" />
                <span className="font-mono">— {profile.name}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
