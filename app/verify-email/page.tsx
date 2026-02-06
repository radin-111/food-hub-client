import RedirectUser from "@/components/ui/redirect";
import { env } from "@/env";
import React from "react";


const BACKEND_URL = env.BACKEND_URL;

export default async function VerifyEmail({
  searchParams,
}: {
  searchParams: { token: string };
}) {
  const { token } = await searchParams;

  const res = await fetch(`${BACKEND_URL}/users/verify-email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
    cache: "no-store",
  });

  const { data } = await res.json();

  return (
    <div className="">
      <RedirectUser status={data.status} />
    </div>
  )
}
