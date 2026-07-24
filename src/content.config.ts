import { defineCollection } from "astro:content";
import { z } from "astro/zod";

import { file, glob } from "astro/loaders";

const socials = defineCollection({
  loader: file("./src/data/socials.json"),
  schema: z.object({
    href: z.string(),
    label: z.string(),
    icon: z.string(),
  }),
});

const events = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/events" }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string(),
        subtitle: z.string().optional(),
        description: z.string().optional(),
        date: z.coerce.date(),
        endDate: z.coerce.date().optional(),
        location: z.string().optional(),
        meetupUrl: z.string().url().optional(),
        lumaUrl: z.string().url().optional(),
        primaryPlatform: z.enum(["meetup", "luma"]).optional(),
        heroImage: image().optional(),
        heroImageAlt: z.string().optional(),
        tags: z.array(z.string()).default([]),
        featured: z.boolean().default(false),
        meetupId: z.string().optional(),
        host: z.string().optional(),
      })
      .refine((d) => Boolean(d.meetupUrl || d.lumaUrl), {
        message: "Event needs at least one of meetupUrl / lumaUrl",
      }),
});

export const collections = { socials, events };
