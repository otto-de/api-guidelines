---
type: SHOULD
id: R000037
---

# use existing error types

Already existing error types are [documented](https://api.otto.de/portal/errors).
We encourage API designers to reuse existing error types instead of creating completely new or slightly modified ones.
After thorough consideration, enhancing an existing error type by [custom extensions](./guidelines/020_guidelines/070_error-handling/0040_may-add-custom-extensions-to-problem-json-response.md) is a feasible option.

If a new error type is actually to be developed, [section 4 of the RFC](https://tools.ietf.org/html/rfc7807#section-4) describes the requirements for new error types in detail.
The documentation of this new type is mandatory.

`Note:`{label} Commonly used error types are always preferred over specialized ones.
