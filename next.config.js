/** @type {import('next').NextConfig} */
const NextFederationPlugin = require("@module-federation/nextjs-mf")
const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin

const nextConfig = {
  reactStrictMode: true,
  webpack(config, options) {
    config.plugins.push(
      new NextFederationPlugin({
        name: "products",
        filename: "static/chunks/remoteEntry.js",
        exposes: {
          "./home": "./src/pages/index.tsx",
          "./api": "./src/pages/api/products/index.ts",
        },
        remotes: {},
        shared: {},
        extraOptions: {
          exposePages: false,
        },
      }),
    )
    config.plugins.push(
      new ModuleFederationPlugin({
        name: "products_services",
        filename: "static/chunks/remoteServicesEntry.js",
        library: { type: "commonjs-module" },
        exposes: {
          "./getProductsApiRoute": "./src/pages/api/products/index.ts",
        },
      }),
    )

    return config
  },
}

module.exports = nextConfig
