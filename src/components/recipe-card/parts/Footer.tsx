import { CardFooter } from "@/components/ui/card";
import type { ReactNode } from "react";

export function RecipeCardFooter({
  children,
}: {
  children: ReactNode;
}) {
  return <CardFooter>{children}</CardFooter>;
};