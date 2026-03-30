# Execution Plan 002: Multilingual Support (ja/en)

**Status**: Completed
**Started**: 2026-03-25
**Completed**: 2026-03-25

## Objective

Add Japanese and English language support with Japanese as the default language. Include a language switcher in the header.

## Decisions Made

1. **Template component pattern** — instead of duplicating pages, extract logic into `*Template.astro` components and use thin route wrappers for each locale. See [i18n.md](../../decisions/i18n.md).
2. **Centralized translation dictionary** — all UI strings in `src/i18n/translations.ts`, accessed via `useTranslations(lang)`.
3. **Bilingual frontmatter** — product markdown files contain both English and Japanese fields (`title`/`titleJa`, `description`/`descriptionJa`, etc.) rather than separate files per locale.
4. **No `prefixDefaultLocale`** — Japanese pages served from root paths, English from `/en/` prefix.
5. **No fallback routing** — initially configured `fallback: { en: 'ja' }` but removed it because explicit English pages exist for all routes, and the fallback caused route conflicts.

## Changes

### New files
- `src/i18n/translations.ts` — ~410 lines, comprehensive ja/en dictionary
- `src/i18n/utils.ts` — `useTranslations`, `getLocalizedPath`, `getAlternateLang`, `getLangFromUrl`
- `src/components/pages/*Template.astro` — 6 template components
- `src/pages/en/*.astro` — 6 English route wrappers (including `en/products/index.astro` and `en/products/[slug].astro`)

### Modified files
- `astro.config.mjs` — added `i18n` configuration
- `src/content.config.ts` — added `descriptionJa`, `featuresJa`, `specsJa` fields
- All 9 product markdown files — added Japanese translation fields
- `src/pages/*.astro` — converted to thin wrappers
- `src/layouts/BaseLayout.astro` — dynamic `lang` attribute, translated meta
- `src/components/Header.astro` — translated nav labels, language switcher button
- `src/components/Footer.astro` — translated text
- `src/components/Hero.astro` — translated CTA labels
- `src/components/ProductCard.astro` — locale-aware title/description

## Result

28 pages generated (14 per locale). Language switcher functional in both desktop and mobile views.
