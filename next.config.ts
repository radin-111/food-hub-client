import type { NextConfig } from "next";
import { env } from "./env";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "img.freepik.com",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: `${env.BACKEND_URL}/api/auth/:path*`,
      },
      {
        source: "/api/:path*",
        destination: `${env.BACKEND_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
