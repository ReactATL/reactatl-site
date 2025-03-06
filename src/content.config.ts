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

export const collections = { socials };
