import { useRecipeCard } from "../RecipeCardContext";
import { cn } from "@/lib/utils";

interface RecipeCardIngredientsProps {
  className?: string;
}

export function RecipeCardIngredients({ className }: RecipeCardIngredientsProps) {
  const { recipe } = useRecipeCard();

  return (
    <div className={cn(className)}>
      <h3 className="text-lg font-semibold mb-3">Ingredients</h3>
      <ul className="space-y-2">
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index} className="flex items-center gap-2 text-sm">
            <span className="w-2 h-2 bg-primary rounded-full"></span>
            <span>
              {ingredient.amount} {ingredient.unit} {ingredient.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
