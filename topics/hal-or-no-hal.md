# HAL vs. JSON:API

In the following you will find two opposing proposals: Section 2 is arguing to move to JSON:API. Section 1, on the
other hand, is arguing to keep application/hal+json as the primary format for hypertext documents.

The arguments are partly contradictory, but hopefully helpful in order to come to an agreement.

Section 3) contains a brief excerpt from blog post about _choosing a hypermedia format_ 

## 1 Pro HAL+JSON 

A biased proposal for HAL+JSON

**Example Document**
```json
GET /orders HTTP/1.1
Host: example.org
Accept: application/hal+json

HTTP/1.1 200 OK
Content-Type: application/hal+json

{
  "_links": {
    "self": { "href": "/orders" },
    "next": { "href": "/orders?page=2" },
    "find": { "href": "/orders{?id}", "templated": true }
  },
  "_embedded": {
    "orders": [{
        "_links": {
          "self": { "href": "/orders/123" },
          "basket": { "href": "/baskets/98712" },
          "customer": { "href": "/customers/7809" }
        },
        "total": 30.00,
        "currency": "USD",
        "status": "shipped",
      },{
        "_links": {
          "self": { "href": "/orders/124" },
          "basket": { "href": "/baskets/97213" },
          "customer": { "href": "/customers/12369" }
        },
        "total": 20.00,
        "currency": "USD",
        "status": "processing"
    }]
  },
  "currentlyProcessing": 14,
  "shippedToday": 20
}
```

## Current Status

- HAL+JSON is one of many possible standardized formats used to implement RESTful APIs w/ hyperlinks
- Other formats like, for example, JSON:API have a broader industry support
- Beside of plain JSON, HAL+JSON is the format that is currently used most in present otto.de APIs. 

## Drawbacks

- The standard is no longer actively maintained and expired in November 2016
- Few companies use HAL+JSON

- The standard is quite minimalistic, leaving out a couple of things that we might want to define, such as
    - pagination
    - filtering / sorting
    - templates
    - problems / errors

## Advantages

- A bunch of APIs at otto already implement HAL+JSON. Sticking to the already adopted format will prevent pointless
  migration of already established APIs to a different format.
- The format supports the most important features. Missing details can easily be specified.
- The format is minimalistic, adding only a representation for hyperlinks, plus an implementation of the 
  "Hypertext Cache Pattern" using embedded resources.
- Compared to other formats like, for example, JSON:API, the simplicity ensures a rapid induction to the format.  
- Every JSON document is a valid HAL+JSON document. This gives us the possibility to start with any given JSON API and
  later decide to add hyperlinks and embedded resources in a non-breaking way.
- Because of it's simplicity, virtually no special tooling is required (though same is true for other formats as well). 
  However, a number of tools and libraries for several languages are available.
- Hyperlink are represented as link objects with a couple of helpful attributes. It defines link titles, types, profiles,
  deprecation information and other things that are helpful to evolve APIs.
- Embedded resources can be nested. Using this feature, servers can compose aggregate representations
  from the single aggregated parts in a simple, straightforward way.
- All kinds of versioning is supported. Beside of URI-based versioning, the specification is explicitly supporting 
  profile parameters in the accept header. Links may have `type`, `profile` and `deprecation` attributes to link to 
  different representations of a resources. In contradiction to this, JSON:API is explicitly prohibiting parameters
  of the accept header and does not support any attributes for links beside of custom (unspecified) meta-data attributes.  
- While not explicitly specified, filtering + sorting is supported using `templated` links. The RFC specifying templated
  links is [RFC6580](https://tools.ietf.org/html/rfc6570)
- While not explicitly specified, paging is supported using the standardized IANA link-relation types like, for example,
  `next`, `prev`, `first`, `last`. An example is also contained in the specification 
  [Section 6](https://tools.ietf.org/html/draft-kelly-json-hal-08#section-6)

## Proposal for Sticking to HAL+JSON

Because of the distributed nature of otto.de including the autonomy of the different teams, we need to find a
consent about the preferred mediatype that is both enabling us to implement an easy-to-use and consistent API, while
providing enough flexibility to meet the different requirements of the teams.

Therefore we propose:
  
- The minimum requirement for **internal** APIs is to use application/json w/o hyperlinks, following only the 
  so-called [Richardson's Maturity Model](https://martinfowler.com/articles/richardsonMaturityModel.html) Level 2 requirements.
- For all **partner** and **public** APIs, we expect the API to be RESTful (Level 3). According to Roy Fielding, this 
  [necessarily](https://roy.gbiv.com/untangled/2008/rest-apis-must-be-hypertext-driven) requires the APIs to contain hyperlinks.
  He should know best - he has introduced and defined the concept.  
- Hyperlinks MUST be represented in HAL+JSON format.
- The API SHOULD support embedding of resources. In this case HAL+JSON MUST be used to represent embedded resources.

Because every JSON document is a valid HAL+JSON document (_links and _embedded fields are optional), the HAL format 
gives us the ability to migrate internal APIs into partner or public APIs, without breaking changes. 
 
## 2 Pro JSON:API

A biased proposal for JSON:API

**Example Document**
```json
GET /articles?page[number]=3&page[size]=1 HTTP/1.1
HTTP/1.1 200 OK
Content-Type: application/vnd.api+json

{
  "meta": {
    "totalPages": 13
  },
  "data": [
    {
      "type": "articles",
      "id": "3",
      "attributes": {
        "title": "JSON:API paints my bikeshed!",
        "body": "The shortest article. Ever.",
        "created": "2015-05-22T14:56:29.000Z",
        "updated": "2015-05-22T14:56:28.000Z"
      }
    }
  ],
  "links": {
    "self": "http://example.com/articles?page[number]=3&page[size]=1",
    "first": "http://example.com/articles?page[number]=1&page[size]=1",
    "prev": "http://example.com/articles?page[number]=2&page[size]=1",
    "next": "http://example.com/articles?page[number]=4&page[size]=1",
    "last": "http://example.com/articles?page[number]=13&page[size]=1"
  }
} 
```

### 2.1 Current Status

- In theory JSON+HAL is one standard that APIs should adhere to.
- In practice a lot of APIs do not.

### 2.2 Drawbacks

- The HAL+JSON standard is no longer actively maintained and expired in November 2016
    - Very few companies use HAL+JSON, it is somewhat obscure.
    - Because of that there is virtually no library/tooling eco system.

- The HAL+JSON standard is quite minimalistic, leaves out a lot that we might want to define, such as:
    - pagination
    - versioning
    - filtering / sorting
    - error messages

### 2.3 Advantages
- JSON:API ist an active standard which is continuously improved and has an active community
- Error responses are standardized and allow multiple error messages in one response.
- Pagination is a build in feature af JSON:API
- Other standards like [Google JSON Style Guide](https://google.github.io/styleguide/jsoncstyleguide.xml)
  are not dissimilar to JSON:API.

#### [Benefits From Using JSON API](https://nordicapis.com/the-benefits-of-using-json-api/)

##### Compound Documents

[Compound documents](https://jsonapi.org/format/#document-compound-documents) is a unique ability in JSON API, allowing servers to send related resources alongside the requested primary resources — if implemented correctly this could decrease the number of necessary HTTP requests. Compound documents works by using the include parameter like as follows:
```
GET https://api.example.com/posts?include=author
```

This enables you to include additional resources in an initial request.

##### Sparse Fieldsets

If you’re using compound documents to include related resources, you could run into an issue of having large responses. Once again, JSON API has a solution.

Another unique aspect of JSON API are sparse fieldsets, which enable clients to only request data from specific fields. It works by adding the field you want to retrieve to the URI parameter with the resource name and the fields you want. This offers additional customization and can decrease bloat. It looks something like:

```
GET /articles?include=author&amp;;fields[articles]=title,body&amp;;fields[people]=name HTTP/1.1
Accept: application/vnd.api+json
```

Sparse fieldsets is a standardized method of allowing clients to specify only the properties they want from an object to be included in the response. Using sparse fieldsets, you get only the fields that you desire, offering unique customization potential that is alluring for lean data sharing environments.

Also Read: [Optimizing APIs For Mobile Apps](https://nordicapis.com/optimizing-apis-for-mobile-apps/)

### 2.4 Disadvantages

- A bunch of APIs at OTTO already implement HAL+JSON, changing that will be some effort.

### 2.5 Proposal for Adapting JSON:API

- we adapt [JSON:API](https://jsonapi.org/format/#fetching-pagination) for the basis of our new API standard
    - this should give us capabilities similar to JSON+HAL like hyperlinking
    - the standard is being actively maintained, new versions are backwards compatible
- our own standard is seen as an addendum to JSON:API
- where we want to be stricter / more specific than the standard we can limit options that JSON:HAL gives
  - this could mean changing SHOULD requirements to MUST requirements
  - these stricter requirements can evolve & change over time to give teams time to adapt
  - or limiting the number of options JSON:API to fewer to have a more consistent API experience
- where JSON:API is lacking / makes no recommendations we try to define additions that will, most likely, not collide with future development of JSON:API
  - i.e. with versioning we choose another mechanism than using the Content-Type header, since that will [probably be used by JSON-API](https://jsonapi.org/format/#content-negotiation-servers)
- only where _absolutely_ necessary we deviate from JSON:API in such way that would contradict it

## 3. Related links
- [The JSON API Spec](https://www.youtube.com/watch?v=RSv-Yv3cgPg) (YouTube)
- [REST vs Json:API vs GraphQL](https://www.youtube.com/watch?v=hhB7bJC_sVs) (YouTube)
- [JSON:API - Why not use the hal specification](https://jsonapi.org/faq/#why-not-use-the-hal-specification)
- [Choosing a hypermedia format](https://sookocheff.com/post/api/on-choosing-a-hypermedia-format/)

### Quote from _Choosing a hypermedia format_ blog post

##### Conclusions

I’ve create a [Gist](https://gist.github.com/soofaloofa/bc3f82793baa79dd897a7d2588841a07) comparing each of the media types discussed in this post.

After going through this exercise I’ve come to a few conclusions.

##### JSON-LD

JSON-LD is great for augmenting existing APIs without introducing breaking changes. This augmentation mostly serves as a way to self document your API. If you are looking to add operations to a JSON-LD response look to HYDRA. HYDRA adds a vocabulary for communicating using the JSON-LD specification. This is an interesting choice as it decouples the API serialization format from the communication format.

##### HAL

The light weight syntax and semantics of HAL is appealing in a lot of contexts. HAL is a minimal representation that offers most of the benefits of using a hypermedia type without adding too much complexity to the implementation. One area where HAL falters is, like JSON-LD, the lack of support for specifying actions.

##### Collection+JSON

Don’t be fooled by the name. Collection+JSON can be used to represent single items as well and it does this quite well. Of course it shines when representing data collections. Particularly appealing is the ability to list queries that your collection supports and templates that clients can use to alter your collection. For publishing user editable data Collection+JSON shines.

##### SIREN

SIREN attempts to represent generic classes of items and overcome the main drawback of HAL – support for actions. It does this admirably well and also introduces the concept of classes to your model bringing a sense of type information to your API responses.

##### JSON:API

JSON:API provides a robust set of features for most APIs. In addition, it has arguably the broadest industry support. This is important because writing APIs directly against a standard can be difficult and being able to leverage tooling to help you is one of the best ways to ensure adoption of a standard across an entire organization.
