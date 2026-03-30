# Security

Security considerations for the bitset portfolio site.

## Threat Model

This is a **static site** with no server-side code, no database, no user authentication, and no form submissions. The attack surface is minimal.

### In Scope
- Supply chain (npm dependencies)
- Deployment pipeline (GitHub Actions)
- Content integrity (preventing unauthorized changes)
- Client-side security (XSS in rendered content)

### Out of Scope
- Server-side vulnerabilities (no server)
- Authentication/authorization (no user accounts)
- Data storage (no database)

## Dependencies

The project has 3 direct dependencies:
- `astro` — static site generator
- `tailwindcss` — CSS framework
- `@tailwindcss/vite` — Tailwind CSS Vite plugin

All are well-maintained, widely used packages. Keep them updated with `npm audit` and `npm update`.

## GitHub Actions Security

- Workflow uses `permissions` to restrict token scope:
  - `contents: read` — can read repo but not write
  - `pages: write` — can deploy to Pages
  - `id-token: write` — required for Pages deployment
- Uses pinned action versions (`@v5`, `@v4`)
- No secrets or API keys in the workflow

## Content Security

- Product data is validated by zod schema at build time
- Markdown content is rendered by Astro's built-in renderer, which sanitizes HTML
- No user-generated content — all content is authored by repository contributors
- External resources limited to Google Fonts and a Google Maps embed

## Recommendations

1. **Enable Dependabot** on the GitHub repository for automated security updates
2. **Restrict branch protection** on `main` to require PR reviews before merge
3. **Review Google Maps embed** — consider a static image if the iframe is not needed
4. **Subresource Integrity** — consider adding SRI hashes for externally loaded fonts if security requirements increase
5. **Content Security Policy** — consider adding CSP headers via a `_headers` file if moving to a stricter security posture
