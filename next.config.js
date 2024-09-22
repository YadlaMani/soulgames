/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["nextui.org"],
  },
  // Add other configurations as needed
};

module.exports = nextConfig;
