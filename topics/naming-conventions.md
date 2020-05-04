# Naming conventions

When resources are well-named, an API is intuitive and easy to use.
If resources are poorly named, the same API can feel difficult to use and understand.
Having a strong and consistent strategy for naming REST resources results in an easy to understand API that developers enjoy working with.
To make our API as easy to use as possible we have defined the following naming conventions:

## MUST avoid actions - think about resources

REST is all about resources.
Therefore, consider the domain entities involved in web service interaction and try to model your API around them using the standard HTTP methods as operation indicators.
@mknudsen Please rephrase for OTTO: For example, if an application needs to explicitly lock articles so that only one user can edit them, create an article lock using PUT or POST instead of using a locking action.

@mknudsen Please match for OTTO, e.g. orders 

Request:

PUT /article-locks/{article-id}
The added benefit is that you already have a service for browsing and filtering article locks.

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
e.g. `productId`, `articleNumber`, `loginId`, `lId` etc.  

## MUST use forward slash (/) to indicate hierarchical relationships

Use the forward slash (/) in the path portion of the URI to indicate a hierarchical relationship between resources.

`/customers/{userId}/addresses/{addressId}`

Besides, a URI MUST NOT end with a trailing slash (/).

## MUST use URL-friendly resource identifiers: `a-zA-Z0-9:._\-/\]*`

To simplify encoding of resource IDs in URLs, their representation must only consist of ASCII strings using letters, numbers, underscore, minus, colon, period, and - on rare occasions - slash.

**Note:** slashes are only allowed to build and signal resource identifiers consisting of [compound keys](#may-expose-compound-keys-as-resource-identifiers). 
@mknudsen TBD, wenn wir auf Compound keys nicht eingehen.

## MUST use a canonical identifier to create a readable URL and rename or move resources

@mknudsen please complete

e.g.  /users/... for a stable URL (see domain model)
Link zu canonical identifiers

## SHOULD NOT use URI versioning

If you have to do it, do it like this: ...

Link zu Versioning einfügen.

---
To be discussed

### **[MAY]** expose compound keys as resource identifiers
> Do we really need this?

### **[SHOULD]** only use UUIDs if necessary
> We need positive examples

