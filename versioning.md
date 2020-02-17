# API Versioning

See also [Technische API Guidelines](https://confluence.scm.otto.de/display/API/Technische+API+Guidelines#TechnischeAPIGuidelines-VersionierungundKompabilit%C3%A4t) and [Möglichkeiten API-Versionierung](https://confluence.scm.otto.de/pages/viewpage.action?pageId=213378715).

## Versioning via URI vs. request header

### Different options

#### 1.1) Versioned hostname:

```http
GET https://api-v2.company.com/customers HTTP/1.1
Accept: application/json
```

#### 1.2) Versioned path:

```http
GET https://api.company.com/v2/customers HTTP/1.1
Accept: application/json
```

#### 1.3) Versioned query parameter:

```http
GET https://api.company.com/customers?version=2 HTTP/1.1
Accept: application/json
```

#### 2.1) Custom version header:

```http
GET https://api.company.com/customers HTTP/1.1
X-Api-Version: 2
Accept: application/json
```

#### 2.2.1) `Accept` header using vendor-specific media type:

See [Media Type vendor tree](https://en.wikipedia.org/wiki/Media_type#Vendor_tree) and [RFC-6838](https://tools.ietf.org/html/rfc6838#section-3.2)

```http
GET https://api.company.com/customers HTTP/1.1
Accept: application/vnd.company.customer.v2+json
```

**Open questions:**

* really doing formal registration of own media types in the vendor tree?
* or use the personal/vanity tree (`prs.`), or even unregistered (`x.`)?
* list of typical suffixes other than `+json`

#### 2.2.2) `Accept` header using standard media type with `profile` parameter:

```http
GET https://api.company.com/customers HTTP/1.1
Accept: application/hal+json;profile="https://api.company.com/profiles/customer";version=2
```

**Note:** this is currently not supported by [Spring WebMVC content negotation](https://docs.spring.io/spring/docs/current/spring-framework-reference/web.html#mvc-multiple-representations), see [examples](https://github.com/jensfischer1515/rest-api-incubator#content-negotiation) and also [StackOverflow](https://stackoverflow.com/questions/32071006/does-http-content-negotiation-respect-media-type-parameters)

```http
GET https://api.company.com/customers HTTP/1.1
Accept: application/hal+json;profile="https://api.company.com/profiles/customer-v2"
```

See [Media Type Parameters](https://tools.ietf.org/html/draft-kelly-json-hal-08#page-8) for `application/hal+json`.

#### 3.1) Profile negotiation

See [Indicating and Negotiating Profiles in HTTP](https://profilenegotiation.github.io/I-D-Profile-Negotiation/I-D-Profile-Negotiation)

```http
GET https://api.company.com/customers HTTP/1.1
Accept: application/hal+json
Accept-Profile: <https://api.example.com/profiles/customer-2>
```

**Note:** status and support of this `Accept-Profile` header is unclear.

### Decision

> Only use versioning of type ...

---

## Zalando API Guidelines

* [Compatibility](https://opensource.zalando.com/restful-api-guidelines/#compatibility)
  * [SHOULD avoid versioning](https://opensource.zalando.com/restful-api-guidelines/#113)
  * [MUST use media type versioning](https://opensource.zalando.com/restful-api-guidelines/#114)
  * [MUST not use URI versioning](https://opensource.zalando.com/restful-api-guidelines/#115)
* [Deprectaion](https://opensource.zalando.com/restful-api-guidelines/#deprecation)
