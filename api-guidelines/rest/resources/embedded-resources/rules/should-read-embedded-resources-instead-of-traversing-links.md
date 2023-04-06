---
id: R000043
---

# SHOULD read embedded resources instead of traversing links

For any given link relation, clients of an API should be automated to read from an embedded resource (if present) in preference to traversing a link.

If supported by the API, clients should use the common request parameter
[`embed`](/guidelines/r000049) to select the subresources they are interested in.

::: references

- [SHOULD embed subresources](/guidelines/r000041)
- [SHOULD support optional embedding of subresources](/guidelines/r000063)
  :::
