# HTTP Headers

- <https://api.otto.de/api-docs/guidelines/#http-headers>
- <https://github.com/otto-ec/ottoapi_guidelines/issues/39>

The "Headers" section of the API guidelines contains a collection of all HTTP Headers which **may** be used for different use cases. We don't actively prohibit the use of headers missing from that list, the table should rather provide an overview of headers in use.

We decided to treat some (groups of) headers in separate issues, because they'll require a more thourough research and decision process:

- Caching: <https://github.com/otto-ec/ottoapi_guidelines/issues/56>
- CORS (cross-origin resource sharing): <https://github.com/otto-ec/ottoapi_guidelines/issues/145>
- Rate Limiting: <https://github.com/otto-ec/ottoapi_guidelines/issues/51>

---

The API Gateway supports HTTP v1.x and v2, the former only for compatibility with older clients. In order to discourage the older protocol, we will not list headers that became obsolete with HTTP2.

---

We decided against documenting the `Content-Encoding` header for client requests:

> Regarding `Content-Encoding` for client requests:
> Seems somewhat exotic, the main problem is discoverability for the client. There is a RFC for [Client-Initiated Content-Encoding](https://tools.ietf.org/html/rfc7694) which also highlights this problem. I don't expect a lot of clients and servers to actually support this out of the box. I'd recommend to not have this in our v1 guidelines. We don't prohibit anyone from using this for a given use case.

---

Instead of supporting the set of proprietary `X-Forwarded-*` headers, we decided to only support the standard `Forwarded` header.

---
