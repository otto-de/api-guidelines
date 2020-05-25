const { name } = require("./package.json")
const options = { delivery: "sync" };

const uiKitJs = [
  "node_modules/uikit/dist/js/uikit.js",
  "node_modules/uikit/dist/js/uikit-icons.js"
]

module.exports = {
  bundles: {
    head: { js: { input: [...uiKitJs], module: "none", options } },
    css: { css: { input: "src/scss/main.scss", options }, },
    body: { js: { input: "tmp/index.js", module: "es6", options }, },
  },
  options: { output: "dist/", urlPrefix: "/", createLatestFiles: true, },
  meta: { team: "ottoapi", app: name, },
};
