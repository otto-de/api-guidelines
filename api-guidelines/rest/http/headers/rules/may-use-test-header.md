---
id: R0000XX
---

# MAY use `Test` header

API consumers and providers may use the OTTO-specific test header described within this rule to communicate that a request or response is a result of a test in a **non-live** environment. This enables testing certain use cases together with multiple teams while simultaneously enabling all teams to identify and ignore hindering test data.

Requests and responses **must not** be flagged with `Test` in the live environment as this could negatively impact the data integrity of the overall system.

Test requests are often created in various contexts. Some of them require special handling on provider or consumer side, such as bypassing specific validations or using modified business logic while processing.

This rule defines the `Test` header that API consumers and providers can provide to identify test data and enable the provider or consumer to forward this test header in their further processing, e.g. passing it as test extension in an asynchronous event.

### `Test` header

- Type: `String`
- Description: A string in the format `<test-scope>.<test-type>`. Both `test-type` and `test-scope` must not contain a `.` (dot).
    - `test-scope`: The scope of the executed test. Possible values include but are not limited to the name of a single context or a group of contexts (e.g., `orderprocessing`).
    - `test-type`: The type of the test. Currently, the following common types are defined:
        - `PerformanceTest` Automatically created test data in large scale.
        - `SystemTest` Automatically created test data to test specific business cases within one team.
        - `End2EndTest` Automatically created test data to test specific business cases within multiple teams.
        - `ManualTest` Manually created data.

      Additional test types may be used. They must be listed in the API documentation of the API provider
- Examples:
    - `SampleOrderProcessing.PerformanceTest`
- Constraints:
    - OPTIONAL
    - MUST be a non-empty string in the format `<test-scope>.<test-type>`.

### Example Usages

![Example usages of the test extension](../../../../async/format/test-extension/rules/test-extension-usage-examples.png)

::: references

- [MUST forward `Test` header](./must-forward-test-header.md)
- [Async event guideline: MAY use test extension](../../../../async/format/test-extension/rules/may-use-test-extension.md)
- [Async event guideline: MUST forward `test` context attribute](../../../../async/format/test-extension/rules/must-forward-test-context-attribute.md)
- [Async event guideline: MAY ignore events flagged with `test` context attribute](../../../../async/format/test-extension/rules/may-ignore-events-flagged-with-test.md)
:::