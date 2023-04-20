---
id: R200012
---

# MUST use `binary` content mode if supported by chosen protocol

Depending on the protocol. CloudEvents can be encoded _on the wire_ in [two content modes](https://github.com/cloudevents/spec/blob/main/cloudevents/spec.md#message).

Event producers must use the `binary` content mode if the chosen protocol supports it.

In `structured` content mode, event data and context attributes are encoded together as a single JSON document using the [JSON Event Format for CloudEvents](https://github.com/cloudevents/spec/blob/main/cloudevents/formats/json-format.md).
Consumers need to parse the JSON Event Format to extract context attributes for operations solely based on context attributes (e.g., filtering on the `type` context attribute).

In `binary` content mode, protocol-specific means are used to encode the context attributes of the CloudEvent separately from the actual [event data](https://github.com/cloudevents/spec/blob/main/cloudevents/spec.md#event-data).
Consumers do not need to parse the payload to access context attributes. However, the `binary` content mode cannot be used on all protocols, since not every protocol offers the required means.

The separation of context attributes from the actual event data has the following advantages:

- Event consumers and intermediaries can access context attributes without parsing a JSON structure.
- Schemas describing the actual event structure do not need to include context attributes. Thus reducing duplications and easing maintenance of schemas.

The following protocols support the `binary` content mode:

- [Kafka](https://github.com/cloudevents/spec/blob/main/cloudevents/bindings/kafka-protocol-binding.md#32-binary-content-mode) - content attributes are encoded in kafka record headers
- [HTTP](https://github.com/cloudevents/spec/blob/main/cloudevents/bindings/http-protocol-binding.md#31-binary-content-mode) - content attributes are encoded in http headers
- [AMQP](https://github.com/cloudevents/spec/blob/main/cloudevents/bindings/amqp-protocol-binding.md#31-binary-content-mode) - content attributes are encoded in amqp application properties
- [MQTT](https://github.com/cloudevents/spec/blob/main/cloudevents/bindings/mqtt-protocol-binding.md#31-binary-content-mode) - content attributes are encoded in user properties

Protocols not supporting `binary` content mode:

The [Websockets](https://github.com/cloudevents/spec/blob/main/cloudevents/bindings/websockets-protocol-binding.md#13-content-modes) protocol, however, does not support the binary content mode.
