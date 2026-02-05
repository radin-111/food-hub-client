"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Check, X } from "lucide-react";
import { env } from "@/env";
import { toast } from "sonner";

type Provider = {
  id: string;
  restaurantName: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  phoneNumber: string;
  website?: string;
  description?: string;
  createdAt: string;
  userId: string;
};
const backendUrl = env.NEXT_PUBLIC_BACKEND_URL;
export default function ProviderRequestTable({ data }: { data: Provider[] }) {
  const acceptBody = { isActive: "ACTIVE" };
  const rejectBody = { isActive: "INACTIVE" };
  const handleAccept = async (id: string) => {
    const res = await fetch(`${backendUrl}/provider/requests/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(acceptBody),
    });
    const result = await res.json();
    
    if (result.success) {
      const toastId = toast.success("Provider request accepted");
      toast("Refresh page to see changes", {
        id: toastId,
      });
    } else {
      toast.error("Something went wrong");
    }
  };

  const handleReject = async (id: string) => {
    const res = await fetch(`${backendUrl}/provider/requests/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(rejectBody),
    });
    const result = await res.json();
    if (result.success) {
      const toastId = toast.success("Provider request rejected");
      toast("Refresh page to see changes", {
        id: toastId,
      });
    } else {
      toast.error("Something went wrong");
    }
  };

  if (!data || data.length === 0) {
    return (
      <div className="flex justify-center items-center py-10">
        <p className="text-2xl text-red-500">No provider requests found</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-background">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Restaurant</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((provider) => (
            <TableRow key={provider.id}>
              <TableCell className="font-medium">
                {provider.restaurantName}
              </TableCell>

              <TableCell>
                {provider.city}, {provider.country}
              </TableCell>

              <TableCell>
                <Badge variant="secondary">PENDING</Badge>
              </TableCell>

              <TableCell className="text-right space-x-1">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="icon" variant="outline">
                      <Eye className="h-5 w-5" />
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="max-w-lg">
                    <DialogHeader>
                      <DialogTitle>Provider Details</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="font-semibold">Restaurant:</span>{" "}
                        {provider.restaurantName}
                      </p>
                      <p>
                        <span className="font-semibold">Address:</span>{" "}
                        {provider.address}
                      </p>
                      <p>
                        <span className="font-semibold">Phone:</span>{" "}
                        {provider.phoneNumber}
                      </p>
                      <p>
                        <span className="font-semibold">Website:</span>{" "}
                        {provider.website || "N/A"}
                      </p>
                      <p>
                        <span className="font-semibold">Description:</span>{" "}
                        {provider.description || "N/A"}
                      </p>
                      <p>
                        <span className="font-semibold">Requested At:</span>{" "}
                        {new Date(provider.createdAt).toLocaleString()}
                      </p>
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                      <Button
                        variant="outline"
                        className="border-red-500 text-red-600 hover:bg-red-50 hover:text-red-700"
                        onClick={() => handleReject(provider.id)}
                      >
                        <X className="mr-1 h-4 w-4" />
                        Reject
                      </Button>

                      <Button
                        variant="ghost"
                        className="bg-green-600 text-white hover:bg-green-700"
                        onClick={() => handleAccept(provider.id)}
                      >
                        <Check className="mr-1 h-4 w-4" />
                        Accept
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                <Button
                  size="icon"
                  variant="outline"
                  className="text-green-600 hover:text-green-700"
                  onClick={() => handleAccept(provider.id)}
                >
                  <Check className="h-5 w-5" />
                </Button>

                <Button
                  size="icon"
                  variant="outline"
                  className="text-red-600 hover:text-red-700"
                  onClick={() => handleReject(provider.id)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
