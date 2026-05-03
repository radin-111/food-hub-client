import { Card, CardContent } from "@/components/ui/card";
import { ChefHat, Leaf, Truck } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 flex justify-center pointer-events-none">
        <div className="w-[600px] h-[400px] bg-gradient-to-br from-orange-300/30 via-red-300/20 to-transparent blur-3xl rounded-full animate-pulse" />
      </div>

      <div className="relative container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold gradient-text animate-fade-in-up">
            About FoodHub
          </h2>
          <p className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
            Passion, quality, and taste — crafted into every meal we serve.
          </p>
        </div>

        <Card className="rounded-3xl border border-orange-100/50 bg-white/60 backdrop-blur-xl shadow-2xl hover-lift animate-fade-in-up animation-delay-400">
          <CardContent className="py-16 px-6 md:px-16 text-center space-y-10">
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We serve fresh, high-quality meals made with love and passion. Our
              professional chefs use carefully selected ingredients to create
              unforgettable dining experiences — whether you're ordering from
              home or visiting us.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
              <div className="flex flex-col items-center space-y-3 group">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <ChefHat className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-lg group-hover:text-orange-600 transition-colors">Expert Chefs</h4>
                <p className="text-sm text-muted-foreground text-center max-w-xs">
                  Skilled professionals crafting every dish to perfection.
                </p>
              </div>

              <div className="flex flex-col items-center space-y-3 group">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <Leaf className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-lg group-hover:text-green-600 transition-colors">Fresh Ingredients</h4>
                <p className="text-sm text-muted-foreground text-center max-w-xs">
                  We use only high-quality, fresh, and locally sourced items.
                </p>
              </div>

              <div className="flex flex-col items-center space-y-3 group">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <Truck className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-lg group-hover:text-blue-600 transition-colors">Fast Delivery</h4>
                <p className="text-sm text-muted-foreground text-center max-w-xs">
                  Quick and reliable service straight to your doorstep.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
