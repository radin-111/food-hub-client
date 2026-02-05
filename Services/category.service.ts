import { env } from "@/env";
import { cookies } from "next/headers";

const backendUrl = env.BACKEND_URL;

export const categoriesService = {
  createCategories: async (value: any) => {
    const cookieStore = await cookies();
    const res = await fetch(`${backendUrl}/meals/categories`, {
      method: "POST",
      headers: {
        Cookie: cookieStore.toString(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cuisineType: value.name }),
    });
    const data = await res.json();
    return data;
  },
  updateCategories: async (value: any) => {
    const cookieStore = await cookies();
    const res = await fetch(`${backendUrl}/meals/categories/${value.id}`, {
      method: "PATCH",
      headers: {
        Cookie: cookieStore.toString(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cuisineType: value.cuisineType }),
    });
    const { success } = await res.json();
    return success;
  },
};
