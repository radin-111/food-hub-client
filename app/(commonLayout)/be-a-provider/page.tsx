import { BeProviderForm } from "@/components/modules/Provider/BeProviderForm";
import { Button } from "@/components/ui/button";
import { env } from "@/env";
import { cookies } from "next/headers";
import Link from "next/link";
import { da } from "zod/v4/locales";

export default async function BeProvider() {
  const cookieStore: any = await cookies();

  const res = await fetch(`${env.BACKEND_URL}/provider/myProviderProfile`, {
    cache: "no-store",
    headers: {
      Cookie: cookieStore.toString(),
      Origin: env.FRONTEND_URL,
    },
    credentials: "include",
  });
  const { data } = await res.json();

  let text: any;

  if (
    data?.isActive === "ACTIVE" ||
    data?.isActive === "PENDING" ||
    data?.isActive === "INACTIVE"
  ) {
    if (data?.isActive === "ACTIVE") {
      text = (
        <p className="text-red-500 text-6xl">You are an active provider</p>
      );
    }
    if (data?.isActive === "PENDING") {
      text = (
        <p className="text-yellow-500 text-6xl">
          Your provider request is pending
        </p>
      );
    }
    if (data?.isActive === "INACTIVE") {
      text = (
        <p className="text-green-500 text-6xl">
          Your provider request is inactive
        </p>
      );
    }

    return (
      <div className=" my-20 text-center flex flex-col gap-10">
        <div className=""></div>
        <div className=""></div>

        <div className=""></div>
        <div className=""></div>

        <div
          className="
        "
        >
          {text}
        </div>
        <div className=""></div>
        <div className=""></div>

        <div>
          <Button>
            <Link href="/" className="">
              Home
            </Link>
          </Button>
        </div>
      </div>
    );
  }
  console.log(data);
  return (
    <div className="my-10">
      <BeProviderForm />
    </div>
  );
}
