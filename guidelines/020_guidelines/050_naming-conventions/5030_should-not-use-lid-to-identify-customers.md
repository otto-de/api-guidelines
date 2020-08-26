---
type: SHOULD NOT
id: R100074
---

# use lId (or loginId) to identify customers

The lId (or loginId) was introduced for one specific, limited usecase and is a suboptimal way to identify logged in customers. On a technical level one customer can have a multitude of different lIds.

It is also not trivially possible for endpoints or clients derive the customer the lId refers to without knowledge of a common secret which is privileged knowledge. 