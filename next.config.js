/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: "standalone",
  images: {
    unoptimized: true,
    domains: [
      "localhost",
      "res.cloudinary.com",
      "s3.fr-par.scw.cloud",
      "1b48b31f-5be7-4ddd-a28d-1d70627c1cfe.pub.instances.scw.cloud",
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
