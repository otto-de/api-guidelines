---
type: SHOULD
id: R000009
---

# consider to design `POST` and `PATCH` idempotent

In many cases it is helpful or even necessary to design `POST` and `PATCH` [idempotent](R000008) for clients to expose conflicts and prevent resource duplication (a.k.a. zombie resources) or lost updates, for example, if the same resources may be created or changed in parallel or multiple times.
To design an idempotent API endpoint owners should consider to apply one of the following two patterns.

- A resource specific **conditional key** provided via `If-Match` header in the request. The key is generally a meta information of the resource, for example, a _hash_ or _version number_, often stored with it. It allows to detect concurrent creations and updates to ensure idempotent behavior (see [SHOULD consider to support `ETag` together with `If-Match`/`If-None-Match` header](R000060)).
- A resource specific **secondary key** provided as a resource property in the request body. The _secondary key_ is stored permanently in the resource. It allows to ensure idempotent behavior by looking up the unique secondary key in case of multiple independent resource creations from different clients.

To decide which pattern is suitable for your use case, please consult the following table showing the major properties of each pattern:

|                                       | Conditional Key | Secondary Key |
| ------------------------------------- | --------------- | ------------- |
| Applicable with                       | `PATCH`         | `POST`        |
| HTTP Standard                         | ✔               | ✗             |
| Prevents duplicate (zombie) resources | ✔               | ✔             |
| Prevents concurrent lost updates      | ✔               | ✗             |
| Supports safe retries                 | ✔               | ✔             |
| Can be inspected (by intermediaries)  | ✔               | ✗             |
| Usable without previous `GET`         | ✗               | ✔             |

`Note:`{ label } The patterns applicable to `PATCH` can be applied in the same way to `PUT` and `DELETE` providing the same properties.

The most important pattern to design `POST` idempotent for creation is to introduce a resource specific **secondary key** provided in the request body, to eliminate the problem of duplicate (a.k.a zombie) resources.
Keep in mind that when creating a new resource using `POST` the resource identifier is created on the server-side, therefore the secondary key has to be provided by the client to resolve possible conflicts.

The secondary key is stored permanently in the resource as an _alternate key_ or _combined key_ (if consisting of multiple properties) guarded by a uniqueness constraint enforced server-side, that is visible when reading the resource.
The best and often naturally existing candidate is a _unique foreign key_, that points to another resource having _one-to-one_ relationship with the newly created resource, e.g. a parent process identifier.

An example for a secondary key might be the e-mail address on a user resource:

```sh
POST /users HTTP/1.1

{
  "mail": "api@otto.de",
  "name": "Api User"
}

# The response might never arrive at the client...
201 Created
Location: /users/12345

# ...so the client retries the request...
POST /users HTTP/1.1

{
  "mail": "api@otto.de",
  "name": "Api User"
}

# ...resulting in a conflict, because the resource has already been created for the given secondary key "mail".

409 Conflict
```

::: info
When using the secondary key pattern all subsequent retries should fail with status code `409 Conflict`.
We suggest to avoid `200 OK` here unless you make sure, that the delivered resource is the original one implementing a well defined behavior. Using `204 No Content` without content would be a similar well-defined option.
:::
