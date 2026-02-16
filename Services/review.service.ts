import { env } from "@/env";
import { cookies } from "next/headers";

const backendUrl = env.BACKEND_URL;
export const reviewServices = {
  submitReview: async (payload: {
    orderId: string;
    mealId: string;
    rating: number;
    comment: string;
  }) => {
    const cookieStore =await cookies();
    const res = await fetch(`${backendUrl}/reviews/submit-review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    return data;
  },
};
