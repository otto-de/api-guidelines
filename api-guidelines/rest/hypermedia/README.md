# Hypermedia

Besides the best practices for [compatible API evolutions](/guidelines/general-guidelines/compatibility#compatible-changes), there are other guidelines to facilitate business changes without impacting consumers.

To achieve this, API contracts should not contain or publish explicit or implicit business rules, such as the conditions under which a resource is usable. These rules would then be part of the API contract, and any incompatible change to these rules (e.g. a stricter interpretation) would break API clients.

Instead, API responses should include information about when certain contextually relevant resources are accessible and thus usable. This information is commonly referred to as hypermedia.

This section deals with topics such as [when hypermedia needs to be implemented](/guidelines/r000033), [which hypermedia standard to use](/guidelines/r000036), details about how to use [hypermedia links](/guidelines/rest-guidelines/hypermedia#links), and [link relations](/portal/guidelines/rest-guidelines/hypermedia#link-relation-types).

## Maturity level

[<!--INCLUDE-->Maturity level](./maturity-level/maturity-level.md)

[<!--RULES-->Rules](./maturity-level/rules)

## Links

[<!--INCLUDE-->Links](./links/links.md)

[<!--RULES-->Rules](./links/rules)

## Link relation types

[<!--INCLUDE-->Link-relation-types](./link-relation-types/link-relation-types.md)

[<!--RULES-->Rules](./link-relation-types/rules)
