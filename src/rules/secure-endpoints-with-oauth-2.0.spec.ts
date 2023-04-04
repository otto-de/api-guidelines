import { expect, it } from "vitest";

import { lintFromString } from "@redocly/openapi-core";
import { createTestConfig } from "./__tests__/createTestConfig";
import { removeClutter } from "./__tests__/removeClutter";
import { SecureEndpointsWithOAuth20 } from "./secure-endpoints-with-oauth-2.0";

const config = createTestConfig({
  oas3: {
    "test-rule": SecureEndpointsWithOAuth20,
  },
});

it("should not find any error", async () => {
  const spec = `
openapi: 3.0.3
components:
  securitySchemes:
    foo:
      type: oauth2

    bar:
      type: oauth2

`;

  const result = await lintFromString({
    source: spec,
    config,
  });

  removeClutter(result);

  expect(result).toStrictEqual([]);
});

it("should mark wrong type", async () => {
  const spec = `
openapi: 3.0.3
components:
  securitySchemes:
    foo:
      type: http

    bar:
      type: openIdConnect

    baz:
      type: apiKey

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
            "pointer": "#/components/securitySchemes/foo/type",
            "reportOnKey": false,
          },
        ],
        "message": "Type is not OAuth 2.0. See https://api.otto.de/portal/guidelines/r000051",
        "ruleId": "test-rule",
        "suggest": [
          "type: oauth2",
        ],
      },
      {
        "location": [
          {
            "pointer": "#/components/securitySchemes/bar/type",
            "reportOnKey": false,
          },
        ],
        "message": "Type is not OAuth 2.0. See https://api.otto.de/portal/guidelines/r000051",
        "ruleId": "test-rule",
        "suggest": [
          "type: oauth2",
        ],
      },
      {
        "location": [
          {
            "pointer": "#/components/securitySchemes/baz/type",
            "reportOnKey": false,
          },
        ],
        "message": "Type is not OAuth 2.0. See https://api.otto.de/portal/guidelines/r000051",
        "ruleId": "test-rule",
        "suggest": [
          "type: oauth2",
        ],
      },
    ]
  `);
});

it("should mark missing type", async () => {
  const spec = `
openapi: 3.0.3
components:
  securitySchemes:
    foo: {}
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
            "pointer": "#/components/securitySchemes/foo/type",
            "reportOnKey": false,
          },
        ],
        "message": "Type is not OAuth 2.0. See https://api.otto.de/portal/guidelines/r000051",
        "ruleId": "test-rule",
        "suggest": [
          "type: oauth2",
        ],
      },
    ]
  `);
});
