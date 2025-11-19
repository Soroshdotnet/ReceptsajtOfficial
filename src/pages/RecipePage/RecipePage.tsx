import React, { useState, useEffect } from "react";
import type { Recipe } from "@/types";
import { ChefHat } from "lucide-react";
import { getRecipeById } from "@/api";
import { useParams } from "react-router-dom";
import { RecipeCardDefault } from "@/components/recipe-card";

export const RecipePage: React.FC = () => {
    const { recipeId } = useParams<{ recipeId: string }>();
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchRecipe() {
            if (!recipeId) return;
            
            try {
                setLoading(true);
                const fetchedRecipe = await getRecipeById(recipeId);
                setRecipe(fetchedRecipe);
            } catch (error) {
                console.error("Failed to fetch recipe:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchRecipe();
    }, []);

    if (loading) {
        return <div className="text-center py-8">Loading...</div>;
    }

    if (!recipe) {
        return <div className="text-center py-8">Recipe not found</div>;
    }

    return (
        <>
            <div className="flex items-center gap-2 mb-8 justify-center">
                <ChefHat className="w-8 h-8 text-primary" />
                <h1 className="text-4xl text-primary font-bold">{recipe.title}</h1>
            </div>
            <div className="max-w-2xl mx-auto">
                <RecipeCardDefault recipe={recipe} />
            </div>
        </>
    );
};
