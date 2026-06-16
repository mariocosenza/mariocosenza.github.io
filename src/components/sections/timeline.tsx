"use client";

import { motion } from "framer-motion";
import { GraduationCap, Briefcase, type LucideIcon } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { timeline, type TimelineItem } from "@/lib/portfolio-data";
import { SectionHeading } from "./section-heading";
import { cn } from "@/lib/utils";

const typeIcon: Record<TimelineItem["type"], LucideIcon> = {
  education: GraduationCap,
  experience: Briefcase,
};

const typeColor: Record<TimelineItem["type"], string> = {
  education: "from-purple-500 to-fuchsia-500",
  experience: "from-cyan-500 to-sky-500",
};

const typeRing: Record<TimelineItem["type"], string> = {
  education: "ring-purple-500/40",
  experience: "ring-cyan-500/40",
};

export function TimelineSection() {
  const { lang } = useLanguage();

  return (
    <section id="timeline" className="relative py-20 md:py-28">
      {/* Decorative */}
      <div className="absolute inset-0 cyber-grid opacity-20" aria-hidden />

      <div className="container relative mx-auto max-w-7xl px-4">
        <SectionHeading
          id="timeline"
          index="05"
          title={{ it: "Formazione & Esperienza", en: "Education & Experience" }}
          subtitle={{
            it: "Tappe del mio percorso accademico e professionale, in ordine cronologico.",
            en: "Milestones in my academic and professional journey, in chronological order.",
          }}
        />

        <div className="relative mx-auto max-w-3xl">
          {/* Center line */}
          <div
            aria-hidden
            className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-transparent via-border to-transparent md:left-1/2 md:-translate-x-1/2"
          />

          <ul className="space-y-8 md:space-y-12">
            {timeline.map((item, i) => {
              const Icon = typeIcon[item.type];
              const color = typeColor[item.type];
              const ring = typeRing[item.type];
              const isLeft = i % 2 === 0;

              return (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.55, delay: 0.05 }}
                  className="relative pl-12 md:grid md:grid-cols-2 md:gap-8 md:pl-0"
                >
                  {/* Node dot */}
                  <div
                    className={cn(
                      "absolute left-4 top-1 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-br text-white ring-4 ring-background md:left-1/2",
                      color,
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </div>

                  {/* Card */}
                  <div
                    className={cn(
                      "md:col-span-1",
                      isLeft ? "md:pr-8 md:text-right" : "md:col-start-2 md:pl-8",
                    )}
                  >
                    <div
                      data-cursor={item.id}
                      className={cn(
                        "group rounded-2xl glass p-5 ring-1 ring-inset transition-all duration-300 hover:-translate-y-1 hover:ring-primary/40",
                        ring,
                      )}
                    >
                      <div
                        className={cn(
                          "mb-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground",
                          isLeft ? "md:text-right" : "",
                        )}
                      >
                        {item.date}
                      </div>
                      <h3 className="text-base font-semibold leading-tight">
                        {item.title[lang]}
                      </h3>
                      <div
                        className={cn(
                          "mt-1 text-xs text-accent",
                          isLeft ? "md:text-right" : "",
                        )}
                      >
                        {item.org[lang]}
                      </div>
                      <p
                        className={cn(
                          "mt-3 text-sm leading-relaxed text-muted-foreground",
                          isLeft ? "md:text-right" : "",
                        )}
                      >
                        {item.description[lang]}
                      </p>
                      <div
                        className={cn(
                          "mt-3 flex flex-wrap gap-1.5",
                          isLeft ? "md:justify-end" : "",
                        )}
                      >
                        {item.tags.map((t) => (
                          <span
                            key={t}
                            className="rounded-full bg-muted/60 px-2 py-0.5 text-[10px] font-medium text-muted-foreground ring-1 ring-inset ring-border/40"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
