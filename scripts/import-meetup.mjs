import { readFile, writeFile, mkdir, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(fileURLToPath(import.meta.url), "../..");
const CONTENT_DIR = path.join(ROOT, "src/content/events");
const IMAGES_DIR = path.join(CONTENT_DIR, "images");
const SEED_FILE = path.join(ROOT, "src/data/events.json");

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36";

// Known cross-platform pairs, keyed by Luma slug -> counterpart Meetup URL.
const LINK_PAIRS = {
  "16nfy3e5": { meetupUrl: "https://www.meetup.com/react-atl/events/315658340/" },
};

// ---------- helpers ----------

function kebab(input) {
  return (input || "")
    .toLowerCase()
    .replace(/[^\x00-\x7F]/g, "") // strip non-ASCII/emoji
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60)
    .replace(/-+$/g, "");
}

function meetupIdFromUrl(url) {
  const m = url.match(/\/events\/(\d+)/);
  return m ? m[1] : null;
}

function normalizeMeetupUrl(url) {
  const id = meetupIdFromUrl(url);
  return id ? `https://www.meetup.com/react-atl/events/${id}/` : stripQuery(url);
}

function stripQuery(url) {
  const i = url.indexOf("?");
  return i === -1 ? url : url.slice(0, i);
}

function lumaSlug(url) {
  const clean = stripQuery(url);
  return clean.split("/").filter(Boolean).pop();
}

function stripMarkdown(md) {
  return md
    .replace(/\*\*/g, "")
    .replace(/^\s*[*-]\s+/gm, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

function makeExcerpt(md) {
  const first = (md || "").split("\n\n")[0] || "";
  const text = stripMarkdown(first);
  if (text.length <= 200) return text;
  return text.slice(0, 200).replace(/\s+\S*$/, "") + "…";
}

function deepFindApollo(obj, depth = 0) {
  if (!obj || typeof obj !== "object" || depth > 8) return null;
  if (Object.keys(obj).some((k) => k.startsWith("Event:"))) return obj;
  for (const v of Object.values(obj)) {
    const r = deepFindApollo(v, depth + 1);
    if (r) return r;
  }
  return null;
}

async function fetchApolloEvent(meetupUrl) {
  const id = meetupIdFromUrl(meetupUrl);
  const res = await fetch(meetupUrl, { headers: { "user-agent": UA } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const html = await res.text();
  const m = html.match(
    /<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/
  );
  if (!m) throw new Error("no __NEXT_DATA__");
  const data = JSON.parse(m[1]);
  const state =
    data.props?.pageProps?.__APOLLO_STATE__ || deepFindApollo(data);
  if (!state) throw new Error("no apollo state");
  const ev = state[`Event:${id}`];
  if (!ev) return { state, ev: null, id };
  return { state, ev, id };
}

function resolvePhotoUrl(state, ev) {
  const ref = ev.featuredEventPhoto?.__ref || ev.displayPhoto?.__ref;
  if (!ref) return null;
  return state[ref]?.highResUrl || null;
}

function resolveVenue(state, ev, fallback) {
  const venue = ev.venue?.__ref ? state[ev.venue.__ref] : null;
  if (venue) {
    const parts = [venue.city, venue.state].filter(Boolean).join(", ");
    return parts ? `${venue.name} · ${parts}` : venue.name;
  }
  return fallback ?? "Online";
}

function resolveHost(state, ev) {
  const ref = ev.eventHosts?.[0]?.__ref;
  const host = ref ? state[ref] : null;
  return host?.name || undefined;
}

function stripLumaSuffix(title) {
  return title.replace(/\s*\(register on luma\)\s*$/i, "").trim();
}

function yamlString(value) {
  return JSON.stringify(String(value));
}

function buildFrontmatter(fm) {
  const lines = ["---"];
  lines.push(`title: ${yamlString(fm.title)}`);
  if (fm.subtitle) lines.push(`subtitle: ${yamlString(fm.subtitle)}`);
  if (fm.description) lines.push(`description: ${yamlString(fm.description)}`);
  lines.push(`date: ${fm.date}`);
  if (fm.endDate) lines.push(`endDate: ${fm.endDate}`);
  if (fm.location) lines.push(`location: ${yamlString(fm.location)}`);
  if (fm.meetupUrl) lines.push(`meetupUrl: ${yamlString(fm.meetupUrl)}`);
  if (fm.lumaUrl) lines.push(`lumaUrl: ${yamlString(fm.lumaUrl)}`);
  if (fm.primaryPlatform)
    lines.push(`primaryPlatform: ${fm.primaryPlatform}`);
  if (fm.heroImage) lines.push(`heroImage: ${yamlString(fm.heroImage)}`);
  if (fm.heroImageAlt) lines.push(`heroImageAlt: ${yamlString(fm.heroImageAlt)}`);
  const tags = fm.tags ?? [];
  lines.push(`tags: [${tags.map((t) => yamlString(t)).join(", ")}]`);
  lines.push(`featured: ${fm.featured ? "true" : "false"}`);
  if (fm.meetupId) lines.push(`meetupId: ${yamlString(fm.meetupId)}`);
  if (fm.host) lines.push(`host: ${yamlString(fm.host)}`);
  lines.push("---");
  return lines.join("\n");
}

// Parse an existing md file's frontmatter (shallow, for curation preservation).
function parseFrontmatter(raw) {
  const m = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return {};
  const fm = {};
  for (const line of m[1].split("\n")) {
    const mm = line.match(/^([a-zA-Z]+):\s*(.*)$/);
    if (!mm) continue;
    const [, key, valRaw] = mm;
    let val = valRaw.trim();
    if (val.startsWith("[")) {
      fm[key] = val
        .slice(1, -1)
        .split(",")
        .map((s) => s.trim().replace(/^"|"$/g, ""))
        .filter(Boolean);
    } else if (val === "true" || val === "false") {
      fm[key] = val === "true";
    } else {
      fm[key] = val.replace(/^"|"$/g, "");
    }
  }
  return fm;
}

async function buildExistingIndex() {
  const byMeetupId = new Map();
  const slugs = new Set();
  if (!existsSync(CONTENT_DIR)) return { byMeetupId, slugs };
  const files = (await readdir(CONTENT_DIR)).filter((f) => f.endsWith(".md"));
  for (const f of files) {
    const slug = f.replace(/\.md$/, "");
    slugs.add(slug);
    const raw = await readFile(path.join(CONTENT_DIR, f), "utf-8");
    const fm = parseFrontmatter(raw);
    if (fm.meetupId) byMeetupId.set(fm.meetupId, { slug, fm });
  }
  return { byMeetupId, slugs };
}

function uniqueSlug(base, taken) {
  let slug = base || "event";
  if (!taken.has(slug)) return slug;
  let n = 2;
  while (taken.has(`${slug}-${n}`)) n++;
  return `${slug}-${n}`;
}

async function downloadImage(url, slug) {
  const res = await fetch(url, { headers: { "user-agent": UA } });
  if (!res.ok) throw new Error(`image HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await mkdir(IMAGES_DIR, { recursive: true });
  await writeFile(path.join(IMAGES_DIR, `${slug}.jpeg`), buf);
  return `./images/${slug}.jpeg`;
}

// ---------- link resolution ----------

function resolveLinks(seedLink) {
  let meetupUrl;
  let lumaUrl;
  try {
    const host = new URL(seedLink).hostname;
    if (host.includes("meetup.com")) meetupUrl = normalizeMeetupUrl(seedLink);
    else if (host.includes("luma.com") || host.includes("lu.ma"))
      lumaUrl = stripQuery(seedLink);
  } catch {
    /* ignore malformed */
  }
  // merge counterparts from LINK_PAIRS
  if (lumaUrl) {
    const pair = LINK_PAIRS[lumaSlug(lumaUrl)];
    if (pair?.meetupUrl) meetupUrl = normalizeMeetupUrl(pair.meetupUrl);
  }
  return { meetupUrl, lumaUrl };
}

// ---------- per-event processing ----------

async function processEntry(entry, ctx) {
  const { byMeetupId, slugs } = ctx;
  const { meetupUrl, lumaUrl } = entry.meetupUrl || entry.lumaUrl
    ? { meetupUrl: entry.meetupUrl, lumaUrl: entry.lumaUrl }
    : resolveLinks(entry.link);

  if (!meetupUrl && !lumaUrl) {
    console.warn(`[skip] no resolvable link for: ${entry.title || entry.link}`);
    return;
  }

  if (meetupUrl) {
    const meetupId = meetupIdFromUrl(meetupUrl);
    let apollo;
    try {
      apollo = await fetchApolloEvent(meetupUrl);
    } catch (err) {
      console.error(`[fail] fetch ${meetupUrl}: ${err.message}`);
      process.exitCode = 1;
      return;
    }
    const { state, ev } = apollo;
    if (!ev) {
      console.error(`[fail] Event:${meetupId} not found in ${meetupUrl}`);
      process.exitCode = 1;
      return;
    }

    const existing = byMeetupId.get(meetupId);
    const title = stripLumaSuffix(ev.title);
    const slug = existing?.slug ?? uniqueSlug(kebab(title), slugs);
    slugs.add(slug);

    const location = resolveVenue(state, ev, entry.location);
    const host = resolveHost(state, ev);
    const body = ev.description || "";
    const excerpt = makeExcerpt(body) || undefined;

    let heroImage;
    let heroImageAlt;
    const photoUrl = resolvePhotoUrl(state, ev);
    if (photoUrl) {
      try {
        heroImage = await downloadImage(photoUrl, slug);
        heroImageAlt = title;
      } catch (err) {
        console.warn(`[warn] image download failed for ${slug}: ${err.message}`);
      }
    }

    const curated = existing?.fm ?? {};
    const tags = curated.tags ?? entry.tags ?? [];
    const featured = curated.featured ?? entry.featured ?? false;
    const subtitle = curated.subtitle ?? entry.subtitle;
    const primaryPlatform = curated.primaryPlatform;

    const frontmatter = buildFrontmatter({
      title,
      subtitle,
      description: excerpt,
      date: ev.dateTime,
      endDate: ev.endTime,
      location,
      meetupUrl,
      lumaUrl,
      primaryPlatform,
      heroImage,
      heroImageAlt,
      tags,
      featured,
      meetupId,
      host,
    });

    await mkdir(CONTENT_DIR, { recursive: true });
    await writeFile(
      path.join(CONTENT_DIR, `${slug}.md`),
      `${frontmatter}\n\n${body}\n`
    );
    console.log(`[ok] ${slug}.md  (meetup ${meetupId}${lumaUrl ? " + luma" : ""})`);
    return;
  }

  // luma-only path (no Meetup counterpart) — author from seed
  const title = entry.title || "Untitled Event";
  const slug = uniqueSlug(kebab(title), slugs);
  slugs.add(slug);
  const body = entry.description || `Details on Luma.`;
  const frontmatter = buildFrontmatter({
    title,
    description: entry.description ? makeExcerpt(entry.description) : undefined,
    date: entry.date,
    location: entry.location || "Online",
    lumaUrl,
    tags: entry.tags ?? [],
    featured: entry.featured ?? false,
  });
  await mkdir(CONTENT_DIR, { recursive: true });
  await writeFile(
    path.join(CONTENT_DIR, `${slug}.md`),
    `${frontmatter}\n\n${body}\n`
  );
  console.log(`[ok] ${slug}.md  (luma-only)`);
}

// ---------- main ----------

async function main() {
  const args = process.argv.slice(2);
  const ctx = await buildExistingIndex();

  const positional = args.filter((a) => !a.startsWith("--"));
  if (positional.length > 0) {
    const lumaArg = args.find((a) => a.startsWith("--luma="));
    const lumaUrl = lumaArg ? stripQuery(lumaArg.slice("--luma=".length)) : undefined;
    for (const url of positional) {
      await processEntry(
        { meetupUrl: normalizeMeetupUrl(url), lumaUrl },
        ctx
      );
    }
    return;
  }

  // No positional args: refresh all events. Prefer the seed JSON (initial
  // migration); after migration it's gone, so refresh from committed .md files.
  let entries;
  if (existsSync(SEED_FILE)) {
    entries = JSON.parse(await readFile(SEED_FILE, "utf-8"));
  } else {
    entries = [...ctx.byMeetupId.values()].map(({ fm }) => ({
      meetupUrl: fm.meetupUrl,
      lumaUrl: fm.lumaUrl,
      tags: fm.tags,
      featured: fm.featured,
    }));
  }
  for (const entry of entries) {
    await processEntry(entry, ctx);
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
