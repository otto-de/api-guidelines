# Error Responses

<https://github.com/otto-ec/ottoapi_manifest/issues/27>

HTTP status codes are the most obvious choice for error communication, but they have a limited expressiveness. Many status codes are too generic to explain the specific type of an error. Most importantly, without contextual details, they are not particularly meaningful and user-friendly.
A self-defined response format is used to explain the occurring error in detail.
This page contains the various solutions that can be leveraged to perform this.

## Overloading HTTP status codes

HTTP status codes are limited. As a result most of them are drastically overused in APIs. For example `HTTP 404` is utilised to multiple usecases like "never existed", "no longer exists", "you can't view it" and "it is deactivated". All these variants have in common that they are way too vague. They can be split up into `404 Not Found`, `403 Forbidden` and `410 Gone`. Receiving a `403 Forbidden` response could be caused by a missing authorization group or by a user initiated restriction. A `410 Gone` response could be due to deletion of that resource, or it could be down to the removal of an entire content group.

In all of these situations, the ideal solution is to complement the HTTP status code with a service specific error code, which can be whatever you want as long as they are unique within the API and documented somewhere.

## Custom Error Codes and Messages

Error codes are usually strings or integers that act as a unique index to corresponding human-readable error messages that provide detailed information about specific error situations.
They may sound like HTTP status codes, but are application specific and may or may not have anything to do with HTTP response codes. HTTP 4xx and 5xx codes show the client that something got wrong, and error codes provide specifics of the exact issue if the client is interested. There may be conditions where the same endpoint could return the same HTTP status code for more than one different error cases.

Different frameworks provide their own methods for error responses. Particularly in microservice architectures with different programming languages and frameworks in use, this is not optimal. An API must always report the same error message format.

## Problem Details for HTTP APIs (chosen solution)

### Example Error Response

```json
HTTP/1.1 401 Unauthorized
Content-Type: application/problem+json

{
  "type": "about:blank",
  "title": "Not authorized",
  "status": 401,
  "detail": "Due to privacy concerns you are not allowed to view account details of others.",
  "instance": "https://example.com/account/12345/"
}
```

### validation-failed problem type

As the `problem+json` media type standard does not provide a problem type for failed input validation, we had to establish one.
One could argue that the "about:blank" problem type could be used in combination with the already defined `details` property. But [RFC 7807](https://tools.ietf.org/html/rfc7807) explicitly states, that this property is not meant to be parsed.
Therefore, we created a new type `https://api.otto.de/portal/problems/validation-failed` with a custom property called `validationErrors`.

### Notes / Questions

- Developers do not have to dig through documentation looking for the corresponding error message. Instead: Link to documentation, error code and problem description in the actual response.
- API provider can create new problem types if needed.
- APIs always send `application/problem+json` for errors, disregarding the `Accept` header in the error case.
- Format seems truly RESTfully.
- Possible localizations for error communication must and can be left to the consumer.
- List of problems associated with a request can be structured in custom problem types.

## Resources

- [HTTP Status Codes](https://httpstatuses.com)
- [Blog: Indicating Problems in HTTP APIs](https://www.mnot.net/blog/2013/05/15/http_problem)
- [IETF RFC: Problem Details for HTTP APIs](https://tools.ietf.org/html/rfc7807)
- [Registered IANA Media Type](https://www.iana.org/assignments/media-types/application/problem+json)
- [Error Responses with Spring MVC](https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-ann-rest-exceptions.html)
- [Error Responses with Spring WebFlux](https://docs.spring.io/spring-framework/reference/web/webflux/ann-rest-exceptions.html)
- [problem+json documents with Node.js](https://www.npmjs.com/package/problem-json)
