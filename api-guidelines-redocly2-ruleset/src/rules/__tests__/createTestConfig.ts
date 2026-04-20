import {
    createConfig,
    type Config,
    type Plugin,
    type RuleConfig,
    type RawUniversalConfig,
    type Oas3Rule,
    type Oas2Rule,
    type Async2Rule,
    type Async3Rule,
} from "@redocly/openapi-core";

type AnyRule = Oas3Rule | Oas2Rule | Async2Rule | Async3Rule;


export type CustomRulesConfig = Partial<Record<keyof NonNullable<Plugin["rules"]>, Record<string, AnyRule>>>;

export async function createTestConfig(customRulesConfig: CustomRulesConfig): Promise<Config> {
    const pluginId = "test-plugin";

    const prefixedRules = Object.fromEntries(
        Object.values(customRulesConfig).flatMap((ruleSet) =>
            Object.keys(ruleSet ?? {}).map((rule) => [`${pluginId}/${rule}`, "error" as RuleConfig]),
        ),
    );

    return createConfig({
        plugins: [{ id: pluginId, rules: customRulesConfig as NonNullable<Plugin["rules"]> }],
        rules: prefixedRules,
    } as RawUniversalConfig);
}
