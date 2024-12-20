import { cn } from "@/lib/utils";
import { type CategoryBadgeProps } from "@/lib/types";

export function CategoryBadge({ 
  category,
  variant = "default",
  className = ""
}: CategoryBadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center text-sm font-medium transition-colors",
        {
          "rounded-lg px-3 py-1 bg-muted hover:bg-muted/80": variant === "default",
          "rounded-lg px-3 py-1 bg-primary text-primary-foreground hover:bg-primary/90": variant === "featured",
          "rounded-lg px-3 py-1 bg-[#4B6BFB] text-white hover:bg-[#4B6BFB]/90": variant === "primary",
          "rounded-lg px-3 py-1 bg-[#DBEAFE] text-[#4B6BFB] hover:bg-[#DBEAFE]/80 dark:bg-[#4B6BFB]/5 dark:text-[#4B6BFB]": variant === "secondary",
        },
        className
      )}
    >
      {category.name}
    </div>
  );
}