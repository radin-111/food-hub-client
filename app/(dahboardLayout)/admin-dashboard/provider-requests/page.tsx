import ProviderRequestTable from "@/components/modules/Provider/ProviderRequest";
import Pagination2 from "@/components/ui/pagination2";
import { env } from "@/env";
import { updateTag } from "next/cache";
import { cookies } from "next/headers";
const backendUrl = env.BACKEND_URL;

export default async function ProviderRequests({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const cookieStore: any = await cookies();
  const { page } = await searchParams;
  const res = await fetch(`${backendUrl}/provider/requests?page=${page}`, {
    cache: "force-cache",
    headers: {
      Cookie: cookieStore.toString(),
    },
    next:{
      tags:["provider-requests"]
    }
    
  });

  updateTag("provider-requests");
  const { data } = await res.json();

  return (
    <div>
      <ProviderRequestTable data={data.result} />
      <Pagination2 totalPages={data.totalPages} />
    </div>
  );
}
