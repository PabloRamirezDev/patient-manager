/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["knex"],
    serverActions: true,
  },
  images: {
    domains: ["picsum.photos"],
  },
  output: 'standalone'
};

module.exports = nextConfig;
