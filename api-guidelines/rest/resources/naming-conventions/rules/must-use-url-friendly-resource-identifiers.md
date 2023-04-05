---
id: R000024
---

# MUST use URL-friendly resource identifiers

To simplify encoding of resource IDs in URLs, their representation must only consist of ASCII strings.

USE

- letters [a-zA-Z]
- numbers [0-9]
- underscore \_
- minus -
- colon :
- period .
- and - on rare occasions - slash /

DON'T USE (among others)

- umlauts äöü
- accents àèĉ
- eszett ß
