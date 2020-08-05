---
type: MAY
id: R000040
---

# add custom extensions to `problem+json` response

As described in [section 3.2](https://tools.ietf.org/html/rfc7807#section-3.2) of [RFC 7807](https://tools.ietf.org/html/rfc7807) "problem type definitions MAY extend the problem details object with additional members."
In general clients MUST ignore any extension that they don't recognize. This allows problem types to evolve and include additional information in the future.

There may be usecases, where you need to convey more information than the standard members of a problem detail allow. In this case client and server can agree on adding a custom extension to support these information to be conveyed. See [Input Validation Errors](0030_must-use-extension-for-input-validation-errors.md) for a comprehensive example.

::: info
If a custom extension is developed it's mandatory to add a corresponding error type documentation.

TODO: Link to documentation process.
:::
