import { AddMealsForm } from "@/components/modules/Provider/AddMealsForm";
import MealsTable from "@/components/modules/Provider/MealsTable";
import Pagination2 from "@/components/ui/pagination2";

import { env } from "@/env";
import { mealServices } from "@/Services/meals.service";
import { cookies } from "next/headers";

const backendUrl = env.BACKEND_URL;
export default async function MealsPage({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const { page } = await searchParams;
  const cookieStore = await cookies();
  
  const { data: categories } = await mealServices.getAllCategories();
  const mealsRes = await fetch(`${backendUrl}/meals/myMeals?page=${page}`, {
    cache: "no-store",
    headers: {
      Cookie: cookieStore.toString(),
    },
    credentials: "include",
  });
  const { data: mealsData } = await mealsRes.json();
  
  return (
    <div>
      <AddMealsForm categories={categories} />
      <MealsTable meals={mealsData.result} />
      <Pagination2 totalPages={Number(mealsData.totalPages)} />
    </div>
  );
}
