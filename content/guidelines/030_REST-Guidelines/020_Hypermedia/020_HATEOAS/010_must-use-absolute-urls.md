---
type: MUST
id: R100032
---

# use absolute URLs

Links to other resources must always use full, absolute hrefs. If a client supplies
a [`Forwarded` request header](./guidelines/020_guidelines/040_hypermedia/2060_must-support-forwarded-header.md), the
header value must be used for generating absolute URLs.

The `Forwarded` header may contain the directives `host` and `proto`. The `host` directive contains the `Host` request
field as received by the proxy that forwarded the request. The `proto` directive contains the protocol that was used
to make the request to the proxy (usually `http` or `https`). For the construction of absolute URLs based on the
`Forwarded` Header, the service also needs to take into account the path under which the service is made available
to the client by the reverse proxy.

Motivation:

Exposing any form of relative URI (no matter if the relative URI uses an absolute or relative path)
introduces avoidable client side complexity. It also requires clarity on the base URI, which might not be given when
using features like embedding subresources.

The main advantage of non-absolute URIs is the reduction in payload size, which can be better achieved by following the
recommendation to use gzip compression.

Example:

In this example the origin service (serving <https://myExampleService:8080>) can only be reached through a reverse proxy
which acts as an API gateway (serving <https://api.otto.de>). The client communicates with the origin service through
the API gateway. That is why the origin service can only deduct the client facing URI from the `Forwarded` header.
The `Forwarded` header is set by the API gateway.

```http request
# Request from the client to the API gateway
GET https://api.otto.de/example-api/my-ressource/1234
# Proxied request from the API gateway to the origin service
GET https://myExampleService:8080/my-ressource/1234
Forwarded: for=156.124.2.46;host=api.otto.de;proto=https
```

The answer from the origin-services must ues the `host` and `proto` directives of the `Forwarded` header and its API
gateway path to generate absolute URLs:

```json
{
   ...
   "_links" : {
      "self" : "https://api.otto.de/example-api/my-ressource/1234",
      ...
  }
}
```
