# HTTP Headers

- <https://api.otto.de/portal/guidelines/rest-guidelines/http#headers>
- <https://github.com/otto-ec/ottoapi_guidelines/issues/39>

The "Headers" section of the API guidelines contains a collection of all HTTP Headers which **may** be used for different use cases. We don't actively prohibit the use of headers missing from that list, the table should rather provide an overview of headers in use.

We decided to treat some (groups of) headers in separate issues, because they'll require a more thorough research and decision process:

- Caching: <https://github.com/otto-ec/ottoapi_guidelines/issues/56>
- CORS (cross-origin resource sharing): <https://github.com/otto-ec/ottoapi_guidelines/issues/145>
- Rate Limiting: <https://github.com/otto-ec/ottoapi_guidelines/issues/51>

We decided to not document the usage of headers that become obsolete with HTTP2.

We decided against documenting the `Content-Encoding` header for client requests:

> Info: `Content-Encoding` for client requests
>
> Seems somewhat exotic, the main problem is discoverability for the client. There is a RFC for [Client-Initiated Content-Encoding](https://www.rfc-editor.org/rfc/rfc7694) which also highlights this problem. I don't expect a lot of clients and servers to actually support this out of the box. I'd recommend to not have this in our v1 guidelines. We don't prohibit anyone from using this for a given use case.

Instead of supporting the set of proprietary `X-Forwarded-*` headers, we decided to only support the now standardized [`Forwarded` header](https://www.rfc-editor.org/rfc/rfc7239#section-4).
