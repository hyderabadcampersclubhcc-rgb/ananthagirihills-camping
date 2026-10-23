import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { photoKeys } from '@/data/photos';

/**
 * One file per camping package. Facts come from the HCC staging camp pages; anything unconfirmed
 * is written as "Contact us on WhatsApp to confirm." and rendered as a WhatsApp link.
 */
const packages = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/packages' }),
  schema: z.object({
    title: z.string(),
    order: z.number(),
    summary: z.string(),
    price: z.number().int().positive(),
    /** Per-person advance, only where confirmed; otherwise the booking box says to confirm on WhatsApp. */
    advance: z.number().int().positive().optional(),
    tags: z.array(z.string()),
    runs: z.string(),
    campsite: z.string(),
    location: z.string(),
    checkIn: z.string(),
    checkOut: z.string(),
    gettingThere: z.string(),
    returns: z.string(),
    trains: z.array(z.object({ from: z.string(), time: z.string(), note: z.string() })).default([]),
    stay: z.object({ tent: z.string(), washroom: z.string(), description: z.string() }),
    suitableFor: z.array(z.string()),
    highlights: z.array(z.string()),
    itinerary: z.array(z.object({ title: z.string(), text: z.string(), meals: z.string() })),
    included: z.array(z.string()),
    notIncluded: z.array(z.string()),
    carry: z.array(z.string()),
    important: z.array(z.string()),
    payment: z.array(z.string()),
    faqs: z.array(z.object({ q: z.string(), a: z.string() })),
    photos: z.array(z.enum(photoKeys)).min(1),
    compare: z.object({ bestFor: z.string(), meals: z.string(), activities: z.string() }),
  }),
});

export const collections = { packages };
