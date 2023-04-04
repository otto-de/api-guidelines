import { expect, it } from "vitest";

import { lintFromString } from "@redocly/openapi-core";
import { createTestConfig } from "./__tests__/createTestConfig";
import { removeClutter } from "./__tests__/removeClutter";
import { FormatEnumerationUpperSnakeCase } from "./format-enumeration-upper-snake-case";

const config = createTestConfig({
  oas3: {
    "test-rule": FormatEnumerationUpperSnakeCase,
  },
});

it("should not find any error", async () => {
  const spec = `
openapi: 3.0.3
paths:
  /get:
    get:
      parameters:
        - schema: 
            enum: 
              - FOO_BAR
              - BAR_FOO
          
      responses:
        200:
          content: 
            application/hal+json:
              schema: 
                enum: 
                  - 1
                  - 2
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
        - schema: 
            enum: 
              - FOO_BAR
              - BAR_foo
              - foo
          
      responses:
        200:
          content: 
            application/hal+json:
              schema: 
                enum: 
                  - 1a
                  - 2B
                  - Bad
                  - GOOD
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
            "pointer": "#/paths/~1get/get/parameters/0/schema/enum/1",
            "reportOnKey": false,
          },
        ],
        "message": "enum value \\"BAR_foo\\" is not upper snake case. See https://api.otto.de/portal/guidelines/r004090",
        "ruleId": "test-rule",
        "suggest": [],
      },
      {
        "location": [
          {
            "pointer": "#/paths/~1get/get/parameters/0/schema/enum/2",
            "reportOnKey": false,
          },
        ],
        "message": "enum value \\"foo\\" is not upper snake case. See https://api.otto.de/portal/guidelines/r004090",
        "ruleId": "test-rule",
        "suggest": [],
      },
      {
        "location": [
          {
            "pointer": "#/paths/~1get/get/responses/200/content/application~1hal+json/schema/enum/0",
            "reportOnKey": false,
          },
        ],
        "message": "enum value \\"1a\\" is not upper snake case. See https://api.otto.de/portal/guidelines/r004090",
        "ruleId": "test-rule",
        "suggest": [],
      },
      {
        "location": [
          {
            "pointer": "#/paths/~1get/get/responses/200/content/application~1hal+json/schema/enum/2",
            "reportOnKey": false,
          },
        ],
        "message": "enum value \\"Bad\\" is not upper snake case. See https://api.otto.de/portal/guidelines/r004090",
        "ruleId": "test-rule",
        "suggest": [],
      },
    ]
  `);
});
