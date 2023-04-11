# Changelog

<!--CHANGELOG-MARKER-->

## 2023-03-09

### New

- profile and link-rel urls can be independent of the portal
- Renamed rule "MUST use absolute URLs for custom link relation types"
  to "MUST use absolute URIs for custom link relation types". The
  requirement for a `https://api.otto.de/portal` prefix has been removed,
  and it is no longer required to provide resolvable link relation URIs.
  [(R100037)](r100037)
- The "Profile" section previously being found in "Hypermedia" has been
  merged into the section "Versioning of incompatible changes" because
  profiles are used for versioning of hypermedia and non-hypermedia APIs.
- Renamed rule "MUST use profiles for Public REST APIs" to "MUST use
  profiles for versioning" to better indicate the purpose of profiles. The
  content describing the concept of a profile in depth has been moved from
  the section "Profile" to this rule. Added further description and
  examples to highlight better how to leverage profiles. [(R000065)](r000065)
- The rule "MUST use resolvable profile URLs" has been moved to
  "Compatibility"->"Versioning of incompatible changes" and renamed to
  "MUST use absolute URIs for profiles". The requirement for a
  `https://api.otto.de/portal` prefix for profile URIs has been removed,
  and it is no longer required to provide resolvable profile URIs.
  [(R100066)](r100066)
- Removed the rule "MAY use type and profile attributes in hyperlinks"
  because the cardinality of the profile link may change and profile URIs
  are no longer resolvable.
- Removed the rule "Must use kebab-case profile URIs" as it is a
  duplicate of "MUST use kebab-case for URIs". [(R000023)](r000023)
- Removed the rule "SHOULD NOT use resource versioned path" as it is a
  duplicate of "SHOULD NOT use URI versioning". [(R000026)](r000026)

## 2023-03-03

### New

- adjustment of the offset-based rules to use also limit and offset as query parameters

## 2023-02-16

### New

- adjustment of the offset-based rules to use limit and offset as query parameters

## 2023-01-27

### Update

- [SHOULD - fix displayed name of the link](R000037)

## 2023-01-25

### Update

- [MUST - change type of the validation error](R000038)

## 2023-01-09

### Update

- [SHOULD NOT - move rule to naming conventions section](R100077)

## 2022-12-13

### Update

- align problem+json rules to the rfc
- Removed "key" and enforced a more sensible usage of the "type" property [(R000034)](r000034).
- Reworked to point to ValidationError documentation. Mention that `about:blank` should be used for
  problems that do not add any semantics to the status code [(R000037)](r000037).
- Reworked to clearly state that a resolvable type documentation is not required. The type is
  primarily used as an identifier, as stated in the RFC. Add an example of a type documentation.
  Clearly stating that a context-specific type can be introduced [(R000040)](r000040).
- Fixed so that the table is displayed again. Changed so that only status 400 is allowed for
  ValidationError to comply with the RFC that states that only one status is associated with a
  type. [(R000038)](r000038)

## 2022-12-09

### Update

- [MUST - datacontenttype only to be provided if media type is defined](R200013)
- clarify that `datacontenttype` only needs to be provided if a media type is defined

## 2022-11-23

### New

- [SHOULD - use customer id instead of ec-uuid](R100078)
- Replaces "SHOULD use ec-uuid to identify customers"

## 2022-09-14

### New

- [MUST - add new CloudEvents test extension](R200001)

## 2022-09-05

### Update

- [MUST - generalize source prefix](R200010)
- generalize source prefix

## 2022-08-31

### Update

- [MUST - removing restriction to always name curies "o"](R100038)
- remove restriction to always name curies "o"

## 2022-05-31

### New

- release MPV of Event Guidelines
- [(R200001)](r200001)
- [(R200002)](r200002)
- [(R200003)](r200003)
- [(R200004)](r200004)
- [(R200005)](r200005)
- [(R200006)](r200006)
- [(R200007)](r200007)
- [(R200008)](r200008)
- [(R200009)](r200009)
- [(R200010)](r200010)
- [(R200011)](r200011)
- [(R200012)](r200012)
- [(R200013)](r200013)
- [(R200014)](r200014)
- [(R200015)](r200015)
- [(R200016)](r200016)
- [(R200017)](r200017)
- [(R200018)](r200018)
- [(R200019)](r200019)

## 2022-05-16

### New

- [SHOULD - add new rule should not publish data from other business domains](R200018)
- [MUST - add new rule must choose adequate retention time](R200019)

## 2022-05-05

### New

- [MUST - add rule must write new incompatible version of data events into a separate topic](R200016)
- [MUST - add rule must write new incompatible version of domain events into the same topic](R200017)

## 2022-05-02

### Update

- [MUST - fix type alphabet](R200009)
- The possible characters used in the type context attribute have been limited to those present in
  the English language.

## 2022-04-26

### New

- [MUST - add rule must change type to indicate incompatible changes](R200014)
- [MUST - add rule must filter consumed events by type](R200015)

## 2022-04-19

### New

- [MUST - add rule should use binary content mode](R200012)
- [MUST - add rule must provide datacontenttype context attribute](R200013)

## 2022-04-06

### New

- [MUST - add rule must provide event time in UTC](R200011)

## 2022-04-05

### New

- [MUST - add rule must provide meaningful source](R200010)

## 2022-03-31

### Update

- [MUST - add paragraph containing information on how to increase the patch version](R200008)
- add paragraph on how to increase the patch version

## 2022-03-30

### New

- [MUST - add rule must follow naming schema for kafka topic](R200006)
- [MUST - add new rule must follow naming scheme for type context attribute](R200009)
- [MUST - add rule must use semantic versioning in asyncapi specification](R200008)
- [MAY - add new rule may provide sequence context attribute](R200003)

## 2022-03-24

### New

- [MUST - add rule must provide contact information](R000078)

## 2022-03-21

### New

- [MUST - add new rule must consume events idempotently](R200002)
- [MUST - add rule must use asyncapi rule](R200005)

## 2022-03-16

### New

- [MUST - add rule must name events in past tense](R200004)

## 2022-03-15

### Update

- [MUST - change https rule to be more generic](R000046)
- secure communication via TLS

## 2022-03-08

### New

- [MUST - add rule must use cloudevents](R200001)

## 2022-03-07

### New

- add definition of events in Concepts section

## 2022-02-16

### New

- [SHOULD - add rule that describes the usage of extensible enums](R000035)

## 2022-02-15

### Update

- [SHOULD - specify profile for content type header](R000030)
- specify profile for content type header

## 2022-01-28

### Update

- [MUST - add example on how to generate absolute URLs](R100032)
- add example on how to generate absolute URLs

## 2022-01-11

### Update

- [SHOULD - add reasoning behind a should rule](R004040)
- add arguments for the recommended key-value API design for map-like structures

## 2022-01-06

### New

- [SHOULD NOT - add rule for external identifiers](R100077)

## 2021-08-26

### Update

- add media type restrictions for requests with a body in Hypermedia section

## 2021-08-05

### New

- [MUST - add rule for implementation to spec compliance](R000076)

## 2021-06-30

### Update

- allow differentiation between syntactic and logical errors
- document 422 as return code [(R000012)](r000012)
- clarify difference between syntax and logical errors [(R000012)](r000012)
- enhance 400 to differentiate from 422 [(R000038)](r000038)
- add note about enum value validation [(R000028)](r000028)

## 2021-06-01

### New

- [MUST - add rule to use profiles for public APIs](R000065)

## 2021-05-28

### Update

- add portal and context-id to link-rel urls
- [(R100037)](r100037)
- [(R100038)](r100038)

## 2021-05-03

### New

- add naming conventions for profiles
- [(R006020)](r006020)
- [(R100033)](r100033)
- [(R100066)](r100066)
- [(R100068)](r100068)

## 2021-04-16

### New

- add license note and attribution to introduction

## 2021-03-31

### Update

- change structure of validation error
- [(R000038)](r000038)
- [(R000040)](r000040)

## 2021-03-25

### Update

- [SHOULD - use latest version if not accept header specified](R000030)
- use latest version if no accept header was specified

## 2021-03-15

### Update

- [MUST - change rule type from must not to must](R000062)
- change rule type from MUST NOT to MUST

## 2021-03-03

### New

- [MUST - add rule semantic versioning](R000064)

## 2021-03-02

### Update

- mark pagination params as should for private apis
- [(R000049)](r000049)
- [(R100024)](r100024)

## 2020-09-15

### New

- [MUST - add rule for user agent](R000025)

## 2020-09-08

### New

- add rules for caching
- [(R006010)](r006010)
- [(R006020)](r006020)
- [(R006030)](r006030)

## 2020-08-05

### New

- add rules for error handling
- [(R000034)](r000034)
- [(R000037)](r000037)
- [(R000038)](r000038)
- [(R000040)](r000040)

## 2020-07-08

### New

- add rules for JSON guidelines
- [(R004020)](r004020)
- [(R004021)](r004021)
- [(R004050)](r004050)
- [(R004080)](r004080)
- [(R004090)](r004090)
