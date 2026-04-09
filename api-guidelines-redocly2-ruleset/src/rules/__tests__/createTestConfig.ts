import { createConfig, Config } from "@redocly/openapi-core";

type CustomRulesConfig = {
  oas3?: Record<string, unknown>;
  oas2?: Record<string, unknown>;
};

export async function createTestConfig(customRulesConfig: CustomRulesConfig): Promise<Config> {
  return createConfig({
    plugins: [
      {
        id: "test-plugin",
        // @ts-ignore
        rules: customRulesConfig,
      },
    ],
    // @ts-ignore
    rules: Object.fromEntries(
      Object.values(customRulesConfig).flatMap((ruleSet) =>
        Object.keys(ruleSet).map((rule) => [`test-plugin/${rule}`, "error"]),
      ),
    ),
  });
}
