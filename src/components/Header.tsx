import {Link} from "react-router-dom";
import type {Recipe} from "@/types";
import {CreateRecipeModal} from "@/components/modals/CreateRecipeForm.tsx";

export const Header = () => {
    const handleRecipeSubmit = (recipe: Recipe) => {
        console.log('New recipe submitted:', recipe);
        //TODO: API call here
    };

    return (
        <h1 className="flex justify-center items-center font-bold text-xl hover:text-blue-600 transition-colors">
            <Link to={"/"}>
                HEM
            </Link>
            <CreateRecipeModal onSubmit={handleRecipeSubmit} />
        </h1>
    );
};