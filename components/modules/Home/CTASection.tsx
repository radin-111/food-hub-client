"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function CTASection() {
  const router = useRouter();

  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[500px] h-[300px] bg-gradient-to-br from-orange-300/30 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-0 right-1/2 transform translate-x-1/2 w-[500px] h-[300px] bg-gradient-to-br from-red-300/30 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse animation-delay-1000" />

      <div className="relative container mx-auto px-4">
        <Card className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-br from-white/70 to-white/40 backdrop-blur-xl shadow-2xl hover-lift border border-orange-100/50 animate-fade-in-up">
          <CardContent className="py-20 px-8 text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-6xl font-extrabold gradient-text leading-tight">
                Hungry? Order Your
                <span className="block">Favorite Meal Now!</span>
              </h2>
              <div className="flex justify-center gap-4 text-sm">
                <span className="flex items-center gap-1 text-orange-500">
                  <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
                  Open 24/7
                </span>
                <span className="flex items-center gap-1 text-green-500">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Fast Delivery
                </span>
                <span className="flex items-center gap-1 text-blue-500">
                  <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                  Best Prices
                </span>
              </div>
            </div>

            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Fresh, delicious meals delivered fast to your doorstep. Don't wait!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-full px-12 py-4 text-lg font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-all"
                onClick={() => router.push("/meals")}
              >
                Browse Menu
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-12 py-4 text-lg font-semibold border-2 hover:bg-orange-50 hover:border-orange-300 transition-all"
                onClick={() => router.push("/be-a-provider")}
              >
                Become a Provider
              </Button>
            </div>

            <div className="text-sm text-muted-foreground">
              Join <span className="font-semibold text-orange-500">10,000+</span> happy customers
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
