import { Home, History, Settings, Users, Bell, Bug, ChevronsUpDown, Club } from "lucide-react"
import { useAuth } from '@/contexts/AuthProvider';
import { getProfilePicture, getProfileName } from '@/components/Profile/ProfileUtils';
import { NavUser } from "@/components/Sidebar/nav-user"
import { useLocation } from 'react-router-dom';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu" // Ajout de l'importation
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarInset,
  SidebarFooter,
  SidebarHeader,
  SidebarRail
} from "@/components/ui/sidebar"


// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "History",
    url: "/history",
    icon: History,
  },
  {
    title: "Organizations",
    url: "#",
    icon: Users,
  },
  {
    title: "Notifications",
    url: "/notifications",
    icon: Bell,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
  {
    title: "Report a bug",
    url: "/report",
    icon: Bug,
  },
]

export function AppSidebar() {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const userName = user ? getProfileName(user) : "";
  const userImageSrc = user ? getProfilePicture(user) : "";
  const userEmail = user ? user.email : "";

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarInset>
      <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                      <Club className="size-4" />
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        Holdem Planning
                      </span>
                      
                    </div>
                    <ChevronsUpDown className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                  align="start"
                  side="bottom"
                  sideOffset={4}
                >
                  <DropdownMenuLabel className="text-xs text-muted-foreground">
                    Teams
                  </DropdownMenuLabel>
                  
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="gap-2 p-2">
                    
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
            <SidebarGroup>
            <SidebarGroupLabel>Holdem Planning</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem key={item.title} >
                    <SidebarMenuButton asChild isActive={location.pathname === item.url} >
                        <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                        </a>
                    </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
                </SidebarMenu>
            </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="mb-2">
            <NavUser userName={userName} userEmail={userEmail} userAvatar={userImageSrc} logOut={signOut}/>
        </SidebarFooter>
        <SidebarRail />
      </SidebarInset>
    </Sidebar>
  )
}
