import { lintFromString } from "@redocly/openapi-core";
import { createTestConfig } from "./__tests__/createTestConfig.js";
import { removeClutter } from "./__tests__/removeClutter.js";
import { UseStringEnum } from "./use-string-enum.js";

const config = createTestConfig({
  oas3: {
    // @ts-ignore
    "test-rule": UseStringEnum,
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
          schema: 
            type: string
            enum: 
              - foo
              - bar
          
      responses:
        200:
          content: 
            application/hal+json:
              schema: 
                type: string
                properties: 
                  foo:
                    type: array
                  bar:
                    type: object
                  status:
                    type: number
                    enum: [404]
`;

  const result = await lintFromString({
    source: spec,
    config,
  });

  removeClutter(result);

  expect(result).toStrictEqual([]);
});

it("should mark type number and integer", async () => {
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
                enum: 
                  - 1
                  - 2

components: 
  schemas: 
    Foo:
      type: object
      properties: 
        foo:
          type: integer
          enum: 
            - 3
            - 4 
        bar:
          type: string
          enum: 
            - BAR1
            - BAR2
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
        "message": "Enumeration is not represented as string. See https://api.otto.de/portal/guidelines/r004080",
        "ruleId": "test-rule",
        "suggest": [],
      },
      {
        "location": [
          {
            "pointer": "#/components/schemas/Foo/properties/foo/type",
            "reportOnKey": false,
          },
        ],
        "message": "Enumeration is not represented as string. See https://api.otto.de/portal/guidelines/r004080",
        "ruleId": "test-rule",
        "suggest": [],
      },
    ]
  `);
});

it("should mark missing type", async () => {
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
                enum: 
                  - FOO
                  - BAR
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
        "message": "Enumeration is not represented as string. See https://api.otto.de/portal/guidelines/r004080",
        "ruleId": "test-rule",
        "suggest": [],
      },
    ]
  `);
});
