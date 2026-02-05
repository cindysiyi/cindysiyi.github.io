const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const appSrc = path.resolve(__dirname, "src");
const appPublic = path.resolve(__dirname, "public");
const appDist = path.resolve(__dirname, "dist");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    entry: path.join(appSrc, "index.tsx"),
    output: {
      path: appDist,
      filename: isProduction ? "js/[name].[contenthash].js" : "js/[name].js",
      assetModuleFilename: "assets/[hash][ext][query]",
      clean: true,
      publicPath: "/"
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js"]
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          include: appSrc,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: { importLoaders: 1 }
            },
            "postcss-loader"
          ]
        },
        {
          test: /\.[jt]sx?$/,
          include: appSrc,
          use: {
            loader: "ts-loader",
            options: {
              transpileOnly: true
            }
          }
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(appPublic, "index.html"),
        inject: "body"
      })
    ],
    devServer: {
      static: {
        directory: appPublic
      },
      historyApiFallback: true,
      hot: true,
      port: 3000,
      open: true
    },
    devtool: isProduction ? "source-map" : "eval-cheap-module-source-map",
    optimization: {
      splitChunks: {
        chunks: "all"
      },
      runtimeChunk: "single"
    }
  };
};
