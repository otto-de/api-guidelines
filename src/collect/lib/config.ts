// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function getConfig() {
  const res = {
    root: "./guidelines",
    dist: "./dist",
    examples: {
      root: "./src/examples",
    },
    templates: {
      root: "src/templates",
      partials: "src/templates/partials",
    },
    site: {
      name: "Api Guidelines",
    },
  };
  return res;
}
