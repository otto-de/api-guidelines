---
id: R100071
---

# MUST use common data formats

Use standard data formats as defined in

- [OpenAPI Specification: Data Types](http://spec.openapis.org/oas/v3.0.3#data-types)
- [JSON Schema: Built-in formats](https://json-schema.org/draft/2019-09/json-schema-validation.html#rfc.section.7.3)

The following is a non-exhaustive table of common formats.

Format names starting with `otto:` are not defined by OpenAPI or JSON Schema and are specific to the OTTO organisation.
They represent formats that are not covered or are extensions of existing ones.

| type    | format                | spec                                   | example                                                                              | comment                                 | 
| ------- | --------------------- | -------------------------------------- |--------------------------------------------------------------------------------------|-----------------------------------------|
| integer | int32                 |                                        |                                                                                      | signed 32 bits                          |
| integer | int64                 |                                        |                                                                                      | signed 64 bits (a.k.a long) |
| number  | float                 |                                        |                                                                                      |                                         | 
| number  | double                |                                        |                                                                                      |                                         |
| string  |                       |                                        |                                                                                      |                                         |
| string  | byte                  |                                        |                                                                                      | base64 encoded characters               |
| string  | binary                |                                        |                                                                                      | any sequence of octets                  |
| boolean |                       |                                        |                                                                                      |                                         |
| string  | date                  | [RFC3339] - `full-date`                | `2020-06-16`                                                                         | see also [date rule][rule-date]         |
| string  | date-time             | [RFC3339] - `date-time`                | `2020-06-16T04:05:06Z`                                                               | see also [date rule][rule-date]         |
| string  | time                  | [RFC3339] - `full-time`                | `04:05:06Z`                                                                          | see also [date rule][rule-date]         |
| string  | duration              | [RFC3339] - `duration`                 | `P1DT12H` (1 day 12 hours)                                                           |                                         |
| string  | password              |                                        | `passw0rd`                                                                           | a hint for processing/display           |
| string  | email                 | [RFC5322][rfc5322]                     | `example@example.com`                                                                | internationalized email                 |
| string  | idn-email             | [RFC5322][rfc5322]                     |                                                                                      |                                         |
| string  | hostname              | [RFC1123][rfc1123], [RFC5891][rfc5891] | `www.otto.de`                                                                        | internationalized hostname              |
| string  | idn-hostname          | [RFC1123][rfc1123], [RFC5890][rfc5890] |                                                                                      |                                         |
| string  | ipv4                  | [RFC2673][rfc2673]                     | `127.0.0.1`                                                                          |                                         |
| string  | ipv6                  | [RFC2673][rfc2673]                     | `0:0:0:0:0:0:0:1`                                                                    |                                         |
| string  | uri                   | [RFC3986][rfc3986]                     | `https://otto.de`                                                                    |                                         |
| string  | uri-list              | [RFC2483][rfc2483]                     | # example of a comment<br>https://api.otto.de/users/1<br>https://api.otto.de/users/2 | transferring a single URI is also valid |
| string  | uri-reference         | [RFC3986][rfc3986]                     |                                                                                      |                                         |
| string  | uri-template          | [RFC6570][rfc6570]                     | `https://api.otto.de/users/{userId}`                                                 |                                         |
| string  | iri                   | [RFC3987][rfc3987]                     |                                                                                      | internationalized URI                   |
| string  | iri-reference         | [RFC3987][rfc3987]                     |                                                                                      | internationalized URI-reference         |
| string  | uuid                  | [RFC4122][rfc4122]                     | `f81d4fae-7dec-11d0-a765-00a0c91e6bf6`                                               |                                         |
| string  | json-pointer          | [RFC6901][rfc6901]                     | `/foo/0`                                                                             |                                         |
| string  | relative-json-pointer | [DRAFT json-pointer][json-pointer]     | `1/nested/objects`                                                                   |                                         |
| string  | regex                 | [ECMA-262][ecma-262]                   | `[a-f]+[0-9]*`                                                                       |                                         |
| string  | otto:country-code     | [ISO 3166-1-alpha2][iso3166-1-alpha2]  | `DE`, `GB`                                                                           |                                         |
| string  | otto:language-code    | [ISO 639-1][iso639-1], [BCP 47][bcp47] | `de`, `de-DE`, `en`, `en-US`                                                         |                                         |
| string  | otto:currency-code    | [ISO 4217][iso4217]                    | `EUR`, `USD`, `CHF`                                                                  |                                         |

These format names are intended to be used in the OpenAPI specification provided by the service.

::: references

- [MUST provide API specification using OpenAPI][rule-spec]
  :::

[rule-date]: ../../../../global/json/canonical-data-types/rules/must-use-common-date-and-time-format.md
[rule-spec]: ../../../../rest/contract/openapi/rules/must-provide-api-specification-using-openapi-for-rest-apis.md
[rfc3339]: https://tools.ietf.org/html/rfc3339#section-5.6
[rfc5322]: https://tools.ietf.org/html/rfc5322#section-3.4.1
[rfc1123]: https://tools.ietf.org/html/rfc1123#section-2.1
[rfc5891]: https://tools.ietf.org/html/rfc5891#section-4.4
[rfc5890]: https://tools.ietf.org/html/rfc5890#section-2.3.2.3
[rfc2673]: https://tools.ietf.org/html/rfc2673#section-3.2
[rfc3986]: https://tools.ietf.org/html/rfc3986
[rfc3987]: https://tools.ietf.org/html/rfc3987
[rfc6901]: https://tools.ietf.org/html/rfc6901#section-5
[json-pointer]: https://tools.ietf.org/html/draft-handrews-relative-json-pointer-02
[ecma-262]: https://www.ecma-international.org/publications/files/ECMA-ST/Ecma-262.pdf
[rfc6570]: https://tools.ietf.org/html/rfc6570
[rfc4122]: https://tools.ietf.org/html/rfc4122
[iso3166-1-alpha2]: https://www.iso.org/iso-3166-country-codes.html
[iso639-1]: https://www.loc.gov/standards/iso639-2/php/English_list.php
[bcp47]: https://tools.ietf.org/html/bcp47
[iso4217]: https://www.currency-iso.org/en/home/tables/table-a1.html
[rfc2483]: https://www.rfc-editor.org/rfc/rfc2483.html#section-5
