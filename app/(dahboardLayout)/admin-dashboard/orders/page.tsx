import OrdersTable from "@/components/modules/Orders/OrdersTable";
import Pagination2 from "@/components/ui/pagination2";
import { env } from "@/env";
import { cookies } from "next/headers";
import React from "react";

export default async function AllOrders({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const cookieStore = await cookies();
  const { page } = await searchParams;
  const res = await fetch(
    `${env.BACKEND_URL}/orders/get-all-orders?page=${page}`,
    {
      cache: "no-store",
      headers: {
        Cookie: cookieStore.toString(),
      },
      credentials: "include",
    },
  );
  const { data } = await res.json();
  if (data.result.length === 0) {
    return (
      <div className="text-center text-2xl font-bold text-gray-500">
        No orders found
      </div>
      
    );
  }
  return (
    <div>
      <OrdersTable data={data.result} />
      <Pagination2 totalPages={data.totalPages} />
    </div>
  );
}
