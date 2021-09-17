#!/usr/bin/env node

import { debug } from "@otto-ec/assets-debug";
import yargs from "yargs";
import { colors, stdout } from "@otto-ec/assets-core-utils/stdio";
import { collect, render, rules, badLinks } from "./lib/pack";
import { nextId } from "./lib/nextid";
import { ContentError } from "./lib/errors";
import { lint } from "./lib/lint";

// Debug.set({
//   namespaces: process.env.DEBUG
//     ? `${process.env.DEBUG},collect:*`
//     : "collect:*",
// });

const log = debug("collect:entrypoint");

process.on("unhandledRejection", (e) => {
  const error = e as Error;
  log.error("\n", colors.red(error.message), "\n", error.stack);
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
    async (a) => {
      await collect(a);
      await render(a);
      await rules(a);
      await badLinks(a);
    }
  )
  .command(
    "model",
    "Collect guidelines and write model file",
    () => undefined,
    async (a) => {
      await collect(a);
      await rules(a);
      await badLinks(a);
    }
  )
  .command(
    "render",
    "Collect guidelines and list all rules",
    () => undefined,
    async (a) => {
      await render(a);
    }
  )
  .command(
    "list-rules",
    "Collect guidelines and list all rules",
    () => undefined,
    async (a) => {
      await collect(a);
      await rules(a);
    }
  )
  .command(
    "bad-links",
    "Collect guidelines and list all rules",
    () => undefined,
    async (a) => {
      await collect(a);
      await badLinks(a);
    }
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
          stdout(
            `::error file=${e.file},line=${e.line},col=${e.col}::${e.message}`
          );
        } else {
          stdout(e.file);
          stdout(
            `  ${e.line}:${e.col} ${colors.redBright("error")} ${e.message}`
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
