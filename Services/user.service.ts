import { env } from "@/env";
import { cookies } from "next/headers";

const AUTH_URL = env.AUTH_URL;
const BACKEND_URL = env.BACKEND_URL;
export const userService = {
  getSession: async function () {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${AUTH_URL}/get-session`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
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
      const users = fetch(`${BACKEND_URL}/users?page=${page}`, {
        cache: "no-store",
        headers: {
          Cookie: cookieStore.toString(),
        },
      });
      return users.then((res) => res.json());
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },
};
