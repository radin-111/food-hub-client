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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { acceptProvider, rejectProvider } from "@/Actions/provider.action";
import { toast } from "sonner";
import Swal from "sweetalert2";

type Provider = {
  id: string;
  restaurantName: string;
  city: string;
  phoneNumber: string;
  isActive: "ACTIVE" | "INACTIVE";
  address: string;
  country: string;
  description: string;
};

export default function AllProviders({ data }: { data: Provider[] }) {
  
  if (data.length === 0) {
    return (
      <div className="flex justify-center items-center">
        <p className="text-center text-2xl text-red-500">No providers found</p>
      </div>
    );
  }

  const handleDeactivate = async (id: string) => {
    const confirm = await Swal.fire({
      title: "Deactivate provider?",
      text: "This provider will be deactivated",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, deactivate",
      cancelButtonText: "Cancel",
    });

    if (!confirm.isConfirmed) return;

    const result = await rejectProvider(id);
    if (result?.success) {
      toast.success("Provider deactivated successfully");
    } else {
      toast.error("Failed to deactivate provider");
    }
  };

  const handleReactivate = async (id: string) => {
    const confirm = await Swal.fire({
      title: "Reactivate provider?",
      text: "This provider will be reactivated",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, reactivate",
      cancelButtonText: "Cancel",
    });

    if (!confirm.isConfirmed) return;

    const result = await acceptProvider(id);
    if (result?.success) {
      toast.success("Provider reactivated successfully");
    } else {
      toast.error("Failed to reactivate provider");
    }
  };

  return (
    <Table>
      <TableCaption>All providers</TableCaption>

      <TableHeader>
        <TableRow>
          <TableHead>Restaurant</TableHead>
          <TableHead>City</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.map((provider) => (
          <TableRow key={provider.id}>
            <TableCell className="font-medium">
              {provider.restaurantName}
            </TableCell>

            <TableCell>{provider.city}</TableCell>

            <TableCell>
              <span
                className={`rounded px-2 py-1 text-xs font-medium ${
                  provider.isActive === "ACTIVE"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {provider.isActive}
              </span>
            </TableCell>

            <TableCell>{provider.phoneNumber}</TableCell>

            <TableCell className="text-right space-x-2">
              {/* View */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="icon" variant="outline">
                    <Eye className="h-4 w-4" />
                  </Button>
                </DialogTrigger>

                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Provider Details</DialogTitle>
                  </DialogHeader>

                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>Restaurant:</strong> {provider.restaurantName}
                    </p>
                    <p>
                      <strong>Address:</strong> {provider.address}
                    </p>
                    <p>
                      <strong>City:</strong> {provider.city}
                    </p>
                    <p>
                      <strong>Country:</strong> {provider.country}
                    </p>
                    <p>
                      <strong>Phone:</strong> {provider.phoneNumber}
                    </p>
                    <p>
                      <strong>Status:</strong> {provider.isActive}
                    </p>
                    <p>
                      <strong>Description:</strong> {provider.description}
                    </p>
                  </div>
                </DialogContent>
              </Dialog>

              {/* Conditional action */}
              {provider.isActive === "ACTIVE" ? (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeactivate(provider.id)}
                >
                  Deactivate
                </Button>
              ) : (
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => handleReactivate(provider.id)}
                >
                  Reactivate
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
