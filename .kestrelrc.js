module.exports = {
  bundles: {
    ottoapi: {
      //   js: {
      //     module: "es6",
      //     input: "PATH/TO/YOUR/FILES/ENTRY.js",
      //   },
      css: {
        input: "src/scss/main.scss",
      },
    },
  },
  options: {
    output: "dist/",
    urlPrefix: "/",
    createLatestFiles: true,
  },
  meta: {
    team: "ottoapi",
    app: "ottoapi-guidelines",
  },
};
