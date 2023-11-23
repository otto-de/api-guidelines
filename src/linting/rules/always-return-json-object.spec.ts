import { lintFromString } from "@redocly/openapi-core";
import { AlwaysReturnJsonObject } from "./always-return-json-object.js";
import { createTestConfig } from "./__tests__/createTestConfig.js";
import { removeClutter } from "./__tests__/removeClutter.js";

const config = createTestConfig({
  oas3: {
    // @ts-ignore
    "test-rule": AlwaysReturnJsonObject,
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
            type: array
          
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
                  baz:
                    type: string
`;

  const result = await lintFromString({
    source: spec,
    config,
  });

  removeClutter(result);

  expect(result).toStrictEqual([]);
});

it("should not find any error in header", async () => {
  const spec = `
openapi: 3.0.3
paths:
  /get:
    get:
      responses:
        200:
          headers:
            Foo:
              schema:
                type: string
`;

  const result = await lintFromString({
    source: spec,
    config,
  });

  removeClutter(result);

  expect(result).toStrictEqual([]);
});

it("should not find any error in application/pdf", async () => {
  const spec = `
openapi: 3.0.3
paths:
  /get:
    get:
      responses:
        200:
          content:
            application/pdf:
              schema:
                type: string
                format: binary
`;

  const result = await lintFromString({
    source: spec,
    config,
  });

  removeClutter(result);

  expect(result).toStrictEqual([]);
});

it("should mark type array", async () => {
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
                type: array
                items: 
                  type: object
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
        "message": "Top-level type must be an object. See https://api.otto.de/portal/guidelines/r004030",
        "ruleId": "test-rule",
        "suggest": [],
      },
    ]
  `);
});

it("should not find any error within allOf", async () => {
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
                allOf:
                  - $ref: "#/components/schemas/Foo"
                  - description: foooo
                
components: 
  schemas: 
    Foo:
      type: object
      properties: 
        foo:
          type: array
        bar:
          type: object
        baz:
          type: string
`;

  const result = await lintFromString({
    source: spec,
    config,
  });

  removeClutter(result);

  expect(result).toStrictEqual([]);
});

it("should mark allOf", async () => {
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
                allOf:
                  - $ref: "#/components/schemas/Foo"
                  - description: foooo
                
components: 
  schemas: 
    Foo:
      type: array
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
            "pointer": "#/paths/~1get/get/responses/200/content/application~1hal+json/schema/allOf",
            "reportOnKey": false,
          },
        ],
        "message": "Top-level type must be an object. See https://api.otto.de/portal/guidelines/r004030",
        "ruleId": "test-rule",
        "suggest": [],
      },
    ]
  `);
});

it("should mark type within $ref", async () => {
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
                $ref: "#/components/schemas/Foo"
                
components: 
  schemas: 
    Foo:
      type: array
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
            "pointer": "#/components/schemas/Foo/type",
            "reportOnKey": false,
          },
        ],
        "message": "Top-level type must be an object. See https://api.otto.de/portal/guidelines/r004030",
        "ruleId": "test-rule",
        "suggest": [],
      },
    ]
  `);
});

it("should mark type within oneOf", async () => {
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
                oneOf:
                  - type: object
                  - type: array
                  - $ref: "#/components/schemas/Foo"
                
components: 
  schemas: 
    Foo:
      type: array
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
            "pointer": "#/paths/~1get/get/responses/200/content/application~1hal+json/schema/oneOf/1/type",
            "reportOnKey": false,
          },
        ],
        "message": "Top-level type must be an object. See https://api.otto.de/portal/guidelines/r004030",
        "ruleId": "test-rule",
        "suggest": [],
      },
      {
        "location": [
          {
            "pointer": "#/components/schemas/Foo/type",
            "reportOnKey": false,
          },
        ],
        "message": "Top-level type must be an object. See https://api.otto.de/portal/guidelines/r004030",
        "ruleId": "test-rule",
        "suggest": [],
      },
    ]
  `);
});

it("should mark type within anyOf", async () => {
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
                anyOf:
                  - type: object
                  - type: array
                  - $ref: "#/components/schemas/Foo"
                
components: 
  schemas: 
    Foo:
      type: array
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
            "pointer": "#/paths/~1get/get/responses/200/content/application~1hal+json/schema/anyOf/1/type",
            "reportOnKey": false,
          },
        ],
        "message": "Top-level type must be an object. See https://api.otto.de/portal/guidelines/r004030",
        "ruleId": "test-rule",
        "suggest": [],
      },
      {
        "location": [
          {
            "pointer": "#/components/schemas/Foo/type",
            "reportOnKey": false,
          },
        ],
        "message": "Top-level type must be an object. See https://api.otto.de/portal/guidelines/r004030",
        "ruleId": "test-rule",
        "suggest": [],
      },
    ]
  `);
});

it("should not find any errors in requestBody", async () => {
  const spec = `
openapi: 3.0.3
paths:
  /post:
    get:
      requestBody:
        content:
          application/hal+json:
            schema:
              type: array
`;

  const result = await lintFromString({
    source: spec,
    config,
  });

  removeClutter(result);

  expect(result).toStrictEqual([]);
});

it("should mark type within anyOf/oneOf/allOf", async () => {
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
                anyOf:
                  - oneOf: 
                    - type: object
                    - type: array
                  - anyOf: 
                    - $ref: "#/components/schemas/Foo"
                  - allOf: 
                    - $ref: "#/components/schemas/Bar"
                
components: 
  schemas: 
    Foo:
      type: array
    Bar:
      type: array
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
            "pointer": "#/paths/~1get/get/responses/200/content/application~1hal+json/schema/anyOf/0/oneOf/1/type",
            "reportOnKey": false,
          },
        ],
        "message": "Top-level type must be an object. See https://api.otto.de/portal/guidelines/r004030",
        "ruleId": "test-rule",
        "suggest": [],
      },
      {
        "location": [
          {
            "pointer": "#/components/schemas/Foo/type",
            "reportOnKey": false,
          },
        ],
        "message": "Top-level type must be an object. See https://api.otto.de/portal/guidelines/r004030",
        "ruleId": "test-rule",
        "suggest": [],
      },
      {
        "location": [
          {
            "pointer": "#/paths/~1get/get/responses/200/content/application~1hal+json/schema/anyOf/2/allOf",
            "reportOnKey": false,
          },
        ],
        "message": "Top-level type must be an object. See https://api.otto.de/portal/guidelines/r004030",
        "ruleId": "test-rule",
        "suggest": [],
      },
    ]
  `);
});
