---
id: R000015
---

# MUST avoid actions as resource names

REST is all about resources.
Therefore, we look at the domain entities involved in web service interaction, and try to model our API around them, using the standard HTTP methods as operational indicators.

DO

- `POST /orders/{orderId}`
- `DELETE /articles/{articleNumber}`
- `POST /articles/{articleNumber}/lock`

DON'T

- `POST /orders/create-order`
- `POST /articles/{articleNumber}/delete`
- `POST /artcles/lock-article/{articleNumber}`
