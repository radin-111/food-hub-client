import { env } from "@/env";
import { cookies } from "next/headers";

const backendUrl =env.BACKEND_URL;
const frontendUrl = env.FRONTEND_URL;
export const orderService = {
  createOrder: async (orderData: any) => {
    const cookieStore = await cookies();
    const res = await fetch(`${backendUrl}/orders/create-order`, {
      method: "POST",
      headers: {
        Cookie: cookieStore.toString(),
        "Origin": frontendUrl,
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(orderData),
    });
    const data = await res.json();
    return data;
  },
  
};