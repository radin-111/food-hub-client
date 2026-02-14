"use client";

import React from "react";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { OrderStatus } from "@/Services/order.service";
import { updateOrderStatus } from "@/Actions/order.action";
import { toast } from "sonner";

type Order = {
  id: string;
  mealId: string;
  userId: string;
  quantity: number;
  totalPrice: number;
  status: OrderStatus;
  createdAt: string;
  meal: {
    image: string;
    name: string;
    price: number;
  };
};

export default function ProviderOrdersTable({ orders }: { orders: Order[] }) {
  const handleStatusUpdate = async (id: string, newStatus: OrderStatus) => {
    const toastId = toast.loading("Updating order status...");
    try {
      const { success } = await updateOrderStatus(id, newStatus);
      if (success) {
        toast.success("Order status updated successfully", { id: toastId });
      } else {
        toast.error("Failed to update order status", { id: toastId });
      }
    } catch (error) {
      toast.error("Status update failed", { id: toastId });
    }
  };

  const getActionButton = (order: Order) => {
    switch (order.status) {
      case "PLACED":
        return (
          <Button
            size="sm"
            onClick={() => handleStatusUpdate(order.id, "PREPARING")}
          >
            Mark as Preparing
          </Button>
        );
      case "PREPARING":
        return (
          <Button
            size="sm"
            onClick={() => handleStatusUpdate(order.id, "READY")}
          >
            Mark as Ready
          </Button>
        );
      case "READY":
        return (
          <Button
            size="sm"
            onClick={() => handleStatusUpdate(order.id, "DELIVERED")}
          >
            Mark as Delivered
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="rounded-2xl border p-6 shadow-sm">
      <h2 className="text-2xl font-semibold mb-6">Provider Orders</h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Meal</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Unit Price</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              {/* Meal Info */}
              <TableCell>
                <div className="flex items-center gap-4">
                  <div className="relative h-14 w-14 rounded-lg overflow-hidden">
                    <Image
                      src={order.meal.image}
                      alt={order.meal.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{order.meal.name}</p>
                    <p className="text-xs text-muted-foreground">
                      ID: {order.mealId.slice(0, 8)}...
                    </p>
                  </div>
                </div>
              </TableCell>

              <TableCell>{order.quantity}</TableCell>
              <TableCell>${order.meal.price.toLocaleString()}</TableCell>
              <TableCell className="font-medium">
                ${order.totalPrice.toLocaleString()}
              </TableCell>

              <TableCell>
                {new Date(order.createdAt).toLocaleDateString()}
              </TableCell>

              <TableCell>
                <Badge
                  variant={
                    order.status === "CANCELLED"
                      ? "destructive"
                      : order.status === "CONFIRMED" ||
                          order.status === "READY" ||
                          order.status === "DELIVERED"
                        ? "default"
                        : order.status === "PREPARING"
                          ? "secondary"
                          : "secondary"
                  }
                >
                  {order.status}
                </Badge>
              </TableCell>

              <TableCell className="text-right">
                {getActionButton(order)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
