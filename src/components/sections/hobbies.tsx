"use client";

import { motion } from "framer-motion";
import {
  Plane,
  Flag,
  CircleDot,
  Medal,
  Cpu,
  MonitorCog,
  MapPin,
  type LucideIcon,
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { hobbies, type Hobby } from "@/lib/portfolio-data";
import { SectionHeading } from "./section-heading";

const iconMap: Record<string, LucideIcon> = {
  Plane,
  Flag,
  CircleDot,
  Medal,
  Cpu,
  MonitorCog,
  MapPin,
};

function HobbyCard({ hobby, index }: { hobby: Hobby; index: number }) {
  const { lang } = useLanguage();
  const Icon = iconMap[hobby.icon] ?? CircleDot;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, rotateX: -10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      whileHover={{ y: -6 }}
      data-cursor={hobby.id}
      className="group relative overflow-hidden rounded-2xl glass p-5 ring-1 ring-inset ring-border/40 transition-colors hover:ring-primary/40"
    >
      {/* Hover gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 text-primary ring-1 ring-inset ring-primary/20 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-sm font-semibold leading-tight">{hobby.title[lang]}</h3>
          <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
            {hobby.description[lang]}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function HobbiesSection() {
  const { lang } = useLanguage();

  return (
    <section id="hobbies" className="relative py-20 md:py-28">
      <div className="container mx-auto max-w-7xl px-4">
        <SectionHeading
          id="hobbies"
          index="07"
          title={{ it: "Hobby & Interessi", en: "Hobbies & Interests" }}
          subtitle={{
            it: "Fuori dal codice: le passioni che alimentano la mia curiosità e disciplina.",
            en: "Outside the code: the passions that fuel my curiosity and discipline.",
          }}
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {hobbies.map((h, i) => (
            <HobbyCard key={h.id} hobby={h} index={i} />
          ))}
        </div>

        {/* Quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-12 max-w-3xl text-center"
        >
          <p className="font-mono text-sm text-accent">{"//"}</p>
          <p className="mt-3 text-base italic text-foreground/80 sm:text-lg">
            {lang === "it"
              ? "“La disciplina del judo, la precisione dell'ingegneria, la curiosità per il mondo: tutto converge nel modo in cui costruisco software.”"
              : "“The discipline of judo, the precision of engineering, the curiosity for the world: everything converges in the way I build software.”"}
          </p>
        </motion.blockquote>
      </div>
    </section>
  );
}
