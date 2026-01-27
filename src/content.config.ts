import { defineCollection, z } from "astro:content";

import { file } from "astro/loaders";

const socials = defineCollection({
  loader: file("./src/data/socials.json"),
  schema: z.object({
    href: z.string(),
    label: z.string(),
    icon: z.string(),
  }),
});

const events = defineCollection({
  loader: file("./src/data/events.json"),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    description: z.string().optional(),
    date: z.string(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    location: z.string().optional(),
    time: z.string().optional(),
    link: z.string(),
    upcoming: z.boolean(),
    tags: z.array(z.string()).optional(),
    featured: z.boolean().optional(),
  }),
});

export const collections = { socials, events };
