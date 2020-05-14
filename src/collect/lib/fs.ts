import { promises as fs } from "fs";
import { debug } from "@otto-ec/assets-debug";

const log = debug("collect:fs");
const { readFile, mkdir, writeFile } = fs;

export function readText(path: string) {
  return readFile(path, "utf-8");
}
