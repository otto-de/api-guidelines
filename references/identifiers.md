# identifiers in the scope of the API

This document should server as a reference for the various user identifiers that either have been used or are still being used in the scope of ottos APIs.

It is explicitly meant to be descriptive not normative.

| id        | synonyms | tech origin             | business owner | trackin label     | 
|-----------|----------|-------------------------|----------------|-------------------|
| browserId |          | ShoZu / PA-layer        | unknown        | -                 |
| visitorId |          | ShoZu / PA-layer        | unknown        | ot_Vid            |
| ec-uuid   | uuid     | FT4 / Identity          | FT4            | user_UniqueUserId |
| lId       | loginId  | FT4 / Identity          | FT4            | ot_Lid            |

## browserId

- generated in the PA-layer on first request that does not already have one
- set as a cookie
  - with 10 year lifetime
  - `set-cookie: visitorId=2655cded-6b5f-40b9-b701-accd0ac6c3d0.v1; Path=/; Domain=.otto.de; max-age=315360000; Expires=Fri, 12 Jul 2030 08:55:15 GMT`
- just a UUID + suffix ".v1"
- browser specific and random, no way to map them to actual logged in users easily
- widely used ([500+ hits](https://github.com/search?q=org%3Aotto-ec+BrowserId&type=Code) in source)
- since it's technically and semantically very close to the visitorId most likely also used to identify non-logged in users

## visitorId

- same place in PA, same logic & lifetime as browserId cookie
- `set-cookie: visitorId=2655cded-6b5f-40b9-b701-accd0ac6c3d0.v1; Path=/; Domain=.otto.de; max-age=315360000; Expires=Fri, 12 Jul 2030 08:55:15 GMT
`
- very widely used ([1000+ hits](https://github.com/search?q=org%3Aotto-ec+VisitorId&type=Code) in code)
- most teams use this to identify non-logged in users
- browser specific and random, no way to map them to actual logged in users easily

## ec-uuid

- primary identifier by FT4/identity for logged in users
- FT4/identity recommended way to query for and map to logged in usrs
- structurally a UUID
- might at some point be superseded by a new ID maintained by DeepSea/Plankton timeline 1+ years 
- very widely used in code ([2000+ hits in code](https://github.com/search?q=org%3Aotto-ec+UniqueUserId&type=Code)), basically anyone validating logins

## lId

- symmetrically encrypted variant of the ec-uuid
- not stable for any given user account since it contains a date
  - so multiple lId values refer to any given user
- not recommended by FT4/identity to build new logic upon
- quite widely used in code ([almost 500 hits in code](https://github.com/search?q=org%3Aotto-ec+lId&type=Code)) 
- most of the time used to get to the ec-uuid inside