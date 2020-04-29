
## MUST not use URI versioning

With URI versioning a (major) version number is included in the path, e.g. /v1/customers.
The consumer has to wait until the provider has been released and deployed.
If the consumer also supports hypermedia links — even in their APIs — to drive workflows (HATEOAS), this quickly becomes complex.
So does coordinating version upgrades — especially with hyperlinked service dependencies — when using URL versioning.
To avoid this tighter coupling and complexer release management we do not use URI versioning, and go instead with media type versioning and content negotiation (see above).

**TODO: align with versioning decision**

## MUST avoid actions - think about resources

REST is all about your resources, so consider the domain entities that take part in web service interaction, and aim to model your API around these using the standard HTTP methods as operation indicators.
For instance, if an application has to lock articles explicitly so that only one user may edit them, create an article lock with PUT or POST instead of using a lock action.

Request:

PUT /article-locks/{article-id}
The added benefit is that you already have a service for browsing and filtering article locks.

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

* Use plural for collection resources, e.g. /customers

## MUST use camelCase for identifiers

e.g. `productId`, `articleNumber`, etc

## MUST use a canonical identifier to create a readable URL and rename or move resources 

e.g.  /users/... for a stable URL (see domain model)

