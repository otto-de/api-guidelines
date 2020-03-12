# Quality Standard

> "We strive for quality standards of a public API."

Let's assume that any internal or external stakeholder wants our API to be public by tomorrow. External users outside of the Otto Group should be able to consume our API immediately. Therefore our API should meet certain quality standards, which enable us to take the step to a public API without much effort.

A consistent understanding of quality standards also facilitates the development of further endpoints and the evolution of the OTTO API as a product without unnecessary consultation between all parties involved.

Our understanding of quality covers different aspects, which are explained in more detail below. 

## Robustness

All implementations of our API follow the [Robustness Principle](https://en.wikipedia.org/wiki/Robustness_principle), because it is essential for the evolution of APIs. Future changes to interfaces cannot be anticipated in advance, so aspects such as backward compatibility, loose coupling and the elimination of the need to synchronize different services are of crucial importance. This is especially true for microservice environments where dependencies between services should be kept to a minimum.

> Be conservative in what you do, be liberal in what you accept from others.

## Consistency

Our API is essentially developed by independent, autonomous functional teams. However, we strive for a uniform presentation to the outside world. The API should make the impression that it was developed by a single team.
This consistency covers several facets such as documentation, naming conventions, code examples, common data structures, pagination, governance, authentication and error codes.

## Reliability

If our API infrastructure is not reliable, consumers will not build trust and engagement will not increase. API reliability extends beyond uptime. We do not limit our evaluation to availability, but also include aspects such as variations in response times or behavior with an increasing number of concurrent clients.

We avoid unannounced changes and prevent outages to the best of our knowledge. In doubt we choose carefully between consistency (always return even in case of an error) and availability (in doubt return stale content). Our endpoints must always return a response, whether the requested operation succeeds or fails.

## Security

Security is not a side-issue, but an integral part of all software projects, and therefore also for APIs.

Not all vulnerabilities will be preventable. However, a good rule of thumb is to prepare for the worst case scenario that everyone is out to get our data. We leverage industry-standard technologies for encryption, authentication and authorization.

We are conservative in exposing our data and the [Principle of least privilege](https://en.wikipedia.org/wiki/Principle_of_least_privilege) is applied to only allow enough access to API clients for them to perform what tasks they need to. As well we strive to only include the least amount of data necessary to respond to any API call.

Additionally we restrict the rate limit to specific resources to prevent misuse. 

## Performance

We identify and analyze key metrics for different groups of interest. The bandwidth of possible metrics ranges from purely technical information such as uptime, latencies and error rates to business insights such as SDK and version adoption, Time to First Hello World (TFHW) or API usage growth.

## Documentation / Support

We help both vendors during development and users of our API with the integration in offering suitable ways of exchange and support. As the primary resource for explaining our API and its capabilities, the documentation must be as accessible as it can be to the audience. We provide all consumers of our API with comprehensive, professional, up-to-date and complete information.

## Communication

We always keep both developers and consumers of our API informed through appropriate channels. Changes and deprecations are communicated regularly and actively. Therefore we establish different synchronous and asynchronous communication channels to support developers and consumers.

## Developer Experience

API consumers should have fun using our API. Our goal is to provide seamless experience to developers when writing software, and to increase their efficiency. API consumers should be comfortable using our API in their programming language of choice, finding the functionality they need, as well as using the output. We give developers the right tools to help them succeed and aim to provide a TTFHW (Time to First "Hello World") as short as possible.
