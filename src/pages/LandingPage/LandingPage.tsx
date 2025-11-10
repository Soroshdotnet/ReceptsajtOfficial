import { getAllRecipes } from "@/api/recipes";
import { RecipeCardExample } from "@/components/RecipeCardExample";
import type { Recipe } from "@/types";
import React, { useEffect, useState } from "react";

export const LandingPage: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

 useEffect(() => {
    const fetchRecipes = async () => {
      const recipes = await getAllRecipes();
      console.log(`There are ${recipes.length} recipes in total.`);
      setRecipes(recipes);
    };
    fetchRecipes();
    }, []);

    function renderListOfRecipes(recipes: Recipe[]) {
        console.log(recipes)
    return (
        recipes.map((recipe: Recipe) => (
      <RecipeCardExample key={recipe.title} recipe={recipe} />
        ))
    )}

    return (
        <main>
            <h1 className="text-2xl font-bold underline">Start</h1>
             {recipes.length > 0 && renderListOfRecipes(recipes)}
        </main>
    );
};
