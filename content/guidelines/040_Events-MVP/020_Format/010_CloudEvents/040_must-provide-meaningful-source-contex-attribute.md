---
type: MUST
id: R200010
---

# provide meaningful `source` context attribute

Producers of events must provide a meaningful [`source` context attribute](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/spec.md#source-1) that consumers can use to uniquely identify the event source.

If the event results from an operation on an entity accessible using a URL, this resource's URL should be used as `source`. Providing the URL as a `source` makes it easier to interconnect the various provided APIs of an application.

The CloudEvents specification requires producers to ensure that the combination of their context attributes `id` and `source` is unique for each distinct event.

### `source` naming schema

The following schema should be used for the `source` attribute:

```text
({protocol-if-resolvable}:)//api.otto.de/{context}/{context-specific}
```

The protocol must not be part of the source if the event source can't be accessed using a URL. This convention clearly communicates to event consumers that the provided URI does not point to a valid API.

The `source` URI needs to follow the [naming conventions for URIs](../../../030_REST-Guidelines/030_Resources/030_Naming-conventions/index.md).

### Examples

A `source` for event sources that can be accessed using a URL:

```text
https://api.otto.de/products/variations/12345 #(the actual REST-URL)
```

A `source` for event sources that cannot be accessed using a URL because no REST API exists:

```text
//api.otto.de/products/variations/12345 #(non-resolvable URI)
```

::: references

- [](@guidelines/R200003)

:::
