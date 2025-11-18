import { CardHeader } from "@/components/ui/card";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface RecipeCardHeaderProps {
  children: ReactNode;
  className?: string;
}

export function RecipeCardHeader({ children, className }: RecipeCardHeaderProps) {
  return (
    <CardHeader className={cn(className)}>
      {children}
    </CardHeader>
  );
}
