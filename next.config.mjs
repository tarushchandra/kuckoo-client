/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.com",
      },
      {
        protocol: "https",
        hostname: "*.net",
      },
    ],
  },
  // logging: {
  //   fetches: {
  //     fullUrl: true,
  //   },
  // },
};

export default nextConfig;
