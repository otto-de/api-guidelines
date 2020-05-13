---
title: MUST NOT break backward compatibility
type: MUST NOT
---

## <span style="color: #D4021D;">MUST NOT</span> break backward compatibility

Change APIs, but keep all consumers running. Consumers usually have independent release lifecycles, focus on stability, and avoid changes that do not provide additional value. APIs are contracts between service providers and service consumers that cannot be broken via unilateral decisions.

There are two techniques to change APIs without breaking them:

- follow rules for compatible extensions
- introduce new API versions and still support older versions

We strongly encourage using compatible API extensions and discourage versioning. The following guidelines for service providers ([SHOULD prefer compatible extensions](#should-prefer-compatible-extensions)) and consumers ([MUST prepare clients accept compatible API extensions](#must-prepare-clients-accept-compatible-api-extensions)) enable us (having Postel’s Law in mind) to make compatible changes without versioning.

**Note:** There is a difference between incompatible and breaking changes. Incompatible changes are changes that are not covered by the compatibility rules below. Breaking changes are incompatible changes deployed into operation, and thereby breaking running API consumers. Usually, incompatible changes are breaking changes when deployed into operation.
However, in specific controlled situations it is possible to deploy incompatible changes in a non-breaking way, if no API consumer is using the affected API aspects (see also Deprecation[TODO: link] guidelines).
