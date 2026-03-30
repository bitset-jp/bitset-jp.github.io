import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const products = defineCollection({
  loader: glob({ base: './src/content/products', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    titleJa: z.string(),
    description: z.string(),
    descriptionJa: z.string(),
    category: z.enum(['pondashi', 'network-tools', 'iot-tools', 'hardware']),
    features: z.array(z.string()),
    featuresJa: z.array(z.string()),
    specs: z
      .array(
        z.object({
          label: z.string(),
          value: z.string(),
        }),
      )
      .optional(),
    specsJa: z
      .array(
        z.object({
          label: z.string(),
          value: z.string(),
        }),
      )
      .optional(),
    amazonUrl: z.string().optional(),
    bodyJa: z.string().optional(),
    order: z.number(),
  }),
});

const news = defineCollection({
  loader: glob({ base: './src/content/news', pattern: '**/*.md' }),
  schema: z.object({
    pubDate: z.coerce.date(),
    title: z.string(),
    titleJa: z.string(),
    description: z.string().optional(),
    descriptionJa: z.string().optional(),
    link: z.string().url().optional(),
    linkPath: z.string().optional(),
    bodyJa: z.string().optional(),
  }),
});

export const collections = { products, news };
