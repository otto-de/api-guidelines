import type { NormalizedProblem } from "@redocly/openapi-core";

export function removeClutter(problems: NormalizedProblem[]) {
  // remove source
  problems
    .flatMap((f) => f.location)
    .flat()
    // eslint-disable-next-line no-param-reassign
    .forEach((location) => delete location.source);

  // remove severity
  // eslint-disable-next-line no-param-reassign
  problems.forEach((p) => delete p.severity);
}
