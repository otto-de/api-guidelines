import { readFileSync } from "node:fs";

const bundle = readFileSync("dist/plugin.js", "utf8");

if (bundle.includes("@redocly/openapi-core")) {
  console.error(
    "ERROR: dist/plugin.js references @redocly/openapi-core.",
    "Redocly doesn't come with openapi-core as a dependency any more since 2.34.",
    "We cannot ship our own openapi-core dependency due to the dual instance",
    "problem. Check for non-type imports in src/",
  );
  process.exit(1);
}
