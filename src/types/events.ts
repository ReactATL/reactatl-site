export interface Event {
  id: string;
  title: string;
  description?: string;
  date: string;
  time?: string;
  location?: string;
  link: string;
  upcoming: boolean;
  tags?: string[];
  featured?: boolean;
}

export const CATEGORIES = [
  "All Events",
  "React",
  "Next.js",
  "Node.js",
  "TypeScript",
  "Workshops",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_TAG_MAP: Record<Category, string[]> = {
  "All Events": [],
  React: ["React 19", "React Native"],
  "Next.js": ["Next.js"],
  "Node.js": ["Node.js", "DevOps"],
  TypeScript: ["TypeScript"],
  Workshops: ["Workshop", "Advanced", "Best Practices"],
};

export function matchesCategory(event: Event, category: Category): boolean {
  if (category === "All Events") return true;
  const categoryTags = CATEGORY_TAG_MAP[category];
  return (
    event.tags?.some((tag) =>
      categoryTags.some((catTag) =>
        tag.toLowerCase().includes(catTag.toLowerCase())
      )
    ) ?? false
  );
}
