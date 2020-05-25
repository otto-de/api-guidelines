import resolve from "rollup-plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";

export default [
  {
    input: "src/js/index.ts",
    output: { file: "tmp/index.js", format: "es", freeze: false },
    plugins: [resolve(), typescript({ tsconfig: "./tsconfig.browser.json" })],
  },
];
