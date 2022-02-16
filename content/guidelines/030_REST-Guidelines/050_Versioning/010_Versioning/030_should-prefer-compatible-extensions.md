---
type: SHOULD
id: R000028
---

# prefer compatible extensions

API designers should apply the following rules to evolve RESTful APIs for services in a backward-compatible way:

- Refer to best practices when adding new fields (read [Compatibility](https://github.com/otto-ec/ottoapi_guidelines/blob/master/references/compatibility.md))
- Never change the semantic of fields (e.g. changing the semantic from customer-number to customer-id, as both are different unique customer keys)
- Input fields may have constraints (e.g. patterns, formats, lengths or business rules, if any are documented alongside the spec) being validated via server-side logic. Never change the validation logic to be more restrictive and make sure that all constraints are clearly explained in the spec documentation and error response description.
- Enum ranges can be reduced when used as input parameters only if the server is ready to accept and process old range values as well. However, a 422 validation error response with an indication of why the old value is no longer accepted is fine. The enum range can be reduced if it is used as an output parameter.
- Enum ranges should not be extended when used for output parameters — clients may not be prepared to handle it. However, enum ranges can be extended when used for input parameters
- Use extensible enums if enums are likely to be extended due to business requirements (see [MAY use extensible enums](#R000035)).
- Support redirection in case an URL has to change `HTTP 301 Moved Permanently`.
