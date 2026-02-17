import MealsCard from "@/components/modules/Meals/MealsCard";

import Pagination2 from "@/components/ui/pagination2";

import { mealServices } from "@/Services/meals.service";

export default async function Meals({
  searchParams,
}: {
  searchParams: { page: string; search?: string };
}) {
  const { page } = await searchParams;

  let { search } = await searchParams;
  let searchText = search || "";
  const { data: meals } = await mealServices.getMeals(page, searchText);

  return (
    <div className="bg-gradient-to-br from-orange-50 via-white to-red-50">
     <div className="max-w-8/12 mx-auto py-10">
      <MealsCard meals={meals?.result} />
      <Pagination2 totalPages={meals?.totalPages} />
    </div></div>
   
  );
}
