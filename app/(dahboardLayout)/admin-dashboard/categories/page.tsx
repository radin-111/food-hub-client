import AddCategories from "@/components/modules/Admin/AddCategories";
import AllCategories from "@/components/modules/Admin/AllCategories";
import { env } from "@/env";
import { cookies } from "next/headers";

const backendUrl = env.BACKEND_URL;
const frontEndUrl = env.FRONTEND_URL;
export default async function Categories() {
  const cookieStore = await cookies();
  const res = await fetch(`${backendUrl}/meals/categories`, {
    headers: {
      Cookie: cookieStore.toString(),
      Origin: frontEndUrl,
    },
    credentials:"include",
    cache: "no-store",
  });
  const { data } = await res.json();
  return (
    <div>
      <AddCategories />
      <AllCategories data={data} />
    </div>
  );
}
