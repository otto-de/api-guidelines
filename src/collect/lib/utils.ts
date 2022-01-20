/* eslint-disable import/no-extraneous-dependencies */
import { table } from "table";
import { colors } from "@otto-ec/assets-core-utils/stdio";
import { Parser } from "./parser";

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
      drawHorizontalLine: (index: number, size: number) => [0, 1, size].includes(index),
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
      drawHorizontalLine: (index: number, size: number) => [0, 1, size].includes(index),
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
