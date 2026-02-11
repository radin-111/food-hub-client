import ProviderOrdersTable from "@/components/modules/Orders/ProviderOrders";
import Pagination2 from "@/components/ui/pagination2";
import { env } from "@/env";
import { cookies } from "next/headers";
import React from "react";

export default async function ProviderOrders({
  searchParams,
}: {
  searchParams: {
    page: string;
  };
}) {
  const { page } = await searchParams;
  const cookieStore = await cookies();
  const res = await fetch(
    `${env.BACKEND_URL}/orders/provider-orders?page=${page}`,
    {
      cache: "no-store",
      headers: {
        Cookie: cookieStore.toString(),
        Origin: env.FRONTEND_URL,
      },
      credentials: "include",
    },
  );

  const { data } = await res.json();
if(data.result.length === 0) {
    return (
      <div>
        <p className="text-center text-2xl font-semibold text-muted-foreground">
          No orders found
        </p>
      </div>
    );
  }
  return (
    <div>
      <ProviderOrdersTable orders={data.result} />
      <Pagination2 totalPages={data.totalPages} />
    </div>
  );
}
