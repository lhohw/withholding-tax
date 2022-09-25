const cracoAlias = require("craco-alias");

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
        source: "tsconfig.json",
        baseUrl: "src",
      },
    },
  ],
};
