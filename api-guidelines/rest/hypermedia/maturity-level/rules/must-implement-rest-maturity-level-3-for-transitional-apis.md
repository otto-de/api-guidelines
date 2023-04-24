---
id: R000033
---

# MUST implement REST maturity level 3 for transitional APIs

Hypermedia must be implemented for [unsafe resource operations](../../../http/methods/rules/must-fulfill-common-method-properties.md) (e.g. `POST`) that will cause client errors (`4xx`) depending on one of the below-mentioned criteria. If one or more of the criteria apply to the cause of error, [REST Maturity Level 3](https://martinfowler.com/articles/richardsonMaturityModel.html#level3) must be implemented in order to:

- allow clients to reason about the availability of the unsafe resource operation (e.g. for UI button enabling/disabling) before actually invoking it
- prevent duplication of business logic on API provider and consumer side, making business logic changes even harder.

## Criteria for the error cause

### State of the resource

Unsafe resource operations will fail depending on the state of the resource itself.

Example: _Cancellation of an order is only possible as long as it is not shipped.
When error responses are solely caused by the caller's request entity and/or parameter(s), the implementation of hypermedia links is not necessary._

### Authorization

Unsafe resource operations will fail depending on the [authorization](../../../authorization/README.md) of the calling identity.

Example: _Rating products is only available to customers with a certain reputation._

### Time

Unsafe resource operations will fail depending on the time the resource is accessed.

Example: _Vouchers are only valid for 2 weeks, after that period their usage will lead to errors, though the voucher itself has not changed its state_

::: references

- [Unsafe operations](https://datatracker.ietf.org/doc/html/rfc7231#section-4.2.1)
  :::
