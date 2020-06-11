---
type: MUST
id: R000039
---

# always return JSON error response

Our API endpoints [must always return JSON objects](../040_resources/2030_must-always-return-JSON-objects-as-top-level-data-structure.md). This rule applies to error responses as well. If the client does not support the preferred format [problem+json](4010_must-use-problem-json-as-error-response-format.md) as stated via `Accept` header a minimal error response must be returned in JSON format. The corresponding content-type has to be `application/json`.  
Mandatory properties are `title` and `detail` to explain the occuring error. Additional fields may still be included.

**Minimal Error Response**

```json
{
  "title": "Not authorized to view account details.",
  "detail": "Due to privacy concerns you are not allowed to view account details of others."
}
```

`Note:`{ label } Further [JSON guidelines](../040_resources/2000_json-guidelines.md) apply.
