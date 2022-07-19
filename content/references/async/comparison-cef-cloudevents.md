# Comparison of Common Event Format to CloudEvents

This article compares the [Common Event Format](https://github.com/otto-ec/deepsea_event_format/blob/main/common_event_format.md)(CEF) to [CloudEvents](https://cloudevents.io/).

Currently, most events are encoded using CEF. Therefore, this article focuses on the decision of adopting CloudEvents instead.

### Advantages of adopting CloudEvents

- Common industry standard. Part of the Cloud Native Computing Foundation (CNCF - <https://www.cncf.io/>).
- Provides [Bindings](https://github.com/cloudevents/spec/tree/main/cloudevents/bindings) for various transports (HTTP, Kafka, AMQP, MQTT, WebSockets, Nats)
- Provides [Adapters](https://github.com/cloudevents/spec/tree/main/cloudevents/adapters) converting other event formats into CloudEvents format
- Provides a [standardized format](https://github.com/cloudevents/spec/tree/main/cloudevents/formats) to encode events in JSON, Avro and Protobuf
- Provides a lot of SDKs helping to handle CloudEvents (Java, JavaScript, Go, Python, ...) with framework support (e.g. Spring, Jackson, JAX-RS, Vert.x)
- [Open for extensions](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/spec.md#extension-context-attributes) with some already [defined extensions](https://github.com/cloudevents/spec/tree/main/cloudevents/extensions) that are being adapted by other open source projects (example: OpenTelemetry describes the [semantics of tracing CloudEvents](https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/trace/semantic_conventions/cloudevents.md))
- Galapagos explicitly [recommends using CloudEvents](https://github.com/HermesGermany/galapagos/blob/main/kafka_guidelines.md#data-formats).
- Existing solutions already understand/emmit CloudEvents:
  - Google Cloud Eventarc
  - Azure Event Grid
  - IBM Cloud Code Engine
  - [OpenTelemetry](https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/trace/semantic_conventions/cloudevents.md)
  - [Debezium](https://debezium.io/documentation/reference/integrations/cloudevents.html)
  - Apache EventMesh
  - [many more ...](https://cloudevents.io/)

### Disadvantages

- OTTO teams have to understand the semantics of 2 event formats during the migration to CloudEvents.

## Comparison of attributes

| Common event attributes | matching CloudEvent context attribute                                                                                    | Automatic conversion from CEF to CloudEvents possible | Difference                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| eventId                 | [id](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/spec.md#id)                                             | yes                                                   | id does not need to be globally unique, only in combination with the type attribute                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| type and version        | [type](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/spec.md#type)                                         | yes                                                   | it is [recommended to solve versioning in CloudEvents](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/primer.md#versioning-of-cloudevents) using the type context attribute. Type should be a reverse DNS name.                                                                                                                                                                                                                                                                                                 |
| context and sequenceKey | part of [source](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/spec.md#source-1)                           | yes                                                   | source may contain more context information such as the event source. If a sequenceKey exists in CEF, it should be included in the `source` context attribute. See "sequenceNumber" for more information on how to convert the sequence attributes to CloudEvents.                                                                                                                                                                                                                                                           |
| eventTime               | [time](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/spec.md#time)                                         | yes                                                   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| traceId and spanId      | [traceparent](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/extensions/distributed-tracing.md#traceparent) | yes                                                   | trace_parent is defined in the [distributed tracing](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/extensions/distributed-tracing.md) extension. Follows the W3C trace context specification. The trace_parent context attribute contains the traceId as [trace-id segment](https://www.w3.org/TR/trace-context/#trace-id) and the spanId as [parent-id segment](https://www.w3.org/TR/trace-context/#parent-id).                                                                                              |
| sequenceNumber          | [sequence](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/extensions/sequence.md#sequence-1)                | yes                                                   | sequence just contains a string. The semantics of this string is either defined by an out-of-band communication or by an additional [sequencetype](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/extensions/sequence.md#sequencetype) context attribute. The predefined [Integer](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/extensions/sequence.md#integer) sequencetype defines the same semantics as `sequenceNumber` in CEF if the `source` context attribute contains the `sequenceKey`. |
| test                    | n/a                                                                                                                      | yes                                                   | not defined within the CloudEvents spec, may be added by Otto with a custom extension.                                                                                                                                                                                                                                                                                                                                                                                                                                       |


## Example of converting a DeepSea Common Event Format (CEF) to CloudEvent format

### CEF

```json
{
  "eventId": "11f51bab-36ff-45e4-80da-881dba4f3508",
  "type": "payment-processing.PAYMENT_PLEDGED",
  "version": "2",
  "context": "payment-processing",
  "eventTime": "2022-06-15T15:03:29.749+0000",
  "traceId": "5ad4298a-6e15-4128-ad80-d59dd724aa60",
  "spanId": "00f067aa0ba902b7",
  "test": {
    "scope": "Kraken",
    "type": "OrderGenerationTest"
  },
  "data": {
    "transactionId": "c82fea59-f4d5-4712-bbc3-06a4e9eb14a6",
    "paymentReference": {
      "transaction": {
        "partnerId": "1001964",
        "partnerPaymentPledged": "YES"
      },
      "paymentServiceProviderKey": "NotRatePAY"
    }
  }
}
```

### Cloud Event

Representation in structured content mode

```json
{
  "id": "11f51bab-36ff-45e4-80da-881dba4f3508",
  "type": "de.otto.payment.payment-processing.paymentpledged.v2",
  "source": "//internal.otto.market/payment/payment-processing",
  "time": "2022-06-15T15:03:29.749+0000",
  "specversion": "1.0",
  "traceparent": "00-5ad4298a6e154128ad80d59dd724aa60-00f067aa0ba902b7-00",
  "test": "OrderGenerationTest.Kraken",
  "data": {
    "transactionId": "c82fea59-f4d5-4712-bbc3-06a4e9eb14a6",
    "paymentReference": {
      "transaction": {
        "partnerId": "1001964",
        "partnerPaymentPledged": "YES"
      },
      "paymentServiceProviderKey": "NotRatePAY"
    }
  }
}
```

Representation binary content mode for HTTP protocol

```http request
GET /payment-events/123
Host: internal.otto.market
ce-specversion: 1.0
ce-id: 11f51bab-36ff-45e4-80da-881dba4f3508
ce-type: de.otto.payment.payment-processing.paymentpledged.v2
ce-ource: //internal.otto.market/payment/payment-processing
ce-time: 2022-06-15T15:03:29.749+0000
ce-traceparent: 00-5ad4298a6e154128ad80d59dd724aa60-00f067aa0ba902b7-00
ce-test: OrderGenerationTest.Kraken
Content-Type: application/json; charset=utf-8

{
    "transactionId": "c82fea59-f4d5-4712-bbc3-06a4e9eb14a6",
    "paymentReference": {
        "transaction": {
            "partnerId": "1001964",
            "partnerPaymentPledged": "YES"
        },
        "paymentServiceProviderKey": "NotRatePAY"
    }
}
```
