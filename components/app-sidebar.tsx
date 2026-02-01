import * as React from "react";
import {  Users, Settings, Home } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";

// Sidebar links
const routes = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Users",
    url: "/users",
    icon: Users,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export function AppSidebar({
  user,
  ...props
}: { user?: any } & React.ComponentProps<typeof Sidebar>) {
  
  return (
    <Sidebar {...props}>
      {/* Profile section */}
      <SidebarHeader className="flex items-center gap-3 px-4 py-4 border-b">
        <Image
        width={50}
        height={50}
          src={user?.image || "https://i.pravatar.cc/40"}
          alt="Profile"
          className="h-10 w-10 rounded-full object-cover"
        />
        <div className="leading-tight">
          <p className="text-sm font-semibold text-sidebar-foreground">
            {user?.name}
          </p>
          <p className="text-xs text-muted-foreground">{user?.role}</p>
        </div>
      </SidebarHeader>

      {/* Navigation */}
      <SidebarContent className="pt-2">
        <SidebarMenu className="px-2">
          {routes.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                className="flex items-center gap-3 rounded-md px-3 py-2 text-[15px] font-medium"
              >
                <Link href={item.url}>
                  <item.icon className="h-4 w-4 shrink-0" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
