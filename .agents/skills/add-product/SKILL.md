---
name: add-product
description: >-
  Add a new product to the Astro content collection. Use when adding a product
  that should appear on listing pages and get its own detail page.
---

# Add a New Product

## Steps

### 1. Create the product markdown file

Create `src/content/products/{slug}.md` with the following frontmatter template:

```markdown
---
title: "Product Name"
titleJa: "製品名"
description: "English description of the product."
descriptionJa: "日本語の製品説明。"
category: "pondashi"  # one of: pondashi, network-tools, iot-tools, hardware
features:
  - "English feature 1"
  - "English feature 2"
featuresJa:
  - "日本語の機能1"
  - "日本語の機能2"
specs:
  - { label: "Spec Label", value: "Spec Value" }
specsJa:
  - { label: "仕様ラベル", value: "仕様値" }
amazonUrl: "https://www.amazon.co.jp/..."  # optional
bodyJa: |  # optional; Japanese long-form for /products/{slug}
  日本語の詳細をここに（YAMLの `|` ブロック）。
order: 10  # sort order for display (lower = earlier)
---

Extended product description in **English** markdown (shown on `/en/products/{slug}`).
```

### 2. Fill all required fields

Every field except `specs`, `specsJa`, and `amazonUrl` is required. The schema is defined in `src/content.config.ts` using zod. Both English and Japanese fields must be provided.

**Required fields**: `title`, `titleJa`, `description`, `descriptionJa`, `category`, `features`, `featuresJa`, `order`

**Optional fields**: `specs`, `specsJa`, `amazonUrl`, `bodyJa`

**Valid categories**: `pondashi`, `network-tools`, `iot-tools`, `hardware`

### 3. Write long-form copy

- **English**: markdown body below the frontmatter (`/en/products/...`).
- **Japanese**: optional `bodyJa` frontmatter (YAML block scalar) for `/products/...` when you do not want to show the English body on the default locale.

### 4. Validate with build

Run `npm run build` to validate against the zod schema. The build will fail if any required field is missing or has the wrong type.

### 5. Verify

The product automatically appears in:
- Product listing page (`/products` and `/en/products`) grouped by category
- Its own detail page (`/products/{slug}` and `/en/products/{slug}`)
- Homepage featured products (if its `order` value places it in the top 6)

## Adding a New Category

If the product needs a new category not in the current enum:

1. Update the `category` enum in `src/content.config.ts`
2. Add category display logic in `ProductsTemplate.astro`
3. Update all relevant translation keys

## Modifying the Schema

Schema changes are breaking changes. When adding a required field:

1. Update `src/content.config.ts`
2. Update **all** existing product markdown files with the new field
3. Build to verify

## Reference

See `docs/decisions/content-collections.md` for the full schema and display logic.
