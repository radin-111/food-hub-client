import ProviderDetails from "@/components/modules/Provider/ProviderDetails";

import { env } from "@/env";
import { SearchX } from "lucide-react";

export default async function SingleProvider({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const res = await fetch(`${env.BACKEND_URL}/provider/${id}`, {
    cache: "no-store",
  });

  const { data } = await res.json();

  if (!data) {
    return (
      <div className="container mx-auto px-4 py-20 my-5 flex justify-center">
        <div className="w-full max-w-2xl py-12 px-6 sm:px-8 flex flex-col items-center text-center shadow-lg rounded-lg bg-white">
          <div className="rounded-full bg-gray-200 p-6 mb-6">
            <SearchX className="h-12 w-12 sm:h-16 sm:w-16 text-red-500" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-red-500 mb-2">
            Provider Not Found
          </h2>

          <p className="text-base sm:text-lg max-w-sm mx-auto text-red-500">
            We couldn't find the provider you're looking for. It may have been
            moved, deleted, or the link might be incorrect.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-10">
      <ProviderDetails provider={data} />
    </div>
  );
}
