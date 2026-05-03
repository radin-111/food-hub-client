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
  TrendingUp,
  Clock,
  Award,
  Users,
} from "lucide-react";
import D3Chart, { DataPoint } from "@/components/ui/d3-chart";

export default function ProviderStatistics({ data }: { data: any }) {
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);

  // Sample data for charts
  const revenueData: DataPoint[] = [
    { name: "Mon", value: data.totalRevenue * 0.12 },
    { name: "Tue", value: data.totalRevenue * 0.15 },
    { name: "Wed", value: data.totalRevenue * 0.18 },
    { name: "Thu", value: data.totalRevenue * 0.22 },
    { name: "Fri", value: data.totalRevenue * 0.25 },
    { name: "Sat", value: data.totalRevenue * 0.08 },
  ];

  const mealPerformanceData: DataPoint[] = data.recentOrders?.reduce((acc: any, order: any) => {
    const existingMeal = acc.find((item: any) => item.name === order.meal.name);
    if (existingMeal) {
      existingMeal.value += order.quantity;
    } else {
      acc.push({ name: order.meal.name, value: order.quantity });
    }
    return acc;
  }, []).slice(0, 5) || [];

  return (
    <div className="space-y-8 p-4 md:p-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <h1 className="text-3xl font-bold gradient-text mb-2">Provider Dashboard</h1>
          <p className="text-muted-foreground">Manage your restaurant and track performance</p>
        </div>
        
        <div className="flex gap-4">
          <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-6 py-3 rounded-2xl shadow-lg animate-fade-in-up">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              <span className="font-semibold">Top Provider</span>
            </div>
          </div>
          <div className="bg-white/60 backdrop-blur-xl border border-green-100 px-6 py-3 rounded-2xl shadow-lg animate-fade-in-up animation-delay-200">
            <div className="flex items-center gap-2 text-green-600">
              <TrendingUp className="w-5 h-5" />
              <span className="font-semibold">+25% Growth</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        <StatCard
          title="Total Revenue"
          value={formatCurrency(data.totalRevenue)}
          icon={<DollarSign />}
          color="green"
          trend={"+18%"}
        />
        <StatCard
          title="Total Orders"
          value={data.totalOrders}
          icon={<ShoppingCart />}
          color="blue"
          trend={"+12%"}
        />
        <StatCard
          title="Completed"
          value={data.completedOrders}
          icon={<CheckCircle2 />}
          color="emerald"
          trend={"+20%"}
        />
        <StatCard
          title="Total Meals"
          value={data.totalMeals}
          icon={<Utensils />}
          color="orange"
          trend={"+5%"}
        />
        <StatCard
          title="Avg Rating"
          value={data.averageRating.toFixed(1)}
          icon={<Star />}
          color="yellow"
          trend={"+0.3"}
        />
        <StatCard
          title="Customers"
          value={data.recentOrders?.length || 0}
          icon={<Users />}
          color="purple"
          trend={"+15%"}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-white/60 backdrop-blur-xl border border-green-100/50 shadow-xl hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              Revenue Trends
            </CardTitle>
            <CardDescription>Your weekly revenue performance</CardDescription>
          </CardHeader>
          <CardContent>
            <D3Chart data={revenueData} type="area" width={400} height={250} />
          </CardContent>
        </Card>

        <Card className="bg-white/60 backdrop-blur-xl border border-green-100/50 shadow-xl hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Utensils className="w-5 h-5 text-orange-500" />
              Popular Meals
            </CardTitle>
            <CardDescription>Most ordered items this week</CardDescription>
          </CardHeader>
          <CardContent>
            <D3Chart data={mealPerformanceData} type="bar" width={400} height={250} />
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white/60 backdrop-blur-xl border border-green-100/50 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-green-500" />
            Recent Orders
          </CardTitle>
          <CardDescription>Latest orders from your customers</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {data.recentOrders.map((order: any, index: number) => (
              <div
                key={order.id}
                className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-6 rounded-2xl border border-green-100/50 bg-white/40 backdrop-blur-sm hover:bg-white/60 transition-all hover-lift animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={order.meal.image}
                      alt={order.meal.name}
                      className="h-16 w-16 rounded-2xl object-cover border border-green-100"
                    />
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {order.quantity}
                    </div>
                  </div>

                  <div className="space-y-2 min-w-0">
                    <h4 className="font-bold text-base truncate">
                      {order.meal.name}
                    </h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      {order.user.name}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {new Date(order.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col lg:items-end gap-3">
                  <Badge
                    className={`px-4 py-2 text-sm font-semibold rounded-full border-0 ${
                      order.status === "CANCELLED"
                        ? "bg-rose-500/20 text-rose-600"
                        : order.status === "PREPARING"
                          ? "bg-amber-500/20 text-amber-600"
                          : order.status === "PLACED"
                            ? "bg-blue-500/20 text-blue-600"
                            : "bg-emerald-500/20 text-emerald-600"
                    }`}
                  >
                    {order.status}
                  </Badge>

                  <div className="text-right">
                    <p className="font-bold text-lg text-green-600">
                      {formatCurrency(order.totalPrice)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {order.quantity} items
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({ title, value, icon, color = "blue", trend }: any) {
  const colorClasses = {
    green: "from-green-400 to-emerald-500",
    blue: "from-blue-400 to-indigo-500",
    emerald: "from-emerald-400 to-teal-500",
    orange: "from-orange-400 to-red-500",
    yellow: "from-yellow-400 to-amber-500",
    purple: "from-purple-400 to-pink-500",
  };

  const bgClasses = {
    green: "bg-green-100 text-green-600",
    blue: "bg-blue-100 text-blue-600",
    emerald: "bg-emerald-100 text-emerald-600",
    orange: "bg-orange-100 text-orange-600",
    yellow: "bg-yellow-100 text-yellow-600",
    purple: "bg-purple-100 text-purple-600",
  };

  return (
    <Card className="bg-white/60 backdrop-blur-xl border border-green-100/50 shadow-lg hover-lift animate-fade-in-up">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-2xl ${bgClasses[color as keyof typeof bgClasses]}`}>
            {React.cloneElement(icon, { size: 24, className: "font-bold" })}
          </div>
          {trend && (
            <div className="flex items-center gap-1 text-green-600 text-sm font-semibold">
              <TrendingUp className="w-4 h-4" />
              {trend}
            </div>
          )}
        </div>
        <div>
          <p className="text-sm uppercase text-muted-foreground mb-1">{title}</p>
          <p className={`text-2xl font-bold bg-gradient-to-r ${colorClasses[color as keyof typeof colorClasses]} bg-clip-text text-transparent`}>
            {value}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
