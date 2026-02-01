
import { userService } from "@/Services/user.service";

import Link from "next/link";

export default async function RoleBaseRoutes() {
  const { data } = await userService.getSession();
  const role = data?.user?.role;
  if (role === "ADMIN") {
    return (
      <>
        <Link
          href="/admin-dashboard"
          className="hover:text-primary max-md:hidden"
        >
          Admin Dashboard
        </Link>
      </>
    );
  } else if (role === "PROVIDER") {
    return (
      <>
        <Link
          href="/provider-dashboard"
          className="hover:text-primary max-md:hidden"
        >
          Provider Dashboard
        </Link>
      </>
    );
  } else if (role === "CUSTOMER") {
    return (
      <>
        <Link
          href="/be-a-provider"
          className="hover:text-primary max-md:hidden"
        >
          Be a Provider
        </Link>
        <Link
          href="/customer-dashboard"
          className="hover:text-primary max-md:hidden"
        >
          Dashboard
        </Link>
      </>
    );
  }

  return (
    <>
      <Link href="/be-a-provider" className="hover:text-primary max-md:hidden">
        Be a Provider
      </Link>
    </>
  );
}
