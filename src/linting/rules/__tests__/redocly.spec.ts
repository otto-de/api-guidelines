import { lintFromString } from "@redocly/openapi-core";
import { createTestConfig } from "./createTestConfig.js";

const spec = `
openapi: 3.0.3
paths:
  /post:
    post:
      parameters: 
        - schema: 
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

describe("redocly visitor", () => {
  it("should enter SchemaProperties only once", async () => {
    const spy = vi.fn();

    const config = createTestConfig({
      oas3: {
        // @ts-ignore
        "test-rule": () => ({
          Response: {
            SchemaProperties: spy,
          },
        }),
      },
    });

    await lintFromString({
      source: spec,
      config,
    });

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("should enter SchemaProperties multiple times", async () => {
    const spy = vi.fn();

    const config = createTestConfig({
      oas3: {
        // @ts-ignore
        "test-rule": () => ({
          SchemaProperties: spy,
        }),
      },
    });

    await lintFromString({
      source: spec,
      config,
    });

    expect(spy).toHaveBeenCalledTimes(6);
  });

  it("should enter SchemaProperties multiple times", async () => {
    const spy = vi.fn();

    const config = createTestConfig({
      oas3: {
        // @ts-ignore
        "test-rule": () => ({
          SchemaProperties: {
            SchemaProperties: spy,
          },
        }),
      },
    });

    await lintFromString({
      source: spec,
      config,
    });

    expect(spy).toHaveBeenCalledTimes(3);
  });
});
