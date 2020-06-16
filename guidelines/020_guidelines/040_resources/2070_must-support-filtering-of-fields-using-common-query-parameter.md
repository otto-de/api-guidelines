---
type: SHOULD
id: R004070
---

# support filtering of fields using common query parameter

To reduce potential load on the server and reduce payload size, you can use the `fields` query parameter to specify the set of properties you are interested in that will be included in the response (e.g. `fields=name,description`).,

Nested properties can also be filtered (e.g. `fields=name,dimensions(weight),delivery(status(name))`).
