"use client";

import { motion } from "framer-motion";
import { GraduationCap, MapPin, Mail } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { about, profile, languages } from "@/lib/portfolio-data";
import { SectionHeading } from "./section-heading";
import { PhotoLogo } from "@/components/photo-logo";

export function AboutSection() {
  const { lang } = useLanguage();
  const data = about[lang];

  return (
    <section id="about" className="relative py-20 md:py-28">
      <div className="container mx-auto max-w-7xl px-4">
        <SectionHeading
          id="about"
          index="01"
          title={{ it: data.title, en: about.en.title }}
          subtitle={{
            it: "Una panoramica rapida del mio profilo, della mia formazione e di cosa mi spinge.",
            en: "A quick overview of my profile, my background and what drives me.",
          }}
        />

        <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          {/* Left: avatar card + contacts */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="glass-strong relative overflow-hidden rounded-2xl p-6">
              {/* Decorative */}
              <div
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/20 blur-3xl"
              />
              <div className="relative flex flex-col items-center gap-4 text-center">
                <div className="relative">
                  <PhotoLogo size="lg" rounded="rounded-2xl" glow />
                  <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-white ring-2 ring-background">
                    ●
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold">{profile.name}</h3>
                  <p className="text-sm text-muted-foreground">{profile.role[lang]}</p>
                </div>
                <div className="flex flex-wrap justify-center gap-1.5">
                  <span className="rounded-full bg-cyan-500/10 px-2.5 py-0.5 text-[11px] font-medium text-cyan-400 ring-1 ring-inset ring-cyan-500/20">
                    Cloud-Native
                  </span>
                  <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
                    Serverless
                  </span>
                  <span className="rounded-full bg-purple-500/10 px-2.5 py-0.5 text-[11px] font-medium text-purple-400 ring-1 ring-inset ring-purple-500/20">
                    DevOps
                  </span>
                </div>
              </div>

              {/* Mini contact rows */}
              <div className="mt-6 space-y-2 border-t border-border/50 pt-4 text-sm">
                <a
                  href={`mailto:${profile.email}`}
                  data-cursor="mail"
                  className="flex items-center gap-2.5 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Mail className="h-3.5 w-3.5 text-accent" />
                  <span className="truncate">{profile.email}</span>
                </a>
                <div className="flex items-center gap-2.5 text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5 text-accent" />
                  <span className="text-xs">{profile.location}</span>
                </div>
                <div className="flex items-center gap-2.5 text-muted-foreground">
                  <GraduationCap className="h-3.5 w-3.5 text-accent" />
                  <span className="text-xs">
                    {lang === "it"
                      ? "Laurea Magistrale in Informatica (in corso)"
                      : "MSc in Computer Science (in progress)"}
                  </span>
                </div>
              </div>
            </div>

            {/* Languages */}
            <div className="glass rounded-2xl p-5">
              <h4 className="mb-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                {lang === "it" ? "Lingue" : "Languages"}
              </h4>
              <div className="space-y-3">
                {languages.map((l) => (
                  <div key={l.name}>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span className="font-medium">{l.name}</span>
                      <span className="text-xs text-muted-foreground">{l.level[lang]}</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${l.value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: bio + single stat */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="space-y-4 text-base leading-relaxed text-foreground/90">
              {data.description.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={i === 0 ? "text-lg" : ""}
                >
                  {p}
                </motion.p>
              ))}
            </div>

            {/* Single highlighted stat: Progetti */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="glass relative overflow-hidden rounded-2xl p-6"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-accent/20 blur-3xl"
              />
              <div className="relative flex items-center gap-5">
                <div className="bg-gradient-to-br from-primary to-accent bg-clip-text text-5xl font-bold text-transparent sm:text-6xl">
                  {data.stat.label}
                </div>
                <div>
                  <div className="text-base font-semibold">
                    {data.stat.sub}
                  </div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">
                    {lang === "it" ? "end-to-end distribuiti" : "shipped end-to-end"}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
