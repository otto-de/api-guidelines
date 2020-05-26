/* eslint-disable import/no-extraneous-dependencies */
import { debug } from "@otto-ec/assets-debug";
import { hbTransform, writeLine } from "@otto-ec/toolbox";
import { join } from "path";
import { getConfig } from "./config";
import { collectCategory } from "./collect";
import { readText, outputFile } from "./fs";
import {
  registerPartials,
  formatRules,
  writeModel,
  registerHelpers,
} from "./utils";
import { getParser } from "./markdown";

const log = debug("collect:pack");

/**
 * Collects Guidelines Documents into a data structure and
 * uses handlebars to render it as HTML Document
 */
export async function pack(): Promise<void> {
  log.debug("Get Colector Config");
  const config = getConfig();
  const parser = getParser(config);

  log.info("Collect Data from:", config.root);
  const cats = await collectCategory(config.root, parser);

  log.debug("Output Model as JSON into:", config.debug.model);
  await writeModel(config.debug.model, cats);

  log.debug("Load render template data");
  registerHelpers();
  await registerPartials(config);
  const indexTpl = await readText(join(config.templates.root, "index.hbs"));

  log.info("Render Data as Html");
  const res = hbTransform(indexTpl, { config, categorys: cats });
  await outputFile(join(config.dist, "index.html"), res);

  log.info("Processed rules:");
  writeLine(formatRules());
}
