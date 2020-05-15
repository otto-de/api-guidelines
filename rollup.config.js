import resolve from "rollup-plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";

export default [
  {
    input: "src/js/index.ts",
    output: { file: "dist/index.js", format: "iife", freeze: false },
    plugins: [resolve(), typescript({ tsconfig: "./tsconfig.browser.json" })],
  },
  // {
  //   input: "node_modules/uikit/dist/js/uikit.js",
  //   output: { file: "dist/uikit.js" },
  // },
];
