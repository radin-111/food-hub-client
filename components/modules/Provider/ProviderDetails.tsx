"use client";

import { Phone, MapPin } from "lucide-react";
import Link from "next/link";
type Meal = {
  id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
};

type Provider = {
  id: string;
  restaurantName: string;
  description: string;
  phoneNumber: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  isActive: string;
  user: {
    image: string;
  };
  meals: Meal[] | [];
};

type Props = {
  provider: Provider;
};

export default function ProviderDetails({ provider }: Props) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-b pb-6">
        {/* Restaurant Info */}
        <div className="flex items-center gap-4">
          <img
            src={provider.user.image}
            alt="Owner"
            className="h-16 w-16 rounded-full object-cover border"
          />

          <div>
            <h1 className="text-2xl font-bold">{provider.restaurantName}</h1>
            <p className="text-gray-600 text-sm">{provider.description}</p>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-gray-500 mt-2">
              <span className="flex items-center gap-1">
                <Phone className="h-4 w-4" />
                {provider.phoneNumber}
              </span>

              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {provider.city}, {provider.country}
              </span>
            </div>
          </div>
        </div>

        {/* Status */}
        <div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              provider.isActive === "ACTIVE"
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            {provider.isActive}
          </span>
        </div>
      </div>

      {/* ================= MEALS ================= */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-6">Available Meals</h2>

        {provider.meals.length === 0 ? (
          <p className="text-gray-500">No meals available.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {provider.meals.map((meal) => (
              <div
                key={meal.id}
                className="rounded-xl border shadow-sm hover:shadow-md transition overflow-hidden bg-white"
              >
                <img
                  src={meal.image}
                  alt={meal.name}
                  className="h-48 w-full object-cover"
                />

                <div className="p-4 space-y-2">
                  <h3 className="font-semibold text-lg">{meal.name}</h3>

                  <p className="text-sm text-gray-600 line-clamp-2">
                    {meal.description}
                  </p>

                  <div className="flex items-center justify-between pt-2">
                    <span className="font-bold text-primary">
                      ৳ {meal.price}
                    </span>

                    <Link href={`/meals/${meal.id}`} className="px-3 py-1 text-sm bg-black text-white rounded-md hover:opacity-90 transition">
                      Order
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
