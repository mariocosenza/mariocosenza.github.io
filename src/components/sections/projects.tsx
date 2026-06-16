"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Leaf,
  ShieldAlert,
  Bot,
  Network,
  GraduationCap,
  Star,
  GitFork,
  ExternalLink,
  Github,
  Loader2,
  type LucideIcon,
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { featuredProjects, profile, type FeaturedProject } from "@/lib/portfolio-data";
import { SectionHeading } from "./section-heading";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  Leaf,
  ShieldAlert,
  Bot,
  Network,
  GraduationCap,
};

type GitHubRepo = {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
  homepage: string | null;
  fork: boolean;
};

function FeaturedProjectCard({
  project,
  index,
}: {
  project: FeaturedProject;
  index: number;
}) {
  const { lang } = useLanguage();
  const Icon = iconMap[project.icon] ?? Network;

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      data-cursor={lang === "it" ? "vedi" : "view"}
      className="group relative flex flex-col overflow-hidden rounded-2xl glass ring-1 ring-inset ring-border/40"
    >
      {/* Top gradient strip */}
      <div className={cn("h-1 w-full bg-gradient-to-r", project.accent)} />

      {/* Glow */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute -inset-px -z-10 rounded-2xl bg-gradient-to-br opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-20",
          project.accent,
        )}
      />

      <div className="flex flex-1 flex-col p-6">
        {/* Header */}
        <div className="mb-4 flex items-start justify-between gap-3">
          <div
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-lg",
              project.accent,
            )}
          >
            <Icon className="h-6 w-6" />
          </div>
          <span className="rounded-full bg-muted/60 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            {project.period}
          </span>
        </div>

        {/* Title + description */}
        <h3 className="mb-2 text-xl font-bold tracking-tight">{project.name}</h3>
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
          {project.description[lang]}
        </p>

        {/* Highlights */}
        <ul className="mb-4 space-y-1.5">
          {project.highlights[lang].map((h, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-foreground/80">
              <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-accent" />
              {h}
            </li>
          ))}
        </ul>

        {/* Stack */}
        <div className="mb-4 flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <span
              key={s}
              className="rounded-md bg-primary/15 px-2 py-0.5 font-mono text-[10px] font-medium text-primary ring-1 ring-inset ring-primary/25 dark:bg-primary/10 dark:text-primary dark:ring-primary/15"
            >
              {s}
            </span>
          ))}
        </div>

        {/* Link */}
        <div className="mt-auto pt-2">
          <a
            href={project.repo ?? profile.github}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="repo"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-accent transition-colors hover:text-foreground"
          >
            <Github className="h-3.5 w-3.5" />
            {lang === "it" ? "Repository" : "Repository"}
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </motion.article>
  );
}

function GitHubLiveCard({ repo }: { repo: GitHubRepo }) {
  const { lang } = useLanguage();
  const date = new Date(repo.updated_at);
  const dateStr = date.toLocaleDateString(lang === "it" ? "it-IT" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <motion.a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="repo"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -3 }}
      className="group flex flex-col justify-between rounded-xl glass p-4 ring-1 ring-inset ring-border/40 transition-colors hover:ring-primary/40"
    >
      <div>
        <div className="mb-2 flex items-center gap-2">
          <Github className="h-3.5 w-3.5 text-accent" />
          <span className="truncate font-mono text-sm font-medium text-foreground">
            {repo.name}
          </span>
        </div>
        <p className="mb-3 line-clamp-2 text-xs text-muted-foreground">
          {repo.description ?? (lang === "it" ? "Nessuna descrizione" : "No description")}
        </p>
      </div>
      <div className="flex items-center justify-between text-[11px] text-muted-foreground">
        <div className="flex items-center gap-3">
          {repo.language && (
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-accent" />
              {repo.language}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Star className="h-3 w-3" />
            {repo.stargazers_count}
          </span>
          <span className="flex items-center gap-1">
            <GitFork className="h-3 w-3" />
            {repo.forks_count}
          </span>
        </div>
        <span className="font-mono">{dateStr}</span>
      </div>
    </motion.a>
  );
}

export function ProjectsSection() {
  const { lang } = useLanguage();
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    fetch(
      `https://api.github.com/users/${profile.githubUser}/repos?sort=updated&per_page=12`,
      {
        signal: controller.signal,
        headers: { Accept: "application/vnd.github+json" },
      },
    )
      .then(async (r) => {
        if (!r.ok) throw new Error("github fetch failed");
        const data: GitHubRepo[] = await r.json();
        if (cancelled) return;
        // Filter out forks, sort by stars then updated
        const filtered = data
          .filter((repo) => !repo.fork)
          .sort((a, b) => {
            const sa = a.stargazers_count;
            const sb = b.stargazers_count;
            if (sb !== sa) return sb - sa;
            return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
          })
          .slice(0, 6);
        setRepos(filtered);
        setLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        setError(true);
        setLoading(false);
      });

    return () => {
      cancelled = true;
      clearTimeout(timeout);
      controller.abort();
    };
  }, []);

  return (
    <section id="projects" className="relative py-20 md:py-28">
      <div className="container mx-auto max-w-7xl px-4">
        <SectionHeading
          id="projects"
          index="04"
          title={{ it: "Progetti in evidenza", en: "Featured projects" }}
          subtitle={{
            it: "Una selezione di progetti accademici e personali che mostrano il mio approccio engineering end-to-end.",
            en: "A selection of academic and personal projects showcasing my end-to-end engineering approach.",
          }}
        />

        {/* Featured grid */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((p, i) => (
            <FeaturedProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>

        {/* Live GitHub */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12"
        >
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs uppercase tracking-widest text-accent">
                live
              </span>
              <h3 className="text-lg font-semibold">
                {lang === "it" ? "Ultimi repository da GitHub" : "Latest from GitHub"}
              </h3>
              <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-500 ring-1 ring-inset ring-emerald-500/20">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                realtime
              </span>
            </div>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="@mariocosenza"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-accent"
            >
              @{profile.githubUser}
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          {loading ? (
            <div className="flex h-40 items-center justify-center rounded-xl glass">
              <Loader2 className="h-5 w-5 animate-spin text-accent" />
              <span className="ml-2 text-sm text-muted-foreground">
                {lang === "it" ? "Caricamento repository…" : "Loading repositories…"}
              </span>
            </div>
          ) : error ? (
            <div className="flex h-40 flex-col items-center justify-center rounded-xl glass text-center">
              <p className="text-sm text-muted-foreground">
                {lang === "it"
                  ? "Impossibile caricare i repository in questo momento."
                  : "Couldn't load repositories right now."}
              </p>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-accent"
              >
                <Github className="h-4 w-4" /> Apri GitHub / Open GitHub
              </a>
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {repos.map((r) => (
                <GitHubLiveCard key={r.id} repo={r} />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
