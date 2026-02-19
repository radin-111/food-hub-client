"use client";

import React, { useState } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Star } from "lucide-react";
import { submitReview } from "@/Actions/review.action";
import Swal from "sweetalert2";

type Review = {
  rating: number;
  comment: string;
};

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
  reviews: Review[];
};

export default function MyOrders({ orders }: { orders: Order[] }) {
  const [openDialog, setOpenDialog] = useState<Order | null>(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleCancel = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to cancel this order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it",
      cancelButtonText: "No, keep it",
    });

    if (!result.isConfirmed) return;

    const toastId = toast.loading("Cancelling order...");
    try {
      const { success } = await updateOrderStatus(id, "CANCELLED");
      if (success)
        toast.success("Order cancelled successfully", { id: toastId });
      else toast.error("Failed to cancel order", { id: toastId });
    } catch (error) {
      toast.error("Failed to cancel order", { id: toastId });
    }
  };

  const handleSubmitReview = (order: Order) => {
    setOpenDialog(order);
    setRating(0);
    setComment("");
  };

  const handleDialogSubmit = async () => {
    if (!openDialog) return;
    const toastId = toast.loading("Submitting review...");
    const review = {
      orderId: openDialog.id,
      mealId: openDialog.mealId,
      providerId: openDialog.providerId,
      rating,
      comment,
    };

    try {
      const { success } = await submitReview(review);
      if (success) {
        toast.success("Review submitted!", { id: toastId });
        setOpenDialog(null);
      } else {
        toast.error("Failed to submit review", { id: toastId });
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
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
                          order.status === "DELIVERED"
                        ? "default"
                        : "secondary"
                  }
                >
                  {order.status}
                </Badge>
              </TableCell>

              <TableCell className="text-right space-x-2">
                {order.status !== "CANCELLED" &&
                  order.status !== "DELIVERED" && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleCancel(order.id)}
                    >
                      Cancel
                    </Button>
                  )}

                {order.status === "DELIVERED" && order.reviews.length === 0 && (
                  <Button size="sm" onClick={() => handleSubmitReview(order)}>
                    Submit Review
                  </Button>
                )}

                {order.status === "DELIVERED" && order.reviews.length > 0 && (
                  <Button size="sm" onClick={() => setOpenDialog(order)}>
                    View Review
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {openDialog && (
        <Dialog open={!!openDialog} onOpenChange={() => setOpenDialog(null)}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>
                {openDialog.reviews.length === 0
                  ? "Submit Review"
                  : `Review for ${openDialog.meal.name}`}
              </DialogTitle>
              <DialogDescription>
                {openDialog.reviews.length === 0
                  ? "Rate your experience and leave a comment"
                  : "Your Feedback"}
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-4 mt-4">
              {openDialog.reviews.length === 0 ? (
                <>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`cursor-pointer h-6 w-6 ${
                          rating >= star ? "text-yellow-400" : "text-gray-300"
                        }`}
                        onClick={() => setRating(star)}
                      />
                    ))}
                  </div>

                  <textarea
                    className="w-full rounded-md border p-2 text-sm"
                    rows={4}
                    placeholder="Write your review..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </>
              ) : (
                <>
                  {openDialog.reviews.map((review: any, idx) => (
                    <div key={idx} className="flex flex-col gap-2">
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-6 w-6 ${review.rating >= star ? "text-yellow-400" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                      <p className="text-sm">{review.comment}</p>
                    </div>
                  ))}
                </>
              )}
            </div>

            <DialogFooter>
              {openDialog.reviews.length === 0 ? (
                <Button onClick={handleDialogSubmit}>Submit</Button>
              ) : (
                <Button onClick={() => setOpenDialog(null)}>Close</Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
