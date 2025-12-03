import { Clock, DollarSign, Star } from "lucide-react";
import { useRecipeCard } from "../RecipeCardContext";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface RecipeCardMetaProps {
  className?: string;
}

interface MetaItemProps {
  icon: LucideIcon;
  value: string;
  iconClassName?: string;
  fill?: boolean;
}

function MetaItem({ icon: Icon, value, iconClassName = "text-accent", fill = false }: MetaItemProps) {
  return (
    <div className="flex gap-1 items-center">
      <Icon className={cn("w-4 h-4", iconClassName)} fill={fill ? "currentColor" : "none"} />
      <span>{value}</span>
    </div>
  );
}

export function RecipeCardMeta({ className }: RecipeCardMetaProps) {
  const { recipe, variant } = useRecipeCard();
  
   const avgRating =
    typeof recipe.ratings === "number" && recipe.ratings > 0
      ? recipe.ratings.toFixed(1)   // ger t.ex. "4.0"
      : "N/A";

  const defaultClasses = variant === "compact"
    ? "flex gap-2 text-xs text-muted-foreground mb-3"
    : "flex gap-4 text-sm text-muted-foreground";

  return (
    <div className={cn(defaultClasses, className)}>
      <MetaItem icon={Clock} value={`${recipe.timeInMins} min`} />
      <MetaItem icon={DollarSign} value={`$${recipe.price}`} iconClassName="text-primary" />
      <MetaItem icon={Star} value={avgRating} fill />
    </div>
  );
}
