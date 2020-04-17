# API-First vs. Contract-First Strategy



## API-First?

Stefan Tilkov on [API-first strategy](https://twitter.com/stilkov/status/1250355396864176132):

> Many enterprise IT departments have become big fans of an “API-first“ strategy. I think that in general, this is a bad idea.

> When you start with APIs, you really have to have a very good grasp of what that API’s users will need. You typically don’t. Instead, you try to come up with things that will “obviously” be re-usable, and end up with things that are not even useful.

> Most often, APIs are shaped, and almost always restricted, by the capabilities of underlying systems they encapsulate. That’s great if these are great. They typically aren’t.

> An API-first strategy assumes that great applications can be built by “just” “orchestrating” the capabilities exposed through APIs. That’s true for some applications, but not for many, and typically not for great ones.

> Unless APIs are the actual product you provide to your outside customers, the horizontal divide created by putting an API boundary between your end users and the business logic (and the resulting Conway’s law effects) will create lots of pain and little value.

> In many cases, an API-centric strategy is a sign of the strategists not wanting to have to deal with actual end users and their needs. It’s much easier to create re-usable services that someone else has to assemble, and even easier to create a meta-strategy for that. 

> (On the plus side, an API-first strategy works great if you have an API gateway product to sell, or want to legitimize legacy systems that are slowing you down by putting a “bi-modal” or “two-speed IT” sticker on them)

> I blame most of the disasters in modern enterprise IT strategy on the fact that it’s people like me – backend architects with way too little focus on UI/UX aspects – who have been put at the controls for far too long.

> You need a strategy for modular application delivery, not only including, but starting from, end-user needs. APIs are a meaningful means to an end for that. Starting with them is going to end badly, independently from your choice of protocol or data format.

Alexander Zeitler:

> I've always preferred an UI focused approach to identify the requirements and quality factors of the API.  UI "first" also helps gaining understanding of bounded contexts (in addition to other methods) After this point, I try to apply ideas and principles from API first approach.

Stefan Tilkov:

> Completely agreed.

## UI-First, API-Second

The current strategy in developing APIs for otto.de is something like "UI-First, API if requested". As this is not leading us to a API that is available, complete and suitable for different purposes, we need to increase our priority with respect to APIs.

Following Stefan Tilkov's proposal, for any feature of otto.de, we should:

* First build an HTML UI, so we hae a quick first impression, what data is required to render the feature in a manner that is useful to customers and possible API clients.
* Second, an API should be developed, that makes it possible to implement the same feature in our App. The API should contain the same functionality, as the HTML UI, including the hyperlinks present in the HTML representation.
* In case of already existing features, the APIs should be developed as soon as possible, starting with the core features like, for example product-, search-, navigation-, order-APIs, etc.

The approach to implement the API can be called "API-Second".

## Contract-First

> 
>
> TODO: Link auf engeneering and architecture principles
>
> 

Contract First is one of our engineering and architecture principles. In a nutshell Contract First requires two aspects:

* define API contracts first, before coding its implementation, using a [standard specification language](./spec-format.md).

- get early review feedback from peers and client developers

By defining API contracts outside the code, we want to facilitate early review feedback and also a development discipline that focus service interface design on…

- profound understanding of the domain and required functionality
- generalized business entities / resources, i.e. avoidance of use case specific APIs
- clear separation of WHAT vs. HOW concerns, i.e. abstraction from implementation aspects — APIs should be stable even if we replace complete service implementation including its underlying technology stack

Moreover, API definitions with standardized specification format also facilitate…

- single source of truth for the API specification; it is a crucial part of a contract between service provider and client users
- infrastructure tooling for API discovery, API GUIs, API documents, automated quality checks

Elements of Contract First are also the API Guidelines and a standardized API review process as to get early review feedback from peers and client developers. Peer review is important for us to get high quality APIs, to enable architectural and design alignment and to supported development of client applications decoupled from service provider engineering life cycle.

It is important to learn, that Contract First is **not in conflict with the agile development principles** that we love. Service applications should evolve incrementally — and so its APIs. Of course, our API specification will and should evolve iteratively in different cycles; however, each starting with draft status and *early* team and peer review feedback. API may change and profit from implementation concerns and automated testing feedback. API evolution during development life cycle may include breaking changes for not yet productive features and as long as we have aligned the changes with the clients. Hence, Contract First does *not* mean that you must have 100% domain and requirement understanding and can never produce code before you have defined the complete API and get it confirmed by peer review. On the other hand, Contract First obviously is in conflict with the bad practice of publishing API definition and asking for peer review after the service integration or even the service productive operation has started. It is crucial to request and get early feedback — as early as possible, but not before the API changes are comprehensive with focus to the next evolution step and have a certain quality (including API Guideline compliance), already confirmed via team internal reviews.