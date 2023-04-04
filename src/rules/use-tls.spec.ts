import { expect, it } from "vitest";

import { lintFromString } from "@redocly/openapi-core";
import { createTestConfig } from "./__tests__/createTestConfig";
import { removeClutter } from "./__tests__/removeClutter";
import { UseTLS } from "./use-tls";

const config = createTestConfig({
  oas3: {
    "test-rule": UseTLS,
  },
});

it("should not find any error", async () => {
  const spec = `
openapi: 3.0.3
servers:
  - url: https://example.org
`;

  const result = await lintFromString({
    source: spec,
    config,
  });

  removeClutter(result);

  expect(result).toStrictEqual([]);
});

it("should mark second server url", async () => {
  const spec = `
openapi: 3.0.3
servers:
  - url: https://example.org
  - url: http://example.org
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
            "pointer": "#/servers/1/url",
            "reportOnKey": false,
          },
        ],
        "message": "Server url is not secured with TLS. See https://api.otto.de/portal/guidelines/r000046",
        "ruleId": "test-rule",
        "suggest": [],
      },
    ]
  `);
});
