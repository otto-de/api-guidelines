---
type: SHOULD
id: R000043
---

# read embedded resources instead of traversing links

For any given link relation, clients of an API should be automated to read from an embedded resource (if present) in preference to traversing a link.

If supported by the API, clients should use the common request parameter
[`embed`](./guidelines/020_guidelines/050_naming-conventions/1120_must-stick-to-conventional-query-parameters.md) to select the subresources they are interested in.

::: references

- [SHOULD embed subresources](./guidelines/020_guidelines/060_resources/1010_should-embed-subresources.md)
- [SHOULD support optional embedding of subresources](./guidelines/020_guidelines/060_resources/1020_should-support-optional-embedding-of-subresources.md)
  :::
