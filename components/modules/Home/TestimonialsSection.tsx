"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface User {
  name: string;
}

interface Review {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  user: User;
}

export default function TestimonialsSection({
  reviews,
}: {
  reviews: Review[];
}) {
 
  return (
    <section className="relative py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            What Our Customers Say
          </h2>
          <br />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <Card
              key={review.id}
              className="rounded-3xl border border-orange-100 bg-white/80 backdrop-blur-xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              <CardContent className="p-6 space-y-4">
                <div className="flex mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-muted"
                      }`}
                    />
                  ))}
                </div>

                <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                  “{review.comment}”
                </p>

                <div className="pt-4 border-t border-muted flex justify-between items-center text-xs text-muted-foreground">
                  <span className="font-medium">{review.user.name}</span>
                  <span>
                    {new Date(review.createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
