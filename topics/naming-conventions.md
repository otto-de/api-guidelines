# Naming conventions

When resources are well named, an API is intuitive and easy to use.
If the resources are poorly named, the same API can feel difficult to use and understand.
Having a strong and consistent strategy for naming REST resources results in an easy to understand API that developers enjoy working with.

## MUST avoid actions - think about resources

REST is all about your resources, so consider the domain entities that take part in web service interaction, and aim to model your API around these using the standard HTTP methods as operation indicators.
For instance, if an application has to lock articles explicitly so that only one user may edit them, create an article lock with PUT or POST instead of using a lock action.

Request:

PUT /article-locks/{article-id}
The added benefit is that you already have a service for browsing and filtering article locks.

1:1 Zalando
Auf OTTO umformulieren, z.B. orders

## MUST follow a consistent naming convention

* Keep URLs verb-free
The API describes resources, so the only place where actions should appear is in the HTTP methods.
In URLs, use only nouns.
Instead of thinking of actions (verbs), it’s often helpful to think about putting a message in a letter box: e.g., instead of having the verb cancel in the url, think of sending a message to cancel an order to the cancellations letter box on the server side.

* Form URLS of nouns and write them in lower case letters
* Separate several nouns by hyphens

`/coupon-campaigns/{couponCampaignId}/coupons`

* Follow a logical order, e.g.

`/customers/{userId}/addresses`
`/customers/{userId}/addresses/{addressId}`

>Zalando #143
>consider using (non-)nested URLs

* Use plural for collection resources, e.g. /customers
Link zu collection resources

## MUST use camelCase for identifiers

e.g. `productId`, `articleNumber`, `loginId`, `lId` etc  

## MUST use forward slash (/) to indicate hierarchical relationships

`/customers/{userId}/addresses/{addressId}`

### MUST use URL-friendly resource identifiers: `a-zA-Z0-9:._\-/\]*`

To simplify encoding of resource IDs in URLs, their representation must only consist of ASCII strings using letters, numbers, underscore, minus, colon, period, and - on rare occasions - slash.

**Note:** slashes are only allowed to build and signal resource identifiers consisting of [compound keys](#may-expose-compound-keys-as-resource-identifiers). TBD, wenn wir auf Compound keys nicht eingehen.


## MUST use a canonical identifier to create a readable URL and rename or move resources

e.g.  /users/... for a stable URL (see domain model)
Link zu canonical identifiers

## SHOULD NOT use URI versioning

Wenn man es unbedingt machen muss, dann bitte so.

Link zu Versioning einfügen.


---
To be discussed

### **[MAY]** expose compound keys as resource identifiers
> Brauchen wir das wirklich?

### **[SHOULD]** only use UUIDs if necessary
> wir brauchen positive Beispiele

