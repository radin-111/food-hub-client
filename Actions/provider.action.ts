"use server";

import { providerServices } from "@/Services/provider.service";
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
