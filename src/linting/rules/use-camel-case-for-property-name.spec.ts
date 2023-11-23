import { lintFromString } from "@redocly/openapi-core";
import { createTestConfig } from "./__tests__/createTestConfig.js";
import { removeClutter } from "./__tests__/removeClutter.js";
import { UseCamelCaseForPropertyName } from "./use-camel-case-for-property-name.js";

const config = createTestConfig({
  oas3: {
    // @ts-ignore
    "test-rule": UseCamelCaseForPropertyName,
  },
});

it("should not find any error", async () => {
  const spec = `
openapi: 3.0.3
paths:
  /post:
    post:
      parameters: 
        - schema: 
            type: object
            properties: 
              name:
                type: string
              jobDescription:
                type: string
              houses:
                type: array
                items:
                  type: object
                  properties: 
                    fooBar: string
      requestBody:
        content:
            application/hal+json:
              schema: 
                type: object
                properties: 
                  name:
                    type: string
                  jobDescription:
                    type: string
                  houses:
                    type: array
                    items:
                      type: object
                      properties: 
                        fooBar: string
      responses:
        200:
          content:
            application/hal+json:
              schema: 
                type: object
                properties: 
                  name:
                    type: string
                  jobDescription:
                    type: string
                  houses:
                    type: array
                    items:
                      type: object
                      properties: 
                        fooBar: string
`;

  const result = await lintFromString({
    source: spec,
    config,
  });

  removeClutter(result);

  expect(result).toStrictEqual([]);
});
it("should not find any error in valid components", async () => {
  const spec = `
openapi: 3.0.3

paths:
  /post:
    post:
      responses:
        200:
          content:
            application/hal+json:
              schema:
                allOf:
                  - $ref: "#/components/schemas/PromoImageHal"
                  - title: foo

components: 
  schemas: 
    PromoImageHal:
      properties:
        type:
          type: string
        _links:
          allOf:
            - title: foo
            - description: bar
            - properties: 
                foo:
                  type: string
`;

  const result = await lintFromString({
    source: spec,
    config,
  });

  removeClutter(result);

  expect(result).toStrictEqual([]);
});

it("should not find any error in CURIE", async () => {
  const spec = `
openapi: 3.0.3
paths:
  /post:
    post:
      responses:
        200:
          content:
            application/hal+json:
              schema: 
                type: object
                properties: 
                  _links:
                    description: Links section.
                    type: object
                    properties:
                      o:bar:
                        type: array
                  _embedded:
                    type: object
                    description: Embedded resources
                    properties:
                      o:foo:
                        type: array
`;

  const result = await lintFromString({
    source: spec,
    config,
  });

  removeClutter(result);

  expect(result).toStrictEqual([]);
});

it("should mark invalid property names", async () => {
  const spec = `
openapi: 3.0.3
paths:
  /post:
    post:

      requestBody:
        content:
          application/json:
            schema: 
              type: object
              properties: 
                NAME:
                  type: string
                job-description:
                  type: string
                houses:
                  type: array
                  items:
                    type: object
                    properties: 
                      foo_bar:
                        type: string
         
      responses:
        200:
          content:
            application/hal+json:
              schema: 
                type: object
                properties: 
                  NAME:
                    type: string
                  job-description:
                    type: string
                  houses:
                    type: array
                    items:
                      type: object
                      properties: 
                        foo_bar:
                          type: string
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
            "pointer": "#/paths/~1post/post/requestBody/content/application~1json/schema/properties/NAME",
            "reportOnKey": true,
          },
        ],
        "message": "Property \\"NAME\\" is not camelCase. See https://api.otto.de/portal/guidelines/r004010",
        "ruleId": "test-rule",
        "suggest": [],
      },
      {
        "location": [
          {
            "pointer": "#/paths/~1post/post/requestBody/content/application~1json/schema/properties/job-description",
            "reportOnKey": true,
          },
        ],
        "message": "Property \\"job-description\\" is not camelCase. See https://api.otto.de/portal/guidelines/r004010",
        "ruleId": "test-rule",
        "suggest": [],
      },
      {
        "location": [
          {
            "pointer": "#/paths/~1post/post/requestBody/content/application~1json/schema/properties/houses/items/properties/foo_bar",
            "reportOnKey": true,
          },
        ],
        "message": "Property \\"foo_bar\\" is not camelCase. See https://api.otto.de/portal/guidelines/r004010",
        "ruleId": "test-rule",
        "suggest": [],
      },
      {
        "location": [
          {
            "pointer": "#/paths/~1post/post/responses/200/content/application~1hal+json/schema/properties/NAME",
            "reportOnKey": true,
          },
        ],
        "message": "Property \\"NAME\\" is not camelCase. See https://api.otto.de/portal/guidelines/r004010",
        "ruleId": "test-rule",
        "suggest": [],
      },
      {
        "location": [
          {
            "pointer": "#/paths/~1post/post/responses/200/content/application~1hal+json/schema/properties/job-description",
            "reportOnKey": true,
          },
        ],
        "message": "Property \\"job-description\\" is not camelCase. See https://api.otto.de/portal/guidelines/r004010",
        "ruleId": "test-rule",
        "suggest": [],
      },
      {
        "location": [
          {
            "pointer": "#/paths/~1post/post/responses/200/content/application~1hal+json/schema/properties/houses/items/properties/foo_bar",
            "reportOnKey": true,
          },
        ],
        "message": "Property \\"foo_bar\\" is not camelCase. See https://api.otto.de/portal/guidelines/r004010",
        "ruleId": "test-rule",
        "suggest": [],
      },
    ]
  `);
});
