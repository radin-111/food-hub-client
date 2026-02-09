import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { env } from "@/env";
import {
  ChevronRight,
  Store,
  Star,
  ShoppingCart,
  Zap,
  Clock,
  ShieldCheck,
  Utensils,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function SingleMeals({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await fetch(`${env.BACKEND_URL}/meals/${id}`, {
    cache: "no-store",
  });

  const { data: meal } = await res.json();

  // ⭐ Average rating logic (ONLY ADDITION)
  const averageRating =
    meal.reviews.length > 0
      ? meal.reviews.reduce(
          (sum: number, r: { rating: number }) => sum + r.rating,
          0,
        ) / meal.reviews.length
      : 0;

  return (
    <div className="min-h-screen bg-[#fafafa] py-8 sm:py-12 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Card className="overflow-hidden rounded-[2.5rem] border-none shadow-[0_40px_80px_-15px_rgba(0,0,0,0.08)] ring-1 ring-slate-100">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* IMAGE */}
            <div className="relative min-h-[280px] sm:min-h-[380px] lg:min-h-[450px] lg:col-span-7 lg:h-[720px]">
              <Image
                src={meal.image}
                alt={meal.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover transition-transform duration-1000 hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-tr from-orange-950/30 via-transparent to-transparent" />

              <div className="absolute left-4 top-4 sm:left-8 sm:top-8 flex flex-col gap-2 sm:gap-3">
                <Badge className="w-fit bg-white/95 px-4 sm:px-5 py-2 text-xs font-bold uppercase tracking-widest text-orange-600 shadow-xl backdrop-blur-md">
                  {meal.category.cuisineType}
                </Badge>

                <div className="flex items-center gap-2 rounded-full bg-orange-600 px-3 sm:px-4 py-1.5 text-white shadow-lg">
                  <Clock size={14} className="animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-tighter">
                    Freshly Prepared
                  </span>
                </div>
              </div>
            </div>

            {/* CONTENT */}
            <div className="flex flex-col bg-white lg:col-span-5">
              <CardHeader className="p-6 sm:p-8 lg:p-14 pb-6 sm:pb-8">
                <div className="mb-4 flex items-center justify-between">
                  {/* ⭐ STARS WITH AVERAGE */}
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => {
                      const filled = i < Math.round(averageRating);
                      return (
                        <Star
                          key={i}
                          size={16}
                          className={
                            filled ? "text-orange-500" : "text-slate-300"
                          }
                          fill={filled ? "currentColor" : "none"}
                        />
                      );
                    })}

                    <span className="ml-2 text-sm font-bold text-slate-400">
                      {averageRating.toFixed(1)} ({meal.reviews.length})
                    </span>
                  </div>

                  <Utensils size={20} className="text-slate-200" />
                </div>

                <CardTitle className="text-3xl sm:text-4xl lg:text-6xl font-black tracking-tight text-slate-900 leading-tight">
                  {meal.name}
                </CardTitle>

                <p className="mt-6 sm:mt-8 text-base sm:text-lg leading-relaxed text-slate-500 font-medium">
                  {meal.description}
                </p>
              </CardHeader>

              <CardContent className="px-6 sm:px-8 lg:px-14 space-y-8 sm:space-y-10">
                {/* PRICE */}
                <div className="flex flex-wrap items-end gap-2 sm:gap-3">
                  <span className="text-4xl sm:text-5xl font-black tracking-tighter text-slate-900">
                    ${meal.price}
                  </span>
                  <span className="mb-1 text-lg sm:text-xl font-bold text-slate-300 line-through decoration-orange-500/40">
                    ${meal.price + 5}
                  </span>
                </div>

                {/* PROVIDER */}
                <div className="group flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-0 justify-between rounded-3xl border border-slate-100 bg-slate-50/50 p-5 transition-all hover:bg-orange-50/50 hover:border-orange-100">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 text-white shadow-lg shadow-orange-200">
                      <Store size={26} />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <p className="font-bold text-slate-900">
                          {meal.provider.restaurantName}
                        </p>
                        <ShieldCheck size={14} className="text-blue-500" />
                      </div>
                      <p className="mt-1 text-xs font-bold uppercase tracking-widest text-slate-400">
                        ID: {meal.provider.id.slice(0, 8)}...
                      </p>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-full group-hover:bg-white group-hover:shadow-sm"
                    asChild
                  >
                    <Link
                      href={`/providers/${meal.provider.id}`}
                      className="flex items-center gap-1 font-bold text-orange-600"
                    >
                      Profile <ChevronRight size={16} />
                    </Link>
                  </Button>
                </div>
              </CardContent>

              <CardFooter className="mt-auto flex-col gap-6 p-6 sm:p-8 lg:p-14 pt-0">
                <div className="flex w-full flex-col gap-4 sm:flex-row">
                  <Button className="h-14 sm:h-16 flex-[1.5] rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-base sm:text-lg font-bold text-white shadow-xl shadow-orange-500/20 transition-all hover:scale-[1.02] hover:shadow-orange-500/30">
                    <ShoppingCart className="mr-3 h-5 w-5" />
                    Add to Cart
                  </Button>

                  <Button
                    variant="outline"
                    className="h-14 sm:h-16 flex-1 rounded-2xl border-2 border-slate-100 text-base sm:text-lg font-bold text-slate-800 transition-all hover:bg-slate-50"
                  >
                    <Zap className="mr-2 h-5 w-5 fill-orange-500 text-orange-500" />
                    Fast Buy
                  </Button>
                </div>

                <p className="text-center text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-slate-300">
                  Secure Checkout • No Hidden Fees
                </p>
              </CardFooter>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
