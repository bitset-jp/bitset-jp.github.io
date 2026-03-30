# Execution Plan 001: Portfolio Site

**Status**: Completed
**Started**: 2026-03-25
**Completed**: 2026-03-25

## Objective

Build a company portfolio website for bitset Inc. using Astro, Tailwind CSS, and GitHub Pages. The site should showcase the company's products, services, philosophy, and history.

## Decisions Made

1. **Astro as framework** — static site generator with excellent DX, built-in content collections, and first-class GitHub Pages support via `withastro/action`.
2. **Tailwind CSS 4** — utility-first styling with custom theme variables for brand colors (primary blue, accent teal).
3. **Content collections for products** — markdown files with zod-validated frontmatter, enabling type-safe product data and automatic page generation.
4. **Component architecture** — reusable components (Hero, ProductCard, ServiceCard, SectionHeading, PhilosophyCard, TechBadge, TimelineItem) to maintain visual consistency across pages.
5. **Google Fonts** — Inter for Latin text, Noto Sans JP for Japanese text.

## Pages Created

- Home (`/`) — hero, services overview, featured products, philosophy, timeline, tech stack, CTA
- About (`/about`) — company story, philosophy, history, tech stack, company info
- Services (`/services`) — four service categories with detailed offerings
- Products (`/products`) — product listing grouped by category
- Product detail (`/products/[slug]`) — individual product pages with features, specs, Amazon link
- Contact (`/contact`) — contact info, location map, Amazon store link

## Components Created

- BaseLayout, Header, Footer, Hero, SectionHeading
- ProductCard, ServiceCard, PhilosophyCard, TechBadge, TimelineItem

## Products Catalogued

9 products across 4 categories: Pondashi-kun series (5), IoT Tools (2), Network Tools (1), Hardware (1).

## Deployment

GitHub Actions workflow (`.github/workflows/deploy.yml`) configured to build and deploy on push to `main`.
