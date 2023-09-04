/** @type {import('next').NextConfig} */
const NextFederationPlugin = require("@module-federation/nextjs-mf")

const HOST_APP_BASE_URL =
  process.env.HOST_APP_BASE_URL || "http://localhost:3000"

const remotes = (isServer) => {
  const location = isServer ? "ssr" : "chunks"
  return {
    "host-app": `host-app@${HOST_APP_BASE_URL}/_next/static/${location}/remoteEntry.js`,
  }
}

const nextConfig = {
  reactStrictMode: true,
  webpack(config, options) {
    config.plugins.push(
      new NextFederationPlugin({
        name: "blue-app",
        filename: "static/chunks/remoteEntry.js",
        exposes: {
          "./home": "./src/pages/index.tsx",
          "./api": "./src/pages/api/products/index.ts",
        },
        remotes: remotes(options.isServer),
        shared: {},
        extraOptions: {
          exposePages: true,
        },
      }),
    )

    return config
  },
}

module.exports = nextConfig
