import { lintFromString } from "@redocly/openapi-core";
import { createTestConfig } from "./__tests__/createTestConfig.js";
import { removeClutter } from "./__tests__/removeClutter.js";
import { UseCommonDateAndTimeFormat } from "./use-common-date-and-time-format.js";

const config = createTestConfig({
  oas3: {
    // @ts-ignore
    "test-rule": UseCommonDateAndTimeFormat,
  },
});

it("should not find any error with format date", async () => {
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
                    type: string
                    format: date
                    example: 2023-09-11
                  bar:
                    type: object
                    properties: 
                      baz:
                        type: string
                        format: date
                        example: 2022-11-18
                    example:
                      baz: 2022-12-03
                example:
                  foo: 2023-06-20
                  bar:
                    baz: 2022-10-09
              example:
                foo: 2023-03-02
                bar:
                  baz: 2023-07-23
              examples: 
                default:
                  $ref: "#/components/examples/Foo"
                  
components:
  examples:
    Foo:
      foo: 2022-12-14
      bar:
        baz: 2023-02-05
`;
  const result = await lintFromString({
    source: spec,
    config,
  });

  removeClutter(result);

  expect(result).toStrictEqual([]);
});

it("should not find any error with format date-time", async () => {
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
                    type: string
                    format: date-time
                    example: 2022-10-06T15:28:09+00:00
                  bar:
                    type: object
                    properties: 
                      baz:
                        type: string
                        format: date-time
                        example: 2023-01-21T12:47:36-05:00
                    example:
                      baz: 2023-07-11T19:56:25+02:00
                example:
                  foo: 2022-11-30T02:11:01Z
                  bar:
                    baz: 2023-05-19T08:33:44-07:00
              example:
                foo: 2022-12-22T21:59:58+01:00
                bar:
                  baz: 2023-08-18T16:44:12Z
              examples: 
                default:
                  $ref: "#/components/examples/Foo"
                  
components:
  examples:
    Foo:
      foo: 2022-09-09T10:22:50-04:00
      bar:
        baz: 2023-03-27T07:15:25-06:00
`;
  const result = await lintFromString({
    source: spec,
    config,
  });

  removeClutter(result);

  expect(result).toStrictEqual([]);
});

it("should mark invalid date examples", async () => {
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
                    type: string
                    format: date
                    example: foo
                  bar:
                    type: object
                    properties: 
                      baz:
                        type: string
                        format: date
                        example: 2023-13-13
                    example:
                      baz: nooo
                example:
                  foo: 13/15
                  bar:
                    baz: 2022-10-06T15:28:09+00:00
              example:
                foo: 08/07/2023
                bar:
                  baz: wrong
              examples: 
                default:
                  $ref: "#/components/examples/Foo"
                  
components:
  examples:
    Foo:
      foo: 01 01 2033
      bar:
        baz: 2023-08-03 11:11:11aa
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
        "message": "Invalid date or date-time format. See https://api.otto.de/portal/guidelines/r100072",
        "ruleId": "test-rule",
        "suggest": [],
      },
      {
        "location": [
          {
            "pointer": "#/paths/~1get/get/responses/200/content/application~1hal+json/example/bar/baz",
            "reportOnKey": false,
          },
        ],
        "message": "Invalid date or date-time format. See https://api.otto.de/portal/guidelines/r100072",
        "ruleId": "test-rule",
        "suggest": [],
      },
      {
        "location": [
          {
            "pointer": "#/paths/~1get/get/responses/200/content/application~1hal+json/schema/foo",
            "reportOnKey": false,
          },
        ],
        "message": "Invalid date or date-time format. See https://api.otto.de/portal/guidelines/r100072",
        "ruleId": "test-rule",
        "suggest": [],
      },
      {
        "location": [
          {
            "pointer": "#/paths/~1get/get/responses/200/content/application~1hal+json/schema/bar/baz",
            "reportOnKey": false,
          },
        ],
        "message": "Invalid date or date-time format. See https://api.otto.de/portal/guidelines/r100072",
        "ruleId": "test-rule",
        "suggest": [],
      },
      {
        "location": [
          {
            "pointer": "#/paths/~1get/get/responses/200/content/application~1hal+json/schema/properties/foo",
            "reportOnKey": false,
          },
        ],
        "message": "Invalid date or date-time format. See https://api.otto.de/portal/guidelines/r100072",
        "ruleId": "test-rule",
        "suggest": [],
      },
      {
        "location": [
          {
            "pointer": "#/paths/~1get/get/responses/200/content/application~1hal+json/schema/properties/bar/baz",
            "reportOnKey": false,
          },
        ],
        "message": "Invalid date or date-time format. See https://api.otto.de/portal/guidelines/r100072",
        "ruleId": "test-rule",
        "suggest": [],
      },
      {
        "location": [
          {
            "pointer": "#/paths/~1get/get/responses/200/content/application~1hal+json/schema/properties/bar/properties/baz",
            "reportOnKey": false,
          },
        ],
        "message": "Invalid date or date-time format. See https://api.otto.de/portal/guidelines/r100072",
        "ruleId": "test-rule",
        "suggest": [],
      },
    ]
  `);
});

it("should mark invalid date-time examples", async () => {
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
                    type: string
                    format: date-time
                    example: foo
                  bar:
                    type: object
                    properties: 
                      baz:
                        type: string
                        format: date-time
                        example: 13/15/2023
                    example:
                      baz: nooo
                example:
                  foo: 13/15
                  bar:
                    baz: 2023-07-14 25:30:15
              example:
                foo: 08/07/2023
                bar:
                  baz: wrong
              examples: 
                default:
                  $ref: "#/components/examples/Foo"
                  
components:
  examples:
    Foo:
      foo: 01 01 2033
      bar:
        baz: 2023-07-14 20:30:15aaa
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
        "message": "Invalid date or date-time format. See https://api.otto.de/portal/guidelines/r100072",
        "ruleId": "test-rule",
        "suggest": [],
      },
      {
        "location": [
          {
            "pointer": "#/paths/~1get/get/responses/200/content/application~1hal+json/example/bar/baz",
            "reportOnKey": false,
          },
        ],
        "message": "Invalid date or date-time format. See https://api.otto.de/portal/guidelines/r100072",
        "ruleId": "test-rule",
        "suggest": [],
      },
      {
        "location": [
          {
            "pointer": "#/paths/~1get/get/responses/200/content/application~1hal+json/schema/foo",
            "reportOnKey": false,
          },
        ],
        "message": "Invalid date or date-time format. See https://api.otto.de/portal/guidelines/r100072",
        "ruleId": "test-rule",
        "suggest": [],
      },
      {
        "location": [
          {
            "pointer": "#/paths/~1get/get/responses/200/content/application~1hal+json/schema/bar/baz",
            "reportOnKey": false,
          },
        ],
        "message": "Invalid date or date-time format. See https://api.otto.de/portal/guidelines/r100072",
        "ruleId": "test-rule",
        "suggest": [],
      },
      {
        "location": [
          {
            "pointer": "#/paths/~1get/get/responses/200/content/application~1hal+json/schema/properties/foo",
            "reportOnKey": false,
          },
        ],
        "message": "Invalid date or date-time format. See https://api.otto.de/portal/guidelines/r100072",
        "ruleId": "test-rule",
        "suggest": [],
      },
      {
        "location": [
          {
            "pointer": "#/paths/~1get/get/responses/200/content/application~1hal+json/schema/properties/bar/baz",
            "reportOnKey": false,
          },
        ],
        "message": "Invalid date or date-time format. See https://api.otto.de/portal/guidelines/r100072",
        "ruleId": "test-rule",
        "suggest": [],
      },
      {
        "location": [
          {
            "pointer": "#/paths/~1get/get/responses/200/content/application~1hal+json/schema/properties/bar/properties/baz",
            "reportOnKey": false,
          },
        ],
        "message": "Invalid date or date-time format. See https://api.otto.de/portal/guidelines/r100072",
        "ruleId": "test-rule",
        "suggest": [],
      },
    ]
  `);
});
