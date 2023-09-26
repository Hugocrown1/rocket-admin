/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["rocket-admin.s3.amazonaws.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

module.exports = nextConfig;
