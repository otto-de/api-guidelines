---
type: MUST
id: R000015
---

# avoid actions - think about resources

REST is all about resources.
Therefore, we consider the domain entities involved in web service interaction, and try to model our API around them using the standard HTTP methods as operation indicators.

**DO**

- `POST /orders/{orderId}`
  > TODO is this in line with collection resources?
- `DELETE /articles/{articleNumber}`
- `POST /articles/{articleNumber}/lock`

> TODO: google erlaubt bei sich schon verben, die scheinen aber durch : getrennt zu sein, also ../{articleNumber}:lock

**DON'T**

- `POST /orders/create-order`
- `POST /articles/{articleNumber}/delete`
- `POST /artcles/lock-article/{articleNumber}`
