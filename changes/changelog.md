# Changelog

<!--CHANGELOG-MARKER-->
## 2023-05-17


## 2023-05-17


## 2023-05-16

### Update

- Adjusted sidebar entries to resolve general guidelines into rest and async sections.

## 2023-03-09

### New

- profile and link-rel urls can be independent of the portal
- Renamed rule "MUST use absolute URLs for custom link relation types"
  to "MUST use absolute URIs for custom link relation types". The
  requirement for a `https://api.otto.de/portal` prefix has been removed,
  and it is no longer required to provide resolvable link relation URIs.
  [(R100037)](/guidelines/r100037)
- The "Profile" section previously being found in "Hypermedia" has been
  merged into the section "Versioning of incompatible changes" because
  profiles are used for versioning of hypermedia and non-hypermedia APIs.
- Renamed rule "MUST use profiles for Public REST APIs" to "MUST use
  profiles for versioning" to better indicate the purpose of profiles. The
  content describing the concept of a profile in depth has been moved from
  the section "Profile" to this rule. Added further description and
  examples to highlight better how to leverage profiles. [(R000065)](/guidelines/r000065)
- The rule "MUST use resolvable profile URLs" has been moved to
  "Compatibility"->"Versioning of incompatible changes" and renamed to
  "MUST use absolute URIs for profiles". The requirement for a
  `https://api.otto.de/portal` prefix for profile URIs has been removed,
  and it is no longer required to provide resolvable profile URIs.
  [(R100066)](/guidelines/r100066)
- Removed the rule "MAY use type and profile attributes in hyperlinks"
  because the cardinality of the profile link may change and profile URIs
  are no longer resolvable.
- Removed the rule "Must use kebab-case profile URIs" as it is a
  duplicate of "MUST use kebab-case for URIs". [(R000023)](/guidelines/r000023)
- Removed the rule "SHOULD NOT use resource versioned path" as it is a
  duplicate of "SHOULD NOT use URI versioning". [(R000026)](/guidelines/r000026)

## 2023-03-03

### New

- adjustment of the offset-based rules to use also limit and offset as query parameters

## 2023-02-16

### New

- adjustment of the offset-based rules to use limit and offset as query parameters

## 2023-01-27

### Update

- [SHOULD - fix displayed name of the link](/guidelines/r000037)

## 2023-01-25

### Update

- [MUST - change type of the validation error](/guidelines/r000038)

## 2023-01-09

### Update

- [SHOULD NOT - move rule to naming conventions section](/guidelines/r100077)

## 2022-12-13

### Update

- align problem+json rules to the rfc
- Removed "key" and enforced a more sensible usage of the "type" property [(R000034)](/guidelines/r000034).
- Reworked to point to ValidationError documentation. Mention that `about:blank` should be used for
  problems that do not add any semantics to the status code [(R000037)](/guidelines/r000037).
- Reworked to clearly state that a resolvable type documentation is not required. The type is
  primarily used as an identifier, as stated in the RFC. Add an example of a type documentation.
  Clearly stating that a context-specific type can be introduced [(R000040)](/guidelines/r000040).
- Fixed so that the table is displayed again. Changed so that only status 400 is allowed for
  ValidationError to comply with the RFC that states that only one status is associated with a
  type. [(R000038)](/guidelines/r000038)

## 2022-12-09

### Update

- [MUST - datacontenttype only to be provided if media type is defined](/guidelines/r200013)
- clarify that `datacontenttype` only needs to be provided if a media type is defined

## 2022-11-23

### New

- [SHOULD - use customer id instead of ec-uuid](/guidelines/r100078)
- Replaces "SHOULD use ec-uuid to identify customers"

## 2022-09-14

### New

- [MUST - add new CloudEvents test extension](/guidelines/r200001)

## 2022-09-05

### Update

- [MUST - generalize source prefix](/guidelines/r200010)
- generalize source prefix

## 2022-08-31

### Update

- [MUST - removing restriction to always name curies "o"](/guidelines/r100038)
- remove restriction to always name curies "o"

## 2022-05-31

### New

- release MPV of Event Guidelines
- [(R200001)](/guidelines/r200001)
- [(R200002)](/guidelines/r200002)
- [(R200003)](/guidelines/r200003)
- [(R200004)](/guidelines/r200004)
- [(R200005)](/guidelines/r200005)
- [(R200006)](/guidelines/r200006)
- [(R200007)](/guidelines/r200007)
- [(R200008)](/guidelines/r200008)
- [(R200009)](/guidelines/r200009)
- [(R200010)](/guidelines/r200010)
- [(R200011)](/guidelines/r200011)
- [(R200012)](/guidelines/r200012)
- [(R200013)](/guidelines/r200013)
- [(R200014)](/guidelines/r200014)
- [(R200015)](/guidelines/r200015)
- [(R200016)](/guidelines/r200016)
- [(R200017)](/guidelines/r200017)
- [(R200018)](/guidelines/r200018)
- [(R200019)](/guidelines/r200019)

## 2022-05-16

### New

- [SHOULD - add new rule should not publish data from other business domains](/guidelines/r200018)
- [MUST - add new rule must choose adequate retention time](/guidelines/r200019)

## 2022-05-05

### New

- [MUST - add rule must write new incompatible version of data events into a separate topic](/guidelines/r200016)
- [MUST - add rule must write new incompatible version of domain events into the same topic](/guidelines/r200017)

## 2022-05-02

### Update

- [MUST - fix type alphabet](/guidelines/r200009)
- The possible characters used in the type context attribute have been limited to those present in
  the English language.

## 2022-04-26

### New

- [MUST - add rule must change type to indicate incompatible changes](/guidelines/r200014)
- [MUST - add rule must filter consumed events by type](/guidelines/r200015)

## 2022-04-19

### New

- [MUST - add rule should use binary content mode](/guidelines/r200012)
- [MUST - add rule must provide datacontenttype context attribute](/guidelines/r200013)

## 2022-04-06

### New

- [MUST - add rule must provide event time in UTC](/guidelines/r200011)

## 2022-04-05

### New

- [MUST - add rule must provide meaningful source](/guidelines/r200010)

## 2022-03-31

### Update

- [MUST - add paragraph containing information on how to increase the patch version](/guidelines/r200008)
- add paragraph on how to increase the patch version

## 2022-03-30

### New

- [MUST - add rule must follow naming schema for kafka topic](/guidelines/r200006)
- [MUST - add new rule must follow naming scheme for type context attribute](/guidelines/r200009)
- [MUST - add rule must use semantic versioning in asyncapi specification](/guidelines/r200008)
- [MAY - add new rule may provide sequence context attribute](/guidelines/r200003)

## 2022-03-24

### New

- [MUST - add rule must provide contact information](/guidelines/r000078)

## 2022-03-21

### New

- [MUST - add new rule must consume events idempotently](/guidelines/r200002)
- [MUST - add rule must use asyncapi rule](/guidelines/r200005)

## 2022-03-16

### New

- [MUST - add rule must name events in past tense](/guidelines/r200004)

## 2022-03-15

### Update

- [MUST - change https rule to be more generic](/guidelines/r000046)
- secure communication via TLS

## 2022-03-08

### New

- [MUST - add rule must use cloudevents](/guidelines/r200001)

## 2022-03-07

### New

- add definition of events in Concepts section

## 2022-02-16

### New

- [SHOULD - add rule that describes the usage of extensible enums](/guidelines/r000035)

## 2022-02-15

### Update

- [SHOULD - specify profile for content type header](/guidelines/r000030)
- specify profile for content type header

## 2022-01-28

### Update

- [MUST - add example on how to generate absolute URLs](/guidelines/r100032)
- add example on how to generate absolute URLs

## 2022-01-11

### Update

- [SHOULD - add reasoning behind a should rule](/guidelines/r004040)
- add arguments for the recommended key-value API design for map-like structures

## 2022-01-06

### New

- [SHOULD NOT - add rule for external identifiers](/guidelines/r100077)

## 2021-08-26

### Update

- add media type restrictions for requests with a body in Hypermedia section

## 2021-08-05

### New

- [MUST - add rule for implementation to spec compliance](/guidelines/r000076)

## 2021-06-30

### Update

- allow differentiation between syntactic and logical errors
- document 422 as return code [(R000012)](/guidelines/r000012)
- clarify difference between syntax and logical errors [(R000012)](/guidelines/r000012)
- enhance 400 to differentiate from 422 [(R000038)](/guidelines/r000038)
- add note about enum value validation [(R000028)](/guidelines/r000028)

## 2021-06-01

### New

- [MUST - add rule to use profiles for public APIs](/guidelines/r000065)

## 2021-05-28

### Update

- add portal and context-id to link-rel urls
- [(R100037)](/guidelines/r100037)
- [(R100038)](/guidelines/r100038)

## 2021-05-03

### New

- add naming conventions for profiles
- [(R006020)](/guidelines/r006020)
- [(R100033)](/guidelines/r100033)
- [(R100066)](/guidelines/r100066)

## 2021-04-16

### New

- add license note and attribution to introduction

## 2021-03-31

### Update

- change structure of validation error
- [(R000038)](/guidelines/r000038)
- [(R000040)](/guidelines/r000040)

## 2021-03-25

### Update

- [SHOULD - use latest version if not accept header specified](/guidelines/r000030)
- use latest version if no accept header was specified

## 2021-03-15

### Update

- [MUST - change rule type from must not to must](/guidelines/r000062)
- change rule type from MUST NOT to MUST

## 2021-03-03

### New

- [MUST - add rule semantic versioning](/guidelines/r000064)

## 2021-03-02

### Update

- mark pagination params as should for private apis
- [(R000049)](/guidelines/r000049)
- [(R100024)](/guidelines/r100024)

## 2020-09-15

### New

- [MUST - add rule for user agent](/guidelines/r000025)

## 2020-09-08

### New

- add rules for caching
- [(R006010)](/guidelines/r006010)
- [(R006020)](/guidelines/r006020)
- [(R006030)](/guidelines/r006030)

## 2020-08-05

### New

- add rules for error handling
- [(R000034)](/guidelines/r000034)
- [(R000037)](/guidelines/r000037)
- [(R000038)](/guidelines/r000038)
- [(R000040)](/guidelines/r000040)

## 2020-07-08

### New

- add rules for JSON guidelines
- [(R004020)](/guidelines/r004020)
- [(R004021)](/guidelines/r004021)
- [(R004050)](/guidelines/r004050)
- [(R004080)](/guidelines/r004080)
- [(R004090)](/guidelines/r004090)
