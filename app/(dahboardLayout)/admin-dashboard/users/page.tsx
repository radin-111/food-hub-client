import { getAllUsers } from "@/Actions/user.actions";
import UserTable from "@/components/modules/user/UserTable";
import Pagination2 from "@/components/ui/pagination2";
import { userService } from "@/Services/user.service";

export const dynamic = "force-dynamic";
export default async function UserPage({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const { page } = await searchParams;
  
  const data  = await getAllUsers(page || "1");

  return (
    <div className="p-4">
      <UserTable users={data?.users || []} />
      <Pagination2  totalPages={data?.totalPages || 1} />
    </div>
  );
}
