import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { env } from "@/env";
import Link from "next/link";
import React from "react";

const backendUrl = env.BACKEND_URL;
export default async function Meals() {
  const res = await fetch(`${backendUrl}/meals`, {
    cache: "no-store",
  });

  const meals = await res.json();
  console.log(meals)
  return (
    <div className="max-w-8/12 mx-auto">
      {meals.data.map((meal: any) => (
        <Card key={meal.id} className="max-w-xs hover:shadow-lg transition-shadow duration-300">
          <img
            src={meal.image}
            alt={meal.name}
            className="h-48 w-full object-cover rounded-t-md"
          />
          <CardContent>
            <CardHeader>
              <CardTitle className="text-lg">{meal.name}</CardTitle>
              <CardDescription className="text-sm text-gray-500">
                {meal.cuisineType}
              </CardDescription>
            </CardHeader>
            <p className="mt-2 text-gray-700 line-clamp-2">
              {meal.description}
            </p>
            <p className="mt-2 font-semibold text-green-600">${meal.price}</p>
          </CardContent>
          <CardFooter>
            <Link href={`/meals/${meal._id}`} className="w-full">Add to Cart</Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
