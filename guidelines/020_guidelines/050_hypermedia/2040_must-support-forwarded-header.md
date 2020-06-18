---
type: MUST
id: R000044
---

# support FORWARDED Header

In order to support proxies in front of your origin server, you must implement support for the `Fowarded` request header.

The `Forwarded` header is defined in [RFC 7239](https://tools.ietf.org/html/rfc7239) for identifying the original host requested by the client in the `Host` HTTP request header.

[Absolute URLs](2010_must-use-absolute-urls.md) rendered in links of a HAL response contain the value of this header.

See [RFC 7239, Section 4](https://tools.ietf.org/html/rfc7239#section-4) for examples of this header.
