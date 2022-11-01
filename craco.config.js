const path = require("path/posix");

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
    transform: {},
  },
};
