/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import { debug } from "@otto-ec/assets-debug";
import { stdout } from "@otto-ec/assets-core-utils/stdio";
import { outputFile } from "@otto-ec/assets-core-utils/fs";
import { createMd } from "@otto-ec/ottoapi-portal-guidelines/vite/markdown-it/createMd";
import { getConfig } from "./config";
import { collectCategory } from "./collect";
import { cleanupStructure, formatBadLinks, formatRules } from "./utils";
import { Parser } from "./parser";

const log = debug("collect:pack");

export async function collect(): Promise<void> {
  log.debug("Get Colector Config");
  const config = getConfig();

  log.info("Collect Data from:", config.root);
  const parser = createMd();
  const cats = await collectCategory(config.root, parser, config);

  log.info("Call Render on all Models");
  Parser.sourceMap.forEach((p) => p.render());

  log.info("Compose model");
  const model = {
    config,
    categorys: cleanupStructure(cats),
    docs: Parser.docs,
    headings: [...Parser.docs].map((d) => d.headings).flat(1),
  };

  log.info("write model to file:", config.debug.model);
  await outputFile(config.debug.model, JSON.stringify(model, null, 2));
}

export async function rules(): Promise<void> {
  log.info("Processed rules:");
  stdout(formatRules());
}

export async function badLinks(): Promise<void> {
  stdout(formatBadLinks());
}
