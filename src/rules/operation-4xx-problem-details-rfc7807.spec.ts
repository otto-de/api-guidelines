import { expect, it } from "vitest";
import { lintFromString } from "@redocly/openapi-core";
import { Operation4xxProblemDetailsRfc7807 } from "./operation-4xx-problem-details-rfc7807";
import { createTestConfig } from "./__tests__/createTestConfig";
import { removeClutter } from "./__tests__/removeClutter";

const config = createTestConfig({
  oas3: {
    "test-rule": Operation4xxProblemDetailsRfc7807,
  },
});

it("should not find any error", async () => {
  const spec = `
openapi: "3.0.0"
paths:
  /pets:
    get:
      summary: List all pets
      operationId: listPets
      responses:
        '400':
          description: Test
          content:
            application/problem+json:
              schema:
                type: object
                properties:
                  type:
                    type: string
                  title:
                    type: string
`;

  const result = await lintFromString({
    source: spec,
    config,
  });

  removeClutter(result);

  expect(result).toStrictEqual([]);
});

it("should not find any error when using $ref", async () => {
  const spec = `
openapi: "3.0.0"
paths:
  /pets:
    get:
      summary: List all pets
      operationId: listPets
      responses:
        '400':
          description: Test
          content:
            application/problem+json:
              schema:
                $ref: "#/components/schemas/Problem"
components: 
  schemas: 
    Problem:
      type: object
      properties:
        type:
          type: string
        title:
          type: string
`;

  const result = await lintFromString({
    source: spec,
    config,
  });

  removeClutter(result);

  expect(result).toStrictEqual([]);
});

it("should not find any error when using allOf", async () => {
  const spec = `
openapi: "3.0.0"
paths:
  /pets:
    get:
      summary: List all pets
      operationId: listPets
      responses:
        '400':
          description: Test
          content:
            application/problem+json:
              schema:
                allOf:
                  - $ref: "#/components/schemas/Problem"
                  - properties: # mark
                      title:
                        type: string
                        description: Description of the "Not Found" response title.
                        enum: [Not Found]
                        example: Not Found
                      status:
                        type: integer
                        description: Description of the "Not Found" response status.
                        enum: [404]
                        example: 404
                      detail:
                        type: string
                        description: Description of the "Not Found" response detail.
                        example: Product with the given ID does not exist
components: 
  schemas: 
    Problem:
      type: object
`;

  const result = await lintFromString({
    source: spec,
    config,
  });

  removeClutter(result);

  expect(result).toStrictEqual([]);
});

it("should mark wrong content type", async () => {
  const spec = `
openapi: "3.0.0"
paths:
  /pets:
    get:
      summary: List all pets
      operationId: listPets
      responses:
        '400':
          description: Test
          content:
            application/json:
              schema:
                type: object
                properties:
                  type:
                    type: string
                  title:
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
            "pointer": "#/paths/~1pets/get/responses/400",
            "reportOnKey": true,
          },
        ],
        "message": "Response \`4xx\` must have content-type \`application/problem+json\`.",
        "ruleId": "test-rule",
        "suggest": [],
      },
    ]
  `);
});

it("should mark missing property 'title'", async () => {
  const spec = `
openapi: "3.0.0"
paths:
  /pets:
    get:
      summary: List all pets
      operationId: listPets
      responses:
        '400':
          description: Test
          content:
            application/problem+json:
              schema:
                type: object
                properties:
                  type:
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
            "pointer": "#/paths/~1pets/get/responses/400/content/application~1problem+json/schema/properties/title",
            "reportOnKey": true,
          },
        ],
        "message": "SchemaProperties object should contain \`title\` field.",
        "ruleId": "test-rule",
        "suggest": [],
      },
    ]
  `);
});

it("should mark missing property 'schema'", async () => {
  const spec = `
openapi: "3.0.0"
paths:
  /pets:
    get:
      summary: List all pets
      operationId: listPets
      responses:
        '400':
          description: Test
          content:
            application/problem+json:
              example: asd
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
            "pointer": "#/paths/~1pets/get/responses/400/content/application~1problem+json/schema",
            "reportOnKey": true,
          },
        ],
        "message": "MediaType object should contain \`schema\` field.",
        "ruleId": "test-rule",
        "suggest": [],
      },
    ]
  `);
});
