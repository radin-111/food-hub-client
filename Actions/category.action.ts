"use server";

import { categoriesService } from "@/Services/category.service";
import { updateTag } from "next/cache";

export const updateCategories = async (value: any) => {
  const success = await categoriesService.updateCategories(value);

  updateTag("categories");
  return success;
};

export const addCategories = async (value: any) => {
  const success = await categoriesService.createCategories(value);

  updateTag("categories");
  return success;
};
