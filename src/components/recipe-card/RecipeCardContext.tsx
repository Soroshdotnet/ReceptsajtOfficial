import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import type { Recipe } from "@/types";

interface RecipeCardContextValue {
  recipe: Recipe;
  variant?: "default" | "compact" | "minimal";
}

const RecipeCardContext = createContext<RecipeCardContextValue | null>(null);

export function useRecipeCard() {
  const context = useContext(RecipeCardContext);
  if (!context) {
    throw new Error("RecipeCard components must be used within RecipeCardProvider");
  }
  return context;
}

interface RecipeCardProviderProps {
  recipe: Recipe;
  variant?: "default" | "compact";
  children: ReactNode;
}

export function RecipeCardProvider({ recipe, variant = "default", children }: RecipeCardProviderProps) {
  return (
    <RecipeCardContext.Provider value={{ recipe, variant }}>
      {children}
    </RecipeCardContext.Provider>
  );
}

