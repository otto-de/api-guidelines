# Quality standards

[The scope of the OTTO API](./api-scope.md) ranges between a public and a private API.
Nevertheless, when it comes to quality, we strive for the standards of a public API.
If the API needs to be public by tomorrow, external users should then be able to consume the API immediately.
What's more, a consistent understanding of quality standards facilitates the development of further endpoints and the evolution of the OTTO API as a product without unnecessary consultation between all parties involved.

Our understanding of quality covers the following aspects:

- [Robustness](#robustness)
- [Consistency](#consistency)
- [Reliability](#reliability)
- [Security](#security)
- [Performance](#performance)
- [Documentation and support](#documentation-and-support)
- [Communitcation](#communication)
- [Developer experience](#developer-experience)

## Robustness

All implementations of the API follow the [Robustness Principle](https://en.wikipedia.org/wiki/Robustness_principle), as it is essential for the evolution of APIs.
Future changes to interfaces cannot be anticipated in advance, so aspects such as backward compatibility, loose coupling, and the elimination of the need to synchronize different services are of crucial importance.
This is especially applicable for microservice environments where dependencies between services should be kept to a minimum.

We follow the principle: *Be conservative in what you do, be liberal in what you accept from others.*

## Consistency

The API is essentially developed by independent, autonomous functional teams.
However, we strive for a uniform presentation to the outside world.
The API should give the impression that it was developed by a single team.
This consistency covers several facets such as documentation, naming conventions, code examples, common data structures, pagination, governance, authentication, and error codes.

## Reliability

If the API infrastructure is not reliable, consumers will not build trust, and engagement will not increase.
API reliability extends beyond uptime.
We do not limit our evaluation to availability, but also include aspects such as fluctuations in response times or behavior with an increasing number of concurrent API clients.

We avoid unannounced changes and prevent outages to the best of our knowledge.
When having to choose between consistency (always return even in case of an error) and availability (in doubt return stale content), we prefer availability. 
Even to the detriment of consistency.
Our endpoints must always return a response, whether the requested operation succeeds or fails.

## Security

Security is not a marginal topic, but an integral part of all software projects, and thus also of APIs.

Not all vulnerabilities will be preventable.
However, a good rule of thumb is to prepare for the worst case scenario that everyone is out to get our data.
We leverage industry-standard technologies for encryption, authentication, and authorization.

We are conservative in exposing our data and the [Principle of least privilege](https://en.wikipedia.org/wiki/Principle_of_least_privilege) is applied to allow API clients only enough access to perform the required tasks.
In addition, we strive to include only the least amount of data necessary to respond to any API call and secure our applications against the [OWASP Top 10 Threats](https://owasp.org/www-project-top-ten/).

We also restrict the rate limit to specific resources to prevent misuse.

## Performance

We identify and analyze key metrics for different groups of interest.
The bandwidth of possible metrics ranges from purely technical information such as uptime, latencies, and error rates to business insights such as SDK, version adoption, as well as Time to First Hello World (TTFHW), or API usage growth.

## Documentation and support

We help both the providers during development and the users of the API with the integration by offering suitable ways of exchange and support.
As the primary resource for explaining the API and its capabilities, documentation must be as accessible to the audience as possible.
We provide all consumers of the API with comprehensive, professional, up-to-date, and complete information.

## Communication

We always keep both providers and consumers of the API informed through appropriate channels.
Changes and [deprecations](../../rest/compatibility/README.md#deprecation-of-http-apis) are communicated regularly and actively.
Therefore, we establish different synchronous and asynchronous communication channels to support developers and consumers.

## Developer experience

API consumers should have fun using the API.
Our goal is to provide seamless experience to developers when writing software, and to increase their efficiency.
API consumers should be comfortable using the API in their programming language of choice, finding the functionality they need, as well as using the output.
We give developers the right tools to help them succeed and aim to provide an as short as possible Time to First Hello World (TTFHW).
