#!/usr/bin/env node
/**
 * Fetches https://bitset.jp/ and extracts the "What's New" table into starter news markdown.
 * Keep LEGACY_PRODUCT_PATH_TO_SLUG in sync with src/data/legacyUrlMap.ts.
 *
 * Usage:
 *   node scripts/fetch-bitset-news.mjs           # print markdown to stdout
 *   node scripts/fetch-bitset-news.mjs --write # write src/content/news/*.md (skips existing)
 *   node scripts/fetch-bitset-news.mjs --limit 5
 *
 * Respect https://bitset.jp/robots.txt before automating in CI.
 */

import { parse } from 'node-html-parser';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');
const newsDir = path.join(repoRoot, 'src', 'content', 'news');

/** @type {Record<string, string>} */
const LEGACY_PRODUCT_PATH_TO_SLUG = {
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

const args = process.argv.slice(2);
const doWrite = args.includes('--write');
const limitArg = args.find((a) => a.startsWith('--limit='));
const limit = limitArg ? Number(limitArg.split('=')[1]) : Number.POSITIVE_INFINITY;

function slugifyJa(text) {
  const base = text
    .replace(/\s+/g, '-')
    .replace(/[^\p{L}\p{N}-]+/gu, '')
    .slice(0, 48)
    .toLowerCase();
  return base || 'item';
}

function yamlEscape(s) {
  if (/[#:[\]{}&*!|>'"%@`]/.test(s) || s.includes('\n')) {
    return JSON.stringify(s);
  }
  return s;
}

/**
 * @param {string} href
 * @returns {{ link?: string, linkPath?: string }}
 */
function classifyLink(href) {
  if (!href || href === '#') return {};
  try {
    const u = new URL(href, 'https://bitset.jp');
    if (u.hostname === 'bitset.jp') {
      const p = u.pathname.replace(/\/$/, '') || '/';
      const slug = LEGACY_PRODUCT_PATH_TO_SLUG[p];
      if (slug) return { linkPath: `/products/${slug}` };
      if (p.startsWith('/products/')) return { linkPath: p };
      return { link: u.href };
    }
    return { link: u.href };
  } catch {
    return {};
  }
}

function stripCellForBody(cell) {
  const clone = cell.clone();
  clone.querySelectorAll('picture, img').forEach((n) => n.remove());
  const text = clone.text.replace(/\s+/g, ' ').trim();
  return text.length > 400 ? `${text.slice(0, 400)}…` : text;
}

function rowToMarkdown(row) {
  const tds = row.querySelectorAll('td');
  if (tds.length < 2) return null;
  const dateStr = tds[0].text.trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return null;

  const cell = tds[1];
  const paras = cell.querySelectorAll('p');
  const mainP = paras[0] ?? cell;
  const titleJa = mainP.text.replace(/\s+/g, ' ').trim();
  if (!titleJa) return null;

  const anchors = cell.querySelectorAll('a[href]');
  let linkPath = null;
  let externalLink = null;
  for (const a of anchors) {
    const href = a.getAttribute('href');
    const c = classifyLink(href);
    if (c.linkPath) {
      linkPath = c.linkPath;
      break;
    }
    if (c.link && !externalLink) externalLink = c.link;
  }
  const linkFields = linkPath ? { linkPath } : externalLink ? { link: externalLink } : {};

  const bodyText = stripCellForBody(cell);
  const descJa = titleJa.length > 200 ? `${titleJa.slice(0, 200)}…` : titleJa;
  const titleEn = `News · ${dateStr}`;
  const descEn =
    'Replace with an English summary aligned with titleJa (Japanese headline is the source of truth).';

  const lines = [
    '---',
    `pubDate: ${dateStr}`,
    `title: ${yamlEscape(titleEn)}`,
    `titleJa: ${yamlEscape(titleJa)}`,
    `descriptionJa: ${yamlEscape(descJa)}`,
    `description: ${yamlEscape(descEn)}`,
  ];
  if (linkFields.link) lines.push(`link: ${yamlEscape(linkFields.link)}`);
  if (linkFields.linkPath) lines.push(`linkPath: ${yamlEscape(linkFields.linkPath)}`);

  const jaProse = bodyText && bodyText !== titleJa ? bodyText : titleJa;
  lines.push('bodyJa: |');
  lines.push(`  ${jaProse.replace(/\n/g, '\n  ')}`);
  lines.push('---', '', 'English markdown body below (optional). Shown on `/en/news` only.', '');

  const id = `${dateStr}-${slugifyJa(titleJa)}`;
  return { id, markdown: lines.join('\n') };
}

async function main() {
  const res = await fetch('https://bitset.jp/');
  if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
  const html = await res.text();
  const root = parse(html);
  const home = root.querySelector('#home-pagetype');
  if (!home) throw new Error('Could not find #home-pagetype');

  const table = home.querySelector('table');
  if (!table) throw new Error('Could not find What\'s New table');
  const rows = table.querySelectorAll('tbody tr');

  /** @type {{ id: string, markdown: string }[]} */
  const items = [];
  for (const row of rows) {
    const item = rowToMarkdown(row);
    if (item) items.push(item);
    if (items.length >= limit) break;
  }

  if (!doWrite) {
    for (const item of items) {
      console.log(`<!-- ${item.id}.md -->\n${item.markdown}\n`);
    }
    return;
  }

  fs.mkdirSync(newsDir, { recursive: true });
  for (const item of items) {
    const filePath = path.join(newsDir, `${item.id}.md`);
    if (fs.existsSync(filePath)) {
      console.error(`skip exists: ${filePath}`);
      continue;
    }
    fs.writeFileSync(filePath, item.markdown, 'utf8');
    console.error(`wrote ${filePath}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
