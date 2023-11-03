/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["knex"],
    serverActions: true,
  },
  images: {
    domains: ["picsum.photos"],
  },
};

module.exports = nextConfig;
