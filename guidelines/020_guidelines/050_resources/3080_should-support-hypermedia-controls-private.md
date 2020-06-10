---
type: SHOULD
id: R100027
---

# support hypermedia controls (for private APIs)

See [previous rule](3070_must-support-hypermedia-controls-public.md).

For internal APIs it is only a recommendation to use HAL as a format to represent linking and embedding.
However, as for partner and public APIs the HAL format is mandatory, publishing an internal API would require breaking changes to the API, if a different format than HAL would be used.

For cursor based navigation it is highly recommended that you provide links as the paging metadata is not defined and the client should have a consistent paging API and the implementations may differ.
