import AllCategories from "@/components/modules/Admin/Categories";
import { env } from "@/env";
import { cookies } from "next/headers";
import React from "react";

const backendUrl = env.BACKEND_URL;
export default async function Categories() {
  const cookieStore = await cookies();
  const res = await fetch(`${backendUrl}/meals/categories`, {
    headers: {
      Cookie: cookieStore.toString(),
    },

    cache: "no-store",
  });
  const {data}  = await res.json();
  return (
    <div className="max-w-3xl">
      <AllCategories data={data} />
    </div>
  );
}
