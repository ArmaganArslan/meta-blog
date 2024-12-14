import { cn } from "@/lib/utils";

interface CategoryBadgeProps {
  category: string;
  className?: string;
  variant?: "default" | "featured";
}

export function CategoryBadge({ category, className, variant = "default" }: CategoryBadgeProps) {
  if (variant === "featured") {
    return (
      <span className={`
        inline-flex items-center px-4 py-1.5 rounded-lg
        bg-[#4B6BFB] dark:bg-[#4B6BFB]
        text-white text-sm font-medium
        ${className}
      `}>
        {category}
      </span>
    );
  }

  return (
    <span 
      className={cn(
        "inline-block px-3 py-1 text-xs font-medium text-blue-600 bg-blue-100 dark:bg-[#1b1e34] dark:text-[#4B6BFB] rounded-full",
        className
      )}
    >
      {category}
    </span>
  );
}