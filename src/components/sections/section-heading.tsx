"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import type { Lang } from "@/lib/portfolio-data";

type Props = {
  id: string;
  index: string; // "01", "02", ...
  title: { it: string; en: string };
  subtitle?: { it: string; en: string };
};

export function SectionHeading({ id, index, title, subtitle }: Props) {
  const { lang } = useLanguage() as { lang: Lang };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="mb-10 flex flex-col gap-3 md:mb-14"
      id={`${id}-heading`}
    >
      <div className="flex items-center gap-3">
        <span className="font-mono text-sm font-semibold text-accent">{index}</span>
        <span className="h-px w-12 bg-gradient-to-r from-accent to-transparent" />
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
          section
        </span>
      </div>
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
        {title[lang]}
      </h2>
      {subtitle && (
        <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">
          {subtitle[lang]}
        </p>
      )}
    </motion.div>
  );
}
