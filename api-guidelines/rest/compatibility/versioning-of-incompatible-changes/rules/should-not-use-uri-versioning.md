---
id: R000026
---

# SHOULD NOT use URI versioning

If you absolutely have to use a version identifier as part of your URL, do so by keeping it as a path segment relative to your resource.

DO

- `/users/{user-identifier}`
- `/users/v2/{user-identifier}`

DON'T

- `/users/{user-identifier}?version=2`
- `/v2/users/{user-identifier}`
