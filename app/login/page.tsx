import Image from "next/image";
import logo from "../../public/image (3).jpg";
import { LoginForm } from "@/components/modules/authentication/login-form";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <Link href={'/'}>
          <div className="flex justify-center items-center gap-2 md:justify-start">
            <Image width={50} src={logo} alt="logo" className="rounded-full" />
            <p className="text-2xl font-bold">FoodHub</p>
          </div>
        </Link>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        {/* <img
          // src="/placeholder.svg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        /> */}
      </div>
    </div>
  );
}
