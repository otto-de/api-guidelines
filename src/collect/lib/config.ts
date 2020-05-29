/**
 * Creates configuration object for collector
 */
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
      name: "OTTO API Guidelines",
    },
    markdown: {
      blocks: {
        tip: {
          tag: "div",
          class: "api-custom-container api-custom-container--tip",
        },
        warning: {
          tag: "div",
          class: "api-custom-container api-custom-container--warning",
        },
        danger: {
          tag: "div",
          class: "api-custom-container api-custom-container--danger",
        },
        details: {
          tag: "details",
          class: "api-custom-container api-custom-container--details",
        },
      },
    },
    debug: {
      model: "./tmp/structure.json",
    },
  };
  return res;
}

export type Config = ReturnType<typeof getConfig>;
