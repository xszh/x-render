const path = require("path");

module.exports = {
  entry: "./src/x-render.ts",
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "x-render.js",
    library: "XRender",
    libraryTarget: "umd",
  },
  watch: true,
  watchOptions: {
    ignored: [/node_modules/, /dist/]
  }
};
