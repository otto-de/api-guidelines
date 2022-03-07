# Concepts

This section explains various event related concepts in detail. These concepts constitute the foundation of the event guideline.

## Events

In the context of this guideline, an event is a message containing a fact of something that has happened.

In contrast to a command, an event carries **no intention** and has **no recipient**.

### Domain Events

The term domain events describes an occurrence of something that happened in the business domain. The concept originates in Domain Driven Design [^1]. The name of the event usually already carries a lot of semantic meaning and is used within the domain language to describe the domain's processes.

Example Domain Events:

- PaymentReceived
- UserRegistered
- OrderPlaced
- OrderShipped

[^1]: Vaughn Vernon (2013): Implementing Domain-Driven Design, 2nd printing, Chapter 8: Domain Events

### Data change events

In contrast to domain events, data change events describe the technical change of an entity. A data change event either describes the result of a create, update or delete operation. Every data change event contains at least the whole state of the entity after the operation has been performed. In case of an update or delete event, the state of the entity before the operation may also be present.

Example of a data change event:

`UserChanged` Event containing the following properties

- operation (always required): INSERT, UPDATE or DELETE.
- before (optional for UPDATE and DELETE, always missing/null for INSERT): State of the entity before the operation.
- after (always missing/null for DELETE, required for INSERT and UDPATE): State of the entity after the operation.

In certain domains, a data change event may be a domain event.
