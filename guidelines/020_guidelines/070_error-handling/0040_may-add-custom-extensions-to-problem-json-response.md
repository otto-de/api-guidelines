---
type: MAY
id: R000040
---

# add custom extensions to `problem+json` response

As described in [section 3.2](https://tools.ietf.org/html/rfc7807#section-3.2) of [RFC 7807](https://tools.ietf.org/html/rfc7807) "problem type definitions may extend the problem details object with additional members."
In general clients must ignore any extension that they do not recognize.
This allows problem types to evolve and include additional information in the future.

There may be use cases, where you need to convey more information than the standard elements of a problem detail allow.
In this case client and server can agree on adding a custom extension to support these information to be conveyed.
See [Input Validation Errors](./guidelines/020_guidelines/070_error-handling/0030_must-use-extension-for-input-validation-errors.md) for a comprehensive example.

::: info
If a custom extension is developed it is mandatory to add a corresponding error type documentation.
:::
