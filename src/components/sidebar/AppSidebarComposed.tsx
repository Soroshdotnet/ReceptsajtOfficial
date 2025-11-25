import * as React from "react";
import {
  BookOpen,
  Home,
  LifeBuoy,
  Send,
  UtensilsCrossed,
} from "lucide-react";
import { getAllCategories } from "@/api/categories";
import type { Category } from "@/types";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { SidebarDataProvider } from "./SidebarContext";
import { SidebarBrand } from "./parts/SidebarBrand";
import { SidebarNavigation } from "./parts/SidebarNavigation";
import { SidebarSecondaryNav } from "./parts/SidebarSecondaryNav";
import { SidebarUserMenu } from "./parts/SidebarUserMenu";

export function AppSidebarComposed({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const sidebarData = {
    user: {
      name: "Guest",
      email: "guest@example.com",
      avatar: "/avatars/guest.jpg",
    },
    navMain: [
      {
        title: "Hem",
        url: "/",
        icon: Home,
        isActive: false,
      },
      {
        title: "Kategorier",
        url: "#",
        icon: UtensilsCrossed,
        isActive: true,
        items: isLoading
          ? [{ title: "Laddar...", url: "#" }]
          : categories.map((category) => ({
              title: category.name,
              url: `/${encodeURIComponent(category.name)}`,
            })),
      },
      {
        title: "Om Oss",
        url: "#",
        icon: BookOpen,
      },
    ],
    navSecondary: [
      {
        title: "Support",
        url: "#",
        icon: LifeBuoy,
      },
      {
        title: "Feedback",
        url: "#",
        icon: Send,
      },
    ],
  };

  return (
    <SidebarDataProvider data={sidebarData}>
      <Sidebar
        className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
        {...props}
      >
        <SidebarHeader>
          <SidebarBrand />
        </SidebarHeader>
        <SidebarContent>
          <SidebarNavigation />
          <SidebarSecondaryNav />
        </SidebarContent>
        <SidebarFooter>
          <SidebarUserMenu />
        </SidebarFooter>
      </Sidebar>
    </SidebarDataProvider>
  );
}
