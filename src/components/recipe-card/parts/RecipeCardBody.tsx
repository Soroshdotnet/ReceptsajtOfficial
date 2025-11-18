import { CardContent } from "@/components/ui/card";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface RecipeCardBodyProps {
  children: ReactNode;
  className?: string;
}

export function RecipeCardBody({ children, className }: RecipeCardBodyProps) {
  return (
    <CardContent className={cn("space-y-4", className)}>
      {children}
    </CardContent>
  );
}
