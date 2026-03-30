# Reliability

Build, deploy, and uptime standards for the bitset portfolio site.

## Build Pipeline

| Step | Tool | Config |
|------|------|--------|
| Trigger | GitHub Actions | Push to `main` or manual dispatch |
| Checkout | `actions/checkout@v5` | — |
| Build | `withastro/action@v5` | Installs deps, runs `astro build` |
| Deploy | `actions/deploy-pages@v4` | Uploads `dist/` to GitHub Pages |

Configuration: `.github/workflows/deploy.yml`

## Build Validation

The Astro build acts as a validation step:
- **Content schema**: zod validates all product frontmatter — build fails on missing or invalid fields
- **TypeScript**: Type errors in `.astro` files are caught during build
- **Route generation**: `getStaticPaths()` must return valid paths — build fails if product slugs are invalid
- **i18n**: Missing translation keys fall back to `defaultLang` (ja) — no build failure, but visible as Japanese text on English pages

## Hosting

- **Platform**: GitHub Pages
- **CDN**: GitHub's built-in CDN
- **Custom domain**: None (uses `park-bitset.github.io`)
- **HTTPS**: Enforced by GitHub Pages
- **Uptime SLA**: Dependent on GitHub Pages availability (~99.9%)

## Monitoring

Currently no active monitoring. The site is static HTML served by GitHub Pages.

Future considerations:
- GitHub Actions build notifications on failure
- Uptime monitoring via external service
- Lighthouse CI for performance regression detection

## Recovery

Since the site is fully static and generated from source:
- **Build failure**: Fix the code, push again. Previous deployment remains live.
- **GitHub Pages outage**: Wait for GitHub to resolve. No action needed.
- **Content error**: Fix the markdown file, push, automatic redeploy.
- **Full recovery**: Clone repo, `npm install`, `npm run build` — the entire site rebuilds from source in under a minute.

## Node.js Version

The project requires Node.js >= 24.14.0 (specified in `package.json` `engines` field).
