---
sideNav: true
---

# HATEOAS

HATEOAS is short for "Hypermedia As The Engine Of Application State" and describes a design model for REST interfaces.
If we wouldn't use hypermedia in the design of our interfaces, clients would be forced to construct URLs themselves, which can only be done with knowledge of the resource's internals.
Furthermore, without links there is no workflow at all, but at best a static API. Apart from the absence of a workflow, this creates a close and fragile coupling. If resource URLs change, the clients will no longer work.
If the clients should not have to change, the resource must not change. There are several candidates for hypermedia formats, such as HAL, JSON API, JSON-LD, Collection+JSON or SIREN.
After careful consideration of various aspects, we chose to keep hal+json as the primary format for hypermedia documents.
Sticking to the already adopted format will prevent pointless migration of already established APIs to a different format.
The minimalist approach of HAL and the resulting flexibility supports the incremental enhancement of simple JSON responses.
