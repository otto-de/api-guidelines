---
type: MUST
id: R100067
---

# provide OpenAPI Spec for profiles

Profiles MUST be specified using an OpenAPI, for example by using
`schemas` in a `components` block.

Every Version of a profile MUST be a separate model entity inside of the `components` block
identified by a unique id, which includes a version string.