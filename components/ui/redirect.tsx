"use client";
import { useRouter } from "next/navigation";
import { CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "./button";

export default function Redirect({ status }: { status: boolean }) {
  const router = useRouter();
  if (!status) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted px-4">
        <div className="w-full max-w-md rounded-2xl bg-background p-8 shadow-lg text-center">
          <div className="flex justify-center mb-4">
            <XCircle className="h-14 w-14 text-red-500" />
          </div>

          <h1 className="text-2xl font-semibold mb-2">
            Email verification failed
          </h1>

          <p className="text-muted-foreground mb-6">
            This verification link is invalid, expired, or already used.
          </p>

          <p className="text-sm text-muted-foreground">
            Please request a new verification email.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-muted px-4">
        <div className="w-full max-w-md rounded-2xl bg-background p-8 shadow-lg text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle2 className="h-14 w-14 text-green-500" />
          </div>

          <h1 className="text-2xl font-semibold mb-2">
            Email verified successfully
          </h1>

          <p className="text-muted-foreground mb-6">
            Your email has been verified. You can now log in to your account.
          </p>

          <Link href="/login" className="text-sm text-muted-foreground">
            <Button>Go to login</Button>
          </Link>
        </div>
      </div>

      
    </>
  );
}
