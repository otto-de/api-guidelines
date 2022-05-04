---
type: MAY
id: R200003
---

# provide sequence context attribute

The CloudEvents` [Sequence extension](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/extensions/sequence.md) may be used to enable consumers to events in order.

The context attribute `sequence` should contain the relative order of the event within the event stream produced by one unique event source. The event source is defined by the `source` context attribute and may be producer specific.

The context attribute `sequencetype` further describes the semantics of the `sequence` context attribute and must be set to [`Integer`](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/extensions/sequence.md#integer). The `sequencetype` `Integer` starts at 1 and is increased by 1 for every subsequent value (i.e. be contiguous and monotonically increasing). Other `sequencetype` values are currently not supported.

Consumers may use the `sequence` attribute to process the events from one event source in the correct order, if order is important for the consumer. This is not possible without a `sequence` attribute, as order is not guaranteed by most distributed messaging systems.

If multiple producers publish events originating from the same event source, they will need to coordinate so that the semantics of the `sequencetype` are met.

::: references

- [](@guidelines/r200007)
- [](@guidelines/R200010)
  :::
