# HTTP Headers

- https://api.develop.otto.de/api-docs/guidelines/#http-headers
- https://github.com/otto-ec/ottoapi_guidelines/issues/39

The "Headers" section of the API guidelines contains a collection of all HTTP Headers which **may** be used for different use cases. We don't actively prohibit the use of headers missing from that list, the table should rather provide an overview of headers in use.

We decided to treat some (groups of) headers in separate issues, because they'll require a more thourough research and decision process:

- Caching: https://github.com/otto-ec/ottoapi_guidelines/issues/56
- CORS (cross-origin resource sharing): https://github.com/otto-ec/ottoapi_guidelines/issues/145
- Rate Limiting: https://github.com/otto-ec/ottoapi_guidelines/issues/51

[TODO] support headers that apply to non-HTTP2, since the API Gateway will also support older HTTP versions
