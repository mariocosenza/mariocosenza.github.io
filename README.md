# Mario Cosenza — Portfolio

Modern, cyber/tech-dark personal portfolio built with Next.js 16, TypeScript, Tailwind CSS 4 and Framer Motion. Cloud-focused: highlights Azure, Kubernetes, Docker, Serverless and DevOps capabilities.

Live site: **https://mariocosenza.github.io**

## ✨ Features

- **Cyber/Tech Dark theme** with glassmorphism, glitch effects, animated gradients
- **Interactive particle network** background in the hero (reacts to the mouse)
- **Ambient mesh gradient** giving depth to every section
- **Custom cursor** with floating accent label chip
- **Bilingual IT/EN** with persistent language toggle
- **Auto dark/light theme** based on browser preferences (with manual override)
- **8 sections**: Hero · About · Cloud capabilities · Skills · Projects · Timeline · Certifications · Hobbies · Contact
- **Live GitHub repos** fetched client-side from the GitHub API
- **CV PDF download** + LinkedIn CTA + email copy
- **Fully responsive** mobile-first design
- **WCAG-compliant contrasts** in both themes
- **Static export** — deployable to GitHub Pages, Netlify, Vercel or any static host

## 🛠 Tech Stack

- Next.js 16 (App Router, static export)
- TypeScript 5
- Tailwind CSS 4 + shadcn/ui
- Framer Motion (animations)
- next-themes (dark/light)
- Lucide React (icons)

## 🚀 Local Development

```bash
bun install
bun run dev
```

Open http://localhost:3000

## 📦 Build Static Export

```bash
bun run build:static
```

Output is generated in `./out/` and can be served by any static host.

## 🔧 Deploy to GitHub Pages

The repository includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that automatically builds and deploys to GitHub Pages on every push to `main`.

### One-time setup

1. Push this repo to `https://github.com/mariocosenza/mariocosenza.github.io` (must be `main` branch)
2. In the repo settings → **Pages** → **Source**: select **GitHub Actions**
3. Wait for the workflow to finish — the site will be live at https://mariocosenza.github.io

### Manual push (first time)

```bash
git init
git remote add origin https://github.com/mariocosenza/mariocosenza.github.io.git
git branch -M main
git add .
git commit -m "feat: initial portfolio commit"
git push -u origin main
```

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout (providers, cursor, fonts)
│   ├── page.tsx            # Single-page composition of all sections
│   └── globals.css         # Theme + cyber utilities
├── components/
│   ├── custom-cursor.tsx   # Custom cursor with floating label
│   ├── navbar.tsx          # Sticky navbar with scroll-spy
│   ├── footer.tsx
│   ├── photo-logo.tsx      # Profile photo component
│   └── sections/
│       ├── hero.tsx        # Hero + particle canvas
│       ├── about.tsx
│       ├── cloud.tsx       # Cloud capabilities + lifecycle flow
│       ├── skills.tsx      # Tag-cloud skill cards
│       ├── projects.tsx    # Featured projects + live GitHub repos
│       ├── timeline.tsx
│       ├── certifications.tsx
│       ├── hobbies.tsx
│       └── contact.tsx     # LinkedIn CTA + email copy
└── lib/
    ├── portfolio-data.ts   # All bilingual content
    └── language-context.tsx
```

## 📝 License

Personal portfolio of Mario Cosenza. Source code available for reference; content and branding are personal.
