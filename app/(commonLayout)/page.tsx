import AboutSection from "@/components/modules/Home/AboutSection";
import CategoriesSection from "@/components/modules/Home/CategoriesSection";
import CTASection from "@/components/modules/Home/CTASection";
import FeaturedMealsSection from "@/components/modules/Home/FeaturedMealsSection";
import SpecialOffersSection from "@/components/modules/Home/SpecialOffersSection";
import TestimonialsSection from "@/components/modules/Home/TestimonialsSection";
import Banner from "@/components/ui/banner";
import { env } from "@/env";
import { mealServices } from "@/Services/meals.service";

const backendUrl = env.BACKEND_URL;
export default async function Home() {
  const res = await fetch(`${backendUrl}/meals/some-meals`, {
    cache: "no-store",
  });
  const { data } = await res.json();
  const { data: categories } = await mealServices.getAllCategories();
  const reviewRes = await fetch(`${backendUrl}/reviews/recent-reviews`, {
    cache: "no-store",
  });
  const { data: reviews } = await reviewRes.json();
  return (
    <div className="">
      <Banner />
      <div className="bg-gradient-to-br from-orange-50 via-white to-red-50">
        <CategoriesSection categories={categories} />
        <FeaturedMealsSection meals={data} />
        <SpecialOffersSection />
        <AboutSection />
        <TestimonialsSection reviews={reviews} />
        <CTASection />
      </div>
    </div>
  );
}
