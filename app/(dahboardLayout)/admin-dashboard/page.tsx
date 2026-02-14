import AdminDashboard from "@/components/modules/Admin/AdminDashboard";
import { env } from "@/env";
import { cookies } from "next/headers";
import React from "react";

export default async function Dashboard() {
  const cookieStore = await cookies();
  const res = await fetch(`${env.BACKEND_URL}/user/admin-statistics`, {
    cache: "no-store",
    headers: {
      Cookie: cookieStore.toString(),
      Origin: env.FRONTEND_URL,
    },
    credentials: "include",
  });
  const { data } = await res.json();
  
  return (
    <div className="">
      <AdminDashboard stats={data} />
    </div>
  );
}
