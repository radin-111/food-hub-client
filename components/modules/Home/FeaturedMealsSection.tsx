"use client";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function FeaturedMealsSection({ meals }: { meals: any[] }) {
  const router = useRouter();
  return (
    <section className="container mx-auto px-4 py-20">
      <div className="text-center mb-14">
        <h2 className="text-4xl font-extrabold gradient-text animate-fade-in-up">
          Recently Added Meals
        </h2>
        <p className="text-muted-foreground mt-3 text-lg animate-fade-in-up animation-delay-200">
          Fresh from our kitchen to your table
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {meals.map((meal, index) => (
          <Card
            key={meal.id}
            onClick={() => router.push(`/meals/${meal.id}`)}
            className="group flex flex-col rounded-3xl overflow-hidden border border-orange-100/50 bg-white/60 backdrop-blur-xl shadow-md hover:shadow-2xl hover-lift cursor-pointer animate-fade-in-up"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <div className="relative h-56 w-full overflow-hidden">
              <Image
                src={meal.image}
                alt={meal.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="absolute top-4 right-4">
                <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                  New
                </div>
              </div>
            </div>

            <CardContent className="flex flex-col flex-1 p-6 space-y-3">
              <h3 className="text-xl font-bold leading-tight group-hover:text-orange-600 transition-colors">
                {meal.name}
              </h3>

              <p className="text-muted-foreground text-sm line-clamp-2">
                {meal.description}
              </p>

              <div className="flex-1" />

              <div className="flex items-center justify-between pt-4 border-t border-muted/50">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-orange-500">
                    ${meal.price}
                  </span>
                  <span className="text-xs text-muted-foreground line-through">
                    ${(parseFloat(meal.price) * 1.2).toFixed(2)}
                  </span>
                </div>

                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/meals/${meal.id}`);
                  }}
                  size="sm"
                  className="rounded-full px-6 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold transition-all hover:scale-105 hover:shadow-lg"
                >
                  Order Now
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
