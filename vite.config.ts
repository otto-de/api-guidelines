/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from "@otto-ec/ottoapi-portal-common/vite.config";
import { guidelines } from "@otto-ec/ottoapi-portal-guidelines/vite.config";

export default defineConfig({ outDir: "tmp/viteout" }, guidelines);
