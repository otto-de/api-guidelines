module.exports = {
  extends: [
    "airbnb-base",
    "airbnb-typescript/base",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parserOptions: {
    project: "./tsconfig.json",
  },
  rules: {
    "@typescript-eslint/ban-ts-comment": "off",
    "import/no-extraneous-dependencies": "off",
    "import/prefer-default-export": "off",
  },
  overrides: [
    {
      files: ["*.spec.ts"],
      rules: {
        "@typescript-eslint/no-explicit-any": "off"
      },
    },
  ],
};
