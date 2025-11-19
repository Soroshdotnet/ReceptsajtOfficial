import { CardTitle } from "@/components/ui/card";
import { useRecipeCard } from "../RecipeCardContext";
import { cn } from "@/lib/utils";

interface RecipeCardTitleProps {
  className?: string;
  children?: string;
}

export function RecipeCardTitle({ className, children }: RecipeCardTitleProps) {
  const { recipe, variant } = useRecipeCard();
  
  const defaultClasses = variant === "compact"
    ? "line-clamp-2 text-primary text-xl"
    : "text-2xl";

  return (
    <CardTitle className={cn(defaultClasses, className)}>
      {children || recipe.title}
    </CardTitle>
  );
}
