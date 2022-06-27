---
type: MUST
id: R200006
---

# follow kafka topic naming convention

Kafka topic names must adhere to this naming convention to conclude about the content of a topic by its name.

A topic name is made of segments, each separated by a dot ".". Each segment must be written in kebab-case, and only contain lower case English letters, numbers, and the dash character "-".

### Domain events

Topics containing **all** domain events from an event-source must follow the naming scheme:

```text
de.otto.events.{context}.{event-source-type}
```

Example:

```text
de.otto.events.checkout.payment
```

Topics containing only a certain event type from an event-source must follow the naming scheme:

```text
de.otto.events.{context}.{event-source-type}.{event-name}
```

Example:

```text
de.otto.events.checkout.payment.payment-received
```

### Data change events

Topics containing data change events must be named analogue to the contained [data event types](@guidelines/R200009).
If the data topic contains data events of different types all containing the complete state of one particular entity type, the topic must be named after the entity type. The topic name should be in plural form.

Examples:

```text
event type de.otto.data.checkout.payment.v1 can be found in de.otto.data.checkout.payments.v1
event type de.otto.data.products.variation.price.v1 can be found in de.otto.data.products.variations.prices.v1
```

::: info
This rule only applies to API topics. Topics which are not part of the API must adhere to the [naming conventions for internal topics](https://confluence.otto.de/pages/viewpage.action?spaceKey=KAFKA&title=08.1.2+Topic+Naming+Conventions).
:::

::: references

- [](@guidelines/r200004)
- [OTTO CoE Confluent Cloud - Topic Naming Conventions](https://confluence.otto.de/pages/viewpage.action?spaceKey=KAFKA&title=08.1.2+Topic+Naming+Conventions)
  :::
