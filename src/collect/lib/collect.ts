import globby from "globby";
import { debug } from "@otto-ec/assets-debug";
import { readText } from "./fs";
import { Parser } from "./parser";

const log = debug("collect:collect");

export interface Category {
  name: string;
  index: Parser;
  docs: Parser[];
  children: Category[];
}

export function globDirs(dir: string): Promise<string[]> {
  return globby([`${dir}/**/*`], {
    deep: 1,
    onlyDirectories: true,
  });
}

export function parseCategoryFromDir(dir: string): string {
  return (dir.match(/(?<=[0-9]+_)[a-zA-Z0-9-_]+$/g)?.[0] as string)
    .replace(/[-_]/g, " ")
    .replace(/\w\S+/g, (w) => w[0].toUpperCase() + w.slice(1));
}

export async function getIndexData(
  dir: string
): Promise<{
  indexData: string;
  catNameFromDir: string;
}> {
  const index = await globby([`${dir}/*index.md`], {
    onlyFiles: true,
  });
  log.trace("Is index in %s?: %s", dir, !!index.length);
  const catName = parseCategoryFromDir(dir);
  const indexData = index.length ? await readText(index[0]) : `# ${catName}`;
  return {
    indexData,
    catNameFromDir: catName,
  };
}

export async function collectCategory(
  dir: string,
  level = 0
): Promise<Category> {
  const { indexData, catNameFromDir } = await getIndexData(dir);
  const index = new Parser(indexData, level);
  const docsPaths = await globby([`${dir}/*.md`, `!${dir}/index.md`]);
  log.trace("Docs in: %s", dir, docsPaths);

  const docs = await Promise.all(
    docsPaths.map(async (p) => new Parser(await readText(p), level + 1))
  );
  // eslint-disable-next-line @typescript-eslint/no-use-before-define, no-use-before-define
  const children = await collectCategorys(dir, level + 1);
  const res = {
    name: index.navTitle || catNameFromDir,
    index,
    docs,
    children,
  };
  return res;
}

export async function collectCategorys(
  dir: string,
  level: number
): Promise<Category[]> {
  log.debug("Find Categorys in: %s", dir);
  const dirs = await globDirs(dir);
  log.trace("Categorys in %s: %O", dir, dirs);

  log.debug("Process %d Categorys in: %s", dirs.length, dir);
  const data = await Promise.all(dirs.map((d) => collectCategory(d, level)));

  return data;
}
