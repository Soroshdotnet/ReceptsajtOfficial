import { createRecipe } from "@/api"
import { CreateRecipeModal } from "@/components/modals/CreateRecipeForm"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import type { Recipe } from "@/types"

export function SiteHeader() {
     const handleRecipeSubmit = async (recipe: Recipe) => {
            try {
                await createRecipe(recipe);
            } catch (error) {
                console.error("Failed to create recipe:", error);
            }
        }
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">Julbordsguiden</h1>
        <div className="ml-auto flex items-center gap-2">
          <CreateRecipeModal onSubmit={handleRecipeSubmit}/>
        </div>
      </div>
    </header>
  )
}
