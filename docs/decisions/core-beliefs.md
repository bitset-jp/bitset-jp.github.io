# Core Beliefs

Operating principles for agents and humans working on this repository.

## 1. Pages are thin wrappers

Route entry points (`src/pages/`) contain no logic. They import and render a single template component from `src/components/pages/`. This keeps routing concerns separate from rendering and allows the same template to serve multiple locales without duplication.

## 2. Translations are always co-located

All UI strings live in a single dictionary (`src/i18n/translations.ts`). Product bilingual fields live in the same markdown file's frontmatter. Content is never split across locale-specific directories — both languages coexist in the same source file.

## 3. The content schema is the contract

`src/content.config.ts` defines the zod schema for product data. The build fails if any product markdown file violates the schema. Treat schema changes as breaking changes — update all content files atomically.

## 4. No hardcoded text in templates or components

Every user-visible string must go through `useTranslations(lang)`. If you see a raw string in a `.astro` file, it's a bug. The only exception is structural labels that are language-independent (e.g., brand name "bitset").

## 5. Static-first, no runtime dependencies

This site generates static HTML. There is no server, no database, no API. Every page is pre-rendered at build time. Do not introduce runtime dependencies or server-side logic.

## 6. Minimal dependency surface

The dependency list is intentionally small: Astro, Tailwind CSS, and their Vite plugin. Adding a new dependency requires justification. Prefer built-in Astro features and vanilla solutions over third-party packages.

## 7. Repository knowledge is the system of record

Documentation lives in `docs/`. Plans, design decisions, and quality assessments are versioned alongside the code. External tools (Notion, Google Docs, Slack) are ephemeral — if it matters, it belongs in the repository.
