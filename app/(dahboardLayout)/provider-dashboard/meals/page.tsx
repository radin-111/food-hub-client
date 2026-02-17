import { AddMealsForm } from "@/components/modules/Provider/AddMealsForm";
import MealsTable from "@/components/modules/Provider/MealsTable";
import Pagination2 from "@/components/ui/pagination2";
import { env } from "@/env";
import { mealServices } from "@/Services/meals.service";
import { cookies } from "next/headers";

export default async function MealsPage({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const { page } = await searchParams;
  const cookieStore = await cookies();
 
  const [mealsRes, categoriesRes] = await Promise.all([
    fetch(`${env.BACKEND_URL}/meals/myMeals?page=${page}`, {
      cache: "no-store",
      headers: {
        Cookie: cookieStore.toString(),
        Origin: env.FRONTEND_URL,
      },
      credentials: "include",
    }),
    mealServices.getAllCategories(),
  ]);

  const [{ data: mealsData }, { data: categories }] = await Promise.all([
    mealsRes.json(),
    Promise.resolve(categoriesRes),
  ]);

  return (
    <div>
      <AddMealsForm categories={categories} />
      <MealsTable meals={mealsData.result} categories={categories} />
      <Pagination2 totalPages={Number(mealsData.totalPages)} />
    </div>
  );
}
