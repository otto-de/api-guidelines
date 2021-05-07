---
type: MUST
id: R000038
---

# use `problem+json` extension for input validation errors

Validation checks can be performed on the request body, e.g. on form input values or business objects to be stored, as well as on path and query parameters. The `ValidationError` schema should be used for all types of validation errors - both syntactic and semantic. All validation errors for one request should be combined into a self-sufficient error response that contains detailed messages for each failed check.

If an input validation error occurs, we expect a `400 Bad Request` response. The problem `type` is defined at <https://api.otto.de/portal/errors/ValidationError>. The `title` should be _"Your request cannot be validated."_.

This results in the following structure:

```json
{
  "type": "https://api.otto.de/portal/errors/ValidationError",
  "key": "ValidationError",
  "title": "Your request cannot be validated.",
  "status": 400
}
```

As the `problem+json` media type standard does not provide a field for details about input validation, we had to establish one.
You could argue about using the already defined `details` field.
But [RFC 7807](https://tools.ietf.org/html/rfc7807) explicitly states, that this field is not meant to be parsed.
Therefore we created a new field called `validationErrors`.

The `validationErrors` extension as part of the problem details should contain detailed information about all validation errors that occurred during request validation. Clients can parse the details section and handle the errors accordingly, e.g. display messages in the corresponding input form, remove items from the underlying collection, or request another user action.

For each invalid field of the request body, path or query parameter, the API must respond with a dedicated validation error object.

The following table shows the available attributes. Mandatory attributes are marked with an asterisk<sup>\*</sup> :

| field                                 | description                                                                                                                                                                                                                                                                                                                                                     |
| ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <code>in<sup>\*</sup></code>          | Shows the location of the validated object or attribute. Allowed values are `[path\|query\|header\|body]`                                                                                                                                                                                                                                                       |
| `path`                                | Optional [JSONPath](https://goessner.net/articles/JsonPath/) that describes the invalid field in the request body. We strongly recommend adding this information as it would allow a more specialized error handling for API consumers.                                                                                                                         |
| `invalidValue`                        | Optional string representation of the invalid value that caused the validation error, e.g. a single word in a text field, which failed the check, etc.                                                                                                                                                                                                          |
| <code>details<sup>\*</sup></code>     | Array of objects that hold at least one detail message for the given parameter or request body element.                                                                                                                                                                                                                                                         |
| <code>details.key<sup>\*</sup></code> | Mandatory error message key, which can be used to map the actual UI error message, e.g. in case of interationalization. The suggested format for strings is _service.object.errorKey_, e.g. _checkout.variation.alreadyExists_. <br> For fixed values, please [format enumerations in UPPER_SNAKE_CASE](https://api.develop.otto.de/portal/guidelines/#R004090) |
| `details.message`                     | Optional validation message describing the error in detail. Due to the `key` the message is optional, but still recommended for comprehensive stack tracing and logging.                                                                                                                                                                                        |

::: info
We aim at consistent and informative validation messages.
We don't want nondescript validation messages.

`&nbsp;`{label="danger"} Invalid  
`&nbsp;`{label="warning"} "Not a valid US phone number"  
`&nbsp;`{label="success"} "Not a valid 10-digit US phone number (must not include spaces or special characters)."
:::

The JSON response looks as follows (isolated from the problem details):

```json
{
  "validationErrors": [
    {
      "in": "[path|query|header|body]",
      "path": "$.json.path.to.error.field",
      "invalidValue": "Optional invalid client input as a string.",
      "details": [
        {
          "key": "machine.readable.key1",
          "message": "First human-readable error message."
        },
        {
          "key": "machine.readable.key2",
          "message": "Another human-readable error message."
        }
      ]
    }
  ]
}
```

Here's a comprehensive example (creating a fictional new partner):

Functional API restrictions:

- The `name` property must contain between 3 and 20 characters.
- The `name` property must not contain whitespace.
- The `bankAccount` items need an `iban` property.
- The new partner has to pass the credit check.

Request payload:

```json
{
  "name": "A-TOO-LONG-RETAILER-NAME WITH-WHITESPACE",
  "bankAccounts": [
    {
      "ownerName": "Otto"
    }
  ]
}
```

Corresponding error response:

```json
{
  "type": "https://api.otto.de/portal/errors/ValidationError",
  "title": "Your request cannot be validated.",
  "status": 400,
  "validationErrors": [
    {
      "in": "body",
      "path": "$.partner.name",
      "invalidValue": "A-TOO-LONG-RETAILER-NAME WITH-WHITESPACE",
      "details": [
        {
          "key": "serviceX.partner.stringTooLong",
          "message": "Name must have between 3 and 20 characters."
        },
        {
          "key": "serviceX.partner.noWhitespace",
          "message": "Name must not contain whitespace."
        }
      ]
    },
    {
      "in": "body",
      "path": "$.partner.bankAccounts[0].iban",
      "details": [
        {
          "key": "serviceX.partner.valueMissing",
          "message": "IBAN must not be empty."
        }
      ]
    },
    {
      "in": "body",
      "details": [
        {
          "key": "serviceX.partner.creditCheckFailed",
          "message": "Credit check was not successful."
        }
      ]
    }
  ]
}
```
