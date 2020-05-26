import { promises as fs, BaseEncodingOptions, Mode, OpenMode } from "fs";
import { dirname } from "path";
import { debug } from "@otto-ec/assets-debug";

const log = debug("collect:fs");
const { readFile, mkdir, writeFile } = fs;

export function readText(path: string): Promise<string> {
  log.trace("Read Text from:", path);
  return readFile(path, "utf-8");
}

export async function outputFile(
  path: string,
  data: string | Uint8Array,
  options?:
    | (BaseEncodingOptions & { mode?: Mode; flag?: OpenMode })
    | BufferEncoding
    | null
): Promise<void> {
  log.trace("Ensure dir for:", path);
  await mkdir(dirname(path), { recursive: true });
  log.trace("Write data into:", path);
  await writeFile(path, data, options);
}
