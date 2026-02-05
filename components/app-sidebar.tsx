import * as React from "react";
import { Users, Settings, Home } from "lucide-react";

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
import { userRoutes } from "@/routes/all.routes";
import { Button } from "./ui/button";
import Logout from "./ui/Logout";

// Sidebar links
let routes: any = [];

export function AppSidebar({
  user,
  ...props
}: { user?: any } & React.ComponentProps<typeof Sidebar>) {
  if (user?.role === "ADMIN") {
    routes = userRoutes.adminRoutes;
  } else if (user?.role === "PROVIDER") {
    routes = userRoutes.providerRoutes;
  } else {
    routes = userRoutes.customerRoutes;
  }
  return (
    <Sidebar {...props}>
      {/* Profile section */}
      <SidebarHeader className="flex items-center gap-3 px-4 py-4 border-b">
        <Image
          width={50}
          height={50}
          src={
            user?.image ||
            "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?semt=ais_hybrid&w=740&q=80"
          }
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
        <SidebarMenu className="px-2 ">
          {routes.map((item: any) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                className="flex items-center gap-3 rounded-md px-3 py-2 text-[15px] font-medium my-2"
              >
                <Link href={item.url}>
                  <item.icon className="h-4 w-4 shrink-0" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
          <div className="px-2 mt-10">
            <Logout fullWidth={true} />
          </div>
        </SidebarMenu>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
