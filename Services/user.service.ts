import { env } from "@/env";
import { cookies } from "next/headers";

const AUTH_URL = env.AUTH_URL;
const BACKEND_URL = env.BACKEND_URL;
export const userService = {
  getSession: async function () {
    try {
      const cookieStore = await cookies();
      const cookieHeader = await cookieStore.toString();
      const res = await fetch(`${AUTH_URL}/get-session`, {
        headers: {
          Cookie: cookieHeader,
          Origin: env.NEXT_PUBLIC_BACKEND_URL,
          Accept: "application/json",
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
      console.error(err);
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
          Origin: env.NEXT_PUBLIC_BACKEND_URL,
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
};



