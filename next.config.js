/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cloud.handcash.io', 'res.cloudinary.com'],
  },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
