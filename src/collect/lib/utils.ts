import { debug } from "@otto-ec/assets-debug";
import { handlebars } from "@otto-ec/assets-core-utils/external";
import { table } from "table";
import { globby } from "@otto-ec/toolbox-cli-core/utils";
import { colors } from "@otto-ec/assets-core-utils/stdio";
import { readText } from "./fs";
import { Parser } from "./parser";
import type { Config } from "./config";
import { FrontMatter } from "../types";

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
      handlebars.registerPartial(
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
  handlebars.registerHelper("toLowerCase", (str: string): string =>
    str.toLowerCase()
  );

  handlebars.registerHelper(
    "frontMatterToClasses",
    (frontMatter: FrontMatter) => {
      const { type, reviewType } = frontMatter;
      // eslint-disable-next-line no-nested-ternary
      const appliesTo = Array.isArray(frontMatter.appliesTo)
        ? frontMatter.appliesTo
        : typeof frontMatter.appliesTo === "string"
        ? [frontMatter.appliesTo]
        : undefined;

      const classes = [] as string[];

      if (type) {
        classes.push(`js_rule-${type.toLowerCase().replace(/[\s\W]/g, "-")}`);
      }

      if (appliesTo) {
        appliesTo.forEach((a) => {
          classes.push(`js_rule-applies-${a.toLowerCase()}`);
        });
      }

      if (reviewType) {
        classes.push(
          `js_rule-review-${reviewType.toLowerCase().replace(/[\s\W]/g, "-")}`
        );
      }

      return classes.join(" ");
    }
  );
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
          colors.cyanBright(k),
          colors.magentaBright(v.nav.text),
          colors.greenBright(v.source),
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
          colors.cyanBright(v.href),
          colors.magentaBright(v.source),
          colors.greenBright(v.map),
        ]),
    ],
    {
      drawHorizontalLine: (index: number, size: number) =>
        [0, 1, size].includes(index),
    }
  );
}

export function cleanupStructure<T>(input: T): T {
  return JSON.parse(
    JSON.stringify(
      input,
      // Remove bloating data
      (k, v) => (["parser", "tokens", "config"].includes(k) ? undefined : v)
    )
  );
}
