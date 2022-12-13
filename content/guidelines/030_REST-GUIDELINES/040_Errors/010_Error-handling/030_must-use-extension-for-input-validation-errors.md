---
type: MUST
id: R000038
---

# use `problem+json` extension for input validation errors

Validation checks can be performed on the request body, e.g. on form input values or business objects to be stored, as well as on path and query parameters. The `ValidationError` schema should be used for all types of validation errors. All validation errors for one request should be combined into a self-sufficient error response that contains detailed messages for each failed check.

If an input validation error occurs, we expect a `400 Bad Request` response.

The problem `type` is defined as <https://api.otto.de/portal/errors/ValidationError>. The `title` should be _"Your request cannot be validated."_. The status code is always `400`.

This results in the following structure:

```json
{
  "type": "https://api.otto.de/portal/errors/ValidationError",
  "key": "ValidationError",
  "title": "Your request cannot be validated.",
  "status": 400,
  "validationErrors": [
    {
      "in": "query",
      "path": "paymentType",
      "invalidValue": "CHECK",
      "details": [
        {
          "key": "serviceX.payment.unknownValue",
          "message": "The 'CHECK' value is not a known value for the 'paymentType' query parameter."
        }
      ]
    }
  ]
}
```

The added `validationErrors` property should contain detailed information about all validation errors that occurred during request validation.
Clients can parse the details section and handle the errors accordingly, e.g. display messages in the corresponding input form, remove items from the underlying collection, or request another user action.

For each invalid property of the request body, path or query parameter, the API must respond with a dedicated validation error object.

The following table shows the available properties:

| property          | description                                                                                                                                                                                                                                                                                                                                                                                                                          | mandatory |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------- |
| `in`              | Shows the location of the validated object or attribute. Allowed values:<ul><li><code>path</code> - URL path, e.g. `my-path-param` in `myEndpoint/{my-path-param}/detailResource`.</li><li><code>query</code> - query parameter, e.g. `pageSize` for pagination.</li><li><code>header</code> - header parameter, e.g. for custom header.</li><li><code>body</code> - if the validated element is part of the request body.</li></ul> | ✔         |
| `path`            | Depending on the "in" property, the path can have a different meaning:<ul><li><code>path</code> - The name of the invalid path parameter.</li><li><code>query</code> - The name of the invalid query parameter.</li><li><code>header</code> - The name of the invalid header.</li><li><code>body</code>- A [JSONPath](https://goessner.net/articles/JsonPath/) that points to the invalid property.</li></ul>                        |           |
| `invalidValue`    | Optional string representation of the invalid value that caused the validation error, e.g. a single word in a text property, which failed the check, etc. A missing `invalidValue` may express that no value or a null value has been provided in the request.                                                                                                                                                                       |           |
| `details`         | Array of objects that hold at least one detail message for the given parameter or request body element.                                                                                                                                                                                                                                                                                                                              | ✔         |
| `details.key`     | Mandatory error message key, which can be used to map the actual UI error message, e.g. in case of interationalization. The suggested format for strings is _service.object.errorKey_, e.g. _checkout.variation.alreadyExists_. <br> For fixed values, please [format enumerations in UPPER_SNAKE_CASE](@guidelines/R004090)                                                                                                         | ✔         |
| `details.message` | Optional validation message describing the error in detail. Due to the `key` the message is optional, but still recommended for comprehensive stack tracing and logging.                                                                                                                                                                                                                                                             |

We aim at consistent and informative validation messages.
We don't want nondescript validation messages.

`&nbsp;`{label="danger"} Invalid  
`&nbsp;`{label="warning"} "Not a valid US phone number"  
`&nbsp;`{label="success"} "Not a valid 10-digit US phone number (must not include spaces or special characters)."

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
