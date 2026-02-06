import AllProviders from "@/components/modules/Provider/AllProviders";
import Pagination2 from "@/components/ui/pagination2";
import { env } from "@/env";
import { cookies } from "next/headers";

const backendUrl = env.BACKEND_URL;
const frontEndUrl = env.FRONTEND_URL;
export default async function ProviderProfiles({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const { page } = await searchParams;
  const cookieStore: any = await cookies();
  const res = await fetch(`${backendUrl}/provider?page=${page}`, {
    cache: "no-store",
    headers: {
      Cookie: cookieStore.toString(),
      Origin: frontEndUrl,
    },
  });

  const { data } = await res.json();
  
  return (
    <div>
      <AllProviders data={data.result} />
      <Pagination2 totalPages={Number(data.totalPages)}/>
    </div>
  );
}
