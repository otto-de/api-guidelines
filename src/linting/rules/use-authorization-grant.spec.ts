import { expect, it } from "vitest";

import { lintFromString } from "@redocly/openapi-core";
import { createTestConfig } from "./__tests__/createTestConfig";
import { removeClutter } from "./__tests__/removeClutter";
import { UseAuthorizationGrant } from "./use-authorization-grant";

const config = createTestConfig({
  oas3: {
    "test-rule": UseAuthorizationGrant,
  },
});

it("should not find any error", async () => {
  const spec = `
openapi: 3.0.3
components:
  securitySchemes:
    clientCredentials:
      type: oauth2
      flows:
        clientCredentials:
          tokenUrl: "/oauth2/token"
          scopes:
            foo.read: Read foo

    authorizationCode:
      type: oauth2
      flows:
        authorizationCode:
          authorizationUrl: "/oauth2/auth"
          tokenUrl: "/oauth2/token"
          scopes:
            foo.read: Read foo
`;

  const result = await lintFromString({
    source: spec,
    config,
  });

  removeClutter(result);

  expect(result).toStrictEqual([]);
});

it("should mark wrong flow", async () => {
  const spec = `
openapi: 3.0.3
components:
  securitySchemes:
    clientCredentials:
      type: oauth2
      flows:
        implicit:

    authorizationCode:
      type: oauth2
      flows:
        password:
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
            "pointer": "#/components/securitySchemes/clientCredentials",
            "reportOnKey": false,
          },
        ],
        "message": "Must use Authorization Grant. See https://api.otto.de/portal/guidelines/r000052",
        "ruleId": "test-rule",
        "suggest": [],
      },
      {
        "location": [
          {
            "pointer": "#/components/securitySchemes/authorizationCode",
            "reportOnKey": false,
          },
        ],
        "message": "Must use Authorization Grant. See https://api.otto.de/portal/guidelines/r000052",
        "ruleId": "test-rule",
        "suggest": [],
      },
    ]
  `);
});
