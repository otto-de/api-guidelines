# Error Responses

https://github.com/otto-ec/ottoapi_manifest/issues/27

HTTP status codes are the most obvious choice for error communication, but they have a limited expressiveness. Many status codes are too generic to explain the specific type of an error. Most importantly, without contextual details, they are not particularly meaningful and user-friendly.
The current API guidelines are mainly based on HTTP status codes for error communication. In addition, a self-defined response format can optionally be used to explain the occurring error in detail.

## Overloading HTTP status codes

HTTP status codes are limited. As a result most of them are drastically overused in APIs. For example `HTTP 404` is utilised to multiple usecases like "never existed", "no longer exists", "you can't view it" and "it is deactivated". All these variants have in common that they are way too vague. They can be split up into `404 Not Found`, `403 Forbidden` and `410 Gone`. Receiving a `403 Forbidden` response could be caused by a missing authorization group or by a user initiated restriction. A `410 Gone` response could be due to deletion of that resource, or it could be down to the removal of an entire content group.

In all of these situations, the ideal solution is to complement the HTTP status code with a service specific error code, which can be whatever you want as long as they are unique within the API and documented somewhere.

## Custom Error Codes and Messages

Error codes are usually strings or integers that act as a unique index to corresponding human-readable error messages that provide detailed information about specific error situations.
They may sound like HTTP status codes, but are application specific and may or may not have anything to do with HTTP response codes. HTTP 4xx and 5xx codes show the client that something got wrong, and error codes provide specifics of the exact issue if the client is interested. There may be conditions where the same endpoint could return the same HTTP status code for more than one different error cases.

Different frameworks provide their own methods for error responses. Particularly in microservice architectures with different programming languages and frameworks in use, this is not optimal. An API must always report the same error message format.

## Problem Details for HTTP APIs

### Example Error Response

```json
HTTP/1.1 401 Unauthorized
Content-Type: application/problem+json

{
  "type": "https://example.com/errors/ERR-42",
  "title": "Not authorized to view account details.",
  "status": 401,
  "detail": "Due to privacy concerns you are not allowed to view account details of others.",
  "instance": "https://example.com/account/12345/",
  "code": "ERR-42"
}
```

## Notes / Questions

- Developers do not have to dig through documentation looking for the corresponding error message. Instead: Link to documentation, error code and problem description in the actual response.
- Extend with error code to support client specific localization!
- Namespaces for error codes for different teams/domains/verticals?
- Only respond with `problem+json` if client sends corresponding `Accept`-Header?
- Format seems truly RESTfully...
- Possible localizations for error communication must and can be left to the consumer.
- Some teams already have some form of error keys in place. How do we want to handle the transition? See: https://confluence.otto.de/pages/viewpage.action?pageId=356208247
- How to structure a list of errors associated to a request? Like validation failures for more than one property of the JSON request body?
- I think it's very important to show examples of complex input validation error responses.

## Resources

- [HTTP Status Codes](https://httpstatuses.com)
- [Blog: Indicating Problems in HTTP APIs](https://www.mnot.net/blog/2013/05/15/http_problem)
- [IETF RFC: Problem Details for HTTP APIs](https://tools.ietf.org/html/rfc7807)
- [Registered IANA Media Type](https://www.iana.org/assignments/media-types/application/problem+json)
- [problem+json JAVA](https://github.com/zalando/problem)
- [problem+json for Spring MVC](https://github.com/zalando/problem-spring-web)
- [problem+json documents with Node.js](https://www.npmjs.com/package/problem-json)
