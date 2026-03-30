# Content Collections

## Decision

Use Astro's built-in content collections with **one collection per content type** (e.g. `products`, `news`), storing bilingual metadata in frontmatter fields rather than separate files per locale.

## Schema

Defined in `src/content.config.ts` using zod:

```ts
const products = defineCollection({
  loader: glob({ base: './src/content/products', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),            // English name
    titleJa: z.string(),          // Japanese name
    description: z.string(),      // English description
    descriptionJa: z.string(),    // Japanese description
    category: z.enum(['pondashi', 'network-tools', 'iot-tools', 'hardware']),
    features: z.array(z.string()),      // English features
    featuresJa: z.array(z.string()),    // Japanese features
    specs: z.array(z.object({ label: z.string(), value: z.string() })).optional(),
    specsJa: z.array(z.object({ label: z.string(), value: z.string() })).optional(),
    amazonUrl: z.string().optional(),
    bodyJa: z.string().optional(), // Japanese long-form; file body after --- is English
    order: z.number(),
  }),
});
```

## Products

9 product files in `src/content/products/`:

| File | Category | Product |
|------|----------|---------|
| `pondashi-audio.md` | pondashi | Pondashi-kun Audio |
| `pondashi-video.md` | pondashi | Pondashi-kun Video |
| `pondashi-network.md` | pondashi | Pondashi-kun Network |
| `pondashi-mini.md` | pondashi | Pondashi-kun Mini |
| `pondashi-signage.md` | pondashi | Pondashi-kun Signage |
| `echoset.md` | iot-tools | ECHOSET |
| `egrec.md` | iot-tools | egREC |
| `aggressor-network.md` | network-tools | AGGRESSOR NETWORK |
| `raspberry-pi-case.md` | hardware | Raspberry Pi Case |

## How Products Are Displayed

1. **Product listing** (`ProductsTemplate.astro`): fetches all products via `getCollection('products')`, groups by category, renders `ProductCard` for each
2. **Product detail** (`ProductDetailTemplate.astro`): uses `getStaticPaths()` to generate a page per product; Japanese routes render `bodyJa` via `renderMarkdownString()` when set, otherwise `render(entry)`; English routes always use the file body from `render(entry)`
3. **Homepage** (`HomeTemplate.astro`): fetches all products, sorts by `order`, shows top 6

## Adding a New Product

1. Create `src/content/products/{slug}.md`
2. Fill all required frontmatter fields (both English and Japanese)
3. Write the **English** long-form in the markdown body after `---`; add optional `bodyJa` (YAML `|`) for Japanese long-form on default-locale product pages
4. Run `npm run build` to validate against the schema
5. The product automatically appears on listing pages and gets its own detail page

## News

`news` is a second collection in `src/content.config.ts`, loaded from `src/content/news/**/*.md`.

| Field | Type | Purpose |
|-------|------|---------|
| `pubDate` | date (coerced) | Sort order (newest first) |
| `title` | string | English headline |
| `titleJa` | string | Japanese headline |
| `description` | string? | English teaser |
| `descriptionJa` | string? | Japanese teaser |
| `link` | url string? | External URL |
| `linkPath` | string? | Internal path (e.g. `/products/aggressor-network`), localized in templates |
| `bodyJa` | string? | Japanese long-form; file body after `---` is English (same pattern as products) |

**Display**: There are **no** per-item news routes. `NewsTemplate.astro` lists every entry on `/news` and `/en/news`. `HomeTemplate.astro` shows the latest few after sorting by `pubDate`.

**Maintenance**: Run `npm run fetch-bitset-news` to print starter markdown from bitset.jp’s “What’s New” table; use `--write` to create files (skips existing). Generated files include `bodyJa` from the table cell and an English placeholder title/description to replace. Keep `scripts/fetch-bitset-news.mjs` in sync with `src/data/legacyUrlMap.ts` for product URL rewriting.

## Modifying the Schema

Schema changes affect all files in that collection. When adding a required field:

1. Update `src/content.config.ts`
2. Update **all** markdown files in the collection with the new field
3. Build to verify — the build will fail if any file is missing the field
