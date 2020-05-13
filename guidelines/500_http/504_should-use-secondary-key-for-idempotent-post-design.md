---
title: SHOULD use secondary key for idempotent `POST` design
type: SHOULD
---
## <span style="color: #F1B500;">SHOULD</span> use secondary key for idempotent `POST` design

The most important pattern to design [`POST`](#post) [idempotent](link) for creation is to introduce a resource specific **secondary key** provided in the request body, to eliminate the problem of duplicate (a.k.a zombie) resources.

The secondary key is stored permanently in the resource as *alternate key* or *combined key* (if consisting of multiple properties) guarded by a uniqueness constraint enforced server-side, that is visible when reading the resource.
The best and often naturally existing candidate is a *unique foreign key*, that points to another resource having *one-on-one* relationship with the newly created resource, e.g. a parent process identifier.

A good example here for a secondary key is the shopping cart ID in an order resource.

**Note:** When using the secondary key pattern without [`Idempotency Key`](link) all subsequent retries should fail with status code `409 Conflict`.
We suggest to avoid `200 OK` here unless you make sure, that the delivered resource is the original one implementing a well defined behavior.
Using `204 No Content` without content would be a similar well-defined option.