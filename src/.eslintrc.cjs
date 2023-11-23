module.exports = {
  extends: ["airbnb-base", "plugin:prettier/recommended"],
  root: true,
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
      },
      extends: [
        "airbnb-base",
        "airbnb-typescript/base",
        "plugin:prettier/recommended",
        "plugin:@typescript-eslint/recommended",
      ],
      rules: {
        "@typescript-eslint/ban-ts-comment": "off",
        "import/no-extraneous-dependencies": "off",
        "import/prefer-default-export": "off",
      },
    },
    {
      files: ["*.spec.ts"],
      rules: {
        "@typescript-eslint/no-explicit-any": "off",
      },
    },
  ],
};
