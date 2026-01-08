import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    domains: ["electric-commercial.vercel.app", "www.fivebranches.edu"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/upload/**",
      },
      {
        protocol: "http",
        hostname: "103.90.225.130",
        port: "8002",
        pathname: "/upload/**",
      },
    ],
  },
};

export default nextConfig;
// {
//   protocol: "http",
//   hostname: "103.90.225.130",
//   port: "9001",
//   pathname: "/upload/**",
// },
