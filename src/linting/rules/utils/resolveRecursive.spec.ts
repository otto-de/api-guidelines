import { lintFromString, type OasRef } from "@redocly/openapi-core";
import { createTestConfig } from "../__tests__/createTestConfig.js";
import { resolveRecursive } from "./resolveRecursive.js";

const config = createTestConfig({
  oas3: {
    // @ts-ignore
    "test-rule": () => {
      return {
        Schema(schema, { report, resolve }) {
          const result = resolveRecursive(schema as OasRef, resolve);
          report({
            message: `resolves to ${result.location.absolutePointer}`,
          });
        },
      };
    },
  },
});

it("should resolve nothing", async () => {
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
                  baz:
                    type: string
`;

  const [{ location }] = await lintFromString({
    source: spec,
    config,
  });

  expect(location[0].pointer).toBe(
    "#/paths/~1get/get/responses/200/content/application~1hal+json/schema",
  );
});

it("should resolve one ref", async () => {
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
      type: string
`;

  const [{ location }] = await lintFromString({
    source: spec,
    config,
  });

  expect(location[0].pointer).toBe("#/components/schemas/Foo");
});

it("should resolve three refs", async () => {
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
      $ref: "#/components/schemas/Bar"
    Bar:
      $ref: "#/components/schemas/Baz"
    Baz:
      type: string
`;

  const [{ location }] = await lintFromString({
    source: spec,
    config,
  });

  expect(location[0].pointer).toBe("#/components/schemas/Baz");
});
