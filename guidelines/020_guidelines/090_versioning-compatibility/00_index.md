# Versioning & compatibility

After deciding to continue using HAL+JSON as the API format, we can cluster the [list of identified options](../topics/versioning.md)
into three categories, including those relying on media types otherwise forbidden by using JSON:API.

We cannot support a single global version number for the whole OTTO API, because it would introduce way too much
coordination overhead between functional teams. Also we want to use industry standards as much as possible, factoring
out solutions that violate existing standards or rely on draft standards where incompatible changes might happen.

Both of the remaining options require some semantic of 'latest version' of an endpoint. For
[resource versioned path](../topics/versioning.md#resource-versioned-paths) this can be solved by using a special
version identifier of `latest` as part of the URI, e.g. https://api.otto.de/checkouts/latest. The option
[Accept header with profile parameter](../topics/versioning.md#accept-header-using-standard-media-type-with-profile-parameter)
needs some server-side logic to route to the correct endpoint in case an `Accept` header used for content negotiation
does not include a versioned profile for the media type.
