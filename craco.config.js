const cracoAlias = require("craco-alias");
// const path = require("path");
// const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  babel: {
    plugins: ["@emotion"],
    presets: [
      [
        "@babel/preset-react",
        {
          runtime: "automatic",
          importSource: "@emotion/react",
        },
      ],
    ],
  },
  plugins: [
    {
      plugin: cracoAlias,
      options: {
        source: "tsconfig",
        baseUrl: "src",
        tsConfigPath: "./tsconfig.paths.json",
      },
    },
  ],
};
