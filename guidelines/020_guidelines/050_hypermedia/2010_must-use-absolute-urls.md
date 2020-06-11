---
type: MUST
id: R100032
---

# use absolute URLs

Links to other resource must always use full, absolute hrefs.

Motivation:

Exposing any form of relative URI (no matter if the relative URI uses an absolute or relative path)
introduces avoidable client side complexity. It also requires clarity on the base URI, which might not be given when
using features like embedding subresources.

The primary advantage of non-absolute URI is reduction of the payload size,
which is better achievable by following the recommendation to use gzip compression
