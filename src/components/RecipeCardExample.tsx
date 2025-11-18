import { RecipeCardCompact } from "@/components/RecipeCard";
import type { Recipe } from "@/types";

interface RecipeCardExampleProps {
  recipe: Recipe;
}

export function RecipeCardExample({ recipe }: RecipeCardExampleProps) {
  const handleViewRecipe = (recipeId: string) => {
    // Mocked navigation - will be replaced with actual routing
    console.log(`Navigating to recipe: ${recipeId}`);
  };

  return <RecipeCardCompact recipe={recipe} onViewRecipe={handleViewRecipe} />;
}
