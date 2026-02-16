"use server";

import { reviewServices } from "@/Services/review.service";
import { revalidatePath } from "next/cache";

export async function submitReview(payload: {
  orderId: string;
  mealId: string;
  rating: number;
  comment: string;
}) {
  const data = await reviewServices.submitReview(payload);
  revalidatePath("/customer-dashboard/orders");
  return data;
}
