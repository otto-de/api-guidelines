import { lintFromString } from "@redocly/openapi-core";
import { createTestConfig } from "./__tests__/createTestConfig.js";
import { removeClutter } from "./__tests__/removeClutter.js";
import { UseAbsoluteProfileUrl } from "./use-absolute-profile-url.js";

const config = createTestConfig({
  oas3: {
    // @ts-ignore
    "test-rule": UseAbsoluteProfileUrl,
  },
});

it("should not find any error", async () => {
  const spec = `
openapi: 3.0.3
paths:
  /post:
    post:
      requestBody: 
        content: 
          application/hal+json: {}
          application/hal+json;profile=https://example.com/profiles/foo+v1: {}
          application/hal+json;profile="https://example.com/profiles/foo+v2": {}
          
      responses:
        200:
          content: 
            application/hal+json: {}
            application/hal+json;profile="https://example.com/profiles/foo+v1";foo=bar: {}
            application/hal+json;PROFILE=https://example.com/profiles/foo+v2: {}
            
`;

  const result = await lintFromString({
    source: spec,
    config,
  });

  removeClutter(result);

  expect(result).toStrictEqual([]);
});

it("should mark relative profiles", async () => {
  const spec = `
openapi: 3.0.3
paths:
  /post:
    post:
      requestBody: 
        content: 
          application/hal+json;profile="/profiles/foo+v1": {}
          
      responses:
        200:
          content: 
            application/hal+json;profile="/profiles/foo+v1": {}
            
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
            "pointer": "#/paths/~1post/post/requestBody/content/0",
            "reportOnKey": true,
          },
        ],
        "message": "Profile url is not absolute. See https://api.otto.de/portal/guidelines/r100066",
        "ruleId": "test-rule",
        "suggest": [],
      },
      {
        "location": [
          {
            "pointer": "#/paths/~1post/post/responses/200/content/0",
            "reportOnKey": true,
          },
        ],
        "message": "Profile url is not absolute. See https://api.otto.de/portal/guidelines/r100066",
        "ruleId": "test-rule",
        "suggest": [],
      },
    ]
  `);
});
