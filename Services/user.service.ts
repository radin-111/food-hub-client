import { env } from "@/env";
import { cookies } from "next/headers";

// const AUTH_URL = env.AUTH_URL;
const BACKEND_URL = env.BACKEND_URL;
const frontEndUrl = env.FRONTEND_URL;
const imgbbKey = env.IMGBB_KEY;

export const userService = {
  getSession: async function () {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${BACKEND_URL}/api/me`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        credentials: "include",
        cache: "no-store",
      });

      const session = await res.json();

      if (session === null) {
        return { data: null, error: { message: "Session is missing." } };
      }

      return { data: session, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },
  getUsers: async function (page: string) {
    try {
      const cookieStore = await cookies();
      const cookieHeader = await cookieStore.toString();
      const users = await fetch(`${BACKEND_URL}/users?page=${page}`, {
        headers: {
          Cookie: cookieHeader,
          Origin: frontEndUrl,
          Accept: "application/json",
        },
        credentials: "include",
        cache: "no-store",
      });
      const res = await users.json();
      return res;
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },

  makeAdmin: async function (userId: string) {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${BACKEND_URL}/users/${userId}/role`, {
        method: "PATCH",
        headers: {
          Cookie: cookieStore.toString(),
          "Content-Type": "application/json",
          Origin: frontEndUrl,
        },
        credentials: "include",
        cache: "no-store",
        body: JSON.stringify({ role: "ADMIN" }),
      });
      const data = await res.json();
      return data;
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },

  removeAdmin: async function (userId: string) {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${BACKEND_URL}/users/${userId}/role`, {
        method: "PATCH",
        cache: "no-store",

        headers: {
          Cookie: cookieStore.toString(),
          Origin: frontEndUrl,
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ role: "CUSTOMER" }),
      });
      const data = await res.json();
      return data;
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },
  uploadImage: async function (image: File) {
    try {
      const formData = new FormData();
      formData.append("image", image);
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${imgbbKey}`,
        {
          method: "POST",

          body: formData,
        },
      );
      const data = await res.json();
      return data;
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },
  getMyProfile: async function () {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${BACKEND_URL}/user/myProfile`, {
        headers: {
          Cookie: cookieStore.toString(),
          Origin: frontEndUrl,
          Accept: "application/json",
        },
        credentials: "include",
        cache: "no-store",
      });
      const data = await res.json();
      return data;
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },
  updateProfile: async function (profileData: any) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${BACKEND_URL}/user/myProfile`, {
        method: "PATCH",
        headers: {
          Cookie: cookieStore.toString(),
          "Content-Type": "application/json",
          Origin: frontEndUrl,
        },
        credentials: "include",

        body: JSON.stringify(profileData),
      });
      const data = await res.json();
      return data;
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },
};
