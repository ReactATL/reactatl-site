import { getCollection } from "astro:content";
import { formatEventDate } from "@/lib/dates";
import type { Event } from "@/types/events";

export async function getEventList(): Promise<Event[]> {
  const collection = await getCollection("events");
  const sorted = collection.sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime(),
  );
  const now = Date.now();
  return sorted.map((e) => {
    const { dateLabel, timeLabel } = formatEventDate(e.data.date);
    return {
      slug: e.id,
      title: e.data.title,
      subtitle: e.data.subtitle,
      description: e.data.description,
      dateISO: e.data.date.toISOString(),
      date: dateLabel,
      time: timeLabel,
      location: e.data.location,
      upcoming: e.data.date.getTime() >= now,
      tags: e.data.tags,
      featured: e.data.featured,
    } satisfies Event;
  });
}
