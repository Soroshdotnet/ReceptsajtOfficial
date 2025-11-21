import {Outlet} from "react-router-dom";
import {SidebarInset, SidebarProvider} from "./components/ui/sidebar";
import {SiteHeader} from "./components/site-header";
import {AppSidebarComposed} from "./components/sidebar";

function App() {
    return (
        <div className="[--header-height:calc(--spacing(14))]">
            <SidebarProvider className="flex flex-col">
                <SiteHeader />
                <div className="flex flex-1">
                    <AppSidebarComposed />
                    <SidebarInset>
                        <div className="flex flex-1 flex-col gap-4 p-4">
                            <Outlet/>
                        </div>
                    </SidebarInset>
                </div>
            </SidebarProvider>
        </div>
    )
}

export default App
