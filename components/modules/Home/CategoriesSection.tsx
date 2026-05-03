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
        <h2 className="text-4xl font-extrabold gradient-text animate-fade-in-up">
          Explore Cuisines
        </h2>
        <p className="text-muted-foreground mt-3 text-lg animate-fade-in-up animation-delay-200">
          Discover meals from around the world
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {categories.map((category, index) => (
          <Card
            key={category.id}
            className="group cursor-pointer rounded-3xl border border-orange-100/50 bg-white/60 backdrop-blur-xl shadow-sm hover:shadow-2xl hover-lift animate-fade-in-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardContent className="flex items-center justify-center py-10 px-4 text-center">
              <div>
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  {category.cuisineType.charAt(0)}
                </div>

                <p className="font-semibold text-sm md:text-base group-hover:text-orange-600 transition-colors">
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
