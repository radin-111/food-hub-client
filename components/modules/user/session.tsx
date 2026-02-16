"use client";
import { Button } from "@/components/ui/button";
import Logout from "@/components/ui/Logout";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import Image from "next/image";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Session() {
  const router = useRouter();

  const data = authClient.useSession();
  const image =
    data?.data?.user?.image ||
    "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?semt=ais_hybrid&w=740&q=80";
  return (
    <>
      {data?.data?.user ? (
        <div className=" flex gap-4 items-center">
          <Avatar className="relative h-12 w-12 overflow-hidden rounded-full">
            <Image
              src={image}
              alt="Profile Picture"
              fill
              className="object-cover"
            />
          </Avatar>

          <Logout />
        </div>
      ) : (
        <>
          <Button>
            <Link href="/login">Login</Link>
          </Button>
          <Button variant="outline">
            <Link href="/signup">Sign Up</Link>
          </Button>
        </>
      )}
    </>
  );
}
