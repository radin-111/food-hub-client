import ProviderDetails from "@/components/modules/Provider/ProviderDetails";
import { env } from "@/env";


export default async function SingleProvider({
  params,
}: {
  params: { id: string };
}) {
  const {id}=await params;
  const res = await fetch(`${env.BACKEND_URL}/provider/${id}`, {
    cache: "no-store",
  });

  const { data } = await res.json();

if(!data) {
  return (
    <div className="container mx-auto px-4 py-8 space-y-10">
      <p>Provider not found</p>
    </div>
  );
}
console.log(data)
  return (
    <div className="container mx-auto px-4 py-8 space-y-10">
      <ProviderDetails provider={data} />
    </div>
  );
}
