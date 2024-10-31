import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/Sidebar/app-sidebar"

export default function Layout({ children }) {
    return (
        <SidebarProvider>
        <AppSidebar />
        <main className="max-w-[100%] max-h-[100%] overflow-hidden sm:shadow w-full sm:rounded-lg p-4 sm:m-2 bg-background">
          <SidebarTrigger />
          <Outlet/>
          {children}
        </main>
      </SidebarProvider>
    );
}