import { debug } from "@otto-ec/assets-debug";
import { Arguments } from "yargs";
import { writeLine } from "@otto-ec/toolbox";
import chalk from "chalk";
import { getConfig } from "./config";
import { Args } from "./opts";
import { getParser } from "./markdown";
import { collectCategory } from "./collect";
import { Parser } from "./parser";

const log = debug("collect:nextid");

export async function nextId(argv: Arguments<Args>): Promise<void> {
  log.debug("Get Colector Config");
  const config = getConfig();

  log.info("Calculate next Rule Id");
  const parser = getParser(config);
  await collectCategory(config.root, parser, config);

  const ids = [...Parser.ruleMap.keys()]
    .map((r) => {
      const match = new RegExp(config.rules.matcher).exec(r);
      return Number.parseInt(
        match?.groups?.id ??
          (() => {
            throw new Error(`Could not parse rule id: ${r}`);
          })(),
        10
      );
    })
    .sort((a, b) => a - b);
  log.debug("Parsed IDs: %o", ids);

  let i = 0;
  let next;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    i += 1;
    if (!ids.includes(i)) {
      next = i;
      break;
    }
  }

  const formatted = config.rules.prefix + next.toString().padStart(6, "0");
  writeLine(
    chalk.yellowBright("Next Free Rule ID is: ") +
      chalk.magentaBright(formatted)
  );
}
