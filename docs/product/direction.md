# Product Sense

Product direction and priorities for the bitset portfolio site.

## Mission

Present bitset Inc. as a credible, professional company to clients and partners. The site is the company's primary web presence and must clearly communicate what bitset builds, who it serves, and how to get in touch.

## Current State

The site is being developed as the migration of the legacy corporate site [https://bitset.jp](https://bitset.jp). Reusing legacy images, embed URLs, and other media in this repo is part of that effort; see [portfolio-spec.md](portfolio-spec.md) (Migration and legacy content) and [AGENTS.md](../../AGENTS.md) for detail.

The site is a fully functional bilingual (ja/en) static portfolio with:
- 5 main pages (Home, About, Services, Products, Contact)
- 9 product detail pages
- Language switcher in the header
- GitHub Pages deployment

## Priorities

### P0 — Must Have (Done)
- [x] All core pages (Home, About, Services, Products, Contact)
- [x] Product catalog with detail pages
- [x] Japanese and English support
- [x] Mobile-responsive design
- [x] Automated deployment

### P1 — Should Have (Next)
- [ ] Product images for each product
- [ ] Open Graph and Twitter Card meta tags
- [x] Bilingual product/news long-form (`bodyJa` + English file body)
- [ ] Contact form or email link

### P2 — Nice to Have (Future)
- [ ] Blog / news section
- [ ] Case studies or project highlights
- [ ] Customer testimonials
- [ ] Search functionality
- [ ] RSS feed
- [ ] Sitemap.xml generation

### P3 — Aspirational
- [ ] Additional languages (e.g., Chinese)
- [ ] Interactive product demos
- [ ] E-commerce integration beyond Amazon links

## Product Catalog Direction

Products are the core differentiator. Each product should eventually have:
- Professional product photography
- Detailed bilingual description
- Video demo (where applicable)
- Direct purchase links
- Related products

## Constraints

- The site must remain a static site (no server runtime)
- Minimal dependencies — prefer built-in Astro features
- Both Japanese and English must be maintained in parallel
