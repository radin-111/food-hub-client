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
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Download,
} from "lucide-react";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Progress } from "@/components/ui/progress";

export default function AdminDashboard({ stats }: { stats: any }) {
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);

  const chartData = stats.monthlyRevenue.map((item: any) => ({
    date: new Date(item.createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    revenue: item._sum.totalPrice ?? 0,
  }));

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
          <div className="h-12 w-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
            <MdOutlineAdminPanelSettings className="text-white text-2xl" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 truncate">
              Admin Dashboard
            </h1>
            <p className="text-slate-500 text-xs md:text-sm flex items-center gap-1 md:gap-2">
              <Calendar size={12} /> {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
        <Button
          onClick={handleExport}
          variant="outline"
          className="border-slate-200 bg-white shadow-sm text-xs md:text-sm"
        >
          <Download className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" /> Export
          Report
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <KPICard
          title="Revenue"
          value={formatCurrency(stats.totalRevenue)}
          icon={<DollarSign />}
        />

        <KPICard
          title="Total Orders"
          value={stats.totalOrders}
          icon={<ShoppingCart />}
        />

        <KPICard
          title="Active Users"
          value={stats.totalUsers}
          icon={<Users />}
        />

        <KPICard
          title="Meal Partners"
          value={stats.totalProviders}
          icon={<Store />}
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 xl:gap-8">
        <Card className="xl:col-span-2 border-none shadow-sm bg-white ring-1 ring-slate-100">
          <CardHeader>
            <CardTitle className="m-2 text-sm md:text-base">
              Financial Growth
            </CardTitle>
            <CardDescription className="m-2 text-xs md:text-sm">
              Revenue trajectory over the last cycle
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 sm:h-72 md:h-80 lg:h-96">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="chartGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="#0f172a"
                        stopOpacity={0.08}
                      />
                      <stop offset="95%" stopColor="#0f172a" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                  <YAxis
                    tickFormatter={(value) => {
                      if (value >= 1_000_000)
                        return (value / 1_000_000).toFixed(1) + "M";
                      if (value >= 1_000)
                        return (value / 1_000).toFixed(1) + "K";
                      return value;
                    }}
                    width={50}
                    tick={{ fontSize: 10 }}
                  />
                  <Tooltip
                    formatter={(value: any) => formatCurrency(value)}
                    labelFormatter={(label: any) => `Date: ${label}`}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#0f172a"
                    strokeWidth={2}
                    fill="url(#chartGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-white ring-1 ring-slate-100">
          <CardHeader>
            <CardTitle className="text-sm md:text-base m-2">
              Delivery Performance
            </CardTitle>
            <CardDescription className="text-xs md:text-sm m-2" >
              Order fulfillment metrics
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 md:space-y-6">
            <div>
              <div className="flex justify-between text-xs md:text-sm font-medium">
                <span>Success Rate</span>
                <span className="text-emerald-600 font-bold">
                  {deliveryRate.toFixed(1)}%
                </span>
              </div>
              <Progress value={deliveryRate} className="h-2 mt-1 md:mt-2" />
            </div>
            <div className="grid grid-cols-2 gap-2 md:gap-4">
              <StatBox label="Delivered" value={stats.deliveredOrders} />
              <StatBox label="Cancelled" value={stats.cancelledOrders} />
            </div>
            <div className="pt-2 md:pt-4 border-t text-xs md:text-sm text-slate-500">
              +{stats.totalReviews} customer reviews
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-sm bg-white ring-1 ring-slate-100 overflow-x-auto">
        <CardHeader>
          <CardTitle className="text-sm md:text-base m-2">Recent Orders</CardTitle>
          <CardDescription className="text-xs md:text-sm m-2">
            Latest transactions across the platform.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[600px] md:min-w-full">
              <thead className="hidden md:table-header-group bg-slate-50">
                <tr className="text-xs md:text-sm uppercase tracking-widest font-bold text-slate-500">
                  <th className="px-4 md:px-6 py-2 md:py-4">Customer</th>
                  <th className="px-4 md:px-6 py-2 md:py-4">Meal</th>
                  <th className="px-4 md:px-6 py-2 md:py-4">Provider</th>
                  <th className="px-4 md:px-6 py-2 md:py-4 text-center">
                    Status
                  </th>
                  <th className="px-4 md:px-6 py-2 md:py-4 text-right">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {stats.recentOrders.map((order: any) => (
                  <tr
                    key={order.id}
                    className="block md:table-row hover:bg-slate-50"
                  >
                    <td className="px-4 md:px-6 py-2 md:py-4 block md:table-cell">
                      <div className="flex items-center gap-2 md:gap-3">
                        <div className="h-8 w-8 md:h-9 md:w-9 rounded-full bg-slate-100 flex items-center justify-center text-xs md:text-sm font-bold">
                          {order.user.name.charAt(0)}
                        </div>
                        <div className="truncate">
                          <div className="font-bold text-sm md:text-base truncate">
                            {order.user.name}
                          </div>
                          <div className="text-[10px] md:text-xs text-slate-400 truncate">
                            #{order.id.slice(-5)}
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 md:hidden text-sm space-y-1">
                        <p>
                          <strong>Meal:</strong> {order.meal.name}
                        </p>
                        <p>
                          <strong>Provider:</strong>{" "}
                          {order.provider.restaurantName}
                        </p>
                        <div className="flex justify-between mt-1">
                          <StatusChip status={order.status} />
                          <span className="font-bold">
                            {formatCurrency(order.totalPrice)}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 md:px-6 py-2 md:py-4 hidden md:table-cell truncate">
                      {order.meal.name}
                    </td>
                    <td className="px-4 md:px-6 py-2 md:py-4 hidden md:table-cell">
                      <Badge variant="secondary" className="truncate">
                        {order.provider.restaurantName}
                      </Badge>
                    </td>
                    <td className="px-4 md:px-6 py-2 md:py-4 text-center hidden md:table-cell">
                      <StatusChip status={order.status} />
                    </td>
                    <td className="px-4 md:px-6 py-2 md:py-4 text-right font-bold hidden md:table-cell">
                      {formatCurrency(order.totalPrice)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function KPICard({ title, value, icon }: any) {
  return (
    <Card className="shadow-sm bg-white ring-1 ring-slate-100">
      <CardContent className="p-6">
        <div className="flex justify-start items-center gap-4">
          <div className="h-10 w-10 bg-slate-50 rounded-xl flex items-center justify-center">
            {React.cloneElement(icon, { size: 20 })}
          </div>
          <div>
            <p className="text-xs uppercase text-slate-500">{title}</p>
            <h3 className="text-2xl font-black mt-1 truncate">{value}</h3>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function StatusChip({ status }: { status: string }) {
  const styles: any = {
    DELIVERED: "bg-emerald-500/10 text-emerald-600",
    CANCELLED: "bg-rose-500/10 text-rose-600",
    DEFAULT: "bg-sky-500/10 text-sky-600",
  };
  return (
    <span
      className={`px-2 py-1 md:px-3 md:py-1 rounded-full text-[10px] md:text-xs font-bold uppercase ${
        styles[status] || styles.DEFAULT
      }`}
    >
      {status}
    </span>
  );
}

function StatBox({ label, value }: any) {
  return (
    <div className="p-2 sm:p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
      <p className="text-[10px] sm:text-xs uppercase text-slate-400 mb-1 truncate">
        {label}
      </p>
      <p className="text-lg sm:text-xl font-bold truncate">{value}</p>
    </div>
  );
}
