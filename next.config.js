/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cloud.handcash.io', 'res.cloudinary.com', 'beta-cloud.handcash.io'],
  },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
