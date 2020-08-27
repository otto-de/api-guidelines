---
type: MUST
id: R100067
---

# provide OpenAPI Spec for profiles

Profiles must be specified using an OpenAPI specification, for example, by using `schemas` in a `components` block.

Every version of a profile must be a separate model entity inside of the `components` block
identified by a unique ID, which includes a version string.
