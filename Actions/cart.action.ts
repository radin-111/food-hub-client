"use server";

import { cartServices } from "@/Services/cart.service";
import { revalidatePath } from "next/cache";

export const clearCart = async () => {
  const data = await cartServices.clearCart();

  revalidatePath("/customer-dashboard/cart");
  return data;
};

export const removeItem = async (id: string) => {
  const data = await cartServices.removeItem(id);

  revalidatePath("/customer-dashboard/cart");
  return data;
};