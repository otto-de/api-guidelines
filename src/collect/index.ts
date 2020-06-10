#!/usr/bin/env node

import chalk from "chalk";
import { debug, Debug } from "@otto-ec/assets-debug";
import yargs from "yargs";
import { writeLine } from "@otto-ec/toolbox";
import { pack } from "./lib/pack";
import { nextId } from "./lib/nextid";
import { ContentError } from "./lib/errors";
import { lint } from "./lib/lint";

Debug.set({
  namespaces: process.env.DEBUG
    ? `${process.env.DEBUG},collect:*`
    : "collect:*",
});

const log = debug("collect:entrypoint");

process.on("unhandledRejection", (e) => {
  const error = e as Error;
  log.error("\n", chalk.red(error.message), "\n", error.stack);
  process.exit(1);
});

export default yargs
  .options({
    render: {
      boolean: true,
      default: false,
      desc: "if set to true, then will only perform render from model",
    },
    model: {
      boolean: true,
      default: false,
      desc: "if set to true, then will only write model for rendering",
    },
  })
  .command(
    ["$0", "pack"],
    "Collect and render Api Guidelines",
    () => undefined,
    (a) => pack(a)
  )
  .command(
    "nextid",
    "Collect guidelines and calculate next free rule id",
    () => undefined,
    (a) => nextId(a)
  )
  .command(
    "lint",
    "lint guidelines and write errors to stdout",
    () => undefined,
    (a) => lint(a)
  )
  .fail((m, e) => {
    if (e) {
      if (e instanceof ContentError) {
        if (process.env.CI && process.env.GITHUB_ACTIONS) {
          writeLine(
            `::error file=${e.file},line=${e.line},col=${e.col}::${e.message}`
          );
        } else {
          writeLine(e.file);
          writeLine(
            `  ${e.line}:${e.col} ${chalk.redBright("error")} ${e.message}`
          );
        }
      } else {
        log.error(e);
      }
    } else if (m) {
      log.error(m);
    } else {
      log.error("Unknown");
    }

    process.exitCode = 1;
  }).argv;
