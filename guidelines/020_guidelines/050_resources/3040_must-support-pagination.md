---
type: MUST
id: R100023
---

# support pagination for collection resources

Any sufficiently large collection resource must support pagination to handle the server load and support the client processing patterns.

There are two approaches to pagination:

- [offset based](3050_offset-based-pagination.md)
- [cursor based](3060_cursor-based-pagination.md)

Choosing the right approach depends entirely on the constraints of the service.
There is no preference over which one to choose, they both have their advantages.
