---
type: SHOULD
id: R100022
---

# use HAL format for collection resources in private APIs

See [previous rule](3020_must-use-hal-format-for-collection-resource-public.md).

For internal APIs it is only a recommendation to use HAL as a format to represent linking and embedding.
However, as for partner and public APIs the HAL format is mandatory, publishing an internal API would require breaking changes to the API, if a different format than HAL would be used.
