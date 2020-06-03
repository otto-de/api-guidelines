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
  cleanupStructure,
  registerHelpers,
  formatBadLinks,
} from "./utils";
import { getParser } from "./markdown";
import { Parser } from "./parser";

const log = debug("collect:pack");

/**
 * Collects Guidelines Documents into a data structure and
 * uses handlebars to render it as HTML Document
 */
export async function pack(): Promise<void> {
  log.debug("Get Colector Config");
  const config = getConfig();

  if (!process.argv.includes("--render")) {
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

    log.info("Processed rules:");
    writeLine(formatRules());

    if (Parser.badLinks.size > 0) {
      log.warn("Sources contain Bad Links");
      writeLine(formatBadLinks());
    }
  }

  if (!process.argv.includes("--model")) {
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
}
