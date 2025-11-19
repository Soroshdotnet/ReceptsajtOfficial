import { useRecipeCard } from "../RecipeCardContext";
import { cn } from "@/lib/utils";

interface RecipeCardInstructionsProps {
  className?: string;
}

export function RecipeCardInstructions({ className }: RecipeCardInstructionsProps) {
  const { recipe } = useRecipeCard();

  return (
    <div className={cn(className)}>
      <h3 className="text-lg font-semibold mb-3">Instructions</h3>
      <ol className="space-y-3">
        {recipe.instructions.map((instruction, index) => (
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
}
