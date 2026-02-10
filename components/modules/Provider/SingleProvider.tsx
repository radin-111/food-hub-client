"use client";
import Image from "next/image";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
type Provider = {
  id: string;
  restaurantName: string;
  isActive: "ACTIVE" | "INACTIVE";

  phoneNumber: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;

  description: string;

  user: Object;

  meals: Object[];
  reviews: Object[];
};
export default function SingleProvider({ data }: { data: any }) {
  return (
    <div className="container mx-auto px-4 py-8 space-y-10">
      {/* ================= Provider Header ================= */}
      <Card>
        <CardContent className="p-6 flex flex-col md:flex-row gap-6">
          <Avatar className="h-20 w-20">
            <AvatarImage src={data.user?.image} />
            <AvatarFallback>
              {data.restaurantName?.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl font-bold">{data.restaurantName}</h1>
              <Badge
                variant={data.isActive === "ACTIVE" ? "default" : "destructive"}
              >
                {data.isActive}
              </Badge>
            </div>

            <p className="text-muted-foreground">{data.description}</p>

            <div className="text-sm text-muted-foreground space-y-1">
              <p>
                📍 {data.address}, {data.city}, {data.country}
              </p>
              <p>📮 Postal Code: {data.postalCode}</p>
              <p>📞 Phone: {data.phoneNumber}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ================= Meals Section ================= */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Meals</h2>
          <Badge variant="secondary">{data.meals.length} items</Badge>
        </div>

        <Separator />

        {data.meals.length === 0 ? (
          <p className="text-muted-foreground">No meals added yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.meals.map((meal: any) => (
              <Link key={meal.id} href={`/meals/${meal.id}`} className="group">
                <Card className="h-full overflow-hidden hover:shadow-lg transition">
                  <div className="relative h-48 w-full">
                    <Image
                      src={meal.image}
                      alt={meal.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>

                  <CardHeader>
                    <CardTitle className="line-clamp-1">{meal.name}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {meal.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="flex items-center justify-between">
                    <span className="font-semibold text-primary">
                      ৳ {meal.price}
                    </span>
                    <Badge variant="outline">View</Badge>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* ================= Reviews Section ================= */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Reviews</h2>
        <Separator />

        {data.reviews.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center text-muted-foreground">
              No reviews yet. Be the first to review this restaurant ⭐
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.reviews.map((review: any) => (
              <Card key={review.id}>
                <CardHeader>
                  <CardTitle>{review.user?.name}</CardTitle>
                  <CardDescription>⭐ {review.rating}/5</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{review.comment}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
