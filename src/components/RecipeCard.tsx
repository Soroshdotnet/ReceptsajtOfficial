import type {ReactElement} from "react";
import type {IRecipe} from "@/types";

export function RecipeCard(Recipe: IRecipe): ReactElement {
    return (
        <article>
            <h1>{Recipe.title}</h1>
            <p>
                {Recipe.category}
                {Recipe.description}
                {Recipe.ratings[0]}
                {Recipe.imageUrl}
                {Recipe.timeInMins}
                {Recipe.price}
                {Recipe.instructions[0]}
                {Recipe.ingredients.map((ingredient) => (
                    <div key={ingredient.name}>
                        <p>{ingredient.amount}</p>
                        <p>{ingredient.unit}</p>
                    </div>
                ))}

            </p>
        </article>
    )
}

