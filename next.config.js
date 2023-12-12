/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: "standalone",
  images: {
    // unoptimized: true,
    domains: [
      "localhost",
      "s3.fr-par.scw.cloud",
      "1b48b31f-5be7-4ddd-a28d-1d70627c1cfe.pub.instances.scw.cloud",
      "4766ec8c-7b28-4c2a-86ea-2701e612e516.pub.instances.scw.cloud",
      "edityour.film",
      "edityourfilm.s3.fr-par.scw.cloud",
      "edityourfilm-dev.s3.fr-par.scw.cloud",
      "edityourfilm-prod.s3.fr-par.scw.cloud",
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
