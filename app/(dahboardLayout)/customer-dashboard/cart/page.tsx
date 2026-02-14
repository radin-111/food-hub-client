import CartItems from "@/components/modules/Cart/CartItems";
import Pagination2 from "@/components/ui/pagination2";
import { env } from "@/env";
import { cookies } from "next/headers";


export default async function CartPage({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const cookieStore = await cookies();
  const {page}=await searchParams;
  const res = await fetch(`${env.BACKEND_URL}/cart/get-cart-items?page=${page}`, {
    cache: "no-store",
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  
  const { data } = await res.json();
  if(data.result.length===0){
    return <div>
      <p className="text-center text-2xl font-medium text-gray-500">
        Your cart is empty
      </p>
    </div>
  }

  return <div>
    <CartItems cartItems={data?.result} navigatePage={data?.totalPages -1} />
    <Pagination2 totalPages={data?.totalPages} />
  </div>;
}
