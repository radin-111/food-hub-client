import { env } from "@/env";
import { cookies } from "next/headers";
import React from "react";

export default async function OrdersPage() {
  const cookieStore = await cookies();
  const res = await fetch(`${env.BACKEND_URL}/orders/get-orders`, {
    cache: "no-store",
    headers: {
      Cookie: cookieStore.toString(),
      Origin: env.FRONTEND_URL,
    },
    credentials: "include",
  });
  const { data } = await res.json();
  console.log(data);
  if (data.result.length === 0) {
    return (
      <div>
        <div className="text-center text-2xl font-bold text-gray-600">
          No orders found
        </div>
      </div>
    );
  }
  return <div>No orders found</div>;
}
