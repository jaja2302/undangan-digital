import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/**",
      },
    ],
  },
  env: {
    JSONBIN_API_KEY: process.env.JSONBIN_API_KEY,
    JSONBIN_BIN_ID: process.env.JSONBIN_BIN_ID,
  },
};

export default nextConfig;
