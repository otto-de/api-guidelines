---
type: MUST
id: R200006
---

# follow kafka topic naming convention

Kafka topic names must adhere to this naming convention in order to reason about the content of a topic from its name.

The topic name has multiple segments separated by a ".". Each segment must be written in kebab-case.

### Domain events

Topics containing **all** domain events from an event-source must be named:

```text
de.otto.events.{context}.{event-source-type}
```

`Example`{ label } de.otto.events.checkout.payment

Topics containing only a certain event type from an event-source must be named:

```text
de.otto.events.{context}.{event-source-type}.{event-name}
```

`Example`{ label } de.otto.events.checkout.payment.payment-received

### Data change events

Topics containing data change events must be named analogue to the contained [data event types](@guidelines/R200009).
If the data topic contains data events of different types all containing the complete state of one particular entity type, the topic must be named after the entity type. The topic name should be in plural form.

`Example`{ label} event type de.otto.data.checkout.payment.v1 can be found in de.otto.data.checkout.payments.v1,<br /> event type de.otto.data.products.variation.price.v1 can be found in de.otto.data.products.variations.prices.v1

::: info
This rule only applies to API topics. Topics which are not part of the API must adhere to the [naming conventions for internal topics](https://confluence.otto.de/pages/viewpage.action?spaceKey=KAFKA&title=08.1.2+Topic+Naming+Conventions).
:::

::: references

- [MUST name events in past tense](@guidelines/r200004)
- [OTTO CoE Confluent Cloud - Topic Naming Conventions](https://confluence.otto.de/pages/viewpage.action?spaceKey=KAFKA&title=08.1.2+Topic+Naming+Conventions)
  :::
