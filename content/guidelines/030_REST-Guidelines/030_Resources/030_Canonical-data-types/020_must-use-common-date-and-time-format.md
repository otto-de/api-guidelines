---
type: MUST
id: R100072
---

# use common date and time format

Use the `full-date`, `date-time` or `full-time` format as defined in [RFC3339][rfc3339].

Examples:

`full-date`:

- `2020-06-16`
- `1986-12-01`

`date-time`:

- `2020-06-16T04:05:06Z`
- `2020-10-05T11:23:09+02:00`
- `1986-12-01T05:12:55.12Z`

Use `date-time` in UTC without time zone (e.g. `2020-06-16T12:53:11Z`).

::: info
In the [OpenAPI specification][openapi-specification-data-types] `full-date` corresponds to `date`, `date-time` corresponds to `date-time`.
In the [JSON Schema specification][json-schema-spec-defined-formats] `full-time` corresponds to `time`.
:::

::: warning
HTTP headers must use the date format recommended by the HTTP specification [RFC7231][rfc7231] (e.g. `Sun, 06 Nov 1994 08:49:37 GMT`).
:::

::: references

- [MUST use common data formats](R100071)
  :::

[rfc3339]: https://tools.ietf.org/html/rfc3339#section-5.6
[json-schema-spec-defined-formats]: https://json-schema.org/draft/2019-09/json-schema-validation.html#rfc.section.7.3
[openapi-specification-data-types]: http://spec.openapis.org/oas/v3.0.3#data-types
[rfc7231]: https://tools.ietf.org/html/rfc7231#section-7.1.1.1
