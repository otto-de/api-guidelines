import { expect, it } from "vitest";

import { lintFromString } from "@redocly/openapi-core";
import { createTestConfig } from "./__tests__/createTestConfig";
import { removeClutter } from "./__tests__/removeClutter";
import { UseExtensibleEnum } from "./use-extensible-enum";

const config = createTestConfig({
  oas3: {
    "test-rule": UseExtensibleEnum,
  },
});

it("should not find any error", async () => {
  const spec = `
openapi: 3.0.3
paths:
  /get:
    get:
      parameters:
        - name: aaa
          schema: &schema
            type: string
            x-extensible-enum: 
              - value: Foo
                description: Credit card payment
              - value: Bar
                description: Payment by the customer by bank transfer.
                deprecated: true
              - value: DIRECT_DEBIT
                description: Direct debit from a bank account.
                preview: true
          
      responses:
        200:
          content: 
            application/hal+json:
              schema: *schema
`;

  const result = await lintFromString({
    source: spec,
    config,
  });

  removeClutter(result);

  expect(result).toStrictEqual([]);
});

it("should mark enum and x-extensible-enum clash", async () => {
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
                type: string
                enum: 
                  - 1
                  - 2
                x-extensible-enum:
                  - value: foo
                    description: foooo
                  - value: bar
                    description: barrrrr
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
            "pointer": "#/paths/~1get/get/responses/200/content/application~1hal+json/schema/enum",
            "reportOnKey": false,
          },
          {
            "pointer": "#/paths/~1get/get/responses/200/content/application~1hal+json/schema/x-extensible-enum",
            "reportOnKey": false,
          },
        ],
        "message": "Do not use the enum keyword in combination with x-extensible-enum. See https://api.otto.de/portal/guidelines/r000035",
        "ruleId": "test-rule",
        "suggest": [],
      },
    ]
  `);
});

it("should mark type number", async () => {
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
                type: number
                x-extensible-enum:
                  - value: foo
                    description: foooo
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
            "pointer": "#/paths/~1get/get/responses/200/content/application~1hal+json/schema/type",
            "reportOnKey": false,
          },
        ],
        "message": "Extensible enum is not represented as string. See https://api.otto.de/portal/guidelines/r000035",
        "ruleId": "test-rule",
        "suggest": [],
      },
    ]
  `);
});

it("should mark non boolean deprecated", async () => {
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
                type: string
                x-extensible-enum:
                  - value: foo
                    description: foooo
                    deprecated: "non boolean"
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
            "pointer": "#/paths/~1get/get/responses/200/content/application~1hal+json/schema/x-extensible-enum/0/deprecated",
            "reportOnKey": false,
          },
        ],
        "message": "deprecated is not boolean. See https://api.otto.de/portal/guidelines/r000035",
        "ruleId": "test-rule",
        "suggest": [],
      },
    ]
  `);
});

it("should mark non boolean preview", async () => {
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
                type: string
                x-extensible-enum:
                  - value: foo
                    description: foooo
                    preview: "non boolean"
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
            "pointer": "#/paths/~1get/get/responses/200/content/application~1hal+json/schema/x-extensible-enum/0/preview",
            "reportOnKey": false,
          },
        ],
        "message": "preview is not boolean. See https://api.otto.de/portal/guidelines/r000035",
        "ruleId": "test-rule",
        "suggest": [],
      },
    ]
  `);
});

it("should mark non array", async () => {
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
                type: string
                x-extensible-enum:
                  value: foo
                  description: foooo
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
            "pointer": "#/paths/~1get/get/responses/200/content/application~1hal+json/schema/x-extensible-enum",
            "reportOnKey": false,
          },
        ],
        "message": "x-extensible-enum is not an array. See https://api.otto.de/portal/guidelines/r000035",
        "ruleId": "test-rule",
        "suggest": [],
      },
    ]
  `);
});
