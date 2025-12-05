import type { Recipe } from "@/types";
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import {
  RecipeCardProvider,
  RecipeCardRoot,
  RecipeCardImage,
  RecipeCardTitle,
  RecipeCardDescription,
  RecipeCardMeta,
  RecipeCardCategories,
} from "./index";
import { Link } from "react-router-dom";

interface RecipeCardCompactProps {
  recipe: Recipe;
}

export function RecipeCardCompact({ recipe }: RecipeCardCompactProps) {
  return (
    <RecipeCardProvider recipe={recipe} variant="compact">
      <RecipeCardRoot className="flex flex-row p-0 w-full max-w-[600px] gap-0">
        <RecipeCardImage className="min-h-[200px] max-h-[220px]"/>
        
        <div className="p-2 pb-0 flex flex-col flex-4">
          <CardContent className="flex-1 p-0 py-2 px-6">
            <RecipeCardTitle className="mb-2" />
            <RecipeCardMeta />
            <RecipeCardCategories limit={2} />
            <RecipeCardDescription />
              <Button 
                variant="link" 
                size="sm" 
                className="text-primary font-medium mt-4 justify-start hover:underline cursor-pointer"
                asChild
              >
                <Link to={`/${recipe.categories[0]}/${recipe._id}`}>
                    Gå till recept
                    <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
          </CardContent>
        </div>
      </RecipeCardRoot>
    </RecipeCardProvider>
  );
}
