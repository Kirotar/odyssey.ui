const { defineConfig } = require('@vue/cli-service')
const path = require("path");

  module.exports = defineConfig({
    transpileDependencies: true,
    devServer: {
      port: 3000,
            },
    configureWebpack: {
      resolve: {
        alias: {
          '@': path.resolve(__dirname, 'src') // Maps "@" to the "src" directory
        }
      }
    }
  });
