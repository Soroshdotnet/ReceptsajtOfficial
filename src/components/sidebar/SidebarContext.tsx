import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

export interface NavItem {
  title: string;
  url: string;
  icon: LucideIcon;
  isActive?: boolean;
  items?: {
    title: string;
    url: string;
  }[];
}

export interface SidebarData {
  navMain: NavItem[];
  navSecondary: {
    title: string;
    url: string;
    icon: LucideIcon;
  }[];
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}

interface SidebarContextValue {
  data: SidebarData;
}

const SidebarContext = createContext<SidebarContextValue | null>(null);

export function useSidebarData() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("Sidebar components must be used within SidebarDataProvider");
  }
  return context;
}

interface SidebarDataProviderProps {
  data: SidebarData;
  children: ReactNode;
}

export function SidebarDataProvider({ data, children }: SidebarDataProviderProps) {
  return (
    <SidebarContext.Provider value={{ data }}>
      {children}
    </SidebarContext.Provider>
  );
}
