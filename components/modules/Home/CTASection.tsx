"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function CTASection() {
  const router = useRouter();

  return (
    <section className="relative py-32 overflow-hidden">
   
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[500px] h-[300px] bg-orange-300/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/2 transform translate-x-1/2 w-[500px] h-[300px] bg-red-300/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative container mx-auto px-4">
        <Card className="max-w-3xl mx-auto rounded-3xl bg-white/80 backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-300 border border-orange-100">
          <CardContent className="py-16 px-8 text-center space-y-6">
            <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Hungry? Order Your Favorite Meal Now!
            </h2>

            <p className="text-muted-foreground text-lg md:text-xl">
              Fresh, delicious meals delivered fast to your doorstep. Don’t
              wait!
            </p>

            <Button
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full px-10 py-4 shadow-lg hover:scale-105 hover:shadow-xl transition-transform"
              onClick={() => router.push("/meals")}
            >
              Browse Menu
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
