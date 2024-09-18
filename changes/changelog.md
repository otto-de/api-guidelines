# Changelog

<!--CHANGELOG-MARKER-->
## 2024-09-18
### New

- MAY use Test header [R000080](api-guidelines/rest/http/headers/rules/may-use-test-header.md)
- MUST forward Test header [R000081](api-guidelines/rest/http/headers/rules/must-forward-test-header.md)

## 2024-03-06
### Update

- Fixed the link to the date rule in "MUST use common data formats" [R100071](https://api.otto.de/portal/guidelines/r100071).

## 2024-02-05
### Removal

The following rules have been removed as they contained consumer-facing content. This content has been included in the API Portal in the REST API sections "Status codes", "Headers" "Preview", and "Deprecation" respectively.

- MUST NOT rely on API components marked as preview
- MUST NOT not start using deprecated APIs
- MUST accept undocumented status codes
- MUST follow redirection
- SHOULD honor available ETag header on subsequent modifications

## 2024-01-31
### Update

- Replaced the dead link to `serialized.io/ddd/domain-event` with its internet archive counterpart.

## 2023-09-18
### Update

- Added uri-list format to rule "MUST use common data formats [R100071](https://api.otto.de/portal/guidelines/r100071)".

## 2023-08-29
### Update

- Added links to use cases for "MUST use Authorization Grant [R000052](https://api.otto.de/portal/guidelines/r000052)".
- Emphasize warning, when not to use customerId as HTTP header for "SHOULD use customerId to identify customers [R100078](https://api.otto.de/portal/guidelines/r100078)".

## 2023-08-24
### Update

- Aligned the customerId header name in rule "SHOULD use customerId to identify customers [R100078](https://api.otto.de/portal/guidelines/r100078)" to follow the deprecation of `X-`prefixes according RFC6648.

## 2023-08-17
### Update

- Clarified that the `sub` claim of tokens granted through the Authorization Code Grant flow contains the customerId instead of ec-uuid for now, see "SHOULD use customerId to identify customers [R100078](https://api.otto.de/portal/guidelines/r100078)".

## 2023-06-23

### Removal

The following rules have been removed as this is consumer-facing content and already available in the REST API sections "Getting started" and "About the API".

- MUST use Proof Key for Code Exchange (PKCE) for mobile and JavaScript apps
- MUST NOT use Implicit Grant flow
- MUST set user agent request header
- SHOULD use Accept and Content-Type headers with profile parameter

## 2023-06-20

### Update

- Changed test extension of rule "MAY use test extension [R200021](../api-guidelines/async/format/test-extension/rules/may-use-test-extension.md)" to allow additional test types.
- Changed the example that did not contain the correct test type.

## 2023-05-16

### Update

- Adjusted sidebar entries to resolve general guidelines into rest and async sections.

## 2023-03-09

### Update

- Profile and link relation URLs can be independent of the API Portal.
- Renamed the rule "MUST use absolute URLs for custom link relation types" to "MUST use absolute URIs for custom link relation types [R100037](../api-guidelines/rest/hypermedia/link-relation-types/rules/must-use-absolute-uris-for-custom-link-relation-types.md)". The requirement for a `https://api.otto.de/portal` prefix has been removed, and it is no longer required to provide resolvable link relation URIs.
- Merged the "Profile" section previously being found in "Hypermedia" into the section ["Versioning of incompatible changes"](../api-guidelines/rest/compatibility/versioning-of-incompatible-changes/README.md), because profiles are used for versioning of hypermedia and non-hypermedia APIs.
- Renamed the rule "MUST use profiles for Public REST APIs" to "MUST use profiles for versioning [R000065](../api-guidelines/rest/compatibility/versioning-of-incompatible-changes/rules/must-use-profiles-for-versioning.md)" to better indicate the purpose of profiles. The content describing the concept of a profile in depth has been moved from the section "Profiles" to this rule. Added further descriptions and examples to better highlight how to leverage profiles.
- Moved the rule "MUST use resolvable profile URLs (R100066)" to ["Versioning of incompatible changes"](../api-guidelines/rest/compatibility/versioning-of-incompatible-changes/README.md) and renamed it to "MUST use absolute URIs for profiles [R100066](../api-guidelines/rest/compatibility/versioning-of-incompatible-changes/rules/must-use-absolute-profile-uris.md)". The requirement for a `https://api.otto.de/portal` prefix for profile URIs has been removed, and it is no longer required to provide resolvable profile URIs.
- Removed the rule "MAY use type and profile attributes in hyperlinks (R100063)", because the cardinality of the profile link may change and profile URIs are no longer resolvable.
- Removed the rule "MUST use kebab-case profile URIs" as it is a duplicate of rule "MUST use kebab-case for URIs [R000023](../api-guidelines/rest/resources/naming-conventions/rules/must-use-kebabcase-for-uris.md)".
- Removed the rule "SHOULD NOT use resource versioned path" as it is a duplicate of rule "SHOULD NOT use URI versioning [R000026](../api-guidelines/rest/compatibility/versioning-of-incompatible-changes/rules/should-not-use-uri-versioning.md)".

## 2023-03-03

### Update

- Adjusted rules "MUST use common paging query parameters [R100024](../api-guidelines/rest/resources/collection-resources/rules/must-use-common-paging-query-parameters.md)"  and "MUST provide metadata for offset-based pagination [R100025](../api-guidelines/rest/resources/collection-resources/rules/must-provide-metadata-for-offset-based-pagination.md)" to use also `limit` and `offset` as query parameters.

## 2023-01-27

### Update

- Fixed the displayed name of the link in rule "SHOULD use existing problem types [R000037](../api-guidelines/rest/errors/error-handling/rules/should-use-existing-problem-types.md)".

## 2023-01-25

### Update

- Changed the type of validation error in rule "MUST use `problem+json` extension for input validation errors (R000038)".

## 2023-01-09

### Update

- Moved rule "SHOULD NOT use external identifiers as primary resource identifiers [R100077](../api-guidelines/rest/resources/naming-conventions/rules/should-not-use-external-identifier-as-primary-resource-identifier.md)" to the section [Naming conventions](../api-guidelines/rest/resources/naming-conventions/README.md).

## 2022-12-13

### Update

- Aligned problem+json rules to the RFC.
- Removed "key" and enforced a more sensible usage of the "type" property in rule "MUST use `problem+json` as error response format [R000034](../api-guidelines/rest/errors/error-handling/rules/must-use-problem-json-as-error-response-format.md)".
- Reworked rule "SHOULD use existing problem types [R000037](../api-guidelines/rest/errors/error-handling/rules/should-use-existing-problem-types.md)" to point to ValidationError documentation. Mention that `about:blank` should be used for problems that do not add any semantics to the status code.
- Reworked rule "MAY add custom extensions by defining a problem `type`(R000040)" to clearly state that a resolvable type documentation is not required. The type is primarily used as an identifier, as stated in the RFC. Added an example of a type documentation. Clearly stating that a context-specific type can be introduced.
- Fixed rule "MUST use `problem+json` extension for input validation errors (R000038)" so that the table is displayed again. Changed so that only status 400 is allowed for ValidationError to comply with the RFC that states that only one status is associated with a type.

## 2022-12-09

### Update

- Clarified that `datacontenttype` only needs to be provided if a media type is defined in rule "MUST provide `datacontenttype` context attribute if media type is defined [R200013](../api-guidelines/async/format/cloudevents/rules/must-provide-datacontenttype-context-attribute-if-media-type-is-defined.md)".

## 2022-11-23

### Update

- Updated rule "SHOULD use customerId to identify customers [R100078](../api-guidelines/global/json/identifiers/rules/should-use-customerid-to-identify-customers.md)" to replace former "SHOULD use ec-uuid to identify customers".

## 2022-09-14

### Update

- Added new CloudEvents text extension in rule "MUST use CloudEvents format to encode events [R200001](../api-guidelines/async/format/cloudevents/rules/must-use-cloudevents-format-to-encode-events.md).

## 2022-09-05

### Update

- Generalized source prefix in rule "MUST provide meaningful `source` context attribute [R200010](../api-guidelines/async/format/cloudevents/rules/must-provide-meaningful-source-context-attribute.md)".

## 2022-08-31

### Update

- Removed restriction to always name curies "o" in rule "MUST use curied link relation types [R100038](../api-guidelines/rest/hypermedia/link-relation-types/rules/must-use-curied-link-relation-types.md)".

## 2022-05-31

### New

- Released MPV of Event Guidelines.

## 2022-05-16

### New

- SHOULD NOT publish data from other business domains [R200018](../api-guidelines/async/semantics/event-structure/rules/should-not-publish-data-from-other-business-domains.md)
- MUST choose adequate retention time [R200019](../api-guidelines/async/kafka/topics/rules/must-choose-adequate-retention-time.md)

## 2022-05-05

### New

- MUST write new incompatible version of data events into a separate topic [R200016](../api-guidelines/async/kafka/topics/rules/must-write-new-incompatible-version-of-data-events-into-separate-topic.md)
- MUST write new incompatible version of domain events into the same topic [R200017](../api-guidelines/async/kafka/topics/rules/must-write-new-incompatible-version-of-domain-events-into-same-topic.md)

## 2022-05-02

### Update

- Limited the possible characters used in the type context attribute to those present in the English language in rule "MUST follow naming scheme for `type` context attribute [R200009](../api-guidelines/async/format/cloudevents/rules/must-follow-naming-schema-for-type-context-attribute.md)".

## 2022-04-26

### New

- MUST change `type` context attribute to indicate incompatible changes [R200014](../api-guidelines/async/compatibility/versioning/rules/must-change-type-context-attribute-to-indicate-incompatible-changes.md)
- MUST filter consumed events by `type` [R200015](../api-guidelines/async/compatibility/versioning/rules/must-filter-consumed-events-by-type.md)

## 2022-04-19

### New

- MUST use `binary` content mode if supported by chosen protocol [R200012](../api-guidelines/async/format/cloudevents/rules/must-use-binary-content-mode.md)
- MUST provide `datacontenttype` context attribute if media type is defined [R200013](../api-guidelines/async/format/cloudevents/rules/must-provide-datacontenttype-context-attribute-if-media-type-is-defined.md)

## 2022-04-06

### New

- MUST provide event `time` in UTC [R200011](../api-guidelines/async/format/cloudevents/rules/must-provide-event-time-in-utc.md)

## 2022-04-05

### New

- MUST provide meaningful `source` context attribute [R200010](../api-guidelines/async/format/cloudevents/rules/must-provide-meaningful-source-context-attribute.md)

## 2022-03-31

### Update

- Added paragraph on how to increase the patch version in rule "MUST use semantic versioning for AsyncAPI specification [R200008](../api-guidelines/async/contract/asyncapi/rules/must-use-semantic-versioning-for-asyncapi-specification.md)".

## 2022-03-30

### New

- MUST follow kafka topic naming convention [R200006](../api-guidelines/async/kafka/topics/rules/must-follow-kafka-topic-naming-convention.md)
- MUST follow naming scheme for `type` context attribute [R200009](../api-guidelines/async/format/cloudevents/rules/must-follow-naming-schema-for-type-context-attribute.md)
- MUST use semantic versioning for AsyncAPI specification [R200008](../api-guidelines/async/contract/asyncapi/rules/must-use-semantic-versioning-for-asyncapi-specification.md)
- MAY provide sequence context attribute [R200003](../api-guidelines/async/format/cloudevents/rules/may-provide-sequence-context-attribute.md)

## 2022-03-24

### New

- MUST provide contact information [R000078](../api-guidelines/global/basics/rules/must-provide-contact-informaton.md)

## 2022-03-21

### New

- MUST prepare consumers to consume events idempotently [R200002](../api-guidelines/async/semantics/event-structure/rules/must-prepare-consumers-to-consume-events-idempotently.md)
- MUST provide API specification using AsyncAPI for asynchronous APIs [R200005](../api-guidelines/async/contract/asyncapi/rules/must-provide-api-specification-using-asyncapi-for-asyncrhonous-apis.md)

## 2022-03-16

### New

- MUST name events in past tense [R200004](../api-guidelines/async/format/naming-conventions/rules/must-name-events-in-past-tense.md)

## 2022-03-15

### Update

- Added secure communication via TLS in rule "MUST use TLS [R000046](../api-guidelines/global/basics/rules/must-use-tls.md)".

## 2022-03-08

### New

- MUST use CloudEvents format to encode events [R200001](../api-guidelines/async/format/cloudevents/rules/must-use-cloudevents-format-to-encode-events.md)

## 2022-03-07

### Update

- Added definition of events in the section [Concepts](../api-guidelines/async/concepts/README.md).

## 2022-02-16

### New

- SHOULD use extensible enums [R000035](../api-guidelines/global/compatibility/compatible-changes/rules/should-use-extensible-enums.md)

## 2022-02-15

### Update

- Specified profile for content type header in rule "SHOULD use Accept header with profile parameter (R000030)".

## 2022-01-28

### Update

- Added example on how to generate absolute URLs in rule "MUST use absolute URLs [R100032](../api-guidelines/rest/hypermedia/links/rules/must-use-absolute-urls.md)".

## 2022-01-11

### Update

- Added arguments for the recommended key-value API design for map-like structures in rule "SHOULD represent maps as objects with keys being their property names [R004040](../api-guidelines/global/json/naming-conventions/rules/should-represent-maps-as-objects-with-keys-being-properties.md)".

## 2022-01-06

### New

- SHOULD NOT use external identifiers as primary resource identifiers [R100077](../api-guidelines/rest/resources/naming-conventions/rules/should-not-use-external-identifier-as-primary-resource-identifier.md)

## 2021-08-26

### Update

- Added media type restrictions for requests with a body in the section [Hypermedia](../api-guidelines/rest/hypermedia/README.md).

## 2021-08-05

### New

- MUST ensure implementation complies with the contract [R000076](../api-guidelines/global/basics/rules/must-ensure-implementation-is-compliant-to-openapi-specification.md)

## 2021-06-30

### Update

- Allowed differentiation between syntactic and logical errors.
- Documented `422` as return code in rule "MUST use standard HTTP status codes [R000012](../api-guidelines/rest/http/status-codes/rules/must-use-standard-http-status-codes.md)".
- Clarified the difference between syntax and logical errors in rule "MUST use standard HTTP status codes [R000012](../api-guidelines/rest/http/status-codes/rules/must-use-standard-http-status-codes.md)".
- Enhanced `400` to differentiate from `422` in rule "MUST use `problem+json` extension for input validation errors (R000038)".
- Added note about enum value validation in rule "SHOULD prefer compatible extensions [R000028](../api-guidelines/global/compatibility/compatible-changes/rules/should-prefer-compatible-extensions.md)".

## 2021-06-01

### New

- MUST use profiles for versioning [R000065](../api-guidelines/rest/compatibility/versioning-of-incompatible-changes/rules/must-use-profiles-for-versioning.md)

## 2021-05-28

### Update

- Added portal and context ID to link relation URLs in rules "MUST use absolute URIs for custom link relation types [R100037](../api-guidelines/rest/hypermedia/link-relation-types/rules/must-use-absolute-uris-for-custom-link-relation-types.md)" and "MUST use curied link relation types [R100038](../api-guidelines/rest/hypermedia/link-relation-types/rules/must-use-curied-link-relation-types.md)".

## 2021-05-03

### New

- Added naming conventions for profiles to rules "MUST document cacheable `GET`, `HEAD` and `POST` endpoints [R006020](../api-guidelines/rest/http/caching/rules/must-document-cacheable-get-head-and-post-endpoints.md)", "MUST provide conventional hyperlinks [R100033](../api-guidelines/rest/hypermedia/links/rules/must-provide-conventional-hyperlinks.md)" and "MUST use absolute URIs for profiles [R100066](../api-guidelines/rest/compatibility/versioning-of-incompatible-changes/rules/must-use-absolute-profile-uris.md)".

## 2021-04-16

### Update

- Added license note and attribution to [introduction](../README.md).

## 2021-03-31

### Update

- Changed structure of validation error in rules "MUST use `problem+json` extension for input validation errors (R000038)" and "MAY add custom extensions by defining a problem `type`(R000040)".

## 2021-03-25

### Update

- Updated rule "SHOULD use Accept header with profile parameter (R000030)" to use latest version if no accept header was specified.

## 2021-03-15

### Update

- Changed type from MUST NOT to MUST in rule "MUST support lists for multiple values of the same query parameter [R000062](../api-guidelines/rest/resources/naming-conventions/rules/must-support-lists-for-multiple-values-of-the-same-parameter.md)".

## 2021-03-03

### New

- MUST use semantic versioning in OpenAPI specification files [R000064](../api-guidelines/rest/contract/openapi/rules/must-use-semantic-versioning-in-openapi-specification-files.md)

## 2021-03-02

### Update

- Marked pagination params as SHOULD for private APIs in rules "MUST stick to conventional query parameters [R000049](../api-guidelines/rest/resources/naming-conventions/rules/must-stick-to-conventional-query-parameters.md)" and "MUST use common paging query parameters [R100024](../api-guidelines/rest/resources/collection-resources/rules/must-use-common-paging-query-parameters.md)".

## 2020-09-15

### New

- MUST set user agent request header (R000025)

## 2020-09-08

### New

Added a set of new rules for caching:

- SHOULD adhere to caching best practices [R006010](../api-guidelines/rest/http/caching/rules/should-adhere-to-caching-best-practices.md)
- MUST document cacheable `GET`, `HEAD` and `POST` endpoints [R006020](../api-guidelines/rest/http/caching/rules/must-document-cacheable-get-head-and-post-endpoints.md)
- SHOULD avoid `Vary` header for caching [R006030](../api-guidelines/rest/http/caching/rules/should-avoid-vary-header-for-caching.md)

## 2020-08-05

### New

Added a set of new rules for error handling:

- MUST use `problem+json` as error response format [R000034](../api-guidelines/rest/errors/error-handling/rules/must-use-problem-json-as-error-response-format.md)
- SHOULD use existing problem types [R000037](../api-guidelines/rest/errors/error-handling/rules/should-use-existing-problem-types.md)
- MUST use `problem+json` extension for input validation errors (R000038)
- MAY add custom extensions by defining a problem `type` (R000040)

## 2020-07-08

### New

Added a set of new rules for JSON guidelines:

- MUST use same semantics for null and absent properties [R004020](../api-guidelines/global/json/naming-conventions/rules/must-use-same-semantics-for-null-and-absent-properties.md)
- SHOULD omit optional properties [R004021](../api-guidelines/global/json/naming-conventions/rules/should-omit-optional-properties.md)
- SHOULD pluralize array names [R004050](../api-guidelines/global/json/naming-conventions/rules/should-pluralize-array-names.md)
- MUST represent enumerations as strings [R004080](../api-guidelines/global/json/naming-conventions/rules/must-represent-enumerations-as-strings.md)
- MUST format enumerations in UPPER_SNAKE_CASE [R004090](../api-guidelines/global/json/naming-conventions/rules/must-format-enumerations-in-upper-snake-case.md)
