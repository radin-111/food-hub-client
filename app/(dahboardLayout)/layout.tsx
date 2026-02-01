import { AppSidebar } from "@/components/app-sidebar";

import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { userService } from "@/Services/user.service";

export default async function Page({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = await userService.getSession();
  const role = data?.user?.role;
  const user = data?.user;
  return (
    <SidebarProvider>
      <AppSidebar user={user} role={role} />
      <SidebarInset>
        <header className="bg-background sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
