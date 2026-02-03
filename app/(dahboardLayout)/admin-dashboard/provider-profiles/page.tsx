import AllProviders from "@/components/modules/Provider/AllProviders";
import Pagination2 from "@/components/ui/pagination2";
import { env } from "@/env";
import { cookies } from "next/headers";
import React from "react";
const backendUrl = env.BACKEND_URL;
export default async function ProviderProfiles({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const { page } = await searchParams;
  const cookieStore: any = await cookies();
  const res = await fetch(`${backendUrl}/provider?page=${page}`, {
    cache: "no-store",
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  const { data } = await res.json();
  console.log(data);
  return (
    <div>
      <AllProviders data={data.result} />
      {/* <Pagination2 totalPages={Number(result.totalPages)}/> */}
    </div>
  );
}
