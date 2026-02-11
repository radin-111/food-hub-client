"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { clearCart, removeItem } from "@/Actions/cart.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useState } from "react";
import { createOrder } from "@/Actions/order.action";

type CartItem = {
  id: string;
  mealId: string;
  providerId: string;
  meal: {
    image: string;
    name: string;
    price: number;
  };
};

export default function CartItems({
  cartItems,
  navigatePage,
}: {
  cartItems: CartItem[];
  navigatePage: number;
}) {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CartItem | null>(null);
  const [quantity, setQuantity] = useState(1);

  const buyItem = async () => {
    if (!selectedItem) return;

    const toastId = toast.loading("Processing order...");

    try {
      const orderData = {
        cartId: selectedItem.id,
        mealId: selectedItem.mealId,
        providerId: selectedItem.providerId,
        quantity,
        price: parseFloat((selectedItem.meal.price * quantity).toFixed(2)),
      };

      const { success } = await createOrder(orderData);

      if (success) {
        toast.success("Order placed successfully!", { id: toastId });
        setOpen(false);
        setQuantity(1);
      } else {
        toast.error("Failed to place order", { id: toastId });
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  const handleDelete = async (id: string) => {
    const toastId = toast.loading("Removing item...");
    const { success } = await removeItem(id);

    if (success) {
      toast.success("Item removed successfully", { id: toastId });
      if (cartItems.length === 1) {
        router.push(`/customer-dashboard/cart?page=${navigatePage}`);
      }
    } else {
      toast.error("Failed to remove item", { id: toastId });
    }
  };

  const clearAll = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, clear it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const toastId = toast.loading("Clearing cart...");
        const { success } = await clearCart();

        if (success) {
          toast.success("Cart cleared successfully", { id: toastId });
          router.push("/customer-dashboard/cart");
        } else {
          toast.error("Failed to clear cart", { id: toastId });
        }
      }
    });
  };

  return (
    <div>
      <Button onClick={clearAll} className="bg-red-500 text-white mb-4">
        Clear All
      </Button>

      <Table>
        <TableCaption>Your cart items</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Meal</TableHead>
            <TableHead>Provider</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {cartItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Image
                    src={item.meal.image}
                    alt="Meal image"
                    width={48}
                    height={48}
                    className="rounded-md object-cover"
                  />
                  <div>
                    <p className="text-sm font-medium">{item.meal.name}</p>
                    <p className="text-xs text-gray-500">৳{item.meal.price}</p>
                  </div>
                </div>
              </TableCell>

              <TableCell className="text-sm">
                {item.providerId.slice(0, 6)}...
              </TableCell>

              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  {/* ✅ BUY BUTTON */}
                  <Button
                    onClick={() => {
                      setSelectedItem(item);
                      setOpen(true);
                    }}
                  >
                    Buy
                  </Button>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* ✅ BUY DIALOG */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Order</DialogTitle>
          </DialogHeader>

          {selectedItem && (
            <div className="space-y-4">
              <p className="text-sm font-medium">{selectedItem.meal.name}</p>

              <p className="text-sm text-gray-500">
                Price: ${selectedItem.meal.price}
              </p>

              <div>
                <label className="text-sm">Quantity</label>
                <Input
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
              </div>

              <p className="font-semibold">
                Total: ${selectedItem.meal.price * quantity}
              </p>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={buyItem}>Confirm Buy</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
