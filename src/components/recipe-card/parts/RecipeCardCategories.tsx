import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useRecipeCard } from "../RecipeCardContext";
import { cn } from "@/lib/utils";

interface RecipeCardCategoriesProps {
  className?: string;
  limit?: number;
}

export function RecipeCardCategories({ className, limit }: RecipeCardCategoriesProps) {
  const { recipe, variant } = useRecipeCard();
  
  const categories = limit 
    ? recipe.categories?.slice(0, limit) 
    : recipe.categories;

  const defaultClasses = variant === "compact"
    ? "flex flex-wrap gap-1 mb-3"
    : "flex flex-wrap gap-2";

  const badgeClasses = variant === "compact" ? "text-xs" : "";

  return (
    <div className={cn(defaultClasses, className)}>
      {categories?.map((category) => (
        <Badge key={category} variant="secondary" className={badgeClasses} asChild>
            <Link to={`/category/${encodeURIComponent(category)}`}>
                {category}
            </Link>
         </Badge>
      ))}
    </div>
  );
}
