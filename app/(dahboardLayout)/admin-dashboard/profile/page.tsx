import Profile from "@/components/modules/user/Profile";
import { userService } from "@/Services/user.service";

export default async function ProfilePage() {
  const { data } = await userService.getMyProfile();
  
  return (
    <div>
      <Profile user={data} />
    </div>
  );
}
