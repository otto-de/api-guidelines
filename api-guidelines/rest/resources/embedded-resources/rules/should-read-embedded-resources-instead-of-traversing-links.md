---
id: R000043
---

# SHOULD read embedded resources instead of traversing links

For any given link relation, clients of an API should be automated to read from an embedded resource (if present) in preference to traversing a link.

If supported by the API, clients should use the common request parameter
[`embed`](../../naming-conventions/rules/must-stick-to-conventional-query-parameters.md) to select the subresources they are interested in.

::: references

- [SHOULD embed subresources](./should-embed-subresources.md)
- [SHOULD support optional embedding of subresources](./should-support-optional-embedding-of-subresources.md)
  :::
