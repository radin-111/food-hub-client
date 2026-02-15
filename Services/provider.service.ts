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

  updateMeal: async (id: string, updatedMeal: any) => {
    const cookieStore = await cookies();
    try {
      const res = await fetch(`${backendUrl}/meals/${id}`, {
        method: "PATCH",
        headers: {
          Cookie: cookieStore.toString(),
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(updatedMeal),
      });
      const data = await res.json();
      return data;
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },

  deleteMeal: async (id: string) => {
    const cookieStore = await cookies();
    try {
      const res = await fetch(`${backendUrl}/meals/${id}`, {
        method: "DELETE",
        headers: {
          Cookie: cookieStore.toString(),
        },
        credentials: "include",
      });
      const data = await res.json();
      return data;
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },
  addMeal: async (
    value: any,
    imageRes: any,
  ) => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${backendUrl}/meals`, {
        method: "POST",
        headers: {
          Cookie: cookieStore.toString(),
          "Content-Type": "application/json" },
        body: JSON.stringify({
          name: value.name,
          description: value.description,
          price: value.price,
          categoryId: value.categoryId,
          image: imageRes.data.url,
        }),
        credentials: "include",
      });
      const data = await res.json();
      return data;
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },
};
