/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import { debug } from "@otto-ec/assets-debug";
import { hbTransform, writeLine } from "@otto-ec/toolbox";
import { join } from "path";
import type { Arguments } from "yargs";
import { getConfig } from "./config";
import { collectCategory } from "./collect";
import { readText, outputFile } from "./fs";
import {
  registerPartials,
  formatRules,
  cleanupStructure,
  registerHelpers,
  formatBadLinks,
} from "./utils";
import { getParser } from "./markdown";
import { Parser } from "./parser";
import { Args } from "./opts";

const log = debug("collect:pack");

export async function collect(argv: Arguments<Args>): Promise<void> {
  log.debug("Get Colector Config");
  const config = getConfig();

  log.info("Collect Data from:", config.root);
  const parser = getParser(config);
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

export async function rules(argv: Arguments<Args>): Promise<void> {
  log.info("Processed rules:");
  writeLine(formatRules());
}

export async function badLinks(argv: Arguments<Args>): Promise<void> {
  writeLine(formatBadLinks());
}

export async function render(argv: Arguments<Args>): Promise<void> {
  log.debug("Get Colector Config");
  const config = getConfig();

  log.debug("Load Model data");
  const model = JSON.parse(await readText(config.debug.model));

  log.debug("Load render template data");
  registerHelpers();
  await registerPartials(config);
  const indexTpl = await readText(join(config.templates.root, "index.hbs"));

  log.info("Render Data as Html");

  const res = hbTransform(indexTpl, model);
  await outputFile(join(config.dist, "index.html"), res);
}
