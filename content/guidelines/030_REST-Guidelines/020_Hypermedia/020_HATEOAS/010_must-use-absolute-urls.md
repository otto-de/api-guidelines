---
type: MUST
id: R100032
---

# use absolute URLs

Links to other resources must always use full, absolute hrefs. If a client supplies
a [`Forwarded` request header](./guidelines/020_guidelines/040_hypermedia/2060_must-support-forwarded-header.md), the
header value must be used for generating absolute URLs.

Motivation:

Exposing any form of relative URI (no matter if the relative URI uses an absolute or relative path)
introduces avoidable client side complexity. It also requires clarity on the base URI, which might not be given when
using features like embedding subresources.

The main advantage of non-absolute URIs is the reduction in payload size, which can be better achieved by following the
recommendation to use gzip compression.
