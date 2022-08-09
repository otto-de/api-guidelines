---
type: MUST NOT
id: R000027
---

# break backward compatibility

API specifications establish a contract between providers and consumers and cannot be broken by unilateral decisions.
Providers can change their API specifications, but have to ensure their changes won't break existing consuming clients.
Consumers usually have independent release cycles for their clients, focusing more on stability and avoiding changes that do not add value.

There are two ways to change APIs without breaking them:

- Follow the rules for compatible extensions.
- Introduce new API versions and still support older versions.

We strongly encourage using compatible API extensions and discourage versioning.
The guidelines for API providers ([SHOULD prefer compatible extensions](@guidelines/R000028)) and consumers ([MUST prepare consumers to accept compatible API extensions](@guidelines/R000029)) enable us (having Postel’s Law in mind) to make compatible changes without versioning.

::: info
There is a difference between incompatible and breaking changes. Breaking changes break existing clients, when deployed into operation.
However, in specific controlled situations, it is possible to deploy incompatible changes in a non-breaking way if no consuming client is using or plans to use the affected API aspects (see also [Deprecation](../030_Deprecation/index.md)).
:::
