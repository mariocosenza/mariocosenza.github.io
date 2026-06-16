"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Heart } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { profile, navItems } from "@/lib/portfolio-data";
import { PhotoLogo } from "@/components/photo-logo";

export function Footer() {
  const { lang } = useLanguage();
  const year = new Date().getFullYear();

  const handleNav = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <footer className="mt-auto border-t border-border/40 bg-background/40">
      <div className="container mx-auto max-w-7xl px-4 py-10">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          {/* Left: brand */}
          <button
            onClick={() => handleNav("hero")}
            className="flex items-center gap-3"
            data-cursor="home"
          >
            <PhotoLogo size="sm" rounded="rounded-lg" />
            <div className="text-left">
              <div className="text-sm font-semibold">{profile.name}</div>
              <div className="text-[11px] text-muted-foreground">
                {profile.role[lang]} · {profile.location}
              </div>
            </div>
          </button>

          {/* Center: quick nav */}
          <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className="transition-colors hover:text-accent"
              >
                {item.label[lang]}
              </button>
            ))}
          </nav>

          {/* Right: socials */}
          <div className="flex items-center gap-2">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              data-cursor="GitHub"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-background/40 transition-colors hover:border-primary/60 hover:text-primary"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              data-cursor="LinkedIn"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-background/40 transition-colors hover:border-primary/60 hover:text-primary"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href={`mailto:${profile.email}`}
              aria-label="Email"
              data-cursor="mail"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-background/40 transition-colors hover:border-primary/60 hover:text-primary"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-border/30 pt-6 text-center text-[11px] text-muted-foreground sm:flex-row sm:text-left"
        >
          <span>
            © {year} {profile.name}.{" "}
            {lang === "it"
              ? "Tutti i diritti riservati."
              : "All rights reserved."}
          </span>
          <span className="flex items-center gap-1.5">
            {lang === "it" ? "Costruito con" : "Built with"}{" "}
            <Heart className="h-3 w-3 fill-rose-500 text-rose-500" />{" "}
            {lang === "it"
              ? "usando Next.js, TypeScript, Tailwind & Framer Motion"
              : "using Next.js, TypeScript, Tailwind & Framer Motion"}
          </span>
        </motion.div>
      </div>
    </footer>
  );
}
