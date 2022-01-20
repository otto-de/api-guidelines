/* eslint-disable import/no-extraneous-dependencies */
import { debug } from "@otto-ec/assets-debug";
import { colors, stdout } from "@otto-ec/assets-core-utils/stdio";
import assert from "assert";
import { createMd } from "@otto-ec/ottoapi-portal-guidelines/vite/markdown-it/createMd";
import { getConfig } from "./config";
import { collectCategory } from "./collect";
import { Parser } from "./parser";

const log = debug("collect:nextid");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function nextId(): Promise<void> {
  log.debug("Get Colector Config");
  const config = getConfig();

  log.info("Calculate next Rule Id");
  const parser = createMd();
  await collectCategory(config.root, parser, config);

  const ids = [...Parser.ruleMap.keys()]
    .map((r) => {
      const match = new RegExp(config.rules.matcher).exec(r);
      assert(match?.groups?.id, `Could not parse rule id: ${r}`);
      return Number.parseInt(match.groups.id, 10);
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
  stdout(colors.yellowBright("Next Free Rule ID is: ") + colors.magentaBright(formatted));
}
