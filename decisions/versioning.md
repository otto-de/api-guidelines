### Decision

After deciding to continue using HAL+JSON as the API format, we can cluster the [list of identified options](../topics/versioning.md) into three categories, including those relying on media types otherwise forbidden by using JSON:API.

We cannot support a single global version number for the whole OTTO API, because it would introduce way too much coordination overhead between functional teams.
Also we want to use industry standards as much as possible, factoring out solutions that violate existing standards or rely on draft standards where incompatible changes might happen.

#### Favorable options

* [1.2.2)](../topics/versioning.md#122-resource-versioned-path) Resource Versioned path
* [2.2.2)](../topics/versioning.md#222-accept-header-using-standard-media-type-with-profile-parameter) `Accept` header using standard media type with `profile` parameter

#### Not favorable, but feasible options

* [1.3)](../topics/versioning.md#13-versioned-query-parameter) Versioned query parameter
* [2.1)](../topics/versioning.md#21-custom-version-header) Custom version header complicates caching
* [2.2.1)](../topics/versioning.md#221-accept-header-using-vendor-specific-media-type) `Accept` header using vendor-specific media type without formal registration.

#### Declined options

* [1.1)](../topics/versioning.md#11-versioned-hostname) Versioned hostname
  * contradicts with OTTO functional teams structure
* [1.2.1)](../topics/versioning.md#121-globally-versioned-path) Globally Versioned path
  * contradicts with OTTO functional teams structure
* [2.2.3)](../topics/versioning.md#223-accept-header-using-standard-media-type-with-profile-and-version-parameters) `Accept` header using standard media type with `profile` and `version` parameters
  * Violates Media Type `application/hal+json` standard, that does not define `version` parameter
* [3.1)](../topics/versioning.md#31-content-negotiation-by-profile) Content Negotiation by Profile
  * Specification still in draft
