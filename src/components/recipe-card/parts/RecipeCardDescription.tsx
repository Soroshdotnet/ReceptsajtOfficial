import { CardDescription } from "@/components/ui/card";
import { useRecipeCard } from "../RecipeCardContext";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface RecipeCardDescriptionProps {
  className?: string;
  children?: ReactNode;
}

export function RecipeCardDescription({ className, children }: RecipeCardDescriptionProps) {
  const { recipe, variant } = useRecipeCard();
  
  const defaultClasses = variant === "compact"
    ? "line-clamp-2 mt-1"
    : "text-base";

  return (
    <CardDescription className={cn(defaultClasses, className)}>
      {children || recipe.description}
    </CardDescription>
  );
}
