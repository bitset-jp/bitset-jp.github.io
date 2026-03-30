# Frontend Architecture

Technical reference for the frontend implementation.

## Component Inventory

### Layout
| Component | Path | Purpose |
|-----------|------|---------|
| BaseLayout | `src/layouts/BaseLayout.astro` | HTML shell, meta tags, Header + Footer wrapper |

### Page Templates
| Component | Path | Pages |
|-----------|------|-------|
| HomeTemplate | `src/components/pages/HomeTemplate.astro` | `/`, `/en` |
| AboutTemplate | `src/components/pages/AboutTemplate.astro` | `/about`, `/en/about` |
| ServicesTemplate | `src/components/pages/ServicesTemplate.astro` | `/services`, `/en/services` |
| ProductsTemplate | `src/components/pages/ProductsTemplate.astro` | `/products`, `/en/products` |
| ProductDetailTemplate | `src/components/pages/ProductDetailTemplate.astro` | `/products/[slug]`, `/en/products/[slug]` |
| ContactTemplate | `src/components/pages/ContactTemplate.astro` | `/contact`, `/en/contact` |

### Shared Components
| Component | Path | Props |
|-----------|------|-------|
| Header | `src/components/Header.astro` | (none — reads locale from `Astro.currentLocale`) |
| Footer | `src/components/Footer.astro` | (none — reads locale from `Astro.currentLocale`) |
| Hero | `src/components/Hero.astro` | `title`, `subtitle`, `showCta?` |
| SectionHeading | `src/components/SectionHeading.astro` | `title`, `subtitle?`, `centered?` |
| ProductCard | `src/components/ProductCard.astro` | `slug`, `title`, `description`, `category` |
| ServiceCard | `src/components/ServiceCard.astro` | `icon`, `title`, `description` |
| PhilosophyCard | `src/components/PhilosophyCard.astro` | `number`, `title`, `titleJa`, `description` |
| TechBadge | `src/components/TechBadge.astro` | `label` |
| TimelineItem | `src/components/TimelineItem.astro` | `date`, `title`, `description` |

## Adding a New Page

> **Skill**: `.agents/skills/add-page/SKILL.md` — full procedure with file templates.

1. Create the template: `src/components/pages/NewPageTemplate.astro`
   - Import `BaseLayout`, components, and `useTranslations`
   - Use `Astro.currentLocale` for locale detection
2. Add translation keys to `src/i18n/translations.ts` for both `ja` and `en`
3. Create Japanese route: `src/pages/new-page.astro` importing the template
4. Create English route: `src/pages/en/new-page.astro` importing the template
5. Add navigation link in `Header.astro` if needed
6. Update `docs/generated/route-map.md`

## i18n Utilities API

All functions in `src/i18n/utils.ts`:

### `useTranslations(lang: Lang | string | undefined)`
Returns a `t(key)` function that looks up the translation for the given locale, falling back to `defaultLang` (ja) if the key is missing.

### `getLocalizedPath(path: string, lang: Lang | string | undefined)`
Converts a root path to its locale-prefixed form. For Japanese, returns the path as-is. For English, prepends `/en`.

### `getAlternateLang(lang: Lang | string | undefined)`
Returns the other locale (`ja` → `en`, `en` → `ja`).

### `getLangFromUrl(url: URL)`
Extracts the locale from a URL pathname by checking the first path segment.

## Content Collections

See [decisions/content-collections.md](../decisions/content-collections.md) for the full schema reference.

### Adding a New Product

> **Skill**: `.agents/skills/add-product/SKILL.md` — full procedure with frontmatter template.

1. Create `src/content/products/{slug}.md` with all required frontmatter fields
2. Write the **English** markdown body after the frontmatter; add optional `bodyJa` for Japanese long-form on default-locale detail pages
3. Run `npm run build` to validate the schema
4. The product appears automatically on listing and detail pages in both locales

### Querying Products

```ts
import { getCollection } from 'astro:content';
const allProducts = await getCollection('products');
const sorted = allProducts.sort((a, b) => a.data.order - b.data.order);
```

For product detail pages, use `getStaticPaths()` to generate routes. Use `render(entry)` for the English body; when `entry.data.bodyJa` is set, Japanese routes render it with `renderMarkdownString()` (see `ProductDetailTemplate.astro`).

## Styling

See [design-system.md](design-system.md) for the visual design system, color tokens, and component styling patterns.
