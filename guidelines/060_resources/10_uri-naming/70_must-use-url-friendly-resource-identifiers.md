---
type: MUST
id: R000019
---

# use URL-friendly resource identifiers

To simplify encoding of resource IDs in URLs, their representation must only consist of ASCII strings.

**Use**

* letters [a-zA-Z]
* numbers [0-9]
* underscore _
* minus -
* colon :
* period .
* and - on rare occasions - slash /


**Don't use** (among others):

* umlauts äöü
* accents àèĉ
* eszett ß