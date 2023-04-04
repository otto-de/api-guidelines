import { expect, it } from "vitest";

import { lintFromString } from "@redocly/openapi-core";
import { createTestConfig } from "./__tests__/createTestConfig";
import { removeClutter } from "./__tests__/removeClutter";
import { UseCamelCaseForQueryParameter } from "./use-camel-case-for-query-parameter";

const config = createTestConfig({
  oas3: {
    "test-rule": UseCamelCaseForQueryParameter,
  },
});

it("should not find any error", async () => {
  const spec = `
openapi: 3.0.3
paths:
  /get:
    get:
      parameters:
        - in: query
          name: fooBar
        - in: query
          name: barFoo
`;

  const result = await lintFromString({
    source: spec,
    config,
  });

  removeClutter(result);

  expect(result).toStrictEqual([]);
});

it("should mark non upper snake case values", async () => {
  const spec = `
openapi: 3.0.3
paths:
  /get:
    get:
      parameters:
        - in: query
          name: foo-bar
        - in: query
          name: FOO_BAR
`;

  const result = await lintFromString({
    source: spec,
    config,
  });

  removeClutter(result);

  expect(result).toMatchInlineSnapshot(`
    [
      {
        "location": [
          {
            "pointer": "#/paths/~1get/get/parameters/0/name",
            "reportOnKey": false,
          },
        ],
        "message": "Query parameter is not in camel case.",
        "ruleId": "test-rule",
        "suggest": [],
      },
      {
        "location": [
          {
            "pointer": "#/paths/~1get/get/parameters/1/name",
            "reportOnKey": false,
          },
        ],
        "message": "Query parameter is not in camel case.",
        "ruleId": "test-rule",
        "suggest": [],
      },
    ]
  `);
});
