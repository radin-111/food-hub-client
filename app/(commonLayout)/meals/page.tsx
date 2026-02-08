import MealsCard from "@/components/modules/Meals/MealsCard";
import MealsSearchBar from "@/components/modules/Meals/MealsSearchBar";
import { Input } from "@/components/ui/input";
import Pagination2 from "@/components/ui/pagination2";
import { env } from "@/env";
import { mealServices } from "@/Services/meals.service";
import Link from "next/link";
import React from "react";
import { Button } from "react-day-picker";

const backendUrl = env.BACKEND_URL;
export default async function Meals({
  searchParams,
}: {
  searchParams: { page: string; search?: string };
}) {
  const { page } = await searchParams;

  let { search } = await searchParams;
  let searchText = search || "";
  const { data: meals } = await mealServices.getMeals(page, searchText);
  const { data: categories } = await mealServices.getAllCategories();

  return (
    <div className="max-w-8/12 mx-auto my-10">
     <MealsSearchBar categories={categories} />

      <MealsCard meals={meals?.result} />
      <Pagination2 totalPages={meals?.totalPages} />
    </div>
  );
}
