---
id: R000040
---

# MAY add custom extensions by defining a problem `type`

As described in [section 3.2](https://www.rfc-editor.org/rfc/rfc9457#section-3.2) of [RFC 9457](https://www.rfc-editor.org/rfc/rfc9457) _problem `type` definitions may extend the problem details object with additional members_.
Thus, API providers need to define a specific problem `type` if they want to add additional non-standard properties to a problem+json response.

In general, clients must ignore any extension they do not recognize.
This allows problem types to evolve and include additional information in the future.

Before defining a new problem type, check if the type is really required and cannot be expressed just by using the HTTP status code.
For example communicating to the client that he is not allowed to place an order can easily be expressed by the generic HTTP status code [403 Forbidden](https://www.rfc-editor.org/rfc/rfc9110#name-403-forbidden).
If this is the case, just use the problem type [`about:blank`](https://www.rfc-editor.org/rfc/rfc9457#section-4.2.1) that signals that the problem is semantically identical to the meaning of the status code.

Creating a new `type` always includes having a fixed human-readable `title` and a fixed `status` associated (see [https://www.rfc-editor.org/rfc/rfc9457#section-4](https://www.rfc-editor.org/rfc/rfc9457#section-4)).

The URI encoded in `type` must be treated as an identifier that should not change. While encouraged, it does not need to be resolvable.
The `type` URI should be in the same URL namespace as the APIs endpoints. If all API endpoints are located under `https://api.otto.de/payment/` the custom `type` URLs should als be located under the same context path (e.g., `https://api.otto.de/payment/problems/credit-too-low`).
If possible, API providers should provide a `type` URL that resolves to a human-readable documentation (e.g., HTML) of the problem type.

Example:

A new context-specific type `https://api.otto.de/payment/problems/credit-too-low` is introduced. It adds the properties `maxCredit` and `requiredCredit`.

```json
{
  "type": "https://api.otto.de/payment/problems/credit-too-low",
  "title": "Credit too low",
  "status": 422,
  "detail": "The required credit \"40 €\" exceeds the maximal credit for the customer \"20 €\".",
  "requiredCredit": 4000,
  "maxCredit": 2000
}
```

Example documentation:
::: expander
Problem type: <https://api.otto.de/payment/problems/credit-too-low>

Title: Credit too low

Status: 422

Description: This problem indicates that the credit associated with the customer account is insufficient to perform the operation of the request. The maximal credit will be communicated in the `maxCredit` property.

Additional properties:

- `maxCredit`: The maximal credit for the customer in euro cents. May not be present due to access restrictions.
- `requiredCredit`: The required credit for the operation in euro cents. Always present.

Example:

```json
{
  "type": "https://api.otto.de/payment/problems/credit-too-low",
  "title": "Credit too low",
  "status": 422,
  "detail": "The required credit \"40 €\" exceeds the maximal credit for the customer \"20 €\".",
  "requiredCredit": 4000,
  "maxCredit": 2000
}
```

:::
