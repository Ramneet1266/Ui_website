import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      // Add other image hosts you use here
      {
        protocol: 'https',
        hostname: 'your-other-image-host.com',
      },
    ],
  },
};

export default nextConfig;
