import globby from "globby";
import { debug } from "@otto-ec/assets-debug";
import MarkdownIt from "markdown-it";
import { readText } from "./fs";
import { Parser } from "./parser";
import { Category } from "../types";
import { Config } from "./config";

const log = debug("collect:collect");

/**
 * Uses globby to find only directories in the given dir
 * @param dir
 * @returns dirs
 */
export function globDirs(dir: string): Promise<string[]> {
  return globby([`${dir}/**/*`], {
    deep: 1,
    onlyDirectories: true,
  });
}

/**
 * Parses category from directory name
 * @param dir
 * @returns category from dir
 */
export function parseCategoryFromDir(dir: string): string {
  return (dir.match(/(?<=[0-9]+_)[a-zA-Z0-9-_]+$/g)?.[0] as string)
    .replace(/[-_]/g, " ")
    .replace(/\w\S+/g, (w) => w[0].toUpperCase() + w.slice(1));
}

/**
 * Collect index data from a single directory
 * @param dir
 */
export async function getIndexData(
  dir: string
): Promise<{
  path: string;
  indexData: string;
  catNameFromDir: string;
}> {
  const globRes = await globby([`${dir}/*index.md`], { onlyFiles: true });
  const path = globRes[0] || undefined;

  log.trace("Is index in %s?: %s", dir, !!path?.length);

  const catName = parseCategoryFromDir(dir);
  const indexData = path?.length ? await readText(path) : `# ${catName}`;

  return { path: path || dir, indexData, catNameFromDir: catName };
}

/**
 * Works together with `collectCategorys` to recursively collect all the
 * Markdown documents in the guidelines source folder
 *
 * @param dir directory to search for documents
 * @param parser markdown instance passed throrugh to the Parser
 * @param level added as category metadata, used to structure the nesting
 */
export async function collectCategory(
  dir: string,
  parser: MarkdownIt,
  config: Config,
  level = 0
): Promise<Category> {
  log.debug("Processing Category in: ", dir);
  const nextLevel = level + 1;
  const { path, indexData, catNameFromDir } = await getIndexData(dir);
  const index = new Parser(parser, config, indexData, level, path);
  const docsPaths = await globby([`${dir}/*.md`, `!${dir}/*index.md`]);
  log.trace("Docs in: %s", dir, docsPaths);

  const docs = await Promise.all(
    docsPaths.map(
      async (p) => new Parser(parser, config, await readText(p), nextLevel, p)
    )
  );

  // eslint-disable-next-line @typescript-eslint/no-use-before-define, no-use-before-define
  const children = await collectCategorys(dir, parser, config, nextLevel);
  const res = {
    name: index.nav?.text || catNameFromDir,
    index,
    docs,
    children,
  };

  return res;
}

/**
 * Works together with `collectCategory` to recursively collect all the
 * Markdown documents in the guidelines source folder
 *
 * @param dir the start point for globbing categorys folders
 * @param parser passed througth to collectCategory function
 * @param level passed througth to collectCategory function
 */
export async function collectCategorys(
  dir: string,
  parser: MarkdownIt,
  config: Config,
  level: number
): Promise<Category[]> {
  log.debug("Find Categorys in: %s", dir);
  const dirs = await globDirs(dir);
  log.trace("Categorys in %s: %O", dir, dirs);

  log.debug("Process %d Categorys in: %s", dirs.length, dir);
  const data = await Promise.all(
    dirs.map((d) => collectCategory(d, parser, config, level))
  );

  return data;
}
