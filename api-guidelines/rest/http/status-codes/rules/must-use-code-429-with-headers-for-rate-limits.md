---
id: R000014
---

# MUST use code 429 with headers for rate limits

APIs that intend to manage the request rate of clients must use the `429 Too Many Requests` response code, if the client exceeded the request rate (refer to [RFC 6585](https://tools.ietf.org/html/rfc6585)).
Such responses must also contain header information providing further details to the client.
There are two approaches a service can take for header information:

- Return a [`Retry-After`](https://tools.ietf.org/html/rfc7231#section-7.1.3) header indicating how long the client ought to wait before making a follow-up request. The Retry-After header can contain a HTTP date value to retry after or the number of seconds to delay. Either is acceptable but APIs should prefer to use a delay in seconds.
- Return a trio of `X-RateLimit` headers. These headers (described below) allow a server to express a service level in the form of a number of allowing requests within a given window of time and when the window is reset.

The `X-RateLimit` headers are:

- `X-RateLimit-Limit`: The maximum number of requests that the client is allowed to make in this window.
- `X-RateLimit-Remaining`: The number of requests allowed in the current window.
- `X-RateLimit-Reset`: The relative time in seconds when the rate limit window will be reset.
  (This is different to GitHub and Twitter’s usage of a header with the same name which is using UTC epoch seconds instead.)

The reason to allow both approaches is that APIs can have different needs.
Retry-After is often sufficient for general load handling and request throttling scenarios and notably, does not strictly require the concept of a calling entity such as a tenant or named account.
In turn this allows resource owners to minimize the amount of state they have to carry with respect to client requests.
The 'X-RateLimit' headers are suitable for scenarios where clients are associated with pre-existing account or tenancy structures.
`X-RateLimit` headers are generally returned on every request and not just on a 429, which implies the service implementing the API is carrying sufficient state to track the number of requests made within a given window for each named entity.
