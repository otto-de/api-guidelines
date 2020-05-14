#!/usr/bin/env node

import { debug, Debug } from "@otto-ec/assets-debug";
import { pack } from "./lib/pack";

Debug.set({
  namespaces: process.env.DEBUG
    ? `${process.env.DEBUG},collect:*`
    : "collect:*",
});

const log = debug("collect:entrypoint");

process.on("unhandledRejection", (e) => {
  log.error(e);
  process.exit(1);
});

export default pack();
