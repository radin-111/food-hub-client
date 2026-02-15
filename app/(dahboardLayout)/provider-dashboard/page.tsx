import ProviderStatistics from "@/components/modules/Provider/ProviderStatistics";
import { env } from "@/env";
import { cookies } from "next/headers";
import React from "react";

export default async function ProviderDashboard() {
  const cookieStore = await cookies();
  const res = await fetch(`${env.BACKEND_URL}/user/provider-statistics`, {
    cache: "no-store",
    headers: {
      Cookie: cookieStore.toString(),
      Origin: env.FRONTEND_URL,
    },
    credentials: "include",
  });
  const { data } = await res.json();
 
  return <div>
    <ProviderStatistics data={data} />
  </div>;
}
