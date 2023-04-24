---
id: R000034
---

# MUST use `problem+json` as error response format

We decided to adopt "Problem Details for HTTP APIs" as described in [RFC 7807](https://tools.ietf.org/html/rfc7807).
In case of an error, all REST operations must return an error response in this well-defined format along with the appropriate media type `application/problem+json`. This error response enhances the correctly used [HTTP status code](../../../http/status-codes/rules/must-use-standard-http-status-codes.md) with contextual information.

Example response:

```http
HTTP/1.1 403 Forbidden
Content-Type: application/problem+json

{
  "type": "about:blank",
  "title": "Forbidden",
  "status": 403,
  "detail": "For data protection reasons, you are not allowed to view account details of others.",
  "instance": "/account/12345/"
}
```

::: info Info
Always respond with the corresponding media type `application/problem+json` regardless of the given `accept` header.
:::

The [`type`](https://www.rfc-editor.org/rfc/rfc7807#section-3.1) of the problem object should be used to identify the problem type globally.
The URI does not need to be resolvable. If it is resolvable, it should contain a human-readable description of the problem type.

Responses should [use existing error types](./should-use-existing-problem-types.md) if possible to keep error churn as low as possible.

Response properties in detail:

| property   | description                                                                                                                                                                                                                                                          | mandatory |
| ---------- |----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------| --------- |
| `type`     | Identifies the type of the problem. If it is a resolvable URL, the resolved content should contain a human-readable description of the problem type. If the problem type has no additional semantics beyond the HTTP status code, the URI `about:blank` can be used. | ✔         |
| `title`    | Title should roughly contain and describe the problem. However, it should be static and not include a detailed error description, e.g., do not list the invalid values. If the type is `about:blank`, the reason phrase of the status should be used as title.       | ✔         |
| `status`   | Represents the corresponding [HTTP Status Code](../../../http/status-codes/rules/must-use-standard-http-status-codes.md).                                                                                                                                            | ✔         |
| `detail`   | Should contain further details about the error. The RFC specifies that this field should not contain debugging information. Instead, it may contain details about the exact problem and how to solve it. It should not be parsed for further information.            | ✗         |
| `instance` | It is possible to specify the instance of the service that has the problem or the relative URI that was called.                                                                                                                                                      | ✗         |

::: warning Important
In contrast to the RFC the properties `type`, `title`, and `status` are mandatory.
:::
