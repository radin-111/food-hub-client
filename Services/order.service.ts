import { env } from "@/env";
import { cookies } from "next/headers";
export type OrderStatus =
  | "PLACED"
  | "CONFIRMED"
  | "CANCELLED"
  | "DELIVERED"
  | "READY"
  | "PREPARING";
const backendUrl = env.BACKEND_URL;
const frontendUrl = env.FRONTEND_URL;
export const orderService = {
  createOrder: async (orderData: any) => {
    const cookieStore = await cookies();
    const res = await fetch(`${backendUrl}/orders/create-order`, {
      method: "POST",
      headers: {
        Cookie: cookieStore.toString(),
        Origin: frontendUrl,
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(orderData),
    });
    const data = await res.json();
    return data;
  },
  updateOrderStatus: async (orderId: string, status: OrderStatus) => {
    const cookieStore = await cookies();
    const res = await fetch(`${backendUrl}/orders/update-order-status/${orderId}`, {
      method: "PATCH",
      headers: {
        Cookie: cookieStore.toString(),
        Origin: frontendUrl,
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ status }),
    });
    const data = await res.json();
    return data;
  },
};
