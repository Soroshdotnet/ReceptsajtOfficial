import { RecipeCard } from "@/components/RecipeCard";
import type { Recipe } from "@/types";

interface RecipeCardExampleProps {
  recipe: Recipe;
}

export function RecipeCardExample({ recipe }: RecipeCardExampleProps) {
  const avgRating =
    recipe.ratings?.length > 0
      ? recipe.ratings.reduce((a, b) => a + b, 0) / recipe.ratings.length
      : undefined;

  return (
    <RecipeCard>
      <div className="flex flex-row height-[50px]">
        <div className="shrink-0 w-1/3">
          <RecipeCard.Image imageUrl={recipe.imageUrl} alt={recipe.title} />
        </div>
        <div className="flex-1 ml-4">
          <RecipeCard.Header>
            <RecipeCard.Title>{recipe.title}</RecipeCard.Title>
            <RecipeCard.Meta
              timeInMins={recipe.timeInMins}
              price={recipe.price}
              rating={avgRating}
            />
            <RecipeCard.Categories categories={recipe.categories} />
          </RecipeCard.Header>
          <RecipeCard.Body>
            <RecipeCard.Description children={recipe.description}/>
            <RecipeCard.Ingredients ingredients={recipe.ingredients} />
          </RecipeCard.Body>
        </div>
      </div>
    </RecipeCard>
  );
}
