import React, {useEffect, useState} from "react";
import type {Recipe} from "@/types";
import {getRecipesByCategory} from "@/api";
import {useParams} from "react-router-dom";
import {RecipeCardCompact} from "@/components/recipe-card";
import { ChefHat } from "lucide-react";

export const CategoryPage: React.FC = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const {category} = useParams();

    useEffect(() => {
        const fetchRecipes = async () => {
            const recipes = await getRecipesByCategory(category as string);
            setRecipes(recipes);
        };
        fetchRecipes();
    }, [category]);

    function renderListOfRecipes(recipes: Recipe[]) {
        return (
            recipes.map((recipe: Recipe) => (
                <RecipeCardCompact key={recipe.title} recipe={recipe}/>
            ))
        )
    }

    return (
        <>
            <div className="flex items-center gap-2 mb-8 justify-center">
                <ChefHat className="w-8 h-8 text-primary" />
                <h1 className="text-4xl text-primary font-bold">{category}</h1>
            </div>
            <div className="space-y-4 mx-auto">
            {renderListOfRecipes(recipes)}
            </div>
        </>
    );
};