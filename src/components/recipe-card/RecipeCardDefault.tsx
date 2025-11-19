import type { Recipe } from "@/types";
import {
  RecipeCardProvider,
  RecipeCardRoot,
  RecipeCardImage,
  RecipeCardHeader,
  RecipeCardTitle,
  RecipeCardDescription,
  RecipeCardMeta,
  RecipeCardCategories,
  RecipeCardBody,
  RecipeCardIngredients,
  RecipeCardInstructions,
} from "./index";

interface RecipeCardDefaultProps {
  recipe: Recipe;
}

export function RecipeCardDefault({ recipe }: RecipeCardDefaultProps) {
  return (
    <RecipeCardProvider recipe={recipe} variant="default">
      <RecipeCardRoot>
        <RecipeCardImage />
        <RecipeCardHeader>
          <RecipeCardTitle />
          <RecipeCardMeta />
          <RecipeCardCategories />
          <RecipeCardDescription />
        </RecipeCardHeader>
        <RecipeCardBody>
          <RecipeCardIngredients />
          <RecipeCardInstructions />
        </RecipeCardBody>
      </RecipeCardRoot>
    </RecipeCardProvider>
  );
}
