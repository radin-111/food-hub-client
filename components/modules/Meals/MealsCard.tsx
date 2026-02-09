"use client";
import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function MealsCard({ meals }: { meals: Object[] }) {
  const router = useRouter();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {meals.map((meal: any) => (
        <Card onClick={() => router.push(`/meals/${meal.id}`)} key={meal.id} className="max-w-md pt-0 hover:cursor-pointer">
          <CardContent className="px-0">
            <Image
              src={meal.image}
              alt="Banner"
              width={500}
              height={300}
              className="aspect-video h-70 rounded-t-xl object-cover"
            />
          </CardContent>
          <CardHeader>
            <CardTitle className="text-center text-2xl">{meal.name}</CardTitle>
            <CardDescription className="text-center">
              {meal.description}
            </CardDescription>
          </CardHeader>
          <CardFooter className="text-center mb-10 flex gap-4 flex-col items-center">
            <h1 className="text-green-600 font-bold text-xl">${meal.price}</h1>
            <Link href={`/meals/${meal.id}`} className="w-full bg-orange-400 py-2 text-xl rounded-2xl text-white font-bold">View Recipe</Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
