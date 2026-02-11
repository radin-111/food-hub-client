import SingleMealsCard from "@/components/modules/Meals/SingleMeals";
import { env } from "@/env";

export default async function SingleMeals({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await fetch(`${env.BACKEND_URL}/meals/${id}`, {
    cache: "no-store",
  });

  const { data: meal } = await res.json();

  
  const averageRating =
    meal.reviews.length > 0
      ? meal.reviews.reduce(
          (sum: number, r: { rating: number }) => sum + r.rating,
          0,
        ) / meal.reviews.length
      : 0; 

  return (
    <div className="min-h-screen bg-[#fafafa] py-8 sm:py-12 lg:py-20">
      <SingleMealsCard meal={meal} averageRating={averageRating} />
    </div>
  );
}
