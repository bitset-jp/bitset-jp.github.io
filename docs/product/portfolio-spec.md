# Product Spec: Company Portfolio Site

## Purpose

Present bitset Inc. as a credible, professional embedded systems and IoT company to potential clients, partners, and job candidates visiting the website.

## Migration and legacy content

This portfolio replaces and migrates [https://bitset.jp](https://bitset.jp). Product and marketing assets (images, video and embed links such as YouTube, and similar media) may be sourced from the legacy site and committed to this repository unless superseded by new creative. See [AGENTS.md](../../AGENTS.md) for the same policy aimed at contributors and automation.

Short “What’s New” items from the legacy home page are mirrored in the Astro `news` content collection under `src/content/news/` (see `docs/decisions/content-collections.md`). The legacy technical blog at `/blog` remains separate.

## Target Audience

1. **Potential clients** — companies needing embedded/IoT/AV development services
2. **Existing customers** — looking for product documentation and support links
3. **Partners and vendors** — evaluating the company's capabilities
4. **Job candidates** — understanding what the company builds

## Required Pages

### Home
- Clear value proposition: what bitset does and for whom
- Service categories overview (6 areas)
- Featured products (top 6 by sort order)
- Company philosophy (4 principles)
- Company timeline / milestones
- Technology stack
- Call-to-action linking to contact page

### About
- Company story and identity
- Detailed philosophy section
- Full company history timeline
- Technology stack breakdown by category
- Official company information (name, address, phone, focus areas)

### Services
- Four service categories with detailed descriptions:
  - Embedded Systems Development
  - IoT & Smart Home Integration
  - Professional AV Solutions
  - Network Testing & QA
- Three specific offerings per category
- Call-to-action for inquiries

### Products
- All products grouped by category
- Category descriptions
- Each product links to its detail page

### Product Detail
- Full product description
- Feature list
- Technical specifications (where available)
- Amazon purchase link (where available)
- Markdown body for extended content

### Contact
- Company contact information (address, phone)
- Social links (GitHub, Amazon)
- Embedded Google Map showing office location
- Amazon store link

## Non-functional Requirements

- **Bilingual**: Full Japanese and English support, Japanese default
- **Performance**: Static HTML, fast load times, no client-side framework overhead
- **Responsive**: Works on mobile, tablet, and desktop
- **Accessible**: Semantic HTML, sufficient color contrast, keyboard navigable
- **Discoverable**: Basic SEO meta tags (title, description)
