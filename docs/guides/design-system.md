# Design System

Visual design reference for the bitset portfolio site.

## Color Palette

Defined in `src/styles/global.css` via Tailwind's `@theme` directive.

### Primary (Blue)

Used for header, footer, dark backgrounds, and primary actions.

| Token | Hex | Usage |
|-------|-----|-------|
| `primary-50` | #eff6ff | Light backgrounds |
| `primary-100` | #dbeafe | Hover states |
| `primary-200` | #bfdbfe | Muted text on dark |
| `primary-400` | #60a5fa | Links |
| `primary-600` | #2563eb | Primary buttons, borders |
| `primary-800` | #1e40af | Active nav items |
| `primary-900` | #1e3a8a | Gradient endpoints |
| `primary-950` | #172554 | Header/footer background |

### Accent (Teal)

Used for call-to-action buttons and highlight elements.

| Token | Hex | Usage |
|-------|-----|-------|
| `accent-400` | #2dd4bf | Brand highlight ("set" in logo) |
| `accent-500` | #14b8a6 | CTA buttons |
| `accent-600` | #0d9488 | CTA hover state |

## Typography

| Role | Font | Weights |
|------|------|---------|
| Latin text | Inter | 300, 400, 500, 600, 700, 800 |
| Japanese text | Noto Sans JP | 300, 400, 500, 700 |
| Monospace | JetBrains Mono | (fallback only) |

Fonts are loaded from Google Fonts in `BaseLayout.astro`.

Font stack: `'Inter', 'Noto Sans JP', system-ui, -apple-system, sans-serif`

## Layout Patterns

### Max Width Container

All content sections use `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`.

### Section Spacing

- Standard sections: `py-20`
- Alternating backgrounds: white (`bg-white`) and light gray (`bg-gray-50`)
- CTA sections: gradient background `bg-gradient-to-br from-primary-900 to-primary-800`

### Grid Patterns

- 3-column grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` (services, products)
- 4-column grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-4` (philosophy cards)
- 2-column split: `grid-cols-1 lg:grid-cols-2` (timeline + tech stack)

## Component Styling

### Header
- Sticky (`sticky top-0 z-50`)
- Dark background with blur (`bg-primary-950/95 backdrop-blur-sm`)
- Mobile hamburger menu with JS toggle

### Cards
- White background, rounded corners (`rounded-xl`)
- Shadow on hover
- Consistent padding (`p-6` or `p-8`)

### Buttons
- Primary CTA: `bg-accent-500 hover:bg-accent-600 text-white rounded-lg`
- Secondary: `border border-primary-600 text-primary-600 hover:bg-primary-50 rounded-lg`
- Language switcher: `border border-primary-700 text-primary-200 rounded-lg`

## Brand

- Logo text: "bit" in white + "set" in accent-400
- Site title format: `{Page Title} | bitset Inc.`
- Company name in Japanese context: 株式会社 bitset
