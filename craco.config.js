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
};
