/* eslint-disable import/no-extraneous-dependencies */
import { debug } from "@otto-ec/assets-debug";
import { promises as fs } from "fs";
import globby from "globby";
import chalk from "chalk";
import { table } from "table";
import { hbTransform } from "@otto-ec/toolbox";
import { join } from "path";
import { registerPartial, registerHelper } from "handlebars";
import { getConfig } from "./config";
import { collectCategory } from "./collect";
import { readText } from "./fs";
import { Parser } from "./parser";

const log = debug("collect:pack");
const { mkdir, writeFile } = fs;

registerHelper("toLowerCase", (str: string): string => str.toLowerCase());

export async function pack(): Promise<void> {
  const config = getConfig();

  log.info("Collect Data");
  const cats = await collectCategory(config.root);

  await mkdir("tmp", { recursive: true });
  await writeFile(
    "tmp/structure.json",
    JSON.stringify(
      cats,
      (k, v) => {
        if (["parser", "tokens"].includes(k)) {
          return undefined;
        }
        return v;
      },
      2
    )
  );

  const partials = await globby(`${config.templates.partials}/**/*.hbs`, {
    onlyFiles: true,
  });
  log.debug("Partials: %O", partials);
  await Promise.all(
    partials.map(async (p) => {
      const pData = await readText(p);
      registerPartial(
        p.replace(`${config.templates.partials}/`, "").replace(".hbs", ""),
        pData
      );
    })
  );

  const indexTpl = await readText(join(config.templates.root, "index.hbs"));

  await mkdir(config.dist, { recursive: true });

  log.debug("Transform Stuff");
  const res = hbTransform(indexTpl, {
    config,
    categorys: cats,
  });
  await writeFile(join(config.dist, "index.html"), res);

  log.info("Processed rules:");
  process.stdout.write(
    table(
      [
        ["Rule ID", "Rule Title", "Source File"],
        ...[...Parser.rules.entries()]
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([k, v]) => [
            chalk.yellowBright(k),
            chalk.magentaBright(v.navTitle),
            chalk.greenBright(v.source),
          ]),
      ],
      {
        drawHorizontalLine: (index: number, size: number) =>
          [0, 1, size].includes(index),
      }
    )
  );
  process.stdout.write("\n");
}
