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

type User = {
  id: string;
  name: string;
  email: string;
  role: "CUSTOMER" | "PROVIDER" | "ADMIN";
};

export default function UserTable({ users }: { users: User[] }) {
  const makeAdmin = (userId: string) => {
    console.log("Make admin:", userId);

  };

  const removeAdmin = (userId: string) => {
    console.log("Remove admin:", userId);

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
              <TableCell colSpan={5} className="text-center text-muted-foreground py-6">
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
                  <Badge variant={user.role === "ADMIN" ? "default" : "secondary"}>
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
