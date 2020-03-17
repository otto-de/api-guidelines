### Decision

Due to dependencies to other topics (e.g. HAL+JSON vs. JSON API),
there is currently not a single versioning option to favour.
But the [list of identified options](../topics/versioninig.md) can already be clustered:

#### Favorable options

* [1.2.2)](../topics/versioninig.md#122-resource-versioned-path) Resource Versioned path
* [2.2.2)](../topics/versioninig.md#222-accept-header-using-standard-media-type-with-profile-parameter) `Accept` header using standard media type with `profile` parameter

#### Not favorable, but feasible options

* [1.3)](../topics/versioninig.md#13-versioned-query-parameter) Versioned query parameter
* [2.1)](../topics/versioninig.md#21-custom-version-header) Custom version header
* [2.2.1)](../topics/versioninig.md#221-accept-header-using-vendor-specific-media-type) `Accept` header using vendor-specific media type

#### Declined options

* [1.1)](../topics/versioninig.md#11-versioned-hostname) Versioned hostname
  * contradicts with OTTO functional teams structure
* [1.2.1)](../topics/versioninig.md#121-globally-versioned-path) Globally Versioned path
  * contradicts with OTTO functional teams structure
* [2.2.3)](../topics/versioninig.md#223-accept-header-using-standard-media-type-with-profile-and-version-parameters) `Accept` header using standard media type with `profile` and `version` parameters
  * Media Type `application/hal+json` does not define `version` parameter
* [3.1)](../topics/versioninig.md#31-content-negotiation-by-profile) Content Negotiation by Profile
  * Specification still in draft
