# API Versioning

## Favorable options

### `Accept` header using standard media type with `profile` parameter

```http
GET https://api.company.com/customers HTTP/1.1
Accept: application/hal+json;profile="https://api.company.com/profiles/customer-v2"
```

**Examples:** n/a

See [Media Type Parameters](https://tools.ietf.org/html/draft-kelly-json-hal-08#page-8) for `application/hal+json`.

**Pros:**
* Standard `Accept` header for content negotiation with media types

**Neutrals:**
* Version implicitly via different `profile` URIs (may contain a version suffix)
 
**Cons:**
* [Lack of framework support](https://github.com/jensfischer1515/rest-api-incubator/commit/f4758803523df4af408f62d1823185ef23b989ce) for content negotiation using Media Type parameters (like `profile`)

### Resource versioned path(s)
Different variants of versions in URL paths. A default `latest` should exist automatically.
```http
GET https://api.company.com/customers/v2 HTTP/1.1
Accept: application/json
```

**Examples:** [Facebook](https://developers.facebook.com/docs/apps/versions)

**Pros:**
* Easy to consume
* Allows different teams / systems to version their endpoints individually

**Neutrals:**
* Semantic of default version needs to be defined (e.g. Facebook translates unversioned calls to oldest version)

**Cons:**
* Contradicts with the [definition of REST resources](https://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm#sec_5_2_1_1) being identified by URIs at any particular point in time
* Complex hyperlinking from one resource to another resource
* Default version changes over time

## Not favorable, but feasible options

### Versioned query parameter
```http
GET https://api.company.com/customers?version=2 HTTP/1.1
Accept: application/json
```

**Examples:** n/a

**Pros:**
* Easy to consume

#### Neutral
* Semantic of default version when no query param available needs to be defined

**Cons:**
* Complex hyperlinking from one resource to another resource
* Contradicts with the [definition of REST resources](https://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm#sec_5_2_1_1) being identified by URIs at any particular point in time
* Default version changes over time

### Custom version header
```http
GET https://api.company.com/customers HTTP/1.1
X-Api-Version: 2
Accept: application/json
```

**Examples:** [Microsoft Azure Storage Services](https://docs.microsoft.com/en-us/rest/api/storageservices/Versioning-for-the-Azure-Storage-Services) (`x-ms-version: 2017-07-29`)

**Pros:**
* Standard `Accept` header for content negotiation with media types

**Neutrals:**
* Need for extra [`Vary` header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Vary) for caching support in content negotiation

**Cons:**
* Header name is far from any industry standard

### `Accept` header using vendor-specific media type

```http
GET https://api.company.com/customers HTTP/1.1
Accept: application/vnd.company.customer.v2+json
```
```http
Accept: application/vnc.company.customer+json;version=2
Content-Type: application/vnc.company.customer+json;version=2
```

**Examples:** [GitHub REST API](https://developer.github.com/v3/media/#request-specific-version), [Shopify Payments REST API](https://shopify.dev/docs/admin-api/rest/reference/shopify_payments#versioning-of-the-shopify-payments-api), [Zalando](https://opensource.zalando.com/restful-api-guidelines/#114)

See [Media Type vendor tree](https://en.wikipedia.org/wiki/Media_type#Vendor_tree) and [RFC-6838](https://tools.ietf.org/html/rfc6838#section-3.2)

**Pros:**
* Standard `Accept` header for content negotiation with media types
* Framework support

**Neutrals:**
* Use the personal/vanity tree (`prs.`), or even unregistered (`x.`) instead of official vendor tree
* What are typical suffixes other than `+json`?

**Cons:**
* Need for formal registration of own `application/vnd.*` media types in the official vendor tree 

## Declined options

### Versioned hostname
```http
GET https://api-v2.company.com/customers HTTP/1.1
Accept: application/json
```

**Examples:** n/a

**Pros:**
* Easy to consume

**Cons:**
* One global version for all endpoints does not fit our functional team organisation
* Operational complexity for different environments (nonlive, live) with different versions
* Complex hyperlinking from one resource to another

### Globally versioned path
```http
GET https://api.company.com/v2/customers HTTP/1.1
Accept: application/json
```

**Examples:** [Facebook](https://developers.facebook.com/docs/apps/versions), [Google](https://cloud.google.com/blog/products/gcp/versioning-apis-at-google), [eBay](https://developer.ebay.com/api-docs/static/versioning.html)

**Pros:**
* Easy to consume

**Cons:**
* One global version for all endpoints doesn't fit OTTO functional team structure
* Complex hyperlinking from one resource to another resource

### `Accept` header using standard media type with `profile` and `version` parameters
```http
GET https://api.company.com/customers HTTP/1.1
Accept: application/hal+json;profile="https://api.company.com/profiles/customer";version=2
```

**Examples:** Current OTTO API Guidelines

**Pros:**
* Standard `Accept` header for content negotiation with media types

**Cons:**
* Lack of framework support for content negotiation using Media Type parameters (like `version`); currently not supported by [Spring WebMVC content negotation](https://docs.spring.io/spring/docs/current/spring-framework-reference/web.html#mvc-multiple-representations), see [examples](https://github.com/jensfischer1515/rest-api-incubator#content-negotiation) and also [StackOverflow](https://stackoverflow.com/questions/32071006/does-http-content-negotiation-respect-media-type-parameters)
* Violates [Media Type `application/hal+json` standard](https://tools.ietf.org/html/draft-kelly-json-hal-08#page-8), that does not define `version` parameter

### Content negotiation by profile

```http
GET https://api.company.com/customers HTTP/1.1
Accept: application/hal+json
Accept-Profile: <https://api.example.com/profiles/customer-2>
```

**Examples:** n/a

For further details see [W3C Working Draft](https://www.w3.org/TR/dx-prof-conneg/).

**Pros:**
* Standard `Accept` header for content negotiation with media types

**Neutrals:**
* Framework support is unclear
* Need for extra [`Vary` header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Vary) for caching support in content negotiation

**Cons:**
* Current status is _Working Draft_

## Resources

* OTTO API Guidelines
  * [Technische API Guidelines](https://confluence.scm.otto.de/display/API/Technische+API+Guidelines#TechnischeAPIGuidelines-VersionierungundKompabilit%C3%A4t)
  * [Möglichkeiten API-Versionierung](https://confluence.scm.otto.de/pages/viewpage.action?pageId=213378715).
* Zalando API Guidelines
  * [Compatibility](https://opensource.zalando.com/restful-api-guidelines/#compatibility)
    * [SHOULD avoid versioning](https://opensource.zalando.com/restful-api-guidelines/#113)
    * [MUST use media type versioning](https://opensource.zalando.com/restful-api-guidelines/#114)
    * [MUST not use URI versioning](https://opensource.zalando.com/restful-api-guidelines/#115)
* [API Versioning Methods, a Brief Reference](https://dzone.com/articles/api-versioning-methods-a-brief-reference)
