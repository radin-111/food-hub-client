import Navbar from "@/components/shadcn-studio/blocks/navbar-component-01/navbar-component-01";
import Footer from "@/components/ui/Footer";
import React from "react";

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigationData = [
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
    }
    
  ];

  return (
    <div>
      <Navbar navigationData={navigationData} />
      {children}
      <Footer/>
    </div>
  );
}
