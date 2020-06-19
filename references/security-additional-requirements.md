# additional requirements against the APIs security framework

While working on the first version on the API specification we primarily focused on a documentation the current capabilities of our API using them to securely publish API endpoints.

During this documentation we found a myriad of (sometimes more, sometimes less) well-defined additional requirements that different parties involved voiced when talking about the API.

This document will serve as a first collection of those requirements as well of the parties that brought them up. From there we'll try to sort them and, if time permits, come up with recommended solutions.

## requirements

- As an otto.de app developer I want the logged in sessions to automagically get an API token, so that I do not need to request it explicitly.
- As an otto.de app developer I want non logged-in sessions to automagically get an (public scope) API token, so I do not need to request it explicitly.
- As a security minded developer I would like fewer authentication mechanisms and tokens between api.otto.de and www.otto.de, because designing a secure system is easier when the overall system is simpler.
- As an API client developer I would like one preferred way to submit user identifiers like visitorId, lId, BrowserId so that I don't have to implement slightly different behaviour for each endpoint.
- As an FT1/order developer I want the unique-user-id to be part of the API authentication / the token so that I can be sure the user actually gave his/her consent to what the token is used for (for example: ordering stuff).

## possible solutions

- unique user id from JWTs subject is mandatory way of checking unique-user-id
  - right now some endpoints expect in in query parameter, this does not require the API client to ask for user consent before requesting APIs on behalf of the user
  -forces server to server communication to use one token per user
- API tokens can be requested with visitorId, lId, .. as parameters which will then be added to the token (thus signed)
  - would bundle identity-stuff in token
  - does not proof user consent
  - does not proof it is from the user, could be intermediary (server)
  - does not proof a "real" visitorId since they are random by design

