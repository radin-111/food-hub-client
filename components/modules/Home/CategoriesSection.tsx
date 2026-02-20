import { Card, CardContent } from "@/components/ui/card";

interface Category {
  id: string;
  cuisineType: string;
}

export default function CategoriesSection({
  categories,
}: {
  categories: Category[];
}) {
  return (
    <section className="container mx-auto px-4 py-20">
      <div className="text-center mb-14">
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
          Explore Cuisines
        </h2>
        <p className="text-muted-foreground mt-3 text-lg">
          Discover meals from around the world
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {categories.map((category) => (
          <Card
            key={category.id}
            className="group cursor-pointer rounded-3xl border border-orange-100 bg-white/80 backdrop-blur-xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
          >
            <CardContent className="flex items-center justify-center py-10 px-4 text-center">
              <div>
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 font-bold text-lg group-hover:bg-orange-500 group-hover:text-white transition">
                  {category.cuisineType.charAt(0)}
                </div>

                <p className="font-semibold text-sm md:text-base">
                  {category.cuisineType}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
