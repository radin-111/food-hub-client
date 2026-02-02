import { NextRequest, NextResponse } from "next/server";
import React from "react";
import { userService } from "./Services/user.service";
const navigate = (
  role: "CUSTOMER" | "PROVIDER" | "ADMIN",
  request: NextRequest,
) => {
  if (role === "CUSTOMER") {
    return NextResponse.redirect(new URL("/customer-dashboard", request.url));
  }
  if (role === "PROVIDER") {
    return NextResponse.redirect(new URL("/provider-dashboard", request.url));
  }
  if (role === "ADMIN") {
    return NextResponse.redirect(new URL("/admin-dashboard", request.url));
  }
};
export default async function proxy(request: NextRequest) {
  let isAuthenticated = false;
  let isAdmin = false;
  let isProvider = false;
  let isCustomer = false;
  const pathName = request.nextUrl.pathname;
  const { data } = await userService.getSession();
  let role = data?.user?.role;
  if (!data) {
    NextResponse.redirect(new URL("/login", request.url));
  }
  if (data) {
    isAuthenticated = true;
    if (role === "ADMIN") {
      isAdmin = true;
    }
    if (role === "PROVIDER") {
      isProvider = true;
    }
    if (role === "CUSTOMER") {
      isCustomer = true;
    }
  }

  if (
    (pathName.includes("/login") || pathName.includes("/signup")) &&
    isAuthenticated
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (pathName.startsWith("/admin-dashboard") && !isAdmin) {
    return navigate(role, request);
  }

  if (pathName.startsWith("/provider-dashboard") && !isProvider) {
    return navigate(role, request);
  }
  if (pathName.startsWith("/customer-dashboard") && !isCustomer) {
    return navigate(role, request);
  }
}
export const config = {
  matcher: [
    "/login",
    "/signup",
    "/admin-dashboard",
    "/admin-dashboard/:path*",
    "/provider-dashboard",
    "/provider-dashboard/:path*",
    "/customer-dashboard",
    "/customer-dashboard/:path*",
  ],
};
