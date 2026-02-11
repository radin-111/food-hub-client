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
        destination: `${env.NEXT_PUBLIC_BACKEND_URL}/api/auth/:path*`,
      },
      // {
      //   source:"/api/v1/:path*",
      //   destination: `${env.BACKEND_URL}/api/v1/:path*`,
      // }
      {
        destination:"auth/:path*",
        source:`${env.NEXT_PUBLIC_BACKEND_URL}/auth/:path*`
      }
    ];
  },
};

export default nextConfig;
