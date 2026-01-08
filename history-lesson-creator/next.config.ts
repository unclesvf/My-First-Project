import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  basePath: "/history",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
