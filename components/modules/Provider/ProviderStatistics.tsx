"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DollarSign,
  ShoppingCart,
  CheckCircle2,
  XCircle,
  Utensils,
  Star,
} from "lucide-react";

export default function ProviderStatistics({ data }: { data: any }) {
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);

  return (
    <div className="space-y-8 p-4 md:p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        <StatCard
          title="Total Revenue"
          value={formatCurrency(data.totalRevenue)}
          icon={<DollarSign />}
        />

        <StatCard
          title="Total Orders"
          value={data.totalOrders}
          icon={<ShoppingCart />}
        />

        <StatCard
          title="Completed"
          value={data.completedOrders}
          icon={<CheckCircle2 />}
        />

        <StatCard
          title="Cancelled"
          value={data.cancelledOrders}
          icon={<XCircle />}
        />

        <StatCard
          title="Total Meals"
          value={data.totalMeals}
          icon={<Utensils />}
        />

        <StatCard
          title="Avg Rating"
          value={data.averageRating.toFixed(1)}
          icon={<Star />}
        />
      </div>

      <Card className="shadow-sm ring-1 ring-slate-100">
        <CardHeader>
          <CardTitle className="m-2">Recent Orders</CardTitle>
          <CardDescription className="ml-2">
            Latest orders placed by customers
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {data.recentOrders.map((order: any) => (
              <div
                key={order.id}
                className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={order.meal.image}
                    alt={order.meal.name}
                    className="h-16 w-16 rounded-lg object-cover border"
                  />

                  <div className="space-y-1 min-w-0">
                    <h4 className="font-semibold text-sm md:text-base truncate">
                      {order.meal.name}
                    </h4>

                    <p className="text-xs text-slate-500">
                      Ordered by: {order.user.name}
                    </p>

                    <p className="text-xs text-slate-400">
                      Qty: {order.quantity}
                    </p>
                  </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="flex flex-col lg:items-end gap-2">
                  <Badge
                    className={`px-3 py-1 text-xs font-semibold ${
                      order.status === "CANCELLED"
                        ? "bg-rose-500/10 text-rose-600"
                        : order.status === "PREPARING"
                          ? "bg-amber-500/10 text-amber-600"
                          : order.status === "PLACED"
                            ? "bg-blue-500/10 text-blue-600"
                            : "bg-emerald-500/10 text-emerald-600"
                    }`}
                  >
                    {order.status}
                  </Badge>

                  <p className="font-bold text-sm md:text-base break-all">
                    {formatCurrency(order.totalPrice)}
                  </p>

                  <p className="text-xs text-slate-400">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({ title, value, icon }: any) {
  return (
    <Card className="shadow-sm ring-1 ring-slate-100">
      <CardContent className="p-4 flex items-center gap-4">
        <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
          {React.cloneElement(icon, { size: 20 })}
        </div>

        <div className="min-w-0">
          <p className="text-xs uppercase text-slate-500">{title}</p>
          <p className="text-lg md:text-xl font-bold break-words">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}
