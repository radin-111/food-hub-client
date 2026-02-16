"use client";

import Image from "next/image";
import { useState } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Eye } from "lucide-react";

type Order = {
  id: string;
  quantity: number;
  totalPrice: number;
  status: string;
  createdAt: string;
  meal: {
    image: string;
    name: string;
    price: number;
  };
};

export default function OrdersTable({ data }: { data: Order[] }) {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "PLACED":
        return "secondary";
      case "PREPARING":
        return "default";
      case "DELIVERED":
        return "success";
      case "CANCELLED":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <>
      <div className="rounded-xl border bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Meal</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Qty</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  <Image
                    src={order.meal.image}
                    alt={order.meal.name}
                    width={50}
                    height={50}
                    className="rounded-md object-cover"
                  />
                </TableCell>

                <TableCell className="font-medium">{order.meal.name}</TableCell>

                <TableCell>{order.quantity}</TableCell>

                <TableCell>$ {order.totalPrice}</TableCell>

                <TableCell>
                  <Badge variant={getStatusVariant(order.status) as any}>
                    {order.status}
                  </Badge>
                </TableCell>

                <TableCell>
                  {new Date(order.createdAt).toLocaleString()}
                </TableCell>

                <TableCell className="text-right">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => setSelectedOrder(order)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog
        open={!!selectedOrder}
        onOpenChange={() => setSelectedOrder(null)}
      >
        <DialogContent className="sm:max-w-md">
          {selectedOrder && (
            <>
              <DialogHeader>
                <DialogTitle>Order Details</DialogTitle>
                <DialogDescription>
                  Complete information about this order
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 mt-4">
                <Image
                  src={selectedOrder.meal.image}
                  alt={selectedOrder.meal.name}
                  width={400}
                  height={200}
                  className="rounded-lg object-cover w-full"
                />

                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Meal Name:</strong> {selectedOrder.meal.name}
                  </p>

                  <p>
                    <strong>Unit Price:</strong> $ {selectedOrder.meal.price}
                  </p>

                  <p>
                    <strong>Quantity:</strong> {selectedOrder.quantity}
                  </p>

                  <p>
                    <strong>Total Price:</strong> $ {selectedOrder.totalPrice}
                  </p>

                  <p>
                    <strong>Status:</strong> {selectedOrder.status}
                  </p>

                  <p>
                    <strong>Order Date:</strong>{" "}
                    {new Date(selectedOrder.createdAt).toLocaleString()}
                  </p>

                  <p>
                    <strong>Order ID:</strong> {selectedOrder.id}
                  </p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
