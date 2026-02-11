"use server";

import { orderService } from "@/Services/order.service";
import { revalidatePath } from "next/cache";

export const createOrder = async (orderData: any) => {
  const data = await orderService.createOrder(orderData);
  revalidatePath("/customer-dashboard/cart");
  revalidatePath("/customer-dashboard/orders");
  return data;
};