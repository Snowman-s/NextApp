const production = process.env.NODE_ENV.match('production') || false

module.exports = {
  reactStrictMode: true,
  basePath: production? '/NextApp': ''
}
