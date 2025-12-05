import { Card } from "@/components/ui/card";
import type { ReactNode } from "react";

interface RecipeCardRootProps {
  children: ReactNode;
  className?: string;
}

export function RecipeCardRoot({ children, className = "" }: RecipeCardRootProps) {
  return (
    <Card className={`overflow-hidden hover:shadow-lg transition-shadow duration-300 ${className}`}>
      {children}
    </Card>
  );
}
