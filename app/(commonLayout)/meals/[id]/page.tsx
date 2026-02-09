import { env } from "@/env";
import React from "react";

export default async function SingleMeals({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await fetch(`${env.BACKEND_URL}/meals/${id}`)

  const {data:meal} = await res.json()
  console.log(meal)
  
  return <div className="max-w-8/12 mx-auto my-10">
    
  </div>;
}
