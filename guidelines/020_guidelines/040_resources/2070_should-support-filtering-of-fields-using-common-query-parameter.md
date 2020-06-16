---
type: SHOULD
id: R004070
---

# support filtering of fields using common query parameter

To reduce potential load on the server and reduce payload size, you can use the `fields` query parameter to specify the set of properties you are interested in that will be included in the response.
You should also support filtering of nested properties.

Examples:

- `fields=(name)`: include only field `name`
- `fields=(name,id)`: include field `name` and `id`
- `fields=name,friends(id, name)`: include field `name` and `friends`, with `friends` only having `id` and `name` properties
