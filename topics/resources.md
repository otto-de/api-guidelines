## Resources

### **[MUST]** avoid actions - think about resources

> TODO: [REVIEW]

REST is all about your resources, so consider the domain entities that take part in web service interaction, and aim to model your API around these using the standard HTTP methods as operation indicators. For instance, if an application has to lock articles explicitly so that only one user may edit them, create an article lock with `PUT` or `POST` instead of using a lock action.

Request:

```
PUT /article-locks/{article-id}
```

The added benefit is that you already have a service for browsing and filtering article locks.

### **[SHOULD]** model complete business processes

> TODO: [REVIEW]

An API should contain the complete business processes containing all resources representing the process. This enables clients to understand the business process, foster a consistent design of the business process, allow for synergies from description and implementation perspective, and eliminates implicit invisible dependencies between APIs.

In addition, it prevents services from being designed as thin wrappers around databases, which normally tends to shift business logic to the clients.

### **[SHOULD]** define *useful* resources

> TODO: [REVIEW]

As a rule of thumb resources should be defined to cover 90% of all its client’s use cases. A *useful* resource should contain as much information as necessary, but as little as possible. A great way to support the last 10% is to allow clients to specify their needs for more/less information by supporting filtering and [embedding](#embedding).

### **[MUST]** keep URLs verb-free

> TODO: [REVIEW]

The API describes resources, so the only place where actions should appear is in the HTTP methods. In URLs, use only nouns. Instead of thinking of actions (verbs), it’s often helpful to think about putting a message in a letter box: e.g., instead of having the verb *cancel* in the url, think of sending a message to cancel an order to the *cancellations* letter box on the server side.

### **[MUST]** use domain-specific resource names

> TODO: [REVIEW]

API resources represent elements of the application’s domain model. Using domain-specific nomenclature for resource names helps developers to understand the functionality and basic semantics of your resources. It also reduces the need for further documentation outside the API definition. For example, "sales-order-items" is superior to "order-items" in that it clearly indicates which business object it represents. Along these lines, "items" is too general.

### **[MUST]** use URL-friendly resource identifiers: `a-zA-Z0-9:._\-/\]*`

> TODO: [REVIEW]

To simplify encoding of resource IDs in URLs, their representation must only consist of ASCII strings using letters, numbers, underscore, minus, colon, period, and - on rare occasions - slash.

**Note:** slashes are only allowed to build and signal resource identifiers consisting of [compound keys](#may-expose-compound-keys-as-resource-identifiers).

### **[MUST]** identify resources and sub-resources via path segments

> TODO: [REVIEW]

Some API resources may contain or reference sub-resources. Embedded sub-resources, which are not top-level resources, are parts of a higher-level resource and cannot be used outside of its scope. Sub-resources should be referenced by their name and identifier in the path segments as follows:

```
/resources/{resource-id}/sub-resources/{sub-resource-id}
```

In order to improve the consumer experience, you **[SHOULD** aim for intuitively understandable URLs, where each sub-path is a valid reference to a resource or a set of resources. E.g. if `/customers/12ev123bv12v/addresses/DE_100100101` is valid, then `/customers/12ev123bv12v/addresses`, `/customers/12ev123bv12v` and `/customers` must be valid as well in principle. E.g.:

```
/customers/12ev123bv12v/addresses/DE_100100101
/customers/12ev123bv12v
/shopping-carts/de:1681e6b88ec1/items/1
/shopping-carts/de:1681e6b88ec1
/content/images/9cacb4d8
/content/images
```

**Note:** resource identifiers may be build of multiple other resource identifiers (see [**MAY** expose compound keys as resource identifiers](#may-expose-compound-keys-as-resource-identifiers)).

### **[MAY]** expose compound keys as resource identifiers

> TODO: [REVIEW]

If a resource is best identified by a *compound key* consisting of multiple other resource identifiers, it is allowed to reuse the compound key in its natural form containing slashes instead of *technical* resource identifier in the resource path without violating the above rule [**MUST** identify resources and sub-resources via path segments](#must-identify-resources-and-sub-resources-via-path-segments) as follows:

```
/resources/{compound-key-1}[delim-1]...[delim-n-1]{compound-key-n}
```

Example paths:

```
/shopping-carts/{country}/{session-id}
/shopping-carts/{country}/{session-id}/items/{item-id}
/api-specifications/{docker-image-id}/apis/{path}/{file-name}
/api-specifications/{repository-name}/{artifact-name}:{tag}
/article-size-advices/{sku}/{sales-channel}
```

**Warning:** Exposing a compound key as described above limits ability to evolve the structure of the resource identifier as it is no longer opaque.

To compensate for this drawback, APIs must apply a compound key abstraction consistently in all requests and responses parameters and attributes allowing consumers to treat these as *technical resource identifier* replacement. The use of independent compound key components must be limited to search and creation requests, as follows:

```
# compound key components passed as independent search query parameters
GET /article-size-advices?skus=sku-1,sku-2&sales_channel_id=sid-1
=> { "items": [{ "id": "id-1", ...  },{ "id": "id-2", ...  }] }

# opaque technical resource identifier passed as path parameter
GET /article-size-advices/id-1
=> { "id": "id-1", "sku": "sku-1", "sales_channel_id": "sid-1", "size": ... }

# compound key components passed as mandatory request fields
POST /article-size-advices { "sku": "sku-1", "sales_channel_id": "sid-1", "size": ... }
=> { "id": "id-1", "sku": "sku-1", "sales_channel_id": "sid-1", "size": ... }
```

Where `id-1` is representing the opaque provision of the compound key `sku-1/sid-1` as technical resource identifier.

**Remark:** A compound key component may itself be used as another resource identifier providing another resource endpoint, e.g `/article-size-advices/{sku}`.

### **[MAY]** consider using (non-)nested URLs

> TODO: [REVIEW]

If a sub-resource is only accessible via its parent resource and may not exist without parent resource, consider using a nested URL structure, for instance:

```
/shoping-carts/de/1681e6b88ec1/cart-items/1
```

However, if the resource can be accessed directly via its unique id, then the API should expose it as a top-level resource. For example, customer has a collection for sales orders; however, sales orders have globally unique id and some services may choose to access the orders directly, for instance:

```
/customers/1637asikzec1
/sales-orders/5273gh3k525a
```

### **[MUST]** pluralize resource names

> 
>
> TODO [WIP]
>
> 



```
/customers/1637asikzec1
/sales-orders/5273gh3k525a
```



### **[SHOULD]** only use UUIDs if necessary

> TODO: [REVIEW]

Generating IDs can be a scaling problem in high frequency and near real time use cases. UUIDs solve this problem, as they can be generated without collisions in a distributed, non-coordinated way and without additional server round trips.

However, they also come with some disadvantages:

- pure technical key without meaning; not ready for naming or name scope conventions that might be helpful for pragmatic reasons, e.g. we learned to use names for product attributes, instead of UUIDs
- less usable, because…
- cannot be memorized and easily communicated by humans
- harder to use in debugging and logging analysis
- less convenient for consumer facing usage
- quite long: readable representation requires 36 characters and comes with higher memory and bandwidth consumption
- not ordered along their creation history and no indication of used id volume
- may be in conflict with additional backward compatibility support of legacy ids

UUIDs should be avoided when not needed for large scale id generation. Instead, for instance, server side support with id generation can be preferred (`POST` on id resource, followed by idempotent `PUT` on entity resource). Usage of UUIDs is especially discouraged as primary keys of master and configuration data, like brand-ids or attribute-ids which have low id volume but widespread steering functionality.

Please be aware that sequential, strictly monotonically increasing numeric identifiers may reveal critical, confidential business information, like order volume, to non-privileged clients.

In any case, we should always use string rather than number type for identifiers. This gives us more flexibility to evolve the identifier naming scheme. Accordingly, if used as identifiers, UUIDs should not be qualified using a format property.

*Hint*: Usually, random UUID is used - see UUID version 4 in [RFC 4122](https://tools.ietf.org/html/rfc4122). Though UUID version 1 also contains leading timestamps it is not reflected by its lexicographic sorting. This deficit is addressed by [ULID](https://github.com/ulid/spec) (Universally Unique Lexicographically Sortable Identifier). You may favour ULID instead of UUID, for instance, for pagination use cases ordered along creation time.

### **[SHOULD]** limit number of resource types

> TODO: [REVIEW]

To keep maintenance and service evolution manageable, we should follow "functional segmentation" and "separation of concern" design principles and do not mix different business functionalities in same API definition. In practice this means that the number of resource types exposed via an API should be limited. In this context a resource type is defined as a set of highly related resources such as a collection, its members and any direct sub-resources.

For example, the resources below would be counted as three resource types, one for customers, one for the addresses, and one for the customers' related addresses:

```
/customers
/customers/{id}
/customers/{id}/preferences
/customers/{id}/addresses
/customers/{id}/addresses/{addr}
/addresses
/addresses/{addr}
```

Note that:

- We consider `/customers/id/preferences` part of the `/customers` resource type because it has a one-to-one relation to the customer without an additional identifier.
- We consider `/customers` and `/customers/id/addresses` as separate resource types because `/customers/id/addresses/{addr}` also exists with an additional identifier for the address.
- We consider `/addresses` and `/customers/id/addresses` as separate resource types because there’s no reliable way to be sure they are the same.

Given this definition, our experience is that well defined APIs involve no more than 4 to 8 resource types. There may be exceptions with more complex business domains that require more resources, but you should first check if you can split them into separate subdomains with distinct APIs.

Nevertheless one API should hold all necessary resources to model complete business processes helping clients to understand these flows.

### **[SHOULD]** limit number of sub-resource levels

> TODO: [REVIEW]

There are main resources (with root url paths) and sub-resources (or *nested* resources with non-root urls paths). Use sub-resources if their life cycle is (loosely) coupled to the main resource, i.e. the main resource works as collection resource of the subresource entities. You should use <= 3 sub-resource (nesting) levels — more levels increase API complexity and url path length. (Remember, some popular web browsers do not support URLs of more than 2000 characters.)

### **[MUST]** stick to conventional query parameters

> TODO: [REVIEW]
>
> TODO: sorgfältig prüfen

If you provide query support for searching, sorting, filtering, and paginating, you must stick to the following naming conventions:

- `q`: default query parameter, e.g. used by browser tab completion; should have an entity specific alias, e.g. sku.
- `sort`: comma-separated list of fields (as defined by [**MUST** define collection format of header and query parameters](#must-define-collection-format-of-header-and-query-parameters)) to define the sort order. To indicate sorting direction, fields may be prefixed with `+` (ascending) or `-` (descending), e.g. /sales-orders?sort=+id.
- `fields`: field name expression to retrieve only a subset of fields of a resource. See [**SHOULD** support partial responses via filtering](#should-support-partial-responses-via-filtering) below.
- `embed`: field name expression to expand or embedded sub-entities, e.g. inside of an article entity, expand silhouette code into the silhouette object. Implementing `embed` correctly is difficult, so do it with care. See [**SHOULD** allow optional embedding of sub-resources](#should-allow-optional-embedding-of-sub-resources).
- `offset`: numeric offset of the first element provided on a page representing a collection request. See [Collection Resources](#collection-resources) section below.
- `cursor`: an opaque pointer to a page, never to be inspected or constructed by clients. It usually (encrypted) encodes the page position, i.e. the identifier of the first or last page element, the pagination direction, and the applied query filters to recreate the collection. See [Collection Resources](#collection-resources) section below.
- `limit`: client suggested limit to restrict the number of entries on a page. See [Collection Resources](#collection-resources) section below.

### **[MUST]** define collection format of header and query parameters

> TODO: [REVIEW]

Header and query parameters allow to provide a collection of values, either by providing a comma-separated list of values or by repeating the parameter multiple times with different values as follows:

| Parameter Type | Comma-separated Values  | Multiple Parameters              | Standard                                                     |
| :------------- | :---------------------- | :------------------------------- | :----------------------------------------------------------- |
| Header         | `Header: value1,value2` | `Header: value1, Header: value2` | [RFC 7230 Section 3.2.2](https://tools.ietf.org/html/rfc7230#section-3.2.2) |
| Query          | `?param=value1,value2`  | `?param=value1&param=value2`     | [RFC 6570 Section 3.2.8](https://tools.ietf.org/html/rfc6570#section-3.2.8) |

As Open API does not support both schemas at once, an API specification must explicitly define the collection format to guide consumers as follows:

| Parameter Type | Comma-separated Values          | Multiple Parameters                                          |
| :------------- | :------------------------------ | :----------------------------------------------------------- |
| Header         | `style: simple, explode: false` | not allowed (see [RFC 7230 Section 3.2.2](https://tools.ietf.org/html/rfc7230#section-3.2.2)) |
| Query          | `style: form, explode: false`   | `style: form, explode: true`                                 |

When choosing the collection format, take into account the tool support, the escaping of special characters and the maximal URL length.

## Filtered Resources

### **[SHOULD]** support partial responses via filtering

> TODO: [REVIEW]

Depending on your use case and payload size, you can significantly reduce network bandwidth need by supporting filtering of returned entity fields. Here, the client can explicitly determine the subset of fields he wants to receive via the `fields` query parameter. (It is analogue to [GraphQL `fields`](https://graphql.org/learn/queries/#fields) and simple queries, and also applied, for instance, for [Google Cloud API’s partial responses](https://cloud.google.com/storage/docs/json_api/v1/how-tos/performance#partial-response).)

**Example 1**: Unfiltered Response

```json
GET http://api.example.org/users/123 HTTP/1.1

HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "cddd5e44-dae0-11e5-8c01-63ed66ab2da5",
  "name": "John Doe",
  "address": "1600 Pennsylvania Avenue Northwest, Washington, DC, United States",
  "birthday": "1984-09-13",
  "friends": [ {
    "id": "1fb43648-dae1-11e5-aa01-1fbc3abb1cd0",
    "name": "Jane Doe",
    "address": "1600 Pennsylvania Avenue Northwest, Washington, DC, United States",
    "birthday": "1988-04-07"
  } ]
}
```

**Example 2**: Filtered Response

```json
GET http://api.example.org/users/123?fields=(name,friends(id,name)) HTTP/1.1

HTTP/1.1 200 OK
Content-Type: application/json

{
  "name": "John Doe",
  "friends": [ {
    "id": "cddd5e44-dae0-11e5-8c01-63ed66ab2da5",
    "name": "Jane Doe"
  } ]
}
```

The `fields` query parameter determines the fields returned with the response payload object. For instance, `(name)` returns `users` root object with only the `name` field, and `(name,friends(id,name))` returns the `name` and the nested `friends` object with only its `id` and `name` fields.

Open API doesn’t support you in formally specifying different return object schemes depending on a parameter. When you define the field parameter, we recommend to provide the following description: `Endpoint supports filtering of return object fields as described in [[**SHOULD**] support partial responses via filtering](should-support-partial-responses-via-filtering)`

The syntax of the query `fields` value is defined by the following [BNF](https://en.wikipedia.org/wiki/Backus–Naur_form) grammar.

```
<fields>            ::= [ <negation> ] <fields_struct>
<fields_struct>     ::= "(" <field_items> ")"
<field_items>       ::= <field> [ "," <field_items> ]
<field>             ::= <field_name> | <fields_substruct>
<fields_substruct>  ::= <field_name> <fields_struct>
<field_name>        ::= <dash_letter_digit> [ <field_name> ]
<dash_letter_digit> ::= <dash> | <letter> | <digit>
<dash>              ::= "-" | "_"
<letter>            ::= "A" | ... | "Z" | "a" | ... | "z"
<digit>             ::= "0" | ... | "9"
<negation>          ::= "!"
```

**Note:** Following the [principle of least astonishment](https://en.wikipedia.org/wiki/Principle_of_least_astonishment), you should not define the `fields` query parameter using a default value, as the result is counter-intuitive and very likely not anticipated by the consumer.

### **[MUST]** document implicit filtering

> TODO: [REVIEW]

Sometimes certain collection resources or queries will not list all the possible elements they have, but only those for which the current client is authorized to access.

Implicit filtering could be done on:

- the collection of resources being return on a parent `GET` request
- the fields returned for the resource’s detail

In such cases, the implicit filtering must be in the API specification (in its description).

**Example**:

If an employee of the company *Foo* accesses one of our business-to-business service and performs a `GET /business-partners`, it must, for legal reasons, not display any other business partner that is not owned or contractually managed by her/his company. It should never see that we are doing business also with company *Bar*.

Response as seen from a consumer working at `FOO`:

```json
{
    "items": [
        { "name": "Foo Performance" },
        { "name": "Foo Sport" },
        { "name": "Foo Signature" }
    ]
}
```

Response as seen from a consumer working at `BAR`:

```json
{
    "items": [
        { "name": "Bar Classics" },
        { "name": "Bar pour Elle" }
    ]
}
```

The API Specification should then specify something like this:

```yaml
paths:
  /business-partner:
    get:
      description: >-
        Get the list of registered business partner.
        Only the business partners to which you have access to are returned.
```

## Embedded Resources

### [SHOULD] use HAL format for embedded resources

> TODO: [WIP]
>
> **TODO**: für interne APIs. Bei public APIs ist das ein MUST. Hinweis auf mögliche spätere Migration auf HAL
>
> 



### **[SHOULD]** allow optional embedding of sub-resources

> TODO: [REVIEW]

Embedding related resources (also know as *Resource expansion*) is a great way to reduce the number of requests. In cases where clients know upfront that they need some related resources they can instruct the server to prefetch that data eagerly. Whether this is optimized on the server, e.g. a database join, or done in a generic way, e.g. an HTTP proxy that transparently embeds resources, is up to the implementation.

See [**MUST** stick to conventional query parameters](#must-stick-to-conventional-query-parameters) for naming, e.g. "embed" for steering of embedded resource expansion. Please use the [BNF](https://en.wikipedia.org/wiki/Backus–Naur_form) grammar, as already defined above for filtering, when it comes to an embedding query syntax.

Embedding a sub-resource can possibly look like this where an order resource has its order items as sub-resource (/order/{orderId}/items):

```json
GET /order/123?embed=(items) HTTP/1.1

{
  "id": "123",
  "_embedded": {
    "item": [
      {
        "position": 1,
        "sku": "1234-ABCD-7890",
        "price": {
          "amount": 71.99,
          "currency": "EUR"
        }
      }
    ]
  }
}
```

## Collection Resources

### **[SHOULD]** design simple query languages using query parameters

> TODO: [REVIEW]

We prefer the use of query parameters to describe resource-specific query languages for the majority of APIs because it’s native to HTTP, easy to extend and has excellent implementation support in HTTP clients and web frameworks.

Query parameters should have the following aspects specified:

- Reference to corresponding property, if any
- Value range, e.g. inclusive vs. exclusive
- Comparison semantics (equals, less than, greater than, etc)
- Implications when combined with other queries, e.g. *and* vs. *or*

How query parameters are named and used is up to individual API designers. The following examples should serve as ideas:

- `name=Otto`, to query for elements based on property equality
- `age=5`, to query for elements based on logical properties
  - Assuming that elements don’t actually have an `age` but rather a `birthday`
- `maxLength=5`, based on upper and lower bounds (`min` and `max`)
- `shorterThan=5`, using terminology specific e.g. to *length*
- `createdBefore=2019-07-17` or `notModifiedSince=2019-07-17`
  - Using terminology specific e.g. to time: *before*, *after*, *since* and *until*

We don’t advocate for or against certain names because in the end APIs should be free to choose the terminology that fits their domain the best.

### **[SHOULD]** design complex query languages using JSON

> TODO: [REVIEW]

Minimalistic query languages based on [query parameters](#should-design-simple-query-languages-using-query-parameters) are suitable for simple use cases with a small set of available filters that are combined in one way and one way only (e.g. *and* semantics). Simple query languages are generally preferred over complex ones.

Some APIs will have a need for sophisticated and more complex query languages. Dominant examples are APIs around search (incl. faceting) and product catalogs.

Aspects that set those APIs apart from the rest include but are not limited to:

- Unusual high number of available filters
- Dynamic filters, due to a dynamic and extensible resource model
- Free choice of operators, e.g. `and`, `or` and `not`

APIs that qualify for a specific, complex query language are encouraged to use nested JSON data structures and define them using Open API directly. This provides the following benefits:

- Data structures are easy to use for clients
  - No special library support necessary
  - No need for string concatenation or manual escaping
- Data structures are easy to use for servers
  - No special tokenizers needed
  - Semantics are attached to data structures rather than text tokens
- Consistent with other HTTP methods
- API is defined in Open API completely
  - No external documents or grammars needed
  - Existing means are familiar to everyone

[JSON-specific rules](#json-guidelines) and most certainly needs to make use of the [`GET`-with-body](#get-with-body) pattern.

The following JSON document should serve as an idea how a structured query might look like.

```json
{
  "and": {
    "name": {
      "match": "Alice"
    },
    "age": {
      "or": {
        "range": {
          ">": 25,
          "<=": 50
        },
        "=": 65
      }
    }
  }
}
```

Feel free to also get some inspiration from:

- [Elastic Search: Query DSL](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl.html)
- [GraphQL: Queries](https://graphql.org/learn/queries/)