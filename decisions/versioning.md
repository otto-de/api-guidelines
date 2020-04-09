### Decision

After deciding to continue using HAL+JSON as the API format, we can cluster the [list of identified options](../topics/versioning.md) into three categories, including those relying on media types otherwise forbidden by using JSON:API.

We cannot support a single global version number for the whole OTTO API, because it would introduce way too much coordination overhead between functional teams.
Also we want to use industry standards as much as possible, factoring out solutions that violate existing standards or rely on draft standards where incompatible changes might happen.

#### Favorable options

* [1.2.2)](../topics/versioning.md#122-resource-versioned-path) Resource Versioned path
  * 💣 Contradicts with the [definition of REST resources](https://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm#sec_5_2_1_1) being identified by URIs at any particular point in time
* [2.2.2)](../topics/versioning.md#222-accept-header-using-standard-media-type-with-profile-parameter) `Accept` header using standard media type with `profile` parameter
  * 💣 [Poor support](https://github.com/jensfischer1515/rest-api-incubator/commit/f4758803523df4af408f62d1823185ef23b989ce) from frameworks like Spring

Both of these options require some semantic of latest version of an endpoint. For option 1.2.2 this can be solved by using a special version identifier of `latest` as part of the URI, e.g. https://api.otto.de/checkouts/latest/1234-5678-0000. Option 2.2.2 needs some server-side logic to route to the correct endpoint in case an `Accept` header used for content negotiation does not include a versioned profile for the media type.

Proposal for solving the last outstanding decision:

* favour no versioning at all and only introduce non-breaking changes
* if not possible favor option 2.2.2
* if not possible fallback to option 1.2.2

#### Not favorable, but feasible options

* [1.3)](../topics/versioning.md#13-versioned-query-parameter) Versioned query parameter
  * 💣 Contradicts with the [definition of REST resources](https://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm#sec_5_2_1_1) being identified by URIs at any particular point in time
* [2.1)](../topics/versioning.md#21-custom-version-header) Custom version header
  * 💣 Complicates caching
* [2.2.1)](../topics/versioning.md#221-accept-header-using-vendor-specific-media-type) `Accept` header using vendor-specific media type
  * 💣 Need for formal registration of own `application/vnd.*` media types in the official vendor tree 

#### Declined options

* [1.1)](../topics/versioning.md#11-versioned-hostname) Versioned hostname
  * 💣 Contradicts with OTTO functional teams structure
* [1.2.1)](../topics/versioning.md#121-globally-versioned-path) Globally Versioned path
  * 💣 Contradicts with OTTO functional teams structure
* [2.2.3)](../topics/versioning.md#223-accept-header-using-standard-media-type-with-profile-and-version-parameters) `Accept` header using standard media type with `profile` and `version` parameters
  * 💣 Violates [Media Type `application/hal+json` standard](https://tools.ietf.org/html/draft-kelly-json-hal-08#page-8), that does not define `version` parameter
* [3.1)](../topics/versioning.md#31-content-negotiation-by-profile) Content Negotiation by Accept-Profile
  * 💣 Specification still in draft
