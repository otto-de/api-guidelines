import { CustomRulesConfig } from "@redocly/openapi-core/lib/config/types";
import { Config } from "@redocly/openapi-core";

export function createTestConfig(customRulesConfig: CustomRulesConfig) {
  return new Config({
    apis: {},
    styleguide: {
      plugins: [
        {
          id: "test-plugin",
          rules: customRulesConfig,
        },
      ],
      rules: Object.fromEntries(
        Object.values(customRulesConfig).map((ruleSet) =>
          Object.keys(ruleSet)
            .map((rule) => [rule, "error"])
            .flat()
        )
      ),
    },
  });
}
