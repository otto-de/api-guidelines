#!/bin/sh

set -e pipefail

# this is to workaround browsersync bug
npm run build

# this will hold the process
npm run dev:docker