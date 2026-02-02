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
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import Swal from "sweetalert2";

type User = {
  id: string;
  name: string;
  email: string;
  role: "CUSTOMER" | "PROVIDER" | "ADMIN";
};

export default function UserTable({ users }: { users: User[] }) {
 

  const makeAdmin = async (userId: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This user will be promoted to Admin.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, make Admin",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
     await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${userId}/role`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ role: "ADMIN" }),
          
        },
      );

      toast.success("Customer promoted to Admin");
      window.location.reload();
    } catch {
      toast.error("Something went wrong while updating role");
    }
  };

  const removeAdmin = async (userId: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Admin role will be removed from this user.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove Admin",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${userId}/role`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ role: "CUSTOMER" }),
        },
      );

      toast.success("Admin role removed");
      window.location.reload();
    } catch {
      toast.error("Something went wrong while updating role");
    }
  };

  return (
    <div className="overflow-x-auto w-full">
      <Table className="w-full border-collapse">
        <TableCaption className="text-left text-muted-foreground mb-2">
          A list of all registered users.
        </TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-center">Role</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center text-muted-foreground py-6"
              >
                No users found
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow key={user.id} className="hover:bg-muted/50 transition">
                <TableCell className="font-medium truncate max-w-[80px]">
                  {user.id.slice(0, 6)}…
                </TableCell>

                <TableCell className="font-medium">{user.name}</TableCell>

                <TableCell className="text-muted-foreground truncate max-w-[220px]">
                  {user.email}
                </TableCell>

                <TableCell className="text-center">
                  <Badge
                    variant={user.role === "ADMIN" ? "default" : "secondary"}
                  >
                    {user.role}
                  </Badge>
                </TableCell>

                <TableCell className="text-right space-x-2">
                  {user.role === "ADMIN" ? (
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => removeAdmin(user.id)}
                    >
                      Remove Admin
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      className="bg-green-600 text-white hover:bg-green-700"
                      onClick={() => makeAdmin(user.id)}
                    >
                      Make Admin
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
