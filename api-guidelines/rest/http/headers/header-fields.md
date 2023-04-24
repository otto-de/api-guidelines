# Header fields

:::: accordions
::: accordion ETag
The RFC 7232 `ETag` header field in a response provides the entity tag of a selected resource. The entity tag is an opaque identifier for versions and representations of the same resource over time, regardless whether multiple versions are valid at the same time.
An entity tag consists of an opaque **quoted** string, possibly prefixed by a weakness indicator (refer to [RFC 7232 Section 2.3](https://tools.ietf.org/html/rfc7232#section-2.3)).
The contents of an `ETag: <entity tag>` header is either:

​ a) a hash of the response body,

​ b) a hash of the last modified field of the entity, or

​ c) a version number or identifier of the entity version.

Example: `W/"xy"`, `"5"`, `"5db68c06-1a68-11e9-8341-68f728c1ba70"`
:::

::: accordion If-Match
The RFC 7232 `If-Match` header field in a request requires the server to only operate on the resource that matches at least one of the provided entity-tags.
This allows clients to express a precondition that prevents the method from being applied if there have been any changes to the resource (refer to [RFC 7232 Section 3.1](https://tools.ietf.org/html/rfc7232#section-3.1)).

Example: `"5"`, `"7da7a728-f910-11e6-942a-68f728c1ba70"`
:::

::: accordion If-None-Match
The RFC 7232 `If-None-Match` header field in a request requires the server to only operate on the resource if it does **not** match any of the provided entity-tags. If the provided entity-tag is `*`, it is required that the resource does not exist at all (refer to [RFC 7232 Section 3.2](https://tools.ietf.org/html/rfc7232#section-3.2)).

Example: `"7da7a728-f910-11e6-942a-68f728c1ba70"`, `*`
:::

::: accordion Location
The `Location` header includes a fully qualified URL. This URL [must also be absolute](../../hypermedia/links/rules/must-use-absolute-urls.md) and respect any `Forwarded` header.
Use this for two use cases:

- Redirection: When answering a request with a `3xx` status code, the header value should point to where the resource moved.
- Creation: When succesfully creating a resource via `POST`, you should tell a client the final location of that resource using the `Location` header. If a resource was created via `PUT` the client is already aware of the resource location, in this instance you should not set the `Location` header.
  :::
  ::::
