# AGENTS.md — bitset Inc. Company Portfolio

> This file is a **map**, not an encyclopedia.
> It tells you what this project is and where to find details.
> Keep it under ~100 lines.

## Project Identity

- **What**: Company portfolio website for bitset Inc. (株式会社 bitset)
- **Stack**: Astro 6, Tailwind CSS 4, TypeScript
- **Hosting**: GitHub Pages via GitHub Actions (`withastro/action`)
- **URL**: https://bitset-jp.github.io
- **Migration**: Migration target for the legacy site at https://bitset.jp
- **Content reuse**: Images, embedded media URLs (e.g. YouTube), and other assets from bitset.jp may be copied into this project as part of the migration

## Architecture (quick summary)

Pages are **thin wrappers** to page templates; templates use `useTranslations()` for locale-aware content.
Product and news items live in **Astro Content Collections** (markdown + zod schema).
A single `BaseLayout` wraps every page with `Header` and `Footer`.

See [ARCHITECTURE.md](ARCHITECTURE.md) for diagrams and full breakdown.

## i18n Rules

- Default language: **Japanese (ja)** — served from root paths (`/`, `/about`, …)
- English: served from `/en/` prefix (`/en/`, `/en/about`, …)
- All UI strings go in `src/i18n/translations.ts`
- Use `useTranslations(lang)` to get a `t()` function — never hardcode text
- Product bilingual fields (`titleJa`, `descriptionJa`, `featuresJa`, `specsJa`) live in frontmatter alongside English fields
- Routing configured in `astro.config.mjs` with `prefixDefaultLocale: false`

## Key Directories

| Path | Purpose |
|------|---------|
| `src/pages/` | Route entry points (ja at root, en under `en/`) |
| `src/components/pages/` | Page template components (*Template.astro) |
| `src/components/` | Shared UI components (Header, Footer, Hero, cards) |
| `src/layouts/` | BaseLayout.astro |
| `src/i18n/` | Translation dictionary + utility functions |
| `src/content/products/` | Product markdown files (content collection) |
| `src/content/news/` | News markdown files (content collection; `/news` list only) |
| `src/styles/` | global.css with Tailwind theme |
| `.github/workflows/` | Deploy to GitHub Pages on push to main |
| `.agents/skills/` | Procedural step-by-step skills for common tasks |

## Document Map

All repository knowledge lives in `docs/`, organized by purpose:

| Path | Contents |
|------|----------|
| **decisions/** | Architecture decision records |
| `decisions/core-beliefs.md` | Agent-first operating principles |
| `decisions/i18n.md` | Multilingual routing and translation strategy |
| `decisions/content-collections.md` | Product data model and bilingual content schema |
| **guides/** | How-to references |
| `guides/frontend.md` | Component inventory, adding pages/products, i18n API |
| `guides/design-system.md` | Color palette, typography, layout patterns, component styling |
| **plans/** | Execution plans and debt tracking |
| `plans/tech-debt.md` | Known gaps and shortcuts |
| `plans/active/` | In-progress execution plans |
| `plans/completed/` | Finished plans (001-portfolio-site, 002-multilingual) |
| **product/** | Product direction and specs |
| `product/direction.md` | Mission, priorities, and constraints |
| `product/portfolio-spec.md` | Requirements for the portfolio site |
| **operations/** | Build, deploy, security, and quality |
| `operations/reliability.md` | Build pipeline, hosting, recovery |
| `operations/security.md` | Threat model, dependencies, recommendations |
| `operations/quality.md` | Quality scores per domain and layer |
| **generated/** | Auto-generated references |
| `generated/route-map.md` | All page routes with source files |
| **references/** | External reference pointers |
| `references/astro.md` | Astro docs links and project-specific config |

## Skills

Reusable step-by-step procedures live in `.agents/skills/`:

| Skill | Path | When to use |
|-------|------|-------------|
| add-page | `.agents/skills/add-page/SKILL.md` | Creating a new bilingual page with template, routes, and translations |
| add-product | `.agents/skills/add-product/SKILL.md` | Adding a product to the content collection with full frontmatter |

## Core Constraints

1. This is a **static site** — no server runtime, no database, no API
2. Every page must exist in **both ja and en** locales
3. Product content uses the **content collection schema** as the contract — validate with `npx astro build`
4. Pages are thin wrappers; logic lives in `src/components/pages/*Template.astro`
5. Do not add dependencies without justification — the site ships as static HTML/CSS/JS

## Commands

```sh
npm run dev       # Local dev server at localhost:4321
npm run build     # Production build to ./dist/
npm run preview   # Preview production build locally
```
