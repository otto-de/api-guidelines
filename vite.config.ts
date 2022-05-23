/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from "@otto-ec/ottoapi-portal-common/vite.config";
import { guidelines } from "@otto-ec/ottoapi-portal-guidelines/vite.config";
import { join } from "path";

export default defineConfig(
  { outDir: "tmp/viteout" },
  guidelines({
    path: join(process.cwd(), "content", "guidelines"),
    changelogPath: join(process.cwd(), "changes"),
  })
);
