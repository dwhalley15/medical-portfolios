import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "frw6rziicw61rtm1.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
