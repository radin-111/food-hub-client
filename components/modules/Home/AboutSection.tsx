import { Card, CardContent } from "@/components/ui/card";
import { ChefHat, Leaf, Truck } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="relative py-24">
      <div className="absolute inset-0 flex justify-center pointer-events-none">
        <div className="w-[500px] h-[300px] bg-orange-300/20 blur-3xl rounded-full" />
      </div>

      <div className="relative container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            About Us
          </h2>
          <p className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto">
            Passion, quality, and taste — crafted into every meal we serve.
          </p>
        </div>

        <Card className="rounded-3xl border border-orange-100 bg-white/80 backdrop-blur-xl shadow-xl">
          <CardContent className="py-16 px-6 md:px-16 text-center space-y-10">
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We serve fresh, high-quality meals made with love and passion. Our
              professional chefs use carefully selected ingredients to create
              unforgettable dining experiences — whether you're ordering from
              home or visiting us.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
              <div className="flex flex-col items-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center text-orange-500">
                  <ChefHat className="w-6 h-6" />
                </div>
                <h4 className="font-semibold">Expert Chefs</h4>
                <p className="text-sm text-muted-foreground text-center">
                  Skilled professionals crafting every dish to perfection.
                </p>
              </div>

              <div className="flex flex-col items-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center text-orange-500">
                  <Leaf className="w-6 h-6" />
                </div>
                <h4 className="font-semibold">Fresh Ingredients</h4>
                <p className="text-sm text-muted-foreground text-center">
                  We use only high-quality, fresh, and locally sourced items.
                </p>
              </div>

              <div className="flex flex-col items-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center text-orange-500">
                  <Truck className="w-6 h-6" />
                </div>
                <h4 className="font-semibold">Fast Delivery</h4>
                <p className="text-sm text-muted-foreground text-center">
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
