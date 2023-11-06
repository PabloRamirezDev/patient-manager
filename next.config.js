/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["knex"],
    serverActions: true,
  },
  images: {
    domains: [
      "picsum.photos",
      "patient-manager-uploads.s3.sa-east-1.amazonaws.com",
    ],
  },
  output: "standalone",
};

module.exports = nextConfig;
