# API Versioning

See also
* OTTO API Guidelines
  * [Technische API Guidelines](https://confluence.scm.otto.de/display/API/Technische+API+Guidelines#TechnischeAPIGuidelines-VersionierungundKompabilit%C3%A4t)
  *  [Möglichkeiten API-Versionierung](https://confluence.scm.otto.de/pages/viewpage.action?pageId=213378715).
* Zalando API Guidelines
  * [Compatibility](https://opensource.zalando.com/restful-api-guidelines/#compatibility)
    * [SHOULD avoid versioning](https://opensource.zalando.com/restful-api-guidelines/#113)
    * [MUST use media type versioning](https://opensource.zalando.com/restful-api-guidelines/#114)
    * [MUST not use URI versioning](https://opensource.zalando.com/restful-api-guidelines/#115)
  * [Deprectaion](https://opensource.zalando.com/restful-api-guidelines/#deprecation)
* [API Versioning Methods, a Brief Reference](https://dzone.com/articles/api-versioning-methods-a-brief-reference)

## Versioning via URI vs. request header

### Different options

#### 1.1) Versioned hostname:

```http
GET https://api-v2.company.com/customers HTTP/1.1
Accept: application/json
```

##### Prominent examples:

* ...

##### Assessment

* 💣 One global version for all endpoints does not fit our functional teams organisation
* 💣 Operational complexity for different environments (nonlive, live) with different versions
* 💣 Complex hyperlinking from one resource to another resource
* 🤟 Easy to consume

#### 1.2) Versioned in path(s)

Different variants of versions in URL paths.
A default `latest` should exist automatically.

```http
GET https://api.company.com/customers HTTP/1.1
Accept: application/json
```

points to the latest customers api.

##### Prominent examples:

* [Facebook](https://developers.facebook.com/docs/apps/versions)

##### Assessment

* 💣 Default version changes over time
* 🤔 Semantic of default version needs to be defined (e.g. Facebook translates unversioned calls to oldest version)
* 🤟 Easy to consume

#### 1.2.1) Globally Versioned path:

```http
GET https://api.company.com/v2/customers HTTP/1.1
Accept: application/json
```

##### Prominent examples:

* [Facebook](https://developers.facebook.com/docs/apps/versions)

##### Assessment

* 💣 One global version for all endpoints does not fit our functional teams organisation
* 💣 Complex hyperlinking from one resource to another resource
* 🤟 Easy to consume

#### 1.2.2) Resource Versioned path:

```http
GET https://api.company.com/customers/v2 HTTP/1.1
Accept: application/json
```

##### Prominent examples:

* ...

##### Assessment

* 💣 Complex hyperlinking from one resource to another resource
* 🤔 Allows different teams to version their endpoints individually
* 🤟 Easy to consume

#### 1.3) Versioned query parameter:

```http
GET https://api.company.com/customers?version=2 HTTP/1.1
Accept: application/json
```

##### Prominent examples:

* ...

##### Assessment

* 💣 Complex hyperlinking from one resource to another resource
* 💣 Default version changes over time
* 🤔 Semantic of default version when no query param available needs to be defined
* 🤟 Easy to consume

#### 2.1) Custom version header:

```http
GET https://api.company.com/customers HTTP/1.1
X-Api-Version: 2
Accept: application/json
```

##### Prominent examples:

* [Microsoft Azure Storage Services](https://docs.microsoft.com/en-us/rest/api/storageservices/Versioning-for-the-Azure-Storage-Services) (`x-ms-version: 2017-07-29`)

##### Assessment

* 💣 Header name is far from any industry standard
* 🤔 Need for extra [`Vary` header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Vary) for caching support in content negotiation?
* 🤟 Standard `Accept` header for content negotiation with media types

#### 2.2.1) `Accept` header using vendor-specific media type:

See [Media Type vendor tree](https://en.wikipedia.org/wiki/Media_type#Vendor_tree) and [RFC-6838](https://tools.ietf.org/html/rfc6838#section-3.2)

```http
GET https://api.company.com/customers HTTP/1.1
Accept: application/vnd.company.customer.v2+json
```

##### Prominent examples:

* [GitHub REST API](https://developer.github.com/v3/media/#request-specific-version)
* [Shopify Payments REST API](https://shopify.dev/docs/admin-api/rest/reference/shopify_payments#versioning-of-the-shopify-payments-api)

##### Assessment

* 💣 Need for formal registration of own media types in the official vendor tree
* 🤔 Use the personal/vanity tree (`prs.`), or even unregistered (`x.`) instead of official vendor tree
* 🤔 What are typical suffixes other than `+json`?
* 🤟 Standard `Accept` header for content negotiation with media types
* 🤟 Framework support

#### 2.2.2) `Accept` header using standard media type with `profile` parameter:

```http
GET https://api.company.com/customers HTTP/1.1
Accept: application/hal+json;profile="https://api.company.com/profiles/customer-v2"
```

See [Media Type Parameters](https://tools.ietf.org/html/draft-kelly-json-hal-08#page-8) for `application/hal+json`.

##### Prominent examples:

* ...

##### Assessment

* 💣 Lack of framework support for content negotiation using Media Type parameters (like `profile`)
* 🤔 Version implicitly via different `profile` URIs (may contain a version suffix)
* 🤟 Standard `Accept` header for content negotiation with media types

#### 2.2.3) `Accept` header using standard media type with `profile` and `version` parameters

```http
GET https://api.company.com/customers HTTP/1.1
Accept: application/hal+json;profile="https://api.company.com/profiles/customer";version=2
```

**Note:** this is currently not supported by [Spring WebMVC content negotation](https://docs.spring.io/spring/docs/current/spring-framework-reference/web.html#mvc-multiple-representations), see [examples](https://github.com/jensfischer1515/rest-api-incubator#content-negotiation) and also [StackOverflow](https://stackoverflow.com/questions/32071006/does-http-content-negotiation-respect-media-type-parameters)

##### Prominent examples:

* Current [OTTO API Guidelines](https://confluence.scm.otto.de/display/API/Technische+API+Guidelines#TechnischeAPIGuidelines-VersionierungundKompabilit%C3%A4t)

##### Assessment

* 💣 Lack of framework support for content negotiation using Media Type parameters (like `version`)
* 🤟 Standard `Accept` header for content negotiation with media types

#### 3.1) Content Negotiation by Profile:

See [W3C Working Draft](https://www.w3.org/TR/dx-prof-conneg/)

```http
GET https://api.company.com/customers HTTP/1.1
Accept: application/hal+json
Accept-Profile: <https://api.example.com/profiles/customer-2>
```

##### Prominent examples:

* no known examples, yet

##### Assessment

* 💣 Current status is Working Draft
* 🤔 Framework support is unclear.
* 🤔 Need for extra [`Vary` header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Vary) for caching support in content negotiation?
* 🤟 Standard `Accept` header for content negotiation with media types
