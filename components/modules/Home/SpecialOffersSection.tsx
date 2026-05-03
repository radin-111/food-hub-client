"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function SpecialOffersSection() {
  const router = useRouter();

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 flex justify-center pointer-events-none">
        <div className="w-[600px] h-[350px] bg-gradient-to-br from-orange-400/30 via-red-400/20 to-transparent blur-3xl rounded-full animate-pulse" />
      </div>

      <div className="relative container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold gradient-text animate-fade-in-up">
            Special Offers
          </h2>
          <p className="text-muted-foreground mt-4 text-lg animate-fade-in-up animation-delay-200">
            Delicious deals crafted just for you
          </p>
        </div>

        <Card className="relative rounded-3xl border border-orange-100/50 bg-gradient-to-br from-white/60 to-white/40 backdrop-blur-xl shadow-2xl hover-lift animate-fade-in-up animation-delay-400">
          <div className="absolute -top-4 right-6 animate-bounce">
            <Badge className="px-4 py-2 text-sm bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full shadow-lg hover:scale-105 transition-transform">
              🔥 Limited Time
            </Badge>
          </div>

          <CardContent className="py-20 px-6 md:px-16 text-center space-y-8">
            <div className="space-y-4">
              <h3 className="text-3xl md:text-4xl font-bold leading-tight">
                Get <span className="gradient-text">20% OFF</span> on All Food
                Items
              </h3>
              <div className="flex justify-center gap-2 text-sm text-muted-foreground">
                <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full font-medium">Today Only</span>
                <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full font-medium">Free Delivery</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full font-medium">No Minimum</span>
              </div>
            </div>

            <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
              Enjoy premium quality meals at a discounted price. Fresh
              ingredients, fast delivery, and unforgettable taste — only for a
              limited time.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={() => router.push("/meals")}
                size="lg"
                className="rounded-full px-10 text-lg bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold shadow-lg hover:scale-105 transition-all hover:shadow-xl"
              >
                Browse Meals
              </Button>
              <div className="text-sm text-muted-foreground">
                Code: <span className="font-mono bg-orange-100 text-orange-600 px-2 py-1 rounded">FOOD20</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
