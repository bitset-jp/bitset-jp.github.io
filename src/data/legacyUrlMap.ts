/**
 * Maps legacy bitset.jp product URL paths (pathname only, no origin) to current site slugs under /products/.
 * Used by scripts/fetch-bitset-news.mjs when rewriting links in generated news markdown.
 */
export const legacyProductPathToSlug: Record<string, string> = {
  '/products/aggressor-network': 'aggressor-network',
  '/products/egrec': 'egrec',
  '/products/echoset': 'echoset',
  '/products/products-pondash-network': 'pondashi-network',
  '/products/products-pondash': 'pondashi-audio',
  '/products/products-pondash-visual': 'pondashi-video',
  '/products/products-pondash-mini': 'pondashi-mini',
  '/products/products-pondash-signage': 'pondashi-signage',
  '/products/products-raspberry-pi-lcd-case': 'raspberry-pi-case',
};
