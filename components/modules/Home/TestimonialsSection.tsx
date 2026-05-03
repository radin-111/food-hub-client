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
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 flex justify-center pointer-events-none">
        <div className="w-[700px] h-[500px] bg-gradient-to-br from-yellow-300/20 via-orange-300/15 to-transparent blur-3xl rounded-full animate-pulse" />
      </div>
      
      <div className="relative container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-extrabold gradient-text animate-fade-in-up">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
            Real reviews from satisfied customers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <Card
              key={review.id}
              className="rounded-3xl border border-orange-100/50 bg-white/60 backdrop-blur-xl shadow-md hover:shadow-2xl hover-lift animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardContent className="p-6 space-y-4">
                <div className="flex mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 transition-all duration-300 ${
                        i < review.rating
                          ? "fill-yellow-400 text-yellow-400 drop-shadow-sm"
                          : "text-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>

                <p className="text-muted-foreground text-sm md:text-base leading-relaxed italic">
                  "{review.comment}"
                </p>

                <div className="pt-4 border-t border-muted/50 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white font-semibold text-sm">
                      {review.user.name.charAt(0)}
                    </div>
                    <div>
                      <span className="font-medium text-sm">{review.user.name}</span>
                      <div className="text-xs text-muted-foreground">
                        Verified Customer
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">
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
