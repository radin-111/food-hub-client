import { env } from "@/env";


export default async function SingleProvider({
  params,
}: {
  params: { id: string };
}) {
  const res = await fetch(`${env.BACKEND_URL}/provider/${params.id}`, {
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
  return (
    <div className="container mx-auto px-4 py-8 space-y-10">
      
    </div>
  );
}
