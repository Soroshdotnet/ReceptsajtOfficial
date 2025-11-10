import type { ReactNode } from "react";
import type { Recipe } from "@/types";

interface RecipeCardProps {
    children: ReactNode;
}

type RecipeCardImageProps = Pick<Recipe, 'imageUrl'> & { alt: string };

interface RecipeCardTitleProps {
    children: ReactNode;
}

type RecipeCardMetaProps = Pick<Recipe, 'timeInMins' | 'price'> & { rating?: number };

type RecipeCardCategoriesProps = Pick<Recipe, 'categories'>;

interface RecipeCardDescriptionProps {
    children: ReactNode;
}

type RecipeCardIngredientsProps = Pick<Recipe, 'ingredients'>;

type RecipeCardInstructionsProps = Pick<Recipe, 'instructions'>;

export function RecipeCard({ children }: RecipeCardProps) {
    return (
        <article className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 m-2 border border-gray-100">
            {children}
        </article>
    );
}

RecipeCard.Image = function RecipeCardImage({ imageUrl, alt }: RecipeCardImageProps) {
    return (
        <div className="relative overflow-hidden">
            <img
                src={imageUrl}
                alt={alt}
                className="object-cover hover:scale-105 transition-transform duration-300"
            />
        </div>
    );
};

RecipeCard.Header = function RecipeCardHeader({ children }: { children: ReactNode }) {
    return <div className="p-6 space-y-3">{children}</div>;
};

RecipeCard.Title = function RecipeCardTitle({ children }: RecipeCardTitleProps) {
    return <h2 className="text-2xl font-bold text-gray-900">{children}</h2>;
};

RecipeCard.Meta = function RecipeCardMeta({ timeInMins, price, rating }: RecipeCardMetaProps) {
    const avgRating = rating ? rating.toFixed(1) : 'N/A';
    
    return (
        <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
                <span className="text-lg">⏱️</span>
                <span>{timeInMins} min</span>
            </div>
            <div className="flex items-center gap-1">
                <span className="text-lg">💰</span>
                <span>${price}</span>
            </div>
            <div className="flex items-center gap-1">
                <span className="text-lg">⭐</span>
                <span>{avgRating}</span>
            </div>
        </div>
    );
};

RecipeCard.Categories = function RecipeCardCategories({ categories }: RecipeCardCategoriesProps) {
    return (
        <div className="flex flex-wrap gap-2">
            {categories && categories.map((category) => (
                <span
                    key={category}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium"
                >
                    {category}
                </span>
            ))}
        </div>
    );
};

RecipeCard.Description = function RecipeCardDescription({ children }: RecipeCardDescriptionProps) {
    return <p className="text-gray-600 leading-relaxed">{children}</p>;
};

RecipeCard.Body = function RecipeCardBody({ children }: { children: ReactNode }) {
    return <div className="px-6 pb-6 space-y-4">{children}</div>;
};

RecipeCard.Ingredients = function RecipeCardIngredients({ ingredients }: RecipeCardIngredientsProps) {
    return (
        <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Ingredients</h3>
            <ul className="space-y-2">
                {ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-700">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        <span>
                            {ingredient.amount} {ingredient.unit} {ingredient.name}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

RecipeCard.Instructions = function RecipeCardInstructions({ instructions }: RecipeCardInstructionsProps) {
    return (
        <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Instructions</h3>
            <ol className="space-y-3">
                {instructions.map((instruction, index) => (
                    <li key={index} className="flex gap-3 text-gray-700">
                        <span className="shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                            {index + 1}
                        </span>
                        <span className="flex-1">{instruction}</span>
                    </li>
                ))}
            </ol>
        </div>
    );
};

RecipeCard.Footer = function RecipeCardFooter({ children }: { children: ReactNode }) {
    return <div className="px-6 py-4 bg-gray-50 border-t">{children}</div>;
};


