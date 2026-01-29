import Navbar from "@/components/shadcn-studio/blocks/navbar-component-01/navbar-component-01";
import React from "react";

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigationData = [
    {
      title: "Home",
      href: "#",
    },
    {
      title: "Products",
      href: "#",
    },
    {
      title: "About Us",
      href: "#",
    },
    {
      title: "Contacts",
      href: "#",
    },
  ];

  return (
    <div>
      <Navbar navigationData={navigationData} />
      {children}
    </div>
  );
}
