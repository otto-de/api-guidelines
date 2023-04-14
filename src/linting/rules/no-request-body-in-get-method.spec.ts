import { expect, it } from "vitest";

import { lintFromString } from "@redocly/openapi-core";
import { createTestConfig } from "./__tests__/createTestConfig";
import { removeClutter } from "./__tests__/removeClutter";
import { NoRequestBodyInGetMethod } from "./no-request-body-in-get-method";

const config = createTestConfig({
  oas3: {
    "test-rule": NoRequestBodyInGetMethod,
  },
});

it("should not find any error", async () => {
  const spec = `
openapi: 3.0.3
paths:
  /get:
    get:
    
  /post:
    post:
      requestBody:
        content: {}
    
  /put:
    put:
      requestBody:
        content: {}
    
  /delete:
    delete: 
      requestBody:
        content: {}
`;

  const result = await lintFromString({
    source: spec,
    config,
  });

  removeClutter(result);

  expect(result).toStrictEqual([]);
});

it("should mark missing requestBody", async () => {
  const spec = `
openapi: 3.0.3
paths:
  /get:
    get:
      requestBody:
        content: {}
          
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
            "pointer": "#/paths/~1get/get",
            "reportOnKey": false,
          },
        ],
        "message": "Get method must not have a request body. See https://api.otto.de/portal/guidelines/r000007",
        "ruleId": "test-rule",
        "suggest": [
          "use query parameters",
        ],
      },
    ]
  `);
});

it("should mark missing requestBody in get only", async () => {
  const spec = `
openapi: 3.0.3
paths:
  /foo:
    get:
      requestBody:
        content: {}
        
    put:
      requestBody:
        content: {}  
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
            "pointer": "#/paths/~1foo/get",
            "reportOnKey": false,
          },
        ],
        "message": "Get method must not have a request body. See https://api.otto.de/portal/guidelines/r000007",
        "ruleId": "test-rule",
        "suggest": [
          "use query parameters",
        ],
      },
    ]
  `);
});
