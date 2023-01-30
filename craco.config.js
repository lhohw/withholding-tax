const path = require("path/posix");
const CopyPlugin = require("copy-webpack-plugin");

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
  webpack: {
    alias: {
      components: path.resolve(__dirname, "src/components"),
      constants: path.resolve(__dirname, "src/constants"),
      styles: path.resolve(__dirname, "src/styles"),
      lib: path.resolve(__dirname, "src/lib"),
      features: path.resolve(__dirname, "src/features"),
      app: path.resolve(__dirname, "src/app"),
    },
    plugins: [
      new CopyPlugin({
        patterns: [
          {
            from: "node_modules/pdfjs-dist/cmaps/",
            to: "./cmaps/",
          },
        ],
      }),
    ],
  },
  jest: {
    configure: {
      moduleNameMapper: {
        "^components/(.*)": "<rootDir>/src/components/$1",
        "^constants/(.*)": "<rootDir>/src/constants/$1",
        "^styles/(.*)": "<rootDir>/src/styles/$1",
        "^lib/(.*)": "<rootDir>/src/lib/$1",
        "^features/(.*)": "<rootDir>/src/features/$1",
        "^app/(.*)": "<rootDir>/src/app/$1",
      },
    },
  },
};
