---
type: MUST
id: R000038
---

# use `problem+json` extension for input validation errors

> TODO: [Define and link Validation Error as problem type]

If an input validation error occurs when we call an API, we expect a `400 Bad Request` response. The problem `type` is defined at <https://api.otto.de/api-docs/errors/ValidationError>, the `title` should be _"Your request cannot be validated."_.

This results in the following structure:

```json
{
  "type": "https://api.otto.de/api-docs/errors/ValidationError",
  "key": "ValidationError",
  "title": "Your request cannot be validated.",
  "status": 400
}
```

::: info
We aim at consistent and informative validation messages, and we don't want nondescript validation messages.

`&nbsp;`{label="danger"} Invalid  
`&nbsp;`{label="warning"} "Not a valid US phone number"  
`&nbsp;`{label="success"} "Not a valid 10-digit US phone number (must not include spaces or special characters)."
:::

As the `problem+json` media type standard does not provide a field for details about input validation, we had to establish one. You could argue about using the already defined `details` field. But [RFC 7807](https://tools.ietf.org/html/rfc7807) explicitly states, that this field is not meant to be parsed. Therefore we created a new field called `validationErrors`.

When creating a user interface with forms that should be validated, the API must send the `validationErrors` extension as part of the problem details, whereas the client can parse it. This way the user will know which fields in the submitted form need to be adjusted before the submission can be successful.

For each invalid field of a request body the API must respond with a dedicated validation error object. Each object consists of three **mandatory** fields. Any further fields are allowed but will be ignored for now.

| field          | description                                                                                                      |
| -------------- | ---------------------------------------------------------------------------------------------------------------- |
| `path`         | [JSONPath](https://goessner.net/articles/JsonPath/) string that describes the invalid field in the request body. |
| `invalidValue` | Client submitted value that caused the validation error.                                                         |
| `details`      | Array of objects that hold several validation error messages for a given `path`.                                 |

The JSON response looks as follows (isolated from the problem details):

```json
{
  "validationErrors": [
    {
      "path": "<json_path_to_error_field>",
      "invalidValue": "The invalid client input.",
      "details": [
        {
          "message": "First human-readable error message."
        },
        {
          "message": "Another human-readable error message."
        }
      ]
    }
}
```

**Comprehensive Example (creating a fictional new retailer)**

Functional API restrictions:

- The `name` property must contain between 3 and 20 characters.
- The `name` property must not contain whitespace.
- The `bankAccount` items need an `iban` property.

Request payload:

```json
{
  "name": "Retailer 1234 Too-Long-To-Be-Validated",
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
  "type": "https://api.otto.de/api-docs/errors/ValidationError",
  "title": "Your request cannot be validated.",
  "status": 400,
  "validationErrors": [
    {
      "path": "name",
      "invalidValue": "retailer name is invalid",
      "details": [
        {
          "message": "Name must have between 3 and 20 characters."
        },
        {
          "message": "Name must not contain whitespace."
        }
      ]
    },
    {
      "path": "bankAccounts[0].iban",
      "details": [
        {
          "message": "IBAN must not be empty."
        }
      ]
    }
  ]
}
```
