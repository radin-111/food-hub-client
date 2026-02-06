"use server";

import { categoriesService } from "@/Services/category.service";
import { revalidatePath } from "next/cache";

export const updateCategories = async (value: any) => {
  const success = await categoriesService.updateCategories(value);

  revalidatePath("/admin-dashboard/categories");
  return success;
};

export const addCategories = async (value: any) => {
  const success = await categoriesService.createCategories(value);

  revalidatePath("/admin-dashboard/categories");
  return success;
};
