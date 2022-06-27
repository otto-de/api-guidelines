---
type: MUST
id: R200009
---

# follow naming scheme for `type` context attribute

The [`type` context attribute](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/spec.md#type) can be leveraged in order to accomplish the following:

- Allow hierarchical filtering of events.
- Using the type as a primary means by which consumer identify an event type.
- Guaranteeing consumers a stable event type that will never change in an incompatible way.

The `type` is made of segments, each separated by a dot `"."`. Each segment must be written in kebab-case, and only contain lower case english letters, numbers and the dash character `"-"`.

### General

| Placeholder       | Description                                                                                                                         |
| :---------------- | :---------------------------------------------------------------------------------------------------------------------------------- |
| context           | The name of the business context, e.g., Sales, Orders.                                                                              |
| event-source-type | The name of the event source type, e.g., Payment, Wishlist                                                                          |
| event-name        | The event name.                                                                                                                     |
| version           | The version of the event with a "v" prefix, starting with v1 . Also see [](@guidelines/R200014) for more information on versioning. |

### Domain Events

Naming scheme for domain events:

```text
de.otto.events.{context}.{event-source-type}.{event-name}.{version}
```

Example of a domain event:

```text
de.otto.events.checkout.payment.payment-received.v1
```

### Data events

Naming scheme for data events:

```text
de.otto.data.{context}.{hierarchical-type}.{version}
```

The hierarchical-type contains at least one segment describing the data. It may contain multiply segments. The top level hierarchical-type segment is often the event-source-type. Each additional segment describes the data type even further.

Examples of data events:

```text
de.otto.data.checkout.payment.v1
de.otto.data.checkout.payment.payment-created.v1
de.otto.data.checkout.payment.payment-method.count-per-day.v1
```

::: references

- [](@guidelines/R200014)
- [](@guidelines/R200015)
- [The role of the `type` attribute within versioning](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/primer.md#the-role-of-the-type-attribute-within-versioning)

  :::
