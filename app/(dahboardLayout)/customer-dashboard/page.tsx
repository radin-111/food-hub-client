import CustomerStatistics from "@/components/modules/user/CustomerStatistics";
import { env } from "@/env";
import { cookies } from "next/headers";
import React from "react";

export default async function CustomerDashboard() {
  const cookieStore = await cookies();
  const res = await fetch(`${env.BACKEND_URL}/user/customer-statistics`, {
    cache: "no-store",
    headers: {
      Cookie: cookieStore.toString(),
      Origin: env.FRONTEND_URL,
    },
    credentials: "include",
  });
  const { data } = await res.json();

  return <div>
    <CustomerStatistics data={data}/>
  </div>;
}
