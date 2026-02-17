import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function FeaturedMealsSection({ meals }: { meals: any[] }) {
  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-10">
        Recently added Meals
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {meals.map((meal) => (
          <Card
            key={meal.id}
            className="group flex flex-col rounded-3xl overflow-hidden border border-orange-100 bg-white/80 backdrop-blur-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
          >
            <div className="relative h-56 w-full overflow-hidden">
              <Image
                src={meal.image}
                alt={meal.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition" />
            </div>

            <CardContent className="flex flex-col flex-1 p-6 space-y-3">
              <h3 className="text-xl font-semibold leading-tight">
                {meal.name}
              </h3>

              <p className="text-muted-foreground text-sm line-clamp-2">
                {meal.description}
              </p>

              <div className="flex-1" />

              <div className="flex items-center justify-between pt-4 border-t border-muted">
                <span className="text-xl font-bold text-orange-500">
                  ${meal.price}
                </span>

                <Button
                  size="sm"
                  className="rounded-full px-5 hover:scale-105 transition-transform"
                >
                  Order
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
