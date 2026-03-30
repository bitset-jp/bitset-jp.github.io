---
name: add-page
description: >-
  Add a new bilingual page to the Astro portfolio site. Use when creating a new
  route that needs to exist in both Japanese and English.
---

# Add a New Bilingual Page

## Steps

### 1. Create the page template

Create `src/components/pages/{Name}Template.astro`:

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import Hero from '../Hero.astro';
import SectionHeading from '../SectionHeading.astro';
import { useTranslations } from '../../i18n/utils';
import type { Lang } from '../../i18n/translations';

const lang = (Astro.currentLocale ?? 'ja') as Lang;
const t = useTranslations(lang);
---

<BaseLayout title={t('{name}.title')}>
  <Hero
    title={t('{name}.hero.title')}
    subtitle={t('{name}.hero.subtitle')}
  />

  <section class="py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- page content here -->
    </div>
  </section>
</BaseLayout>
```

### 2. Add translation keys

Add keys to both `ja` and `en` sections in `src/i18n/translations.ts`:

```ts
// In ja section:
'{name}.title': '...',
'{name}.hero.title': '...',
'{name}.hero.subtitle': '...',

// In en section:
'{name}.title': '...',
'{name}.hero.title': '...',
'{name}.hero.subtitle': '...',
```

Also add `nav.{name}` keys if the page will appear in navigation.

### 3. Create Japanese route (default locale)

Create `src/pages/{name}.astro`:

```astro
---
import {Name}Template from '../components/pages/{Name}Template.astro';
---
<{Name}Template />
```

### 4. Create English route

Create `src/pages/en/{name}.astro`:

```astro
---
import {Name}Template from '../../components/pages/{Name}Template.astro';
---
<{Name}Template />
```

### 5. Add navigation link (if needed)

In `src/components/Header.astro`, add to the `navLinks` array:

```ts
{ href: getLocalizedPath('/{name}', lang), label: t('nav.{name}') },
```

Also add the same link in `src/components/Footer.astro` navigation list.

### 6. Update route map

Add the new routes to `docs/generated/route-map.md` in both the Japanese and English tables.

## Verification

Run `npm run build` to confirm the page builds without errors and appears in the output.

## Reference

See `docs/guides/frontend.md` for component inventory and i18n utilities API.
