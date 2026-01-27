import { cn } from "@/lib/utils";
import type { Category } from "@/types/events";

interface CategoryPillProps {
  category: Category;
  isActive: boolean;
  onClick: () => void;
}

export function CategoryPill({ category, isActive, onClick }: CategoryPillProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
        isActive
          ? "border-foreground bg-foreground text-background"
          : "border-border bg-transparent text-foreground hover:bg-foreground/10"
      )}
    >
      {category}
    </button>
  );
}
