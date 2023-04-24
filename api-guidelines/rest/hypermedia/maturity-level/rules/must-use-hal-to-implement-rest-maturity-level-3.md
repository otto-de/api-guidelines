---
id: R000036
---

# MUST use HAL (Hypertext Application Language) to implement REST maturity level 3

::: info Info
This rule applies to APIs that have to comply with [REST maturity level 3](./must-implement-rest-maturity-level-3-for-transitional-apis.md).
:::

Since a variety of hypermedia formats exists, we decided to use HAL when a hypermedia implementation is required for the following reasons:

- The simplicity compared to other formats ensures quick familiarization with the format.
- Every `application/json` entity is a valid `application/hal+json` entity. This gives us the possibility to start with any given JSON API and later decide to add hyperlinks and embedded resources in a non-breaking way.

::: references

- Internet Draft [JSON Hypertext Application Language](https://tools.ietf.org/html/draft-kelly-json-hal-08)
- List of [hypermedia formats](https://gtramontina.com/h-factors/) and their H-Factors
- [H-Factors](http://amundsen.com/hypermedia/hfactor/) by Amundsen
  :::
