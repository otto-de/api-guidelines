module.exports = {
  arrowParens: "always", // include parentheses around a sole arrow function parameter
  printWidth: 100,
  overrides: [
    {
      // keep quotes for better TechWriter experience
      files: "./api-guidelines/*.ts",
      options: { quoteProps: "preserve", printWidth: 200 },
    },
  ],
};
