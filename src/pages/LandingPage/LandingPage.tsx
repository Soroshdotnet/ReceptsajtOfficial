import {getAllRecipes} from "@/api/recipes";
import type {Recipe} from "@/types";
import React, {useEffect, useState} from "react";
import {SearchField} from "@/components/SearchField.tsx";
import { ChefHat } from "lucide-react";
import { RecipeCardCompact } from "@/components/recipe-card";

export const LandingPage: React.FC = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchRecipes = async () => {
            const recipes = await getAllRecipes();
            console.log(`There are ${recipes.length} recipes in total.`);
            setRecipes(recipes);
        };
        fetchRecipes();
    }, []);

    const filteredRecipes = recipes.filter((recipe) => {
        return recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
    });

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
                <h1 className="text-4xl text-primary font-bold">Julbordsguiden</h1>
            </div>
            <div className="mb-8 flex justify-center">
                <SearchField setSearchQuery={setSearchQuery}/>
            </div>
            <div className="space-y-4 mx-auto">
                {filteredRecipes.length > 0 ? (renderListOfRecipes(filteredRecipes)) : <p className="text-muted-foreground text-lg">No recipes found</p>}
            </div>
        </>
    );
};
