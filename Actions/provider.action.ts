"use server";

import { providerServices } from "@/Services/provider.service";
import { userService } from "@/Services/user.service";
import { revalidatePath } from "next/cache";

export async function acceptProvider(id: string) {
  const data = await providerServices.acceptProvider(id);
  revalidatePath("/admin-dashboard/provider-requests");
  revalidatePath("/admin-dashboard/provider-profiles");
  return data;
}
export async function rejectProvider(id: string) {
  const data = await providerServices.rejectProvider(id);
  revalidatePath("/admin-dashboard/provider-requests");
  revalidatePath("/admin-dashboard/provider-profiles");
  return data;
}
export async function uploadImage(image: File) {
  const data = await userService.uploadImage(image);
 
  return data;
}
export const updateMeal = async (id: string, formData: FormData) => {
  const data = await providerServices.updateMeal(id, formData);
  revalidatePath("/provider-dashboard/meals");
  return data;
}
export const deleteMeal = async (id: string) => {
  const data = await providerServices.deleteMeal(id);
  revalidatePath("/provider-dashboard/meals");
  return data;
}
export const addMeal = async (value:any,imageRes:any) => {
  const data = await providerServices.addMeal(value,imageRes);
  revalidatePath("/provider-dashboard/meals");
  return data;
}