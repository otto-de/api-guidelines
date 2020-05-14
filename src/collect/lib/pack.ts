/* eslint-disable import/no-extraneous-dependencies */
import { debug } from "@otto-ec/assets-debug";
import { promises as fs } from "fs";
import globby from "globby";
import { writeLine, hbTransform, hbCompile } from "@otto-ec/toolbox";
import { join } from "path";
import { registerPartial } from "handlebars";
import { getConfig } from "./config";
import { getParser, Parser } from "./parser";
import { collectCategorys, collectCategory } from "./collect";
import { readText } from "./fs";

const log = debug("collect:pack");
const { readFile, mkdir, writeFile } = fs;

export async function pack(): Promise<void> {
  const config = getConfig();

  log.info("Collect Data");
  const cats = await collectCategory(config.root);

  await writeFile(
    "structure.json",
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
}
