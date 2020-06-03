---
type: SHOULD
id: R000009
---

# consider to design `POST` and `PATCH` idempotent

In many cases it is helpful or even necessary to design [`POST`](#post) and [`PATCH`](#patch) [idempotent](#idempotent) for clients to expose conflicts and prevent resource duplicate (a.k.a. zombie resources) or lost updates, e.g. if same resources may be created or changed in parallel or multiple times. To design an [idempotent](#idempotent) API endpoint owners should consider to apply one of the following three patterns.

- A resource specific **conditional key** provided via `If-Match` header in the request. The key is in general a meta information of the resource, e.g. a _hash_ or _version number_, often stored with it. It allows to detect concurrent creations and updates to ensure [idempotent](#idempotent) behavior (see [**[SHOULD]** consider to support `ETag` together with `If-Match`/`If-None-Match` header](#should-consider-to-support-etag-together-with-if-matchif-none-match-header)).
- A resource specific **secondary key** provided as resource property in the request body. The _secondary key_ is stored permanently in the resource. It allows to ensure [idempotent](#idempotent) behavior by looking up the unique secondary key in case of multiple independent resource creations from different clients (see [**[SHOULD]** use secondary key for idempotent `POST` design](#should-use-secondary-key-for-idempotent-post-design)).
- A client specific **idempotency key** provided via [`Idempotency-Key`](#may-consider-to-support-idempotency-key-header) header in the request. The key is not part of the resource but stored temporarily pointing to the original response to ensure [idempotent](#idempotent) behavior when retrying a request (see [**MAY** consider to support `Idempotency-Key`header](#may-consider-to-support-idempotency-key-header)).

::: info
While **conditional key** and **secondary key** are focused on handling concurrent requests, the **idempotency key** is focused on providing the exact same responses, which is even a _stronger_ requirement than the [idempotency defined above](#idempotent). It can be combined with the two other patterns.
:::

To decide, which pattern is suitable for your use case, please consult the following table showing the major properties of each pattern:

|                                       | Conditional Key | Secondary Key | Idempotency Key |
| ------------------------------------- | --------------- | ------------- | --------------- |
| Applicable with                       | `PATCH`         | `POST`        | `POST`/`PATCH`  |
| HTTP Standard                         | ✔               | ✗             | ✗               |
| Prevents duplicate (zombie) resources | ✔               | ✔             | ✗               |
| Prevents concurrent lost updates      | ✔               | ✗             | ✗               |
| Supports safe retries                 | ✔               | ✔             | ✔               |
| Supports exact same response          | ✗               | ✗             | ✔               |
| Can be inspected (by intermediaries)  | ✔               | ✗             | ✔               |
| Usable without previous `GET`         | ✗               | ✔             | ✔               |

`Note:`{ label } The patterns applicable to `PATCH` can be applied in the same way to `PUT` and `DELETE` providing the same properties.

::: warning
If you mainly aim to support safe retries, we suggest to apply Conditional Key and Secondary Key pattern before the Idempotency Key pattern.
:::
