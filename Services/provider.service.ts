import { env } from "@/env";
import { cookies } from "next/headers";
const acceptBody = { isActive: "ACTIVE" };
const rejectBody = { isActive: "INACTIVE" };
const backendUrl = env.BACKEND_URL;
export const providerServices = {
  acceptProvider: async (id: string) => {
    const cookieStore = await cookies();
    const res = await fetch(`${backendUrl}/provider/requests/${id}`, {
      method: "PATCH",
      headers: {
        Cookie: cookieStore.toString(),
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(acceptBody),
    });
    const data = await res.json();
    return data;
  },
  rejectProvider: async (id: string) => {
    const cookieStore = await cookies();
    const res = await fetch(`${backendUrl}/provider/requests/${id}`, {
      method: "PATCH",
      headers: {
        Cookie: cookieStore.toString(),
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(rejectBody),
    });
    const data = await res.json();
    return data;
  },
};
