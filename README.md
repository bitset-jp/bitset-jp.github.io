# bitset Inc. — Company Portfolio

Company portfolio website for **bitset Inc.** (株式会社 bitset), an embedded systems and IoT development company based in Osaka, Japan.

This repository migrates the legacy corporate site at [https://bitset.jp](https://bitset.jp). Images, YouTube embeds, and other media from that site are expected to be brought into this project as part of the migration.

**Live site**: https://park-bitset.github.io

## Stack

- [Astro](https://astro.build/) 6 — static site generator
- [Tailwind CSS](https://tailwindcss.com/) 4 — utility-first styling
- GitHub Pages — hosting
- GitHub Actions — CI/CD

## Getting Started

```sh
# Install dependencies
npm install

# Start dev server (http://localhost:4321)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

Requires **Node.js >= 24.14.0**.

## Project Structure

```
src/
├── pages/              # Route entry points (ja default, en/ for English)
├── components/
│   ├── pages/          # Page template components (*Template.astro)
│   └── *.astro         # Shared UI components
├── layouts/            # BaseLayout.astro
├── i18n/               # Translation dictionary + utilities
├── content/products/   # Product markdown (content collection)
└── styles/             # Tailwind theme (global.css)
```

See [ARCHITECTURE.md](ARCHITECTURE.md) for detailed diagrams and design rationale.

## Multilingual

The site supports **Japanese** (default, root paths) and **English** (`/en/` prefix).

- UI strings: `src/i18n/translations.ts`
- Utility functions: `src/i18n/utils.ts`
- Product bilingual data: frontmatter fields in `src/content/products/*.md`

## Deployment

Pushes to `main` trigger automatic deployment to GitHub Pages via `.github/workflows/deploy.yml`.

## Documentation

Repository knowledge lives in `docs/`. See [AGENTS.md](AGENTS.md) for the index.
