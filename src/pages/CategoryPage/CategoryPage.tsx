import React, {useEffect, useState} from "react";
import type {Recipe} from "@/types";
import {getRecipesByCategory} from "@/api";
import {RecipeCardExample} from "@/components/RecipeCardExample.tsx";
import {useParams} from "react-router-dom";

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
                <RecipeCardExample key={recipe.title} recipe={recipe}/>
            ))
        )
    }

    return (
        <main>
            <span>Du tittar nu på: {category}</span>
            {renderListOfRecipes(recipes)}
        </main>
    );
};