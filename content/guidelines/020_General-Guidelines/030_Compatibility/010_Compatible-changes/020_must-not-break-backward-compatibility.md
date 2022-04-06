---
type: MUST NOT
id: R000027
---

# break backward compatibility

Change APIs, but keep all consumers running.
Consumers usually have independent release lifecycles, focus on stability, and avoid changes that do not provide additional value.
APIs are contracts between service providers and service consumers that cannot be broken via unilateral decisions.

There are two techniques to change APIs without breaking them:

- follow rules for compatible extensions
- introduce new API versions and still support older versions.

We strongly encourage using compatible API extensions and discourage versioning.
The guidelines for API providers ([SHOULD prefer compatible extensions](@guidelines/R000028)) and consumers ([MUST prepare consumers accept compatible API extensions](@guidelines/R000029)) enable us (having Postel’s Law in mind) to make compatible changes without versioning.

::: info
There is a difference between incompatible and breaking changes. Breaking changes are changes that, when deployed into operation, break existing clients.
However, in specific controlled situations, it is possible to deploy incompatible changes in a non-breaking way if no API consumer is using or plans to use the affected API aspects (see also [Deprecation](../030_Deprecation/index.md)).
:::
