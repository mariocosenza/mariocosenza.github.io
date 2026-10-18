"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Languages, Menu, X } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { navItems, profile } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";
import { PhotoLogo } from "@/components/photo-logo";

export function Navbar() {
  const { lang, toggle } = useLanguage();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState<string>("hero");

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy
  useEffect(() => {
    const sections = navItems
      .map((n) => document.getElementById(n.id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleNav = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "py-2" : "py-4",
      )}
    >
      <div className="container mx-auto max-w-7xl px-4">
        <div
          className={cn(
            "flex items-center justify-between rounded-2xl px-3 py-2 transition-all duration-300",
            scrolled
              ? "glass-strong border border-border/40 shadow-xl shadow-primary/10 backdrop-blur-xl"
              : "border border-transparent",
          )}
        >
          {/* Logo / Name */}
          <button
            onClick={() => handleNav("home")}
            data-cursor="home"
            className="group flex items-center gap-3"
          >
            <PhotoLogo size="sm" rounded="rounded-lg" glow />
            <div className="hidden sm:block">
              <div className="text-sm font-semibold leading-tight">
                {profile.name}
              </div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                {profile.role[lang]}
              </div>
            </div>
          </button>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-0.5 lg:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                data-cursor={item.id}
                className={cn(
                  "relative rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                  active === item.id
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label[lang]}
                {active === item.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-lg bg-primary/15 ring-1 ring-inset ring-primary/30"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1.5">
            {/* Language toggle */}
            <button
              onClick={toggle}
              data-cursor={lang === "it" ? "EN" : "IT"}
              aria-label="Toggle language"
              className="flex h-9 items-center gap-1 rounded-lg border border-border/60 bg-background/40 px-2.5 text-xs font-semibold uppercase tracking-wider transition-colors hover:border-primary/60 hover:text-primary"
            >
              <Languages className="h-3.5 w-3.5" />
              {lang === "it" ? "EN" : "IT"}
            </button>

            {/* Theme toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              data-cursor={theme === "dark" ? "light" : "dark"}
              aria-label="Toggle theme"
              suppressHydrationWarning
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-background/40 transition-colors hover:border-primary/60 hover:text-primary"
            >
              {mounted ? (
                <AnimatePresence mode="wait" initial={false}>
                  {theme === "dark" ? (
                    <motion.span
                      key="sun"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Sun className="h-4 w-4" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="moon"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Moon className="h-4 w-4" />
                    </motion.span>
                  )}
                </AnimatePresence>
              ) : (
                <Sun className="h-4 w-4 opacity-0" />
              )}
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileOpen((p) => !p)}
              aria-label="Toggle menu"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-background/40 lg:hidden"
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="mt-2 overflow-hidden rounded-2xl glass-strong p-2 lg:hidden"
            >
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={cn(
                    "block w-full rounded-lg px-4 py-2.5 text-left text-sm font-medium transition-colors",
                    active === item.id
                      ? "bg-primary/15 text-foreground"
                      : "text-muted-foreground hover:bg-muted/40 hover:text-foreground",
                  )}
                >
                  {item.label[lang]}
                </button>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
