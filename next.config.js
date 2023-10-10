/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: "server",
  images: {
    unoptimized: true,
    domains: [
      "localhost",
      "res.cloudinary.com",
      "s3.fr-par.scw.cloud",
      "dev-edy.fr",
      "edityour.film",
    ],
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    config.resolve.fallback = { fs: false };

    return config;
  },
};

module.exports = nextConfig;
