import resolve from "rollup-plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";

export default [
  {
    input: "src/js/index.ts",
    file: "dist/index.js",
  },
].map(({ file, input }) => {
  return {
    input,
    output: { file, format: "iife", freeze: false },
    plugins: [resolve(), typescript({ tsconfig: "./tsconfig.browser.json" })],
  };
});
