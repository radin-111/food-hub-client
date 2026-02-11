import { env } from "@/env";
import { cookies } from "next/headers";

const backendUrl = env.BACKEND_URL;
const frontendUrl = env.FRONTEND_URL;
export const cartServices = {
  clearCart: async () => {
    const cookieStore = await cookies();
    const res = await fetch(`${backendUrl}/cart/clear-cart`, {
      method: "DELETE",
      headers: {
        Origin: frontendUrl,
        Cookie: cookieStore.toString(),
      },
    });
    const data = await res.json();
    return data;
  },
  removeItem: async (id: string) => {
    const cookieStore = await cookies();
    const res = await fetch(`${backendUrl}/cart/remove-from-cart/${id}`, {
      method: "DELETE",
      headers: {
        Origin: frontendUrl,
        Cookie: cookieStore.toString(),
      },
    });
    const data = await res.json();
    return data;
  }
};
