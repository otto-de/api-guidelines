import { lintFromString } from "@redocly/openapi-core";
import { createTestConfig } from "./__tests__/createTestConfig.js";
import { removeClutter } from "./__tests__/removeClutter.js";
import { DefinePermissionsWithScope } from "./define-permissions-with-scope.js";

const config = createTestConfig({
  oas3: {
    // @ts-ignore
    "test-rule": DefinePermissionsWithScope,
  },
});

it("should not find any error", async () => {
  const spec = `
openapi: 3.0.3

paths:
  /post:
    post:
      security:
        - clientCredentials:
            - foo.read

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

it("should mark missing scopes", async () => {
  const spec = `
openapi: 3.0.3

components:
  securitySchemes:
    clientCredentials:
      type: oauth2
      flows:
        clientCredentials:
          tokenUrl: "/oauth2/token"

    authorizationCode:
      type: oauth2
      flows:
        authorizationCode:
          authorizationUrl: "/oauth2/auth"
          tokenUrl: "/oauth2/token"
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
            "pointer": "#/components/securitySchemes",
            "reportOnKey": true,
          },
        ],
        "message": "Must define a scope. See https://api.otto.de/portal/guidelines/r000047",
        "ruleId": "test-rule",
        "suggest": [],
      },
    ]
  `);
});

it("should not find any error", async () => {
  const spec = `
openapi: 3.0.3

paths:
  /post:
    post:
      security:
        - clientCredentials:
            - foo.post
   
  /put:
    put:
      security:
        - clientCredentials:
            - foo.put

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

  expect(result).toMatchInlineSnapshot(`
    [
      {
        "location": [
          {
            "pointer": "#/paths/~1post/post/security/0",
            "reportOnKey": false,
          },
        ],
        "message": "Scope \\"foo.post\\" is not defined. See https://api.otto.de/portal/guidelines/r000047",
        "ruleId": "test-rule",
        "suggest": [],
      },
      {
        "location": [
          {
            "pointer": "#/paths/~1put/put/security/0",
            "reportOnKey": false,
          },
        ],
        "message": "Scope \\"foo.put\\" is not defined. See https://api.otto.de/portal/guidelines/r000047",
        "ruleId": "test-rule",
        "suggest": [],
      },
    ]
  `);
});

it("should handle missing flows", async () => {
  const spec = `
openapi: 3.0.3

components:
  securitySchemes:
    clientCredentials:
      type: oauth2
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
            "pointer": "#/components/securitySchemes",
            "reportOnKey": true,
          },
        ],
        "message": "Must define a scope. See https://api.otto.de/portal/guidelines/r000047",
        "ruleId": "test-rule",
        "suggest": [],
      },
    ]
  `);
});
