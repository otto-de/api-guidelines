# Comparison of Common Event Format to CloudEvents

This article compares the [Common Event Format (CEF)](https://github.com/otto-ec/deepsea_event_format/blob/main/common_event_format.md)  to [CloudEvents](https://cloudevents.io/).

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

| Common event attributes | matching CloudEvent context attribute                                                                                    | Automatic conversion from CEF to CloudEvents possible | Difference                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
|-------------------------|--------------------------------------------------------------------------------------------------------------------------| ----------------------------------------------------- |----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| eventId                 | [id](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/spec.md#id)                                             | yes                                                   | id does not need to be globally unique, only in combination with the type attribute                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| type and version        | [type](https://api.otto.de/portal/guidelines/r200009)                                                                    | yes                                                   | Type must follow name schema defined in our guideline [MUST follow naming scheme for type context attribute](https://api.otto.de/portal/guidelines/r200009). Version must be part of the type within OTTO.                                                                                                                                                                                                                                                                                                                 |
| context and sequenceKey | part of [source](https://api.otto.de/portal/guidelines/r200010)                                                          | yes                                                   | source may contain more context information such as the event source. If a sequenceKey exists in CEF, it should be included in the `source` context attribute. See "sequenceNumber" for more information on how to convert the sequence attributes to CloudEvents.                                                                                                                                                                                                                                                         |
| eventTime               | [time](https://api.otto.de/portal/guidelines/r200011)                                                                    | yes                                                   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| traceId and spanId      | [traceparent](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/extensions/distributed-tracing.md#traceparent) | yes                                                   | trace_parent is defined in the [distributed tracing](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/extensions/distributed-tracing.md) extension. Follows the W3C trace context specification. The trace_parent context attribute contains the traceId as [trace-id segment](https://www.w3.org/TR/trace-context/#trace-id) and the spanId as [parent-id segment](https://www.w3.org/TR/trace-context/#parent-id). TL;DR `traceparent`= `00-<traceId (without the "-")>-<spanId>-00`                    |
| sequenceNumber          | [sequence](https://api.otto.de/portal/guidelines/r200003)                                                                | yes                                                   | sequence just contains a string. The semantics of this string is either defined by an out-of-band communication or by an additional [sequencetype](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/extensions/sequence.md#sequencetype) context attribute. The predefined [Integer](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/extensions/sequence.md#integer) sequencetype defines the same semantics as `sequenceNumber` in CEF if the `source` context attribute contains the `sequenceKey`. |
| test                    | n/a                                                                                                                      | yes                                                   | not defined within the CloudEvents spec, may be added by Otto with a custom extension. The test block in CEF is mapped to a single value in CloudEvent format by concatenating `test.type` and `test.scope` using `.` as a separator. |
| `{"data": {...} }`      | `{ ... }`                                                                                                                | yes                                                   | The "`data`" node is obsolete with CloudEvents. The payload starts at the beginning.                                                                                                                                                                                                                                                                                                                                                                                                                                         |

## Example of converting a DeepSea Common Event Format to CloudEvent format

### DeepSea Common Event

```json
{
  "eventId": "11f51bab-36ff-45e4-80da-881dba4f3508",
  "type": "payment-processing.PAYMENT_PLEDGED",
  "version": "2",
  "context": "payment-processing",
  "eventTime": "2022-06-15T15:03:29.749+0000",
  "traceId": "5ad4298a-6e15-4128-ad80-d59dd724aa60",
  "spanId": "00f067aa0ba902b7",
  "sequenceKey": "4c3bd5ab-ade6-467b-abbc-1675e6f0abb6",
  "sequenceNumber": 25,
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

### Cloud Event in Kafka Binary Representation

Representation in [Kafka binary protocol](https://github.com/cloudevents/spec/blob/main/cloudevents/bindings/kafka-protocol-binding.md#32-binary-content-mode).

#### Kafka Headers

```text
ce_id: "11f51bab-36ff-45e4-80da-881dba4f3508"
ce_type: "de.otto.payment.payment-processing.paymentpledged.v2"
ce_source: "//internal.otto.market/payment/payment-processing/4c3bd5ab-ade6-467b-abbc-1675e6f0abb6"
ce_time: "2022-06-15T15:03:29.749+0000"
ce_specversion: "1.0"
ce_traceparent: "00-5ad4298a6e154128ad80d59dd724aa60-00f067aa0ba902b7-00"
ce_sequencetype: "Integer"
ce_sequence: "25"
ce_test: "OrderGenerationTest.Kraken"
content-type: "application/json;charset=utf-8"
```

#### Kafka Payload
```json
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

### Cloud Event in HTTP protocol

Representation binary content mode for [HTTP protocol](https://github.com/cloudevents/spec/blob/main/cloudevents/bindings/http-protocol-binding.md#31-binary-content-mode).

```http request
GET /payment-events/123
Host: internal.otto.market
ce-specversion: 1.0
ce-id: 11f51bab-36ff-45e4-80da-881dba4f3508
ce-type: de.otto.payment.payment-processing.paymentpledged.v2
ce-source: //internal.otto.market/payment/payment-processing/4c3bd5ab-ade6-467b-abbc-1675e6f0abb6
ce-time: 2022-06-15T15:03:29.749+0000
ce-traceparent: 00-5ad4298a6e154128ad80d59dd724aa60-00f067aa0ba902b7-00
ce_sequencetype: Integer
ce_sequence: 25
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

### Cloud Event in structured content mode

Representation in structured content mode

```json
{
  "id": "11f51bab-36ff-45e4-80da-881dba4f3508",
  "type": "de.otto.payment.payment-processing.paymentpledged.v2",
  "source": "//internal.otto.market/payment/payment-processing/4c3bd5ab-ade6-467b-abbc-1675e6f0abb6",
  "time": "2022-06-15T15:03:29.749+0000",
  "specversion": "1.0",
  "traceparent": "00-5ad4298a6e154128ad80d59dd724aa60-00f067aa0ba902b7-00",
  "sequencetype": "Integer",
  "sequence": "25",
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
