import Navbar from "@/components/shadcn-studio/blocks/navbar-component-01/navbar-component-01";
import Footer from "@/components/ui/Footer";
import { userService } from "@/Services/user.service";
import { title } from "process";
import React from "react";

export default async function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let navigationData = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Meals",
      href: "/meals",
    },
    {
      title: "Be a Provider",
      href: "/be-a-provider",
    },
    { title: "Login", href: "/login" },
  ];

  const { data } = await userService.getSession();
  let role = data?.user?.role;
  if (role === "PROVIDER") {
    navigationData = [
      {
        title: "Home",
        href: "/",
      },
      {
        title: "Meals",
        href: "/meals",
      },
      {
        title: "Dashboard",
        href: "/provider-dashboard",
      },
    ];
  }
  if (role === "CUSTOMER") {
    navigationData = [
      {
        title: "Home",
        href: "/",
      },
      {
        title: "Meals",
        href: "/meals",
      },
      {
        title: "Dashboard",
        href: "/customer-dashboard",
      },
    ];
  }

  if (role === "ADMIN") {
    navigationData = [
      {
        title: "Home",
        href: "/",
      },
      {
        title: "Meals",
        href: "/meals",
      },
      {
        title: "Dashboard",
        href: "/admin-dashboard",
      },
    ];
  }
  return (
    <div>
      <Navbar navigationData={navigationData} />
      {children}
      <Footer />
    </div>
  );
}
