
// MANAGED BY: @otto-ec/bender
// remove magic string if you want to override default config

/** @type {import("@commitlint/types").UserConfig} */
const config = {
  ...require("@otto-ec/bender/configs/.commitlintrc"),
  // Extrend config here if needed
  // rules: {
  //   "footer-empty": [2, "always"]
  // }
};

module.exports = config;

