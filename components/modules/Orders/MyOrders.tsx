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
import { toast } from "sonner";
import { updateOrderStatus } from "@/Actions/order.action";

type Order = {
  id: string;
  mealId: string;
  providerId: string;
  quantity: number;
  totalPrice: number;
  createdAt: string;
  status:
    | "PLACED"
    | "CONFIRMED"
    | "CANCELLED"
    | "DELIVERED"
    | "READY"
    | "PREPARING";
  meal: {
    image: string;
    name: string;
    price: number;
  };
};

export default function MyOrders({ orders }: { orders: Order[] }) {
  const handleCancel = async (id: string) => {
    const toastId = toast.loading("Cancelling order...");
    try {
      const { success } = await updateOrderStatus(id, "CANCELLED");
      if (success) {
        toast.success("Order cancelled successfully", {
          id: toastId,
        });
      }
      else {
        toast.error("Failed to cancel order", {
          id: toastId,
        });
      }
    } catch (error) {
      toast.error("Failed to cancel order", {
        id: toastId,
      });
    }
  };

  return (
    <div className="rounded-2xl border p-6 shadow-sm">
      <h2 className="text-2xl font-semibold mb-6">My Orders</h2>

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
                      : order.status === "CONFIRMED"
                        ? "default"
                        : "secondary"
                  }
                >
                  {order.status ?? "PLACED"}
                </Badge>
              </TableCell>

              <TableCell className="text-right">
                {order.status !== "CANCELLED" && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleCancel(order.id)}
                  >
                    Cancel
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
