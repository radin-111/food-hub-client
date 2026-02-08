import { env } from "@/env";

const backendUrl = env.BACKEND_URL;
export const mealServices = {
  getMeals: async (page: string, search: string) => {
    const res = await fetch(`${backendUrl}/meals?page=${page}&search=${search}`, {
      cache: "no-store",
    });
    const data = await res.json();
    return data;
  },
  getAllCategories: async () => {
    const res = await fetch(`${backendUrl}/meals/categories`, {
      cache: "no-store",
    });
    const data = await res.json();
    return data;
  },
};