---
type: SHOULD
id: R000043
---

# read embedded resources instead of traversion links

For any given link relation, clients of an API SHOULD be automated to read from an embedded resource (if present) in
preference to traversing a link.

If supported by the API, clients SHOULD use the common request-parameter
'[embed](./1120_must-stick-to-conventional-query-parameters.md)' to select the sub-resources they are interested in.

See also:

- [SHOULD support optional embedding of sub-resources](./3010_should-support-optional-embedding-of-sub-resources.md)
- [MUST stick to conventional query parameters](./1120_must-stick-to-conventional-query-parameters.md)
