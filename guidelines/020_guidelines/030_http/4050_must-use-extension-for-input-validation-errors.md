---
type: MUST
id: R000038
---

# use `problem+json` extension for input validation errors

> TODO: [Define and link Validation Error as problem type]

If an input validation error occurs when we call an API, we expect a BAD_REQUEST (400) response code. The Problem type is defined at <https://example.com/probs/validation-error.> The title should be 'Your request payload didn't validate'.

This results in the following structure:

```json
{
  "type": "https://example.com/probs/validation-error",
  "title": "Your request payload didn't validate.",
  "status": 400
}
```

As the standard members of problem+json Media Type do not provide a field for details about input validation, we have to create one. We could argue about using the already defined _details_ field. But the [Document](https://tools.ietf.org/html/rfc7807) states explicitly, that this field is not meant for parsing. Therefore we create a new field called _validationErrors_.

When creating a Frontend-UI with Forms that should be validated, the API must sent the _validationErrors_ extension as part of the problem details, whereas the client must parse it. This way the user will know which fields in the submitted form need to be adjusted before the submission can be successful.

We will process a json response which's keys contain the json paths referring to the request payload's invalid data. The value for each key should be a list of objects. Each object must contain a "message" field. Any further fields are allowed but will be ignored for now.

This json response looks as follows (isolated from the problem details):

```json
{
  "errors": {
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

- the widget type "lala" doesn't exist
- the promo widget needs a 'shopName' property
- the "title" must have between 3 and 20 characters
- the "title" may only be a singular word

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
      { "message": "The title may only contain a single word" }
    ],
    "widgets[0].type": [{ "message": "The given widget type does not exist" }],
    "widgets[1].shopName": [{ "message": "The ShopName should not be empty" }]
  }
}
```
