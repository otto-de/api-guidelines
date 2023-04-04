import { expect, it } from "vitest";

import { lintFromString } from "@redocly/openapi-core";
import { createTestConfig } from "./__tests__/createTestConfig";
import { removeClutter } from "./__tests__/removeClutter";
import { NotUseNullForEmptyArray } from "./not-use-null-for-empty-array";

const config = createTestConfig({
  oas3: {
    "test-rule": NotUseNullForEmptyArray,
  },
});

it("should not find any error", async () => {
  const spec = `
openapi: 3.0.3
paths:
  /get:
    get:
      responses:
        200:
          content: 
            application/hal+json:
              schema: 
                type: object
                properties: 
                  foo:
                    type: array
                    example: []
                  bar:
                    type: object
                    properties: 
                      baz:
                        type: array
                        example: []
                    example:
                      baz: []
                example:
                  foo: []
                  bar:
                    baz: []
              example:
                foo: []
                bar:
                  baz: []
              examples: 
                default:
                  $ref: "#/components/examples/Foo"
                  
components:
  examples:
    Foo:
      foo: []
      bar:
        baz: []
`;
  const result = await lintFromString({
    source: spec,
    config,
  });

  removeClutter(result);

  expect(result).toStrictEqual([]);
});

it("should not find any error when examples are missing", async () => {
  const spec = `
openapi: 3.0.3
paths:
  /get:
    get:
      responses:
        200:
          content: 
            application/hal+json:
              schema: 
                type: object
                properties: 
                  foo:
                    type: array
                  bar:
                    type: object
                    properties: 
                      baz:
                        type: array
`;

  const result = await lintFromString({
    source: spec,
    config,
  });

  removeClutter(result);

  expect(result).toStrictEqual([]);
});

it("should mark null", async () => {
  const spec = `
openapi: 3.0.3
paths:
  /get:
    get:
      responses:
        200:
          content: 
            application/hal+json:
              schema: 
                type: object
                properties: 
                  foo:
                    type: array
                    example: null
                  bar:
                    type: object
                    properties: 
                      baz:
                        type: array
                        example: null
                    example:
                      baz: null
                example:
                  foo: null
                  bar:
                    baz: null
              example:
                foo: null
                bar:
                  baz: null
              examples: 
                default:
                  $ref: "#/components/examples/Foo"
                  
components:
  examples:
    Foo:
      foo: null
      bar:
        baz: null
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
            "pointer": "#/paths/~1get/get/responses/200/content/application~1hal+json/example/foo",
            "reportOnKey": false,
          },
        ],
        "message": "Example for type array is null. See https://api.otto.de/portal/guidelines/r004060",
        "ruleId": "test-rule",
        "suggest": [
          "change to []",
        ],
      },
      {
        "location": [
          {
            "pointer": "#/paths/~1get/get/responses/200/content/application~1hal+json/example/bar/baz",
            "reportOnKey": false,
          },
        ],
        "message": "Example for type array is null. See https://api.otto.de/portal/guidelines/r004060",
        "ruleId": "test-rule",
        "suggest": [
          "change to []",
        ],
      },
      {
        "location": [
          {
            "pointer": "#/paths/~1get/get/responses/200/content/application~1hal+json/schema/example/foo",
            "reportOnKey": false,
          },
        ],
        "message": "Example for type array is null. See https://api.otto.de/portal/guidelines/r004060",
        "ruleId": "test-rule",
        "suggest": [
          "change to []",
        ],
      },
      {
        "location": [
          {
            "pointer": "#/paths/~1get/get/responses/200/content/application~1hal+json/schema/example/bar/baz",
            "reportOnKey": false,
          },
        ],
        "message": "Example for type array is null. See https://api.otto.de/portal/guidelines/r004060",
        "ruleId": "test-rule",
        "suggest": [
          "change to []",
        ],
      },
      {
        "location": [
          {
            "pointer": "#/paths/~1get/get/responses/200/content/application~1hal+json/schema/properties/foo/example",
            "reportOnKey": false,
          },
        ],
        "message": "Example for type array is null. See https://api.otto.de/portal/guidelines/r004060",
        "ruleId": "test-rule",
        "suggest": [
          "change to []",
        ],
      },
      {
        "location": [
          {
            "pointer": "#/paths/~1get/get/responses/200/content/application~1hal+json/schema/properties/bar/example/baz",
            "reportOnKey": false,
          },
        ],
        "message": "Example for type array is null. See https://api.otto.de/portal/guidelines/r004060",
        "ruleId": "test-rule",
        "suggest": [
          "change to []",
        ],
      },
      {
        "location": [
          {
            "pointer": "#/paths/~1get/get/responses/200/content/application~1hal+json/schema/properties/bar/properties/baz/example",
            "reportOnKey": false,
          },
        ],
        "message": "Example for type array is null. See https://api.otto.de/portal/guidelines/r004060",
        "ruleId": "test-rule",
        "suggest": [
          "change to []",
        ],
      },
    ]
  `);
});
