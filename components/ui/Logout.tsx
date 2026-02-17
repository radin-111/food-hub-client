"use client";
import React from "react";
import Swal from "sweetalert2";
import { Button } from "./button";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function Logout({ fullWidth }: { fullWidth?: boolean }) {
  const router = useRouter();
  const handleSignOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, logout",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#ef4444", // red
      cancelButtonColor: "#6b7280", // gray
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await authClient.signOut();
        router.push("/");
        window.location.reload();
        window.location.href = "/";
      }
    });
  };
  return (
    <Button
      variant={"destructive"}
      className={fullWidth ? "w-full" : ""}
      onClick={() => handleSignOut()}
    >
      Logout
    </Button>
  );
}
