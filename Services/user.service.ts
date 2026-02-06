import { env } from "@/env";
import { cookies } from "next/headers";

const AUTH_URL = env.AUTH_URL;
const BACKEND_URL = env.BACKEND_URL;
const frontEndUrl = env.FRONTEND_URL;

export const userService = {
  getSession: async function () {
    try {
      const cookieStore = await cookies();
      const cookieHeader = await cookieStore.toString();
      const res = await fetch(`${AUTH_URL}/get-session`, {
        headers: {
          Cookie: cookieHeader,
          Origin: frontEndUrl,
          Accept: "application/json",
        },
        credentials:"include",

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
        credentials:"include",
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
        credentials:"include",
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
        credentials:"include",
        body: JSON.stringify({ role: "CUSTOMER" }),
      });
      const data = await res.json();
      return data;
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },
};
