# Technical Debt Tracker

Known gaps, shortcuts, and areas that need attention.

## Active Debt

### TD-002: No automated accessibility testing
- **Severity**: Medium
- **Description**: No a11y audit is run during build or CI. Relies on manual checking.
- **Resolution path**: Add `@astrojs/check` or an axe-based CI step.

### TD-003: No SEO meta tags beyond basic description
- **Severity**: Low
- **Description**: Pages have `<title>` and `<meta name="description">` but no Open Graph, Twitter Card, or structured data markup.
- **Resolution path**: Add OG/Twitter meta tags to `BaseLayout.astro`. Consider JSON-LD for product pages.

### TD-004: No image optimization
- **Severity**: Low
- **Description**: Product pages have no images. When images are added, they should use Astro's built-in `<Image>` component for optimization.
- **Resolution path**: Use `astro:assets` when product images are added.

### TD-005: No CI doc-freshness checks
- **Severity**: Low
- **Description**: Documentation in `docs/` is not mechanically validated for freshness or cross-link integrity.
- **Resolution path**: Add a CI linter that checks for broken links and stale references.

### TD-006: Google Maps embed on contact page
- **Severity**: Low
- **Description**: The contact page embeds a Google Maps iframe. No API key management or fallback if the embed fails.
- **Resolution path**: Consider a static map image fallback or validate embed availability.

## Resolved Debt

| ID | Description | Resolved in |
|----|-------------|-------------|
| TD-001 | Product and news long-form Japanese used the same English markdown body on `/` routes. | Optional frontmatter `bodyJa` + `renderMarkdownString()`; file body remains English for `/en/`. |
