#!/usr/bin/env node

import chalk from "chalk";
import { debug, Debug } from "@otto-ec/assets-debug";
import { pack } from "./lib/pack";

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

export default pack();
