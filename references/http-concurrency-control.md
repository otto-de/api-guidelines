# HTTP concurrency control

- https://github.com/otto-ec/ottoapi_guidelines/issues/57
- https://opensource.zalando.com/restful-api-guidelines/#182
- https://opensource.zalando.com/restful-api-guidelines/#optimistic-locking

We decided against relying on the combination of [`Last-Modified`](https://tools.ietf.org/html/rfc2616#section-14.29)/[`If-Unmodified-Since`](https://tools.ietf.org/html/rfc2616#section-14.28) headers for optimistic locking, because their date values only support a granularity of one second (see [RFC 2616](https://tools.ietf.org/html/rfc2616#section-3.3.1)). In a high-traffic environment like otto.de this seems to be way too coarse.

Contrary to Zalando's Best Practices we also opted against [`ETags` in result entities](https://opensource.zalando.com/restful-api-guidelines/#etag-in-result-entities) and [Version numbers](https://opensource.zalando.com/restful-api-guidelines/#_version_numbers), because we feel this purely technical data does not belong into business-centric response payload data.

This leaves us with using `ETag` header for concurrency control. For now (v1.0.0) we accept that clients need to do an additinal `GET` or `HEAD` roundtrip in order to fetch the current `ETag` value prior to using it in subsequent requests.
