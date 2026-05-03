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
import { Button } from "@/components/ui/button";
import {
  DollarSign,
  ShoppingCart,
  Users,
  Store,
  TrendingUp,
  Calendar,
  Download,
  Award,
  Activity,
  Clock,
  Star,
} from "lucide-react";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import D3Chart, { DataPoint } from "@/components/ui/d3-chart";
import { Progress } from "@/components/ui/progress";

export default function AdminDashboard({ stats }: { stats: any }) {
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);

  // Sample data for D3 charts
  const revenueData: DataPoint[] = stats.monthlyRevenue?.map((item: any) => ({
    name: new Date(item.createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    value: item._sum.totalPrice ?? 0,
  })) || [
    { name: "Mon", value: stats.totalRevenue * 0.15 },
    { name: "Tue", value: stats.totalRevenue * 0.18 },
    { name: "Wed", value: stats.totalRevenue * 0.22 },
    { name: "Thu", value: stats.totalRevenue * 0.20 },
    { name: "Fri", value: stats.totalRevenue * 0.25 },
  ];

  const userGrowthData: DataPoint[] = [
    { name: "Week 1", value: stats.totalUsers * 0.6 },
    { name: "Week 2", value: stats.totalUsers * 0.75 },
    { name: "Week 3", value: stats.totalUsers * 0.85 },
    { name: "Week 4", value: stats.totalUsers },
  ];

  const orderStatusData: DataPoint[] = [
    { name: "Delivered", value: stats.deliveredOrders },
    { name: "Cancelled", value: stats.cancelledOrders },
    { name: "Preparing", value: stats.totalOrders - stats.deliveredOrders - stats.cancelledOrders },
  ];

  const deliveryRate =
    stats.totalOrders > 0
      ? (stats.deliveredOrders / stats.totalOrders) * 100
      : 0;

  const handleExport = () => {
    const headers = [
      "Order ID",
      "Customer",
      "Meal",
      "Provider",
      "Status",
      "Price",
    ];
    const csvContent = [
      headers.join(","),
      ...stats.recentOrders.map((order: any) =>
        [
          order.id,
          order.user.name,
          order.meal.name,
          order.provider.restaurantName,
          order.status,
          order.totalPrice,
        ].join(","),
      ),
    ].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `report_${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8 space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-6">
        <div className="flex items-center gap-3 md:gap-4">
          <div className="h-14 w-14 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-2xl flex items-center justify-center shadow-xl animate-fade-in-up">
            <MdOutlineAdminPanelSettings className="text-white text-2xl" />
          </div>
          <div className="animate-fade-in-up animation-delay-200">
            <h1 className="text-3xl font-bold gradient-text truncate">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground text-sm flex items-center gap-2">
              <Calendar className="w-4 h-4" /> {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
        
        <div className="flex gap-4">
          <div className="bg-gradient-to-r from-purple-400 to-indigo-500 text-white px-6 py-3 rounded-2xl shadow-lg animate-fade-in-up animation-delay-400">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              <span className="font-semibold">Super Admin</span>
            </div>
          </div>
          <Button
            onClick={handleExport}
            className="bg-white/60 backdrop-blur-xl border border-purple-100 hover:bg-purple-50 px-6 py-3 rounded-2xl shadow-lg animate-fade-in-up animation-delay-600"
          >
            <Download className="mr-2 w-4 h-4" /> Export Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Revenue"
          value={formatCurrency(stats.totalRevenue)}
          icon={<DollarSign />}
          color="green"
          trend={"+25%"}
        />
        <KPICard
          title="Total Orders"
          value={stats.totalOrders}
          icon={<ShoppingCart />}
          color="blue"
          trend={"+18%"}
        />
        <KPICard
          title="Active Users"
          value={stats.totalUsers}
          icon={<Users />}
          color="purple"
          trend={"+32%"}
        />
        <KPICard
          title="Meal Partners"
          value={stats.totalProviders}
          icon={<Store />}
          color="orange"
          trend={"+12%"}
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <Card className="xl:col-span-2 bg-white/60 backdrop-blur-xl border border-purple-100/50 shadow-xl hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-500" />
              Revenue Analytics
            </CardTitle>
            <CardDescription>Financial performance overview</CardDescription>
          </CardHeader>
          <CardContent>
            <D3Chart data={revenueData} type="area" width={600} height={300} />
          </CardContent>
        </Card>

        <Card className="bg-white/60 backdrop-blur-xl border border-purple-100/50 shadow-xl hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-green-500" />
              Delivery Performance
            </CardTitle>
            <CardDescription>Order fulfillment metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between text-sm font-medium mb-2">
                <span>Success Rate</span>
                <span className="text-green-600 font-bold">
                  {deliveryRate.toFixed(1)}%
                </span>
              </div>
              <Progress value={deliveryRate} className="h-3" />
            </div>
            
            <div className="space-y-4">
              <StatBox label="Delivered" value={stats.deliveredOrders} color="green" />
              <StatBox label="Cancelled" value={stats.cancelledOrders} color="red" />
              <StatBox label="Preparing" value={stats.totalOrders - stats.deliveredOrders - stats.cancelledOrders} color="yellow" />
            </div>
            
            <div className="pt-4 border-t border-purple-100/50">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Star className="w-4 h-4 text-yellow-500" />
                <span>{stats.totalReviews} customer reviews</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-white/60 backdrop-blur-xl border border-purple-100/50 shadow-xl hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-500" />
              User Growth
            </CardTitle>
            <CardDescription>Monthly user acquisition trends</CardDescription>
          </CardHeader>
          <CardContent>
            <D3Chart data={userGrowthData} type="line" width={400} height={250} />
          </CardContent>
        </Card>

        <Card className="bg-white/60 backdrop-blur-xl border border-purple-100/50 shadow-xl hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-orange-500" />
              Order Distribution
            </CardTitle>
            <CardDescription>Status breakdown of all orders</CardDescription>
          </CardHeader>
          <CardContent>
            <D3Chart data={orderStatusData} type="pie" width={400} height={250} />
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white/60 backdrop-blur-xl border border-purple-100/50 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-purple-500" />
            Recent Orders
          </CardTitle>
          <CardDescription>Latest transactions across the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats.recentOrders.map((order: any, index: number) => (
              <div
                key={order.id}
                className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-6 rounded-2xl border border-purple-100/50 bg-white/40 backdrop-blur-sm hover:bg-white/60 transition-all hover-lift animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center text-white font-bold">
                      {order.user.name.charAt(0)}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-base">{order.user.name}</h4>
                      <Badge variant="secondary" className="text-xs">
                        #{order.id.slice(-5)}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <p>{order.meal.name}</p>
                      <p className="text-xs">{order.provider.restaurantName}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col lg:items-end gap-3">
                  <StatusChip status={order.status} />
                  <div className="text-right">
                    <p className="font-bold text-lg text-purple-600">
                      {formatCurrency(order.totalPrice)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(order.createdAt).toLocaleDateString()}
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

function KPICard({ title, value, icon, color = "blue", trend }: any) {
  const colorClasses = {
    green: "from-green-400 to-emerald-500",
    blue: "from-blue-400 to-indigo-500",
    purple: "from-purple-400 to-indigo-500",
    orange: "from-orange-400 to-red-500",
  };

  const bgClasses = {
    green: "bg-green-100 text-green-600",
    blue: "bg-blue-100 text-blue-600",
    purple: "bg-purple-100 text-purple-600",
    orange: "bg-orange-100 text-orange-600",
  };

  return (
    <Card className="bg-white/60 backdrop-blur-xl border border-purple-100/50 shadow-lg hover-lift animate-fade-in-up">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-2xl ${bgClasses[color as keyof typeof bgClasses]}`}>
            {React.cloneElement(icon, { size: 24 })}
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

function StatusChip({ status }: { status: string }) {
  const styles: any = {
    DELIVERED: "bg-green-500/20 text-green-600 border-green-200",
    CANCELLED: "bg-red-500/20 text-red-600 border-red-200",
    PREPARING: "bg-yellow-500/20 text-yellow-600 border-yellow-200",
    PLACED: "bg-blue-500/20 text-blue-600 border-blue-200",
    DEFAULT: "bg-gray-500/20 text-gray-600 border-gray-200",
  };
  return (
    <Badge
      className={`px-4 py-2 rounded-full border font-semibold ${
        styles[status] || styles.DEFAULT
      }`}
    >
      {status}
    </Badge>
  );
}

function StatBox({ label, value, color = "blue" }: any) {
  const bgClasses = {
    green: "bg-green-100 text-green-600 border-green-200",
    red: "bg-red-100 text-red-600 border-red-200",
    yellow: "bg-yellow-100 text-yellow-600 border-yellow-200",
    blue: "bg-blue-100 text-blue-600 border-blue-200",
  };

  return (
    <div className={`p-4 rounded-2xl border ${bgClasses[color as keyof typeof bgClasses]} text-center`}>
      <p className="text-xs uppercase mb-1 font-semibold">{label}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}
