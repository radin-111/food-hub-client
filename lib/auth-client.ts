import { env } from "@/env";
import { createAuthClient } from "better-auth/react";
import { includes } from "zod";

export const authClient = createAuthClient({
  baseURL: env.NEXT_PUBLIC_BACKEND_URL,
  fetchOptions: {
    credentials: "include",
  },
});
