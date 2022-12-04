const production = process.env.NODE_ENV.match("production") || false;

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  basePath: production ? "/NextApp" : "",
  assetPrefix: production ? "/NextApp" : "/",
  trailingSlash: true,
};

module.exports = nextConfig;
