# Thanveer Ahammed N — Portfolio

A production-grade personal portfolio built on Next.js 15, communicating software engineering work rather than a template. Dark mode by default, light mode supported, minimal and performance-first.

## Stack
- **Framework:** Next.js 15 (App Router, TypeScript)
- **Styling:** Tailwind CSS v4 + design tokens (CSS variables)
- **Components:** shadcn/ui (Radix primitives)
- **Animation:** Framer Motion
- **Icons:** lucide-react (+ hand-authored GitHub/LinkedIn marks)
- **Theme:** next-themes (dark default, light supported)
- **Fonts:** Inter (UI), JetBrains Mono (code)

## Project Structure
```text
app/
  layout.tsx              # fonts, theme provider, nav, footer, metadata
  page.tsx                # homepage composed from components/sections
  projects/[slug]/        # per-project route (stub — full case studies: Phase 2)
components/
  sections/                # Hero, About, Experience, Projects, Skills, Philosophy, Process, Stats, Testimonials, Contact
  ui/                      # shadcn/ui primitives (hand-vendored, Radix-based)
lib/data/                  # experience.ts, projects.ts, skills.ts — content data
```

## Local Development
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

## Roadmap
- **Phase 2:** full product-page case studies for each project under `/projects/[slug]`.
- **Phase 3:** MDX blog, command palette (⌘K), search, resume/uses/now pages, testimonials content, sitemap/robots/structured data.

## Author
**Thanveer Ahammed N** — Software Engineer
[GitHub](https://github.com/thanveer006) | [LinkedIn](https://www.linkedin.com/in/thanveer-ahammed-dev)
