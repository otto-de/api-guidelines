---
type: MUST
id: R000038
---

# use `problem+json` extension for input validation errors

> TODO: [Define and link Validation Error as problem type]

If an input validation error occurs when we call an API, we expect a `400 Bad Request` response. The problem `type` is defined at <https://example.com/probs/validation-error>, the `title` should be _"Your request payload didn't validate"_.

This results in the following structure:

```json
{
  "type": "https://example.com/probs/validation-error",
  "code": "[TODO]",
  "title": "Your request payload didn't validate.",
  "status": 400
}
```

As the standard members of `problem+json` media type do not provide a field for details about input validation, we have to create one. We could argue about using the already defined `details` field. But [RFC 7807](https://tools.ietf.org/html/rfc7807) explicitly states, that this field is not meant to be parsed. Therefore we create a new field called `validationErrors`.

When creating a user interface with forms that should be validated, the API must send the `validationErrors` extension as part of the problem details, whereas the client must parse it. This way the user will know which fields in the submitted form need to be adjusted before the submission can be successful.

We will process a JSON response which keys contain the JSON paths referring to the request payload's invalid data. The value for each key should be a list of objects. Each object must contain a `message` field. Any further fields are allowed but will be ignored for now.

The JSON response looks as follows (isolated from the problem details):

```json
{
  "validationErrors": {
    "<json_path_to_error_field_1>": [
      { "message": "Error Message in prosa 1" },
      { "message": "Error Message in prosa 2" }
    ],
    "<json_path_to_error_field_2>": [{ "message": "Error Message in prosa" }],
    "unbound": [
      { "message": "Generic error not bound to a specific data point" }
    ]
  }
}
```

**Complete Example**

Functional API restrictions:

- the widget type `"lala"` doesn't exist
- the promo widget needs a `shopName` property
- the `title` must contain between 3 and 20 characters
- the `title` must not contain whitespace

Request payload:

```json
{
  "title": "My Topic Page title is a little bit too long",
  "widgets": [
    {
      "type": "lala",
      "shopName": "socks"
    },
    {
      "type": "PROMO"
    }
  ]
}
```

Fitting error response:

```json
{
  "type": "https://example.com/probs/validation-error",
  "title": "Your request payload didn't validate.",
  "status": 400,
  "validationErrors": {
    "title": [
      { "message": "The title must have between 3 and 20 characters" },
      { "message": "The title must not contain whitespace" }
    ],
    "widgets[0].type": [{ "message": "The given widget type does not exist" }],
    "widgets[1].shopName": [{ "message": "The ShopName should not be empty" }]
  }
}
```
