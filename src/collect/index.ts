#!/usr/bin/env node

/* eslint-disable import/no-extraneous-dependencies */
import { debug } from "@otto-ec/assets-debug";
import yargs from "yargs";
import { colors, stdout } from "@otto-ec/assets-core-utils/stdio";
import { badLinks, collect, rules } from "./lib/pack";
import { nextId } from "./lib/nextid";
import { ContentError } from "./lib/errors";

const log = debug("collect:entrypoint");

process.on("unhandledRejection", (e) => {
  const error = e as Error;
  log.error("\n", colors.red(error.message), "\n", error.stack);
  process.exit(1);
});

export default yargs
  .command(
    "list-rules",
    "Collect guidelines and list all rules",
    () => undefined,
    async () => {
      await collect();
      await rules();
    }
  )
  .command(
    "bad-links",
    "Collect guidelines and list all rules",
    () => undefined,
    async () => {
      await collect();
      await badLinks();
    }
  )
  .command(
    "nextid",
    "Collect guidelines and calculate next free rule id",
    () => undefined,
    () => nextId()
  )
  .fail((m, e) => {
    if (e) {
      if (e instanceof ContentError) {
        if (process.env.CI && process.env.GITHUB_ACTIONS) {
          stdout(`::error file=${e.file},line=${e.line},col=${e.col}::${e.message}`);
        } else {
          stdout(e.file);
          stdout(`  ${e.line}:${e.col} ${colors.redBright("error")} ${e.message}`);
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
