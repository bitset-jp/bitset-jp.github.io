# Architecture

This document describes the high-level architecture of the bitset Inc. company portfolio site.

## System Overview

```mermaid
flowchart TB
    subgraph pages [Route Entry Points]
        jaPages["src/pages/*.astro<br/>(Japanese, root paths)"]
        enPages["src/pages/en/*.astro<br/>(English, /en/ prefix)"]
    end

    subgraph templates [Page Templates]
        tmpl["src/components/pages/*Template.astro<br/>HomeTemplate, AboutTemplate,<br/>ServicesTemplate, ProductsTemplate,<br/>ProductDetailTemplate, ContactTemplate"]
    end

    subgraph components [Shared Components]
        ui["Header, Footer, Hero,<br/>ProductCard, ServiceCard,<br/>SectionHeading, PhilosophyCard,<br/>TechBadge, TimelineItem"]
    end

    subgraph layout [Layout]
        base["src/layouts/BaseLayout.astro"]
    end

    subgraph i18n [i18n Layer]
        trans["src/i18n/translations.ts<br/>(UI string dictionary)"]
        utils["src/i18n/utils.ts<br/>(useTranslations, getLocalizedPath,<br/>getAlternateLang, getLangFromUrl)"]
    end

    subgraph content [Content Collections]
        products["src/content/products/*.md<br/>(9 products, bilingual frontmatter)"]
        schema["src/content.config.ts<br/>(zod schema)"]
    end

    jaPages --> tmpl
    enPages --> tmpl
    tmpl --> base
    tmpl --> ui
    tmpl --> i18n
    tmpl --> content
    ui --> i18n
    base --> ui
    products --> schema
```

## Layering

The architecture follows a strict layering principle:

1. **Route entry points** (`src/pages/`) — thin wrappers, no logic
2. **Page templates** (`src/components/pages/`) — all page logic, data fetching, translations
3. **Shared components** (`src/components/`) — reusable, locale-aware UI building blocks
4. **Layout** (`src/layouts/BaseLayout.astro`) — HTML shell, meta tags, Header/Footer
5. **i18n** (`src/i18n/`) — translation dictionary and utility functions
6. **Content** (`src/content/`) — markdown product data validated by zod schema

Templates may import components and i18n utilities. Components may import i18n utilities.
Route entry points only import and render a single template. Nothing imports from route entry points.

## i18n Routing Model

```mermaid
flowchart LR
    subgraph japanese [Japanese - Default]
        jaRoot["/"]
        jaAbout["/about"]
        jaServices["/services"]
        jaProducts["/products"]
        jaProductSlug["/products/slug"]
        jaContact["/contact"]
    end

    subgraph english [English - /en/ prefix]
        enRoot["/en"]
        enAbout["/en/about"]
        enServices["/en/services"]
        enProducts["/en/products"]
        enProductSlug["/en/products/slug"]
        enContact["/en/contact"]
    end

    jaRoot <-->|"Language Switcher"| enRoot
    jaAbout <-->|"Language Switcher"| enAbout
    jaServices <-->|"Language Switcher"| enServices
    jaProducts <-->|"Language Switcher"| enProducts
    jaContact <-->|"Language Switcher"| enContact
```

Configured in `astro.config.mjs`:

- `defaultLocale: 'ja'` with `prefixDefaultLocale: false` — Japanese pages have no prefix
- English pages live under `src/pages/en/` and are served at `/en/*`
- `Astro.currentLocale` is used by templates to select the correct language
- The Header component renders a language switcher linking to the alternate locale

## Content Collections

Products are defined as an Astro content collection using markdown files with zod-validated frontmatter.

**Schema fields** (from `src/content.config.ts`):

| Field | Type | Purpose |
|-------|------|---------|
| `title` | string | English product name |
| `titleJa` | string | Japanese product name |
| `description` | string | English description |
| `descriptionJa` | string | Japanese description |
| `category` | enum | pondashi, network-tools, iot-tools, hardware |
| `features` | string[] | English feature list |
| `featuresJa` | string[] | Japanese feature list |
| `specs` | object[]? | English spec label/value pairs |
| `specsJa` | object[]? | Japanese spec label/value pairs |
| `amazonUrl` | string? | Link to Amazon product page |
| `order` | number | Sort order for display |

Templates select the correct language field based on `Astro.currentLocale`.

## Build and Deploy

```mermaid
flowchart LR
    push["git push to main"] --> gha["GitHub Actions"]
    gha --> checkout["Checkout"]
    checkout --> astroAction["withastro/action@v5<br/>(install + build)"]
    astroAction --> dist["dist/ artifact"]
    dist --> deploy["deploy-pages@v4"]
    deploy --> ghPages["GitHub Pages<br/>park-bitset.github.io"]
```

- Triggered on push to `main` or manual `workflow_dispatch`
- Uses the official `withastro/action@v5` for build
- Deploys via `actions/deploy-pages@v4`
- Configuration in `.github/workflows/deploy.yml`

## Styling

- **Tailwind CSS 4** via `@tailwindcss/vite` plugin
- Custom theme in `src/styles/global.css` using `@theme` directive
- **Primary palette**: Blue scale (primary-50 through primary-950)
- **Accent palette**: Teal scale (accent-50 through accent-900)
- **Fonts**: Inter (Latin), Noto Sans JP (Japanese), loaded from Google Fonts
