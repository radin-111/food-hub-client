import { env } from "@/env";
import { createAuthClient } from "better-auth/react";
import { nextCookies } from "better-auth/next-js";

export const authClient = createAuthClient({
  baseURL: env.NEXT_PUBLIC_BACKEND_URL,
  fetchOptions: {
    credentials: "include",
  },
  plugins: [nextCookies()],
});
