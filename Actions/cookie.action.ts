"use server";

import { cookies } from "next/headers";

export async function getCookie() {
  const cookieStore = await cookies();
  const cookie = (await cookieStore.toString()) || "";
  return cookie;
}
