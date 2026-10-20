"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import type { Lang } from "./portfolio-data";

type LanguageContextValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "mario-portfolio-lang";

/**
 * Detect the user's preferred language:
 * 1. If the user has previously chosen a language (localStorage), respect that choice
 * 2. Otherwise, fall back to the browser language — if it starts with "en", use English;
 *    otherwise default to Italian (the author's mother tongue).
 * Returns "it" during SSR so that server-rendered HTML is stable.
 */
function detectInitialLang(): Lang {
  if (typeof window === "undefined") return "it";
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "it" || stored === "en") return stored;
    // Detect from browser language. navigator.language is typically a BCP-47
    // tag like "en-US", "en-GB", "it-IT", "fr-FR", etc. We only support it/en,
    // so anything not starting with "en" defaults to Italian.
    const nav = navigator.language?.toLowerCase() ?? "";
    if (nav.startsWith("en")) return "en";
    return "it";
  } catch {
    return "it";
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Initialise once on the client with the detected language — avoids the
  // initial flash of Italian when the browser is actually in English.
  // During SSR/hydration this returns "it" so the server and client agree
  // (React will then reconcile after mount).
  const [lang, setLangState] = useState<Lang>("it");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setLangState(detectInitialLang());
      setMounted(true);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  // Persist the user's choice and sync the <html lang> attribute
  useEffect(() => {
    if (!mounted) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* noop */
    }
    document.documentElement.lang = lang;
  }, [lang, mounted]);

  const setLang = (l: Lang) => setLangState(l);
  const toggle = () => setLangState((p) => (p === "it" ? "en" : "it"));

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}
