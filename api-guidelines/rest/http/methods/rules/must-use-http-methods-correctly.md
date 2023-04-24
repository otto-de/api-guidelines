---
id: R000007
---

# MUST use HTTP methods correctly

We are compliant with the standardized HTTP method semantics described as follows:

::::: accordions
:::: accordion GET
`GET` requests are used to **read** either a single or a collection resource.

- For individual resources, `GET` requests will usually generate a `404 Not Found` if the resource does not exist.
- For collection resources, `GET` requests may return either `200 OK` (if the collection is empty) or `404 Not Found` (if the collection is missing).
- `GET` requests must NOT have a request body payload (see `GET With Body`).
- `GET` requests on collection resources should provide sufficient [filter](../../../resources/naming-conventions/rules/must-stick-to-conventional-query-parameters.md) and [pagination](../../../resources/naming-conventions/rules/must-stick-to-conventional-query-parameters.md) mechanisms.

::::

:::: accordion GET with body
APIs sometimes need to provide extensive structured request information with `GET`, that may conflict with the size limits of clients, load balancers, and servers.
As our APIs must be standard compliant (body in `GET` must be ignored on server side), API designers have to check the following two options:

1. `GET` with URL encoded query parameters: if it is possible to encode the request information in query parameters, respecting the usual size limits of clients, gateways, and servers, this should be the first choice.
   The request information can either be provided via multiple query parameters or by a single structured URL encoded string.
2. `POST` with body content: if a `GET` with URL encoded query parameters is not possible, a `POST` with body content must be used.
   In this case the endpoint must be documented with the hint `GET with body` to transport the `GET` semantic of this call.

::: info Info
Encoding the lengthy structured request information using header parameters is not an option.
From a conceptual point of view, the semantic of an operation should always be expressed by the resource names, as well as the involved path and query parameters, that means, by everything that goes into the URL.
Request headers are reserved for general context information.
In addition, size limits on query parameters and headers are not reliable and depend on clients, gateways, server, and actual settings.
Thus, switching to headers does not solve the original problem.
:::
::::

:::: accordion PUT
`PUT` requests are used to **update** (in rare cases to create) **entire** resources – single or collection resources.
The semantic is best described as _"please put the enclosed representation at the resource mentioned by the URL, replacing any existing resource."_.

- `PUT` requests are usually applied to single resources, and not to collection resources, as this would imply replacing the entire collection.
- `PUT` requests are usually robust against non-existence of resources by implicitly creating before updating.
- On successful `PUT` requests, the server will **replace the entire resource** addressed by the URL with the representation passed in the payload (subsequent reads will deliver the same payload).
- Successful `PUT` requests will usually generate `200 OK` or `204 No Content` (if the resource was updated – with or without actual content returned), and `201 Created` (if the resource was created).

`Important:`{ label="warning" } It is best practice to prefer `POST` over `PUT` for creation of (at least top level) resources.
This leaves the resource ID under control of the service and allows to concentrate on the update semantic using `PUT` as follows.

::: info Info
In the rare cases where `PUT` is also used for resource creation, the resource IDs are maintained by the client and passed as a URL path segment.
Putting the same resource twice is required to be idempotent and to result in the same single resource instance (see [MUST fulfill common method properties](./must-fulfill-common-method-properties.md)).
:::

To prevent unnoticed concurrent updates and duplicate creations when using `PUT`, you [SHOULD consider to support `ETag` together with `If-Match`/`If-None-Match` header](../../headers/rules/should-use-etag-together-with-if-match-if-none-match-header-for-concurrrency-control.md) to allow the server to react on stricter demands that expose conflicts and prevent lost updates.
::::

:::: accordion POST
`POST` requests are idiomatically used to **create** single resources on a collection resource endpoint, but other semantics on single resources endpoint are equally possible.
The semantic for collection endpoints is best described as _"please add the enclosed representation to the collection resource identified by the URL"_.

- On a successful `POST` request, the server will create one or multiple new resources and provide their URI/URLs in the response.
- Successful `POST` requests will usually generate `200 OK` (if resources have been updated), `201 Created` with [`Location`](https://tools.ietf.org/html/rfc7231#section-7.1.2) header (if resources have been created), `202 Accepted` (if the request was accepted but has not been finished yet), and exceptionally `204 No Content` with [`Location`](https://tools.ietf.org/html/rfc7231#section-7.1.2) header (if the actual resource is not returned).

::: info Info

- `POST` should be used for scenarios that cannot be covered by the other methods sufficiently.
  In such cases, make sure to document the fact that `POST` is used as a workaround (see `GET With Body`).

- Resource IDs related to `POST` requests are created and managed by the server and returned with the response payload and/or as part of the URL in the [`Location`](https://tools.ietf.org/html/rfc7231#section-7.1.2) header.

- Posting the same resource twice is **not** required to be idempotent (check [MUST fulfill common method properties](./must-fulfill-common-method-properties.md)) and may result in multiple resources.
  However, you [SHOULD consider to design `POST` and `PATCH` idempotent](./should-consider-to-design-post-and-patch-idempotent.md) to prevent this.
  :::
  ::::

:::: accordion PATCH

`PATCH` requests are used to **update parts** of single resources, i.e. where only a specific subset of resource fields should be replaced.
The semantic is best described as _"please change the resource identified by the URL according to my change request"_.
The semantic of the change request is not defined in the HTTP standard and must be described in the API specification by using suitable media types.

- `PATCH` requests are usually applied to single resources as patching an entire collection is challenging.
- `PATCH` requests are usually not robust against non-existence of resource instances.
- On successful `PATCH` requests, the server will update parts of the resource addressed by the URL as defined by the change request in the payload.
- Successful `PATCH` requests will usually generate `200 OK` or `204 No Content` (if resources have been updated with or without updated content returned).

As implementing `PATCH` correctly is a bit tricky, we strongly suggest to choose one and only one of the following patterns per endpoint, unless forced by a backwards compatible change. In preferred order:

1. Use `PUT` with complete objects to update a resource as long as feasible (i.e. do not use `PATCH` at all).
2. Use `PATCH` with partial objects to only update parts of a resource, whenever possible. (This is basically [JSON Merge Patch](https://tools.ietf.org/html/rfc7396), a specialized media type `application/merge-patch+json` (sent as `Content-Type` request header) that is a partial resource representation.)
3. Use `PATCH` with [JSON Patch](https://tools.ietf.org/html/rfc6902), a specialized media type `application/json-patch+json` (sent as `Content-Type` request header) that includes instructions on how to change the resource.
4. Use `POST` (with a proper description of what is happening) instead of `PATCH`, if the request does not modify the resource in a way defined by the semantics of the media type.

In practice [JSON Merge Patch](https://tools.ietf.org/html/rfc7396) quickly turns out to be too limited, especially when trying to update single objects in large collections (as part of the resource).
In this cases [JSON Patch](https://tools.ietf.org/html/rfc6902) can show its full power while still showing readable patch requests (see also [JSON patch vs. merge](http://erosb.github.io/post/json-patch-vs-merge-patch)).

::: info Info
Patching the same resource twice is **not** required to be idempotent (check [MUST fulfill common method properties](./must-fulfill-common-method-properties.md)) and may result in a changing result. However, you [SHOULD consider to design `POST` and `PATCH` idempotent](./should-consider-to-design-post-and-patch-idempotent.md) to prevent this.
:::

To prevent unnoticed concurrent updates when using `PATCH` you [SHOULD consider to support `ETag` together with `If-Match`/`If-None-Match` header](../../headers/rules/should-use-etag-together-with-if-match-if-none-match-header-for-concurrrency-control.md) to allow the server to react on stricter demands that expose conflicts and prevent lost updates.
Refer to [SHOULD consider to design `POST` and `PATCH` idempotent](./should-consider-to-design-post-and-patch-idempotent.md) for details and options.
::::

:::: accordion DELETE
`DELETE` requests are used to **delete** resources.
The semantic is best described as _"please delete the resource identified by the URL"_.

- `DELETE` requests are usually applied to single resources, not on collection resources, as this would imply deleting the entire collection.
- Successful `DELETE` requests will usually generate `200 OK` (if some representation of the deleted resource is returned) or `204 No Content` (if no content is returned).
  - Depending on the `Access` header of the `DELETE` request, not only a representation of the deleted resource could be returned. Think of returning the whole shopping cart after `DELETE`ing only one lineitem.
- Failed `DELETE` requests will usually generate `404 Not Found` (if the resource cannot be found) or `410 Gone` (if the resource was already deleted before).

::: warning Important
After deleting a resource with `DELETE`, a `GET` request on the resource is expected to either return `404 Not Found` or `410 Gone` depending on how the resource is represented after deletion.
The resource must not be accessible on its endpoint after this operation.
:::
::::

:::: accordion HEAD
`HEAD` requests are used to **retrieve** the header information of single resources and resource collections.

It has exactly the same semantics as `GET`, but returns headers only, no body.

::: info Info
`HEAD` is particular useful to efficiently lookup whether large resources or collection resources have been updated in conjunction with the [`ETag`](https://tools.ietf.org/html/rfc7232#section-2.3) header.
:::

::::

:::: accordion OPTIONS
`OPTIONS` requests are used to **inspect** the available operations (HTTP methods) of a given endpoint.

`OPTIONS` responses usually either return a comma separated list of methods in the `Allow` header or a structured list of link templates.

::: info Info
`OPTIONS` is rarely implemented, though it could be used to self-describe the full functionality of a resource.
:::
::::
:::::
