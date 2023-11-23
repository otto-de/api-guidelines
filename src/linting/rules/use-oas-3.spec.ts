import { lintFromString } from "@redocly/openapi-core";
import { createTestConfig } from "./__tests__/createTestConfig.js";
import { removeClutter } from "./__tests__/removeClutter.js";
import { UseOas3 } from "./use-oas-3.js";

const config = createTestConfig({
  oas2: {
    // @ts-ignore
    "test-rule": UseOas3,
  },
});

it("should not find any error", async () => {
  const spec = `
openapi: 3.0.0
`;

  const result = await lintFromString({
    source: spec,
    config,
  });

  removeClutter(result);

  expect(result).toStrictEqual([]);
});

it("should mark oas 2", async () => {
  const spec = `
swagger: '2.0'
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
            "pointer": "#/swagger",
            "reportOnKey": true,
          },
        ],
        "message": "openapi >= 3.0.0 should be used.",
        "ruleId": "test-rule",
        "suggest": [],
      },
    ]
  `);
});
