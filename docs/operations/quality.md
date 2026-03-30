# Quality Score

Quality assessment per domain and architectural layer.

Last reviewed: 2026-03-25

## Grading Scale

- **A**: Excellent — meets or exceeds standards
- **B**: Good — functional with minor gaps
- **C**: Acceptable — works but needs improvement
- **D**: Below standard — significant gaps
- **F**: Missing or broken

## Domain Scores

| Domain | Grade | Notes |
|--------|-------|-------|
| **i18n Coverage** | B+ | UI strings translated; product/news long-form supports Japanese via optional `bodyJa` (TD-001 resolved). |
| **Component Consistency** | A | Reusable components used across all pages. Consistent prop interfaces. |
| **Content Completeness** | B | All 9 products catalogued. No product images yet (TD-004). |
| **Visual Design** | B | Consistent color palette and typography. No dark mode. |
| **Responsiveness** | B | Mobile menu and responsive grids. Not tested on all breakpoints. |
| **Accessibility** | C | Semantic HTML used. No automated a11y testing (TD-002). No skip-to-content link. |
| **SEO** | C | Title and description present. No OG tags, no structured data (TD-003). |
| **Performance** | A | Static HTML, minimal JS (mobile menu toggle only). |
| **Build / Deploy** | A | Automated via GitHub Actions. Clean build with no warnings. |
| **Documentation** | B | Architecture and design docs in place. No CI freshness checks (TD-005). |

## Architectural Layer Scores

| Layer | Grade | Notes |
|-------|-------|-------|
| **Route entry points** | A | Thin wrappers, no logic leakage. |
| **Page templates** | A | Clean separation, consistent i18n pattern. |
| **Shared components** | A | Reusable, well-props'd, locale-aware. |
| **Layout** | B | Single layout. Could benefit from variant layouts for special pages. |
| **i18n layer** | B | Solid utilities. Dictionary will need splitting if it grows much larger. |
| **Content collections** | B+ | Schema is well-defined; bilingual long-form via `bodyJa` + English file body. |

## Action Items

See [plans/tech-debt.md](../plans/tech-debt.md) for the full debt list. Top priorities:

1. Add product images (TD-004)
2. Add accessibility testing (TD-002)
3. Add OG/SEO meta tags (TD-003)
4. Product/news long-form i18n: use `bodyJa` where needed (TD-001 resolved).
