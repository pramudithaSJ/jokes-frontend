import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    BASE_URL: process.env.BASE_URL,
    BASE_URL_MODERATOR: process.env.BASE_URL_MODERATOR,
    BASE_URL_USER: process.env.BASE_URL_USER,
  },
};

export default nextConfig;
