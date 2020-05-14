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
    markdown: {
      blocks: {
        tip: {
          tag: "div",
          class: "ottoapi-block tip",
        },
        warning: {
          tag: "div",
          class: "ottoapi-block warning",
        },
        danger: {
          tag: "div",
          class: "ottoapi-block danger",
        },
        details: {
          tag: "details",
          class: "ottoapi-block details",
        },
      },
    },
  };
  return res;
}
