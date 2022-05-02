---
type: MUST
id: R200009
---

# follow naming scheme for `type` context attribute

The [`type` context attribute](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/spec.md#type) can be leveraged in order to accomplish the following:

- Allow hierarchical filtering of events.
- Using the type as a primary means by which consumer identify an event.
- Guaranteeing consumers a stable event type that will never change in an incompatible way.

The `type` is made of segments. Segments are separated by `"."`. Each segment must be written in kebab-case. Only lower case english letters, numbers and `"-"` are allowed.

### General

The `type` must be written in kebab-case. Segments are seperated by `"."`.

| Segment           | Description                                                                                                                                                                                                 |
| :---------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| context           | Name of Business Context ex: Sales, Orders etc.                                                                                                                                                             |
| event-source-type | Type name of the source of the entity. Example: Payment, Wishlist                                                                                                                                           |
| event-name        | The event name.                                                                                                                                                                                             |
| version           | version of the event with a "v" prefix, starting with v1 . Please refer to [MUST change `type` context attribute to indicate incompatible changes](@guidelines/R200014) for more information on versioning. |

### Domain Events

```text
de.otto.events.{context}.{event-source-type}.{event-name}.{version}
```

`Example`{ label } de.otto.events.checkout.payment.payment-received.v1

### Data change events

```text
de.otto.data.{context}.{hierarchical-type}.{version}
```

The hierarchical-type contains at least one segment describing the data. It may contain multiply segments. The top level hierarchical-type segment is often the event-source-type. Each additional segment describes the data type even further.

`Examples`{ label} de.otto.data.checkout.payment.v1, de.otto.data.checkout.payment.payment-created.v1, de.otto.data.checkout.payment.payment-method.count-per-day.v1

::: references

- [MUST change `type` context attribute to indicate incompatible changes](@guidelines/R200014)
- [MUST filter consumed events by `type`](@guidelines/R200015)
- [The role of the `type` attribute within versioning](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/primer.md#the-role-of-the-type-attribute-within-versioning)

  :::
