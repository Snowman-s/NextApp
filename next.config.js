const production = process.env.NODE_ENV.match("production") || false;

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  basePath: production ? "/NextApp" : "",
  assetPrefix: production ? "/NextApp" : "/",
  trailingSlash: true,
  output: "export",
  images: {
    unoptimized: true
  }
};

module.exports = nextConfig;
