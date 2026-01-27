import { cn } from "@/lib/utils";
import { Calendar, MapPin, ArrowRight } from "lucide-react";

interface BentoEventCardProps {
  title: string;
  date: string;
  time?: string;
  location?: string;
  tags?: string[];
  link?: string;
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
  variant = "light",
  size = "medium",
}: BentoEventCardProps) {
  const isDark = variant === "dark";
  const isLarge = size === "large";
  const isSmall = size === "small";

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
      {isDark && (
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-gradient-to-br from-cyan-500/30 via-blue-500/20 to-transparent blur-2xl" />
          <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-gradient-to-br from-orange-400/20 via-amber-300/10 to-transparent blur-2xl" />
        </div>
      )}

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
