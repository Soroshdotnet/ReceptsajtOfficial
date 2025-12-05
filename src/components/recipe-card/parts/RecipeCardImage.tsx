import { Image } from "@unpic/react";
import { useRecipeCard } from "../RecipeCardContext";
import { cn } from "@/lib/utils";

interface RecipeCardImageProps {
  className?: string;
  wrapperClassName?: string;
  layout?: "constrained" | "fullWidth";
  height?: number;
  aspectRatio?: number;
}
export function RecipeCardImage({ 
  className = "", 
  wrapperClassName = "",
  layout = "fullWidth",
  height = 300,
  aspectRatio = 16/9
}: RecipeCardImageProps) {
  const { recipe, variant } = useRecipeCard();
  
  const defaultClasses = variant === "compact" 
    ? "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
    : "w-full h-48 object-cover hover:scale-105 transition-transform duration-300";

  const defaultWrapperClasses = variant === "compact"
    ? "p-0 flex-3 m-0 overflow-hidden"
    : "relative overflow-hidden -mx-6 -mt-6 mb-6";

  return (
    <div className={cn(defaultWrapperClasses, wrapperClassName)}>
      {layout === "fullWidth" ? (
        <Image
          src={recipe.imageUrl}
          alt={recipe.title}
          layout="fullWidth"
          className={cn(defaultClasses, className)}
        />
      ) : (
        <Image
          src={recipe.imageUrl}
          alt={recipe.title}
          layout="constrained"
          height={height}
          aspectRatio={aspectRatio}
          className={cn(defaultClasses, className)}
        />)}
    </div>
  );
}
