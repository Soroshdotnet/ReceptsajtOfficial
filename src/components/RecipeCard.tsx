import type { ReactNode } from "react";
import type { Recipe } from "@/types";
import { Image } from "@unpic/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, DollarSign, Star, ArrowRight } from "lucide-react";

interface RecipeCardProps {
  children: ReactNode;
}

type RecipeCardImageProps = Pick<Recipe, "imageUrl"> & { alt: string };

interface RecipeCardTitleProps {
  children: ReactNode;
}

type RecipeCardMetaProps = Pick<Recipe, "timeInMins" | "price"> & {
  rating?: number;
};

type RecipeCardCategoriesProps = Pick<Recipe, "categories">;

interface RecipeCardDescriptionProps {
  children: ReactNode;
}

type RecipeCardIngredientsProps = Pick<Recipe, "ingredients">;

type RecipeCardInstructionsProps = Pick<Recipe, "instructions">;

export function RecipeCard({ children }: RecipeCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {children}
    </Card>
  );
}

RecipeCard.Image = function RecipeCardImage({
  imageUrl,
  alt,
}: RecipeCardImageProps) {
  return (
    <div className="relative overflow-hidden h-48 w-48 -mx-6 -mt-6 mb-6">
      <img
        src={imageUrl}
        alt={alt}
        className="w-full h-full object-cover aspect-square hover:scale-105 transition-transform duration-300"
      />
    </div>
  );
};

RecipeCard.Header = function RecipeCardHeader({
  children,
}: {
  children: ReactNode;
}) {
  return <CardHeader>{children}</CardHeader>;
};

RecipeCard.Title = function RecipeCardTitle({
  children,
}: RecipeCardTitleProps) {
  return <CardTitle className="text-2xl">{children}</CardTitle>;
};

RecipeCard.Meta = function RecipeCardMeta({
  timeInMins,
  price,
  rating,
}: RecipeCardMetaProps) {
  const avgRating = rating ? rating.toFixed(1) : "N/A";

  return (
    <div className="flex items-center gap-4 text-sm text-muted-foreground">
      <div className="flex items-center gap-1.5">
        <Clock className="w-4 h-4" />
        <span>{timeInMins} min</span>
      </div>
      <div className="flex items-center gap-1.5">
        <DollarSign className="w-4 h-4" />
        <span>${price}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <Star className="w-4 h-4" />
        <span>{avgRating}</span>
      </div>
    </div>
  );
};

RecipeCard.Categories = function RecipeCardCategories({
  categories,
}: RecipeCardCategoriesProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories &&
        categories.map((category) => (
          <Badge key={category} variant="secondary">
            {category}
          </Badge>
        ))}
    </div>
  );
};

RecipeCard.Description = function RecipeCardDescription({
  children,
}: RecipeCardDescriptionProps) {
  return <CardDescription className="text-base">{children}</CardDescription>;
};

RecipeCard.Body = function RecipeCardBody({
  children,
}: {
  children: ReactNode;
}) {
  return <CardContent className="space-y-4">{children}</CardContent>;
};

RecipeCard.Ingredients = function RecipeCardIngredients({
  ingredients,
}: RecipeCardIngredientsProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">Ingredients</h3>
      <ul className="space-y-2">
        {ingredients.map((ingredient, index) => (
          <li key={index} className="flex items-center gap-2 text-sm">
            <span className="w-2 h-2 bg-primary rounded-full"></span>
            <span>
              {ingredient.amount} {ingredient.unit} {ingredient.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

RecipeCard.Instructions = function RecipeCardInstructions({
  instructions,
}: RecipeCardInstructionsProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">Instructions</h3>
      <ol className="space-y-3">
        {instructions.map((instruction, index) => (
          <li key={index} className="flex gap-3 text-sm">
            <span className="shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
              {index + 1}
            </span>
            <span className="flex-1">{instruction}</span>
          </li>
        ))}
      </ol>
    </div>
  );
};

RecipeCard.Footer = function RecipeCardFooter({
  children,
}: {
  children: ReactNode;
}) {
  return <CardFooter>{children}</CardFooter>;
};

export function RecipeCardCompact({
  recipe,
  onViewRecipe,
}: {
  recipe: Recipe;
  onViewRecipe: (id: string) => void;
}) {
  const avgRating =
    recipe.ratings?.length > 0
      ? recipe.ratings.reduce((a, b) => a + b, 0) / recipe.ratings.length
      : undefined;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-row h-full p-0 max-w-[600px] gap-0">
      <div className="p-0 flex-3 m-0 overflow-hidden">
        <Image
          src={recipe.imageUrl}
          alt={recipe.title}
          layout="fullWidth"
          aspectRatio={1}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
        
      <div className="p-2 flex flex-col flex-4">
        <CardHeader className="p-2 px-6">
          <CardTitle className="line-clamp-2 text-primary">{recipe.title}</CardTitle>
          <CardDescription className="line-clamp-2 mt-1">
            {recipe.description}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="flex-1 p-0 px-6">
          <div className="flex gap-2 text-xs text-muted-foreground mb-3">
            <div className="flex gap-1">
              <Clock className="w-3 h-3 text-accent" />
              <span>{recipe.timeInMins} min</span>
            </div>
            <div className="flex gap-1">
              <DollarSign className="w-3 h-3 text-primary" />
              <span>${recipe.price}</span>
            </div>
            <div className="flex gap-1">
              <Star className="w-3 h-3 text-accent" fill="currentColor" />
              <span>{avgRating ? avgRating.toFixed(1) : "N/A"}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1 mb-3">
            {recipe.categories?.slice(0, 2).map((category) => (
              <Badge key={category} variant="secondary" className="text-xs">
                {category}
              </Badge>
            ))}
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            onClick={() => onViewRecipe(recipe._id || '')}
          >
            View Recipe <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </CardContent>
      </div>
    </Card>
  );
}


