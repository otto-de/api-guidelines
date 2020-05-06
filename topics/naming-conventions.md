# Naming conventions

When resources are well-named, an API is intuitive and easy to use.
If resources are poorly named, the same API can feel difficult to use and understand.
Having a strong and consistent strategy for naming REST resources results in an easy to understand API that developers enjoy working with.
To make our API as easy to use as possible we have defined the following naming conventions:

## MUST avoid actions - think about resources

REST is all about resources.
Therefore, consider the domain entities involved in web service interaction and try to model your API around them using the standard HTTP methods as operation indicators.

Do:

- `POST /orders/{order-id}` #TODO is this in line with collection resources?
- `DELETE /articles/{article-number}`
- `POST /articles/{article-number}/lock`

> TODO: google erlaubt bei sich schon verben, die scheinen aber durch : getrennt zu sein, also ../{article-number}:lock

Don't:

- `POST /orders/create-order`
- `POST /articles/{article-number}/delete`
- `POST /artcles/lock-article/{article-number}`

## MUST follow a consistent naming convention

* **Keep URLs verb-free**
The API describes resources, so the only place where actions should appear is in the HTTP methods.
In URLs use only nouns.
Instead of thinking of actions (verbs), it’s often helpful to think about putting a message in a letter box: e.g., instead of having the verb cancel in the URL, think of sending a message to cancel an order to the cancellations letter box on the server side.

* **Form URLs of nouns and write them in lower case letters**
* **Separate several nouns by hyphens**

`/coupon-campaigns/{couponCampaignId}/coupons`

* **Follow a logical order**, e.g.

`/customers/{userId}/addresses`
`/customers/{userId}/addresses/{addressId}`

>Zalando #143
>consider using (non-)nested URLs

* **Use plural for collection resources**, 
e.g. /customers
Link to collection resources

## MUST use camelCase for identifiers

Use CamelCase to delimit combined words,

Do: `productId`, `articleNumber`, `loginId`, `lId` etc.  

Don't: `product_id`, `Articlenumber`, `login-id`, `LID`

## MUST use forward slash (/) to indicate hierarchical relationships

Use the forward slash (/) in the path portion of the URI to indicate a hierarchical relationship between resources.

`/customers/{userId}/addresses/{addressId}`

Besides, a URI MUST NOT end with a trailing slash (/).

## MUST use URL-friendly resource identifiers:

To simplify encoding of resource IDs in URLs, their representation must only consist of ASCII strings

Use:

- letters `[a-zA-Z]` 
- numbers `[0-9]` 
- underscore `_`
- minus `-` 
- colon `:`
- period `.`
- and - on rare occasions - slash `/`.

Don't use (among others):

- umlauts `äöü`
- accents `àèĉ`
- eszett `ß`

**Note:** slashes are only allowed to build and signal resource identifiers consisting of [compound keys](#may-expose-compound-keys-as-resource-identifiers). 
@mknudsen TBD, wenn wir auf Compound keys nicht eingehen.

## MUST use a canonical identifier to create a readable URL and rename or move resources

@mknudsen please complete

e.g.  /users/... for a stable URL (see domain model)
Link zu canonical identifiers

## SHOULD NOT use URI versioning

If you absolutely have to use a version identifier as part of your URL, do so keeping it as a path segment relative to your
resource.

Do:

- `/users/{user-identifier}`
- `/users/v2/{user-identifier}`

Don't:

- `/users/{user-identifier}?version=2`
- `/v2/users/{user-identifier}`


For more details on the preferred way of versioning your resources see [Versioning](linkzuversioning). #TODO

---
To be discussed

### **[MAY]** expose compound keys as resource identifiers
> Do we really need this?

### **[SHOULD]** only use UUIDs if necessary
> We need positive examples

### **[SHOULD]** use preferred abbreviations 

> Do we want that? See https://cloud.google.com/apis/design/naming_convention?hl=de
