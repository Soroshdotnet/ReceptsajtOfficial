import {Link} from "react-router-dom";
import type {Recipe} from "@/types";
import {CreateRecipeModal} from "@/components/modals/CreateRecipeForm.tsx";
import {createRecipe} from "@/api";

export const Header = () => {
    const handleRecipeSubmit = async (recipe: Recipe) => {
        try {
            await createRecipe(recipe);
        } catch (error) {
            console.error("Failed to create recipe:", error);
        }
    }

    return (
        <h1 className="flex items-center font-bold text-xl justify-center gap-4">
            <div className="hover:text-blue-600 transition-colors">
                <Link to={"/"}>
                    HEM
                </Link>
            </div>
            <CreateRecipeModal onSubmit={handleRecipeSubmit}/>
        </h1>
    );
};