# Concepts

This section explains various event-related concepts in detail as used in the context of the event guidelines. These concepts constitute the foundation of the event guidelines.
The [glossary](/support/glossary/a-d) contains further information on the terms and concepts used here.

Currently, the guidelines for asynchronous APIs only focus on event APIs as those are hard to implement using REST-APIs.
Rules for command-based asynchronous APIs will be added later on.
Concentrating on event-based asynchronous APIS does not mean that developing asynchronous command APIs is discouraged, but only that no guidelines currently exist to design and develop such APIs.

## Protocol

A protocol is a procedure by which messages are exchanged between the application and the channel. Examples of a protocol: Kafka, SNS, SQS, HTTP, JMS, Websocket.

## Channel

A channel is an addressable component that can be used to transport messages from sender to receiver using a specific protocol. The concept of a channel usually has a protocol specific naming. For example a Topic in Kafka and a Queue in Simple Queue Service (SQS) are both channels.

## Message

A message is a specially formatted data structure sent and received over a specific channel. A message is a generic mechanism that supports multiple interaction patterns such as event, command, request or response.

## Command

A command is a message describing an intention for an action that should be executed by a specific recipient. The execution of the command can be rejected by the recipient.

Example of commands:

- PlaceOrder
- AddItem
- CancelOrder

## Events

An event is a message containing information about something factual that has happened in the past.

In contrast to a command, an event carries **no intention** and has **no recipient**.

Events can be further categorised in domain events and data events.

Examples of events:

- OrderPlaced
- ItemAdded
- OrderCancelled

## Domain events

The term domain event describes an occurrence of something that happened in the business domain. The concept originates in Domain-Driven Design (DDD). The event's name usually already carries a lot of semantic meaning and is used within the domain language to describe the domain's processes.

Domain events often do not contain the complete state of the source entity but only the relevant information in the event context. The event may contain no additional data besides the event name itself.

Consumers usually listen to domain events to execute automated business domain logic. For example, whenever a new user registers, send a confirmation email. Domain events are central to a [saga](https://microservices.io/patterns/data/saga.html), a design pattern to implement microservice integrations.

Not every domain event needs to be published as part of an API. Most domain events are only relevant within their domain to drive the internal business logic or for implementing the [Command Query Responsibility Segregation (CQRS)](https://microservices.io/patterns/data/cqrs.html) pattern. The rules stated in these guidelines only need to be applied to domain events that are part of an API.

Examples of domain events:

- PaymentReceived
- UserRegistered
- OrderPlaced
- OrderShipped

::: references

- [What are Domain Events?](https://web.archive.org/web/20221201162409/https://serialized.io/ddd/domain-event/)
  :::

## Data events

Data events describe the state of an entity at a specific moment in time.
They may be produced at a certain rate or if the state changes.
Every data event at least contains the whole state of the entity but may also include the old state to allow consumers to detect changes.

Data events do not contain the _reason_ for the change. A data event may also result from multiple individual independent changes to the state of an entity. Trying to determine the reason for a change from a data event should be avoided, as internal domain knowledge is needed to interpret the event correctly.
For example, the information that a customer has moved to a new location cannot be reasoned from an address data event. The customer might have updated the address data to correct a typing error.

Consumers usually use data events for data synchronization.

Example of data events:

- Event `User`, contains the state of the user entity.
- Event `UserChanged`, contains the following properties:
  - operation (always required): INSERT, UPDATE or DELETE.
  - before (optional for UPDATE and DELETE, always missing/null for INSERT): State of the entity before the operation.
  - after (always missing/null for DELETE, required for INSERT and UPDATE): State of the entity after the operation.

::: references

- [Hermes Galapagos - Apache Kafka Guidelines](https://github.com/HermesGermany/galapagos/blob/main/kafka_guidelines.md)
