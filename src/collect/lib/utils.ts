import { debug } from "@otto-ec/assets-debug";
import globby from "globby";
import { registerPartial, registerHelper } from "handlebars";
import chalk from "chalk";
import { table } from "table";
import { readText, outputFile } from "./fs";
import { Parser } from "./parser";
import type { Category } from "../types";
import type { Config } from "./config";

const log = debug("collect:utils");

/**
 * Registers partials on handlebars. Partials will registered with their file names
 * as partial id, so `my_partial.hbs` will become `my_partial` and can be referenced
 * with:
 *
 * ```hbs
 * {{> my_partial}}
 * ```
 *
 * @param config collector configuration
 * @returns Promise
 */
export async function registerPartials(config: Config): Promise<void> {
  const partials = await globby(`${config.templates.partials}/**/*.hbs`, {
    onlyFiles: true,
  });
  log.debug("Register Partials: %o", partials);
  await Promise.all(
    partials.map(async (p) => {
      const pData = await readText(p);
      registerPartial(
        p.replace(`${config.templates.partials}/`, "").replace(".hbs", ""),
        pData
      );
    })
  );
}

/**
 * Registers helpers for heandlebars, add needed handlebars helpers here
 */
export function registerHelpers(): void {
  registerHelper("toLowerCase", (str: string): string => str.toLowerCase());
}

/**
 * Formats rules from Parser.rules into table
 * @returns rules as string table ready for stdout
 */
export function formatRules(): string {
  return table(
    [
      ["Rule ID", "Rule Title", "Source File"],
      ...[...Parser.ruleMap.entries()]
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([k, v]) => [
          chalk.cyanBright(k),
          chalk.magentaBright(v.nav.text),
          chalk.greenBright(v.source),
        ]),
    ],
    {
      drawHorizontalLine: (index: number, size: number) =>
        [0, 1, size].includes(index),
    }
  );
}

export function formatBadLinks(): string {
  return table(
    [
      ["Broken Link", "Source", "Between Lines"],
      ...[...Parser.badLinks.values()]
        .sort((a, b) => a.source.localeCompare(b.source))
        .map((v) => [
          chalk.cyanBright(v.href),
          chalk.magentaBright(v.source),
          chalk.greenBright(v.map),
        ]),
    ],
    {
      drawHorizontalLine: (index: number, size: number) =>
        [0, 1, size].includes(index),
    }
  );
}

/**
 * Writes model to a file for debugging purposes
 * @param path
 * @param cats
 * @returns Promise
 */
export function writeStructure(path: string, cats: Category): Promise<void> {
  return outputFile(
    path,
    JSON.stringify(
      cats,
      (k, v) => {
        // Remove bloating data
        if (["parser", "tokens", "config"].includes(k)) {
          return undefined;
        }
        return v;
      },
      2
    )
  );
}
