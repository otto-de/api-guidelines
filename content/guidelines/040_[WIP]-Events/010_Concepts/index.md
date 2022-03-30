# Concepts

This section explains various event-related concepts in detail. These concepts constitute the foundation of the event guideline.

## Events

In the context of this guideline, an event is a message containing a fact of something that has happened.

In contrast to a command, an event carries **no intention** and has **no recipient**.

### Domain Events

The term domain event describes an occurrence of something that happened in the business domain. The concept originates in Domain-Driven Design [^1]. The event's name usually already carries a lot of semantic meaning and is used within the domain language to describe the domain's processes.

Domain events often do not contain the complete state of the source entity but only the relevant information in the event context. The event may contain no additional data besides the event name itself.

Consumers usually listen to domain events to execute automated business domain logic. For example, whenever a new user is registered, send a confirmation email. Domain events are central to a [saga](https://microservices.io/patterns/data/saga.html).

Not every domain event is part of the API. Most domain events are only relevant within their domain to drive the internal business logic or for implementing [CQRS](https://microservices.io/patterns/data/cqrs.html). The rules stated in this guideline only need to be applied to domain events that are part of the API.

Example Domain Events:

- PaymentReceived
- UserRegistered
- OrderPlaced
- OrderShipped

[^1]: Vaughn Vernon (2013): Implementing Domain-Driven Design, 2nd printing, Chapter 8: Domain Events

### Data Events

Data events describe the state of an entity at a specific moment in time.
They may be produced at a certain rate or if the state changes.
Every data event at least contains the whole state of the entity but may also include the old state to allow consumers to detect changes.

Data events do not contain the _reason_ for the change. A data event may also result from multiple individual independent changes to the state of an entity. Trying to determine the reason for a change from a data event should be avoided, as internal domain knowledge is needed to interpret the event correctly.
For example, the information that a customer has moved places cannot be reasoned from an address data event. The customer might have updated his address to correct a simple typing error.

Consumers usually use data events for data synchronization.

Example of data events:

- `User` event contains the state of the user entity
- `UserChanged` event contains the following properties
  - operation (always required): INSERT, UPDATE or DELETE.
  - before (optional for UPDATE and DELETE, always missing/null for INSERT): State of the entity before the operation.
  - after (always missing/null for DELETE, required for INSERT and UPDATE): State of the entity after the operation.
