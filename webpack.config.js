//

const path = require("path");
const webpack = require("html-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
 //mode
 mode: "production", //development

 // entry
 entry: {
  main: path.resolve(__dirname, "./src/js/main.js"),
 },

 // output
 output: {
  path: path.resolve(__dirname, "public/"),
  filename: "[name][contenthash].js",
  clean: true,
 },

 // devServer
 devServer: {
  static: {
   directory: path.resolve(__dirname, "public"),
  },
  port: 6369,
  compress: true,
  hot: true,
  historyApiFallback: true,
 },

 // plugins
 plugins: [
  new HtmlWebpackPlugin({
   title: "Car racing",
   template: "./src/indexTemp.html",
   filename: "index.html",
   chunks: ["main"],
   title: "Countries",
  }),
 ],

 // loader
 module: {
  rules: [
   {
    test: /\.css?$/i,
    include: path.resolve(__dirname, "src"),
    use: ["style-loader", "css-loader", "postcss-loader"],
   },
   {
    test: /\.m?js$/,
    exclude: /node_modules/,
    use: {
     loader: "babel-loader",
     options: {
      presets: [["@babel/preset-env", { targets: "defaults" }]],
     },
    },
   },
  ],
 },
};
