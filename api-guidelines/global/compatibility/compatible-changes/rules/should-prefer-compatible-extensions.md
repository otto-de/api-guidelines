---
id: R000028
---

# SHOULD prefer compatible extensions

API providers should always prefer to extend APIs in a compatible way. The following rules provide guidance on how to evolve APIs in a backward-compatible way:

- Refer to [best practices (internal link)](https://github.com/otto-ec/ottoapi_guidelines/blob/main/content/references/REST/compatibility.md) when adding new fields
- Never change the semantic of fields (e.g. changing the semantic from customer-number to customer-id, as both are different unique customer keys)
- Input fields may have constraints (e.g. patterns, formats, lengths or business rules, if any are documented alongside the spec) being validated via server-side logic. Never change the validation logic to be more restrictive and make sure that all constraints are clearly explained in the spec documentation and error response description.
- Enum ranges can be reduced when used as input parameters only if the server is ready to accept and process old range values as well. However, a 422 validation error response with an indication of why the old value is no longer accepted is fine. The enum range can be reduced if it is used as an output parameter.
- Enum ranges should not be extended when used for output parameters. Clients often interpret the enum type as a closed set of values and might break when receiving new values. However, enum ranges can be extended when used for input parameters.
- Use extensible enums if enums are likely to be extended due to business requirements (see [SHOULD use extensible enums](./should-use-extensible-enums.md)).
