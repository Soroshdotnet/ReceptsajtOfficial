import { CardFooter } from "@/components/ui/card";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface RecipeCardFooterProps {
  children: ReactNode;
  className?: string;
}

export function RecipeCardFooter({ children, className }: RecipeCardFooterProps) {
  return (
    <CardFooter className={cn(className)}>
      {children}
    </CardFooter>
  );
}
