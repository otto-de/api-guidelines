---
type: MUST
id: R000034
---

# use `problem+json` as error response format

We decided to adopt "Problem Details for HTTP APIs" as described in [RFC 7807](https://tools.ietf.org/html/rfc7807).
In case of an error all REST operations must return an error response in this well defined format along with the appropriate media type `application/problem+json`. This error response enhances the correctly used [HTTP status code](./guidelines/020_guidelines/030_http/3020_must-use-standard-http-status-code.md) with contextual information.

Example response:

```http
HTTP/1.1 401 Unauthorized
Content-Type: application/problem+json

{
  "type": "https://api.otto.de/api-docs/errors/UnauthorizedError",
  "title": "Not authorized to view account details.",
  "status": 401,
  "detail": "Due to privacy concerns you are not allowed to view account details of others.",
  "instance": "/account/12345/",
  "key": "UnauthorizedError"
}
```

`Note:`{label} Always respond with the corresponding media type `application/problem+json` regardless of the given `accept` header.

In addition to the elements of the "Problem Details" object described in [Section 3.1](https://tools.ietf.org/html/rfc7807#section-3.1) of the specification, error responses must include the `key` property that represents a unique identifier of the error type in the global context of the API.
The error key may be used to localize content, especially in use cases including user interfaces: The error could be used to look up a localized error message, which is subsequently displayed to the user.
This `key` is also part of the URL located in the `type` field.

Responses should [use existing error types](./guidelines/020_guidelines/070_error-handling/0020_should-use-existing-error-types.md) if possible to keep error churn as low as possible.
New error types must be triaged with the API product owners.

Response fields in detail:

| field | description | mandatory |
|-------|-------------|----------|
| `type` | Relative URI that references comprehensive error type documentation. If no documentation exists for whatever reason the content must be 'about:blank' | ✔ |
| `title` | Title should roughly contain and describe the problem. However, it should be static and should not include a detailed error description, e.g. do not list the invalid values. | ✔ |
| `status` | Represents the corresponding [HTTP Status Code](./guidelines/020_guidelines/030_http/3020_must-use-standard-http-status-code.md). | ✔ |
| `detail` | Should contain further details about the error. The RFC specifies that this field should not contain debugging information. Instead, it may contain details about the exact problem and maybe also how to solve it. Should not be parsed for further information. | ✗ |
| `instance` | It is possible to specify the instance of the service that has the problem or the relative URI that was called. | ✗ |
| `key` | Represents a unique identifier of the error type in the global context of the API in PascalCase. | ✔ |

`Caution:`{label="warning"} In contrast to the RFC, not only the fields `type` and `title` are mandatory, but also `status` and `key`.
