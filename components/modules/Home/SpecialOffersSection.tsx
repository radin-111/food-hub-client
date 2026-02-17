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
        <div className="w-[600px] h-[350px] bg-orange-400/20 blur-3xl rounded-full" />
      </div>

      <div className="relative container mx-auto px-4">
     
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            Special Offers
          </h2>
          <p className="text-muted-foreground mt-4 text-lg">
            Delicious deals crafted just for you
          </p>
        </div>

 
        <Card className="relative rounded-3xl border border-orange-100 bg-white/80 backdrop-blur-xl shadow-2xl hover:shadow-orange-200/50 transition-all duration-300 hover:-translate-y-2">
         
          <div className="absolute -top-4 right-6">
            <Badge className="px-4 py-1 text-sm bg-orange-500 text-white rounded-full shadow-md">
              🔥 Limited Time
            </Badge>
          </div>

          <CardContent className="py-20 px-6 md:px-16 text-center space-y-8">
            <h3 className="text-3xl md:text-4xl font-bold leading-tight">
              Get <span className="text-orange-500">20% OFF</span> on All Food
              Items
            </h3>

            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Enjoy premium quality meals at a discounted price. Fresh
              ingredients, fast delivery, and unforgettable taste — only for a
              limited time.
            </p>

            <Button
              onClick={() => router.push("/meals")}
              size="lg"
              className="rounded-full px-10 text-lg shadow-lg hover:scale-105 transition-transform"
            >
              Browse Meals
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
