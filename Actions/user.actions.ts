"use server";

import { userService } from "@/Services/user.service";
import { revalidatePath } from "next/cache";

export const getAllUsers = async (page: string) => {
  try {
    const { data } = await userService.getUsers(page || "1");

    return data;
  } catch (err) {
    return { data: null, error: { message: "Something Went Wrong" } };
  }
};

export const makeAdminFunction = async (userId: string) => {
  try {
    const res = await userService.makeAdmin(userId);
    revalidatePath("/admin-dashboard/users");
    return res;
  } catch (err) {
    return { data: null, error: { message: "Something Went Wrong" } };
  }
};

export const removeAdminFunction = async (userId: string) => {
  try {
    const res = await userService.removeAdmin(userId);
    revalidatePath("/admin-dashboard/users");
    return res;
  } catch (err) {
    return { data: null, error: { message: "Something Went Wrong" } };
  }
};

export const updateUserProfile = async (profileData: any) => {
  try {
    const res = await userService.updateProfile(profileData);
    revalidatePath("/admin-dashboard/profile");
    revalidatePath("/provider-dashboard/profile");
    revalidatePath("/customer-dashboard/profile");
    return res;
  } catch (err) {
    return { data: null, error: { message: "Something Went Wrong" } };
  }
};
