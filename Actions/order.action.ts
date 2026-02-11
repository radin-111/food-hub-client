"use server";

import { orderService, OrderStatus } from "@/Services/order.service";
import { revalidatePath } from "next/cache";

export const createOrder = async (orderData: any) => {
  const data = await orderService.createOrder(orderData);
  revalidatePath("/customer-dashboard/cart");
  revalidatePath("/customer-dashboard/orders");
  return data;
};

export const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
  const data = await orderService.updateOrderStatus(orderId, status);
  revalidatePath("/provider-dashboard/orders");
  revalidatePath("/customer-dashboard/orders");
  return data;
};