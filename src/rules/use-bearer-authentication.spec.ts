import { expect, it } from "vitest";

import { lintFromString } from "@redocly/openapi-core";
import { createTestConfig } from "./__tests__/createTestConfig";
import { removeClutter } from "./__tests__/removeClutter";
import { UseBearerAuthentication } from "./use-bearer-authentication";

const config = createTestConfig({
  oas3: {
    "test-rule": UseBearerAuthentication,
  },
});

it("should not find any error", async () => {
  const spec = `
openapi: 3.0.3
components:
  securitySchemes:
    foo:
      scheme: Bearer
      in: header
`;

  const result = await lintFromString({
    source: spec,
    config,
  });

  removeClutter(result);

  expect(result).toStrictEqual([]);
});

it("should mark wrong scheme", async () => {
  const spec = `
openapi: 3.0.3
components:
  securitySchemes:
    foo:
      scheme: Foo
      in: header
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
            "pointer": "#/components/securitySchemes/foo/scheme",
            "reportOnKey": false,
          },
        ],
        "message": "scheme is not set to 'Bearer'. See https://api.otto.de/portal/guidelines/r000021",
        "ruleId": "test-rule",
        "suggest": [],
      },
    ]
  `);
});

it("should mark wrong in", async () => {
  const spec = `
openapi: 3.0.3
components:
  securitySchemes:
    foo:
      scheme: Bearer
      in: query
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
            "pointer": "#/components/securitySchemes/foo/in",
            "reportOnKey": false,
          },
        ],
        "message": "'in' is not set to 'header'. See https://api.otto.de/portal/guidelines/r000021",
        "ruleId": "test-rule",
        "suggest": [],
      },
    ]
  `);
});

it("should mark missing in", async () => {
  const spec = `
openapi: 3.0.3
components:
  securitySchemes:
    foo:
      scheme: Bearer
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
            "pointer": "#/components/securitySchemes/foo/in",
            "reportOnKey": false,
          },
        ],
        "message": "'in' is not set to 'header'. See https://api.otto.de/portal/guidelines/r000021",
        "ruleId": "test-rule",
        "suggest": [],
      },
    ]
  `);
});

it("should mark missing scheme", async () => {
  const spec = `
openapi: 3.0.3
components:
  securitySchemes:
    foo:
      in: header
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
            "pointer": "#/components/securitySchemes/foo/scheme",
            "reportOnKey": false,
          },
        ],
        "message": "scheme is not set to 'Bearer'. See https://api.otto.de/portal/guidelines/r000021",
        "ruleId": "test-rule",
        "suggest": [],
      },
    ]
  `);
});
