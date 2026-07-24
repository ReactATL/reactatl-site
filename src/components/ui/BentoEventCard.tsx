import { cn } from "@/lib/utils";
import { Calendar, MapPin, ArrowRight } from "lucide-react";

// Gradient-blob accents drawn from the Hero palette (cyan/blue, orange/amber,
// emerald/green, pink/rose). Cards cycle through these so adjacent tiles differ;
// blobs sit behind the content, replacing per-event photos on the tiles.
const ACCENTS = [
  { a: "from-cyan-500/30 via-blue-500/20", b: "from-emerald-500/25 via-green-400/15" },
  { a: "from-orange-400/30 via-amber-300/20", b: "from-pink-500/25 via-rose-400/15" },
  { a: "from-pink-500/30 via-rose-400/20", b: "from-cyan-500/25 via-blue-500/15" },
  { a: "from-emerald-500/30 via-green-400/20", b: "from-orange-400/25 via-amber-300/15" },
];

interface BentoEventCardProps {
  title: string;
  date: string;
  time?: string;
  location?: string;
  tags?: string[];
  link?: string;
  accent?: number;
  variant?: "light" | "dark";
  size?: "small" | "medium" | "large";
}

export function BentoEventCard({
  title,
  date,
  time = "",
  location = "",
  tags = [],
  link = "#",
  accent = 0,
  variant = "light",
  size = "medium",
}: BentoEventCardProps) {
  const isDark = variant === "dark";
  const isLarge = size === "large";
  const isSmall = size === "small";
  const accentColors = ACCENTS[accent % ACCENTS.length];

  const containerClasses = cn(
    "group relative flex h-full flex-col justify-between overflow-hidden rounded-lg border transition-all",
    isDark
      ? "border-transparent bg-foreground text-background"
      : "border-border bg-card/50 text-foreground backdrop-blur-sm hover:border-foreground/30",
    isLarge
      ? "min-h-[400px] p-6 md:min-h-full md:p-8"
      : isSmall
        ? "min-h-[220px] p-5"
        : "min-h-[200px] p-5"
  );

  const titleClasses = cn(
    "text-balance font-bold uppercase leading-tight tracking-tight",
    isLarge ? "text-xl md:text-2xl" : isSmall ? "text-sm" : "text-base"
  );

  const metaClasses = isDark ? "text-background/70" : "text-muted-foreground";
  const dividerClasses = isDark ? "text-background/40" : "text-muted-foreground/50";

  return (
    <a href={link} className={containerClasses}>
      <div className="pointer-events-none absolute inset-0">
        <div
          className={cn(
            "absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gradient-to-br to-transparent blur-3xl",
            accentColors.a
          )}
        />
        <div
          className={cn(
            "absolute -bottom-12 -left-12 h-44 w-44 rounded-full bg-gradient-to-br to-transparent blur-3xl",
            accentColors.b
          )}
        />
      </div>

      <div className="relative">
        <div className="mb-3 flex flex-wrap items-center gap-2 text-xs uppercase tracking-wider">
          {tags.map((tag) => (
            <span key={tag} className={metaClasses}>
              {tag}
            </span>
          ))}
          {tags.length > 0 && <span className={dividerClasses}>/</span>}
          {time && <span className={metaClasses}>{time}</span>}
        </div>

        <h3 className={titleClasses}>{title}</h3>
      </div>

      <div className="relative mt-4">
        <div className={cn("mb-3 flex flex-col gap-1 text-xs uppercase tracking-wider", metaClasses)}>
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3 w-3" />
            <span>{date}</span>
          </div>
          {location && (
            <div className="flex items-center gap-1.5">
              <MapPin className="h-3 w-3" />
              <span>{location}</span>
            </div>
          )}
        </div>

        <div
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full transition-transform group-hover:scale-110",
            isDark ? "bg-background text-foreground" : "bg-foreground text-background"
          )}
        >
          <ArrowRight className="h-4 w-4" />
        </div>
      </div>
    </a>
  );
}
