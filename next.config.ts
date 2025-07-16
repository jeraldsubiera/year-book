import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  logging: {
    fetches: {
      hmrRefreshes: true,
    },
    incomingRequests: {
      ignore: [/\api\/v1\/health/],
    },
  }
  /* config options here */
};

export default nextConfig;
