# HTTP concurrency control

- https://github.com/otto-ec/ottoapi_guidelines/issues/57
- https://opensource.zalando.com/restful-api-guidelines/#182
- https://opensource.zalando.com/restful-api-guidelines/#optimistic-locking

We decided against relying on the combination of [`Last-Modified`](https://tools.ietf.org/html/rfc2616#section-14.29)/[`If-Unmodified-Since`](https://tools.ietf.org/html/rfc2616#section-14.28) headers for optimistic locking, because their date values only support a granularity of one second (see [RFC 2616](https://tools.ietf.org/html/rfc2616#section-3.3.1)). In a high-traffic environment like otto.de this seems to be way too coarse.

Contrary to Zalando's Best Practices we also opted against [`ETags` in result entities](https://opensource.zalando.com/restful-api-guidelines/#etag-in-result-entities) and [Version numbers](https://opensource.zalando.com/restful-api-guidelines/#_version_numbers), because we feel this purely technical data does not belong into business-centric response payload data.

This leaves us with using `ETag` header for concurrency control. For now (v1.0.0) we accept that clients need to do an additinal `GET` or `HEAD` roundtrip in order to fetch the current `ETag` value prior to using it in subsequent requests.

When using `PATCH` with `application/json-patch+json`, a server should answer with status code `409 Conflict` instead of `412 Precondition Failed` when the `test` operation failed, based on https://tools.ietf.org/html/rfc5789#section-2.2:

> Conflicting state: Can be specified with a 409 (Conflict) status

      code when the request cannot be applied given the state of the
      resource.  For example, if the client attempted to apply a
      structural modification and the structures assumed to exist did
      not exist (with XML, a patch might specify changing element 'foo'
      to element 'bar' but element 'foo' might not exist).

> Conflicting modification: When a client uses either the If-Match or

      If-Unmodified-Since header to define a precondition, and that
      precondition failed, then the 412 (Precondition Failed) error is
      most helpful to the client.  However, that response makes no sense
      if there was no precondition on the request.  In cases when the
      server detects a possible conflicting modification and no
      precondition was defined in the request, the server can return a
      409 (Conflict) response.
