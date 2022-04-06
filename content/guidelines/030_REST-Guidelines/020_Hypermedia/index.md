# Hypermedia

Besides the best practices for [compatible API evolutions](../../020_General-Guidelines/030_Compatibility/010_Compatible-changes/index.md), there are other guidelines to facilitate business changes without impacting consumers.

To achieve this, API contracts should not contain or publish explicit or implicit business rules, such as the conditions under which a resource is usable. These rules would then be part of the API contract, and any incompatible change to these rules (e.g. a stricter interpretation) would break API clients.

Instead, API responses should include information about when certain contextually relevant resources are accessible and thus usable. This information is commonly referred to as hypermedia.

This section deals with topics such as [when hypermedia needs to be implemented](@guidelines/R000033), [which hypermedia standard to use](@guidelines/R000036), details about how to use [hypermedia links](./020_Links/index.md), [link relations](./030_Link-relation-types/index.md) and finally [profiles](./040_Profiles/index.md) to support [versioning](../050_Compatibility/020_Versioning/index.md).
