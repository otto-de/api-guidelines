module.exports = {
  arrowParens: "always", // include parentheses around a sole arrow function parameter
  printWidth: 100,
  overrides: [
    {
      // keep quotes for better TechWriter experience
      files: "./portal/*.ts",
      options: { quoteProps: "preserve", printWidth: 200 },
    },
  ],
};
