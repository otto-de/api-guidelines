---
title: SHOULD consider to design `POST` and `PATCH` idempotent
type: SHOULD
---

## <span style="color: #F1B500;">SHOULD</span> consider to design `POST` and `PATCH` idempotent

In many cases it is helpful or even necessary to design [`POST`](#post) and [`PATCH`](#patch) [idempotent](#idempotent) for clients to expose conflicts and prevent resource duplicate (a.k.a. zombie resources) or lost updates, e.g. if same resources may be created or changed in parallel or multiple times. To design an [idempotent](#idempotent) API endpoint owners should consider to apply one of the following three patterns.

- A resource specific **conditional key** provided via `If-Match` header in the request. The key is in general a meta information of the resource, e.g. a *hash* or *version number*, often stored with it. It allows to detect concurrent creations and updates to ensure [idempotent](#idempotent) behavior (see [**[SHOULD]** consider to support `ETag` together with `If-Match`/`If-None-Match` header](#should-consider-to-support-etag-together-with-if-matchif-none-match-header)).
- A resource specific **secondary key** provided as resource property in the request body. The *secondary key* is stored permanently in the resource. It allows to ensure [idempotent](#idempotent) behavior by looking up the unique secondary key in case of multiple independent resource creations from different clients (see [**[SHOULD]** use secondary key for idempotent `POST` design](#should-use-secondary-key-for-idempotent-post-design)).
- A client specific **idempotency key** provided via [`Idempotency-Key`](#may-consider-to-support-idempotency-key-header) header in the request. The key is not part of the resource but stored temporarily pointing to the original response to ensure [idempotent](#idempotent) behavior when retrying a request (see [**MAY** consider to support `Idempotency-Key`header](#may-consider-to-support-idempotency-key-header)).

**Note:** While **conditional key** and **secondary key** are focused on handling concurrent requests, the **idempotency key** is focused on providing the exact same responses, which is even a *stronger* requirement than the [idempotency defined above](#idempotent). It can be combined with the two other patterns.

To decide, which pattern is suitable for your use case, please consult the following table showing the major properties of each pattern:

|                                       | Conditional Key   | Secondary Key   | Idempotency Key                   |
| ---                                   | ---               | ---             | ---                               |
| Applicable with                       | [`PATCH`](#patch) | [`POST`](#post) | [`POST`](#post)/[`PATCH`](#patch) |
| HTTP Standard                         | ✔ Yes             | ✗ No            | ✗ No                              |
| Prevents duplicate (zombie) resources | ✔ Yes             | ✔ Yes           | ✗ No                              |
| Prevents concurrent lost updates      | ✔ Yes             | ✗ No            | ✗ No                              |
| Supports safe retries                 | ✔ Yes             | ✔ Yes           | ✔ Yes                             |
| Supports exact same response          | ✗ No              | ✗ No            | ✔ Yes                             |
| Can be inspected (by intermediaries)  | ✔ Yes             | ✗ No            | ✔ Yes                             |
| Usable without previous [`GET`](#get) | ✗ No              | ✔ Yes           | ✔ Yes                             |


**Note:** The patterns applicable to [`PATCH`](#patch) can be applied in the same way to [`PUT`](#put) and [`DELETE`](#delete) providing the same properties.

If you mainly aim to support safe retries, we suggest to apply Conditional Key and Secondary Key pattern before the Idempotency Key pattern.