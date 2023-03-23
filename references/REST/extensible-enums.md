# Extensible enums

Enums (represented by `enum` keyword) are not extensible in OpenAPI 3.0. Regarding compatible changes the following rules apply to enums:

Incompatible changes:

- Adding a new enum value in responses
- Removing an enum value in requests

Compatible changes:

- Adding a new enum value in requests
- Removing an enum value in responses

These compatibility rules make it hard for services to add new values to an enum without introducing a new major version of the API.

The concept of extensible enums tries to mitigate this problem. New values can be added without breaking the existing contract, so a new major version of the API is not needed. The following rule regarding compatible changes applies to extensible enums:

Incompatible changes:

- Removing an enum value in requests

Compatible changes:

- Adding a new enum value in requests
- Adding a new enum value in responses
- Removing an enum value in responses

If a type is declared by the API as an extensible enum, clients need to handle new unknown values send by the service.

## Documentation

Unfortunately the concept of extensible enums is not part of the OpenAPI spec. Extensible enums can be documented in OpenAPI in various ways. In the following examples the types `SupportedColorByXX` are extensible enums in various representations. This section examines the possible representations.

### Adding an UNKNOWN enum value that should be considered as a fallback

An UNKNOWN enum value is added to each enum to mark it as an extensible enum. All unknown values send by the service need to be mapped to UNKNOWN by the client.

```yaml
SupportedColorByUnknownValue:
  type: string
  enum:
    - GREEN
    - YELLOW
    - RED
    - UNKNOWN
```

#### Code generation

An enum is generated that contains the 4 values. No code is generated that maps all unknown strings to the UNKNOWN value.

#### Result

Positive:

- enum values are linkable
- no custom extension needed

Negative:

- generated clients do not map all unknown values to UNKNOWN. This leads to automatically generated clients that will break when adding new values. To correctly implement this pattern, generated clients need to be changed manually.
- the semantic meaning of UNKNOWN needs to be documented.
- the enum is not clearly recognizable as an extensible enum. Clients need to know that UNKNOWN is a marker value.

### Document the extensible enum only within the description

```yaml
SupportedColorByDescription:
  type: string
  description: |
    Currently known values: 
     - "GREEN" - Signaling no problem
     - "YELLOW" - Signaling a minor problem
     - "RED" - Signaling a major problem

    Clients must be prepared to receive other colors. Clients may only send the colors listed here or colors returned by the service.
```

#### Code generation

The description is visible in the code. Programmers using the generated client are guided on how to interpret the string.

#### Result

Positive:

- possible known values are visible to the programmers at programming time
- generated client will not break if new enum values are added

Negative:

- the already known values can't be extracted by a tool
- the semantics of the type being an extensible enum is not clearly visible. This constraint must always be written in prose.
- programmers using the generated clients do not have programmatic access (i.e. as constants or enum values) to the known values

### As an open anyOf combined with enum

```yaml
SupportedColorAnyOf:
  anyOf:
    - description: Signaling no problem
      type: string
      enum: [GREEN]
    - description: Signaling a minor problem
      type: string
      enum: [YELLOW]
    - description: Signaling a major problem
      type: string
      enum: [RED]
    - description: Open for extension
      type: string
```

#### Code generation

For each enum in the `anyOf` node, a separate enum class is generated. However, the generated enum classes are not referenced. Thus, the client is not usable.

#### Result

Positive:

- it is possible to add a description to each possible value
- natively supported by OpenAPI 3.0

Negative:

- generated clients do not work (see <https://github.com/OpenAPITools/openapi-generator/issues/798>)
- rather talkative
- the semantics of the type being an extensible enum is not clearly visible. This constraint must always be written in prose.

### Using `x-extensible-enum`

The extension property `x-extensible-enum` is used to mark a type as an extensible enum. It contains an array of possible
values.

Zalando uses this extension attribute to document extensible enums: <https://opensource.zalando.com/restful-api-guidelines/#112>

Zalando's version of `x-extensible-enum`

```yaml
SupportedColorByXExtensibleEnum:
  type: string
  description: |
    Currently known values: 
      - "GREEN" - Signaling no problem
      - "YELLOW" - Signaling a minor problem
      - "RED" - Signaling a major problem
  x-extensible-enum:
    - GREEN
    - YELLOW
    - RED
```

As this is an extension property to open api, we may choose to use another representation of an extensible enum. The following representation allows us to add more properties, such as `description` and `deprecated`, to a particular enum value.

```yaml
SupportedColorByXExtensibleEnum:
  type: string
  description: Supported color code for problems
  x-extensible-enum:
    - value: "GREEN"
      description: "Signaling no problem"
    - value: "YELLOW"
      description: "Signaling a minor problem"
      preview: true
    - value: "RED"
      description: "Signaling a major problem"
      deprecated: true
```

#### Code generation

The extension property `x-extensible-enum` is ignored during code generation without any customization. It may be a reasonable effort to write a customization of a generator that handles extensible enums in order to easier consume our services.

#### Result

Positive:

- possible known values are visible to the client users at programming time
- generated client will not break if new enum values are added
- a customized generator can be created that correctly interprets `x-extensible-enum`
- the semantics of the type being an extensible enum is clearly stated

Negative:

- programmers using the generated clients do not have programmatic access (i.e. as constants or enum values) to the known values out of the box. Generator tooling must be extended to support `x-extensible-enum`.
- if no customized generator exists that handles x-extensible-enum, duplicated documentation of the possible enum values is needed, in order to make possible values available within the documentation at programming time

### As an anyOf combined with const (OpenAPI 3.1 only)

OpenAPI 3.1 introduces with the adoption of Json Schema 2020-12 the concept of `const`. OpenAPI 3.1 has been released on 2021-02-18 but tooling has not yet adopted the standard (as of 2022-02-01). Even if a tool adopts most of the OpenAPI 3.1 standard, it may still not support the syntax presented here due to bugs (see representation [As an open anyOf combined with enum](#as-an-open-anyof-combined-with-enum)).

```yaml
SupportedColorByAnyOfConst:
  type: string
  anyOf:
    - const: GREEN
      title: No problem
      description: Signaling no problem
    - const: YELLOW
      title: Minor problem
      description: Signaling a minor problem
    - const: RED
      title: major problem
      description: Signaling a major problem
    - {} //indicates that all other strings are also possible
```

#### Result

Positive:

- Expressing an extensible enum without custom extensions, thus possibly understood by many tools.
- Possibility to add description and title right next to each enum value. This makes it easier to keep enum value and
  description in sync.

Negative:

- Tooling does not support OpenAPI 3.1. The solution is currently not usable.

## Proposed solution for extensible enum

All facts considered, the solution to use [`x-extensible-enum`](#using-x-extensible-enum) to document an extensible enum seems to be the most promising at the moment. It conveys the semantic meaning and generated clients do not break if the enum is extended.

For APIs documented with OpenAPI 3.1 [anyOf combined with const](#as-an-anyof-combined-with-const-openapi-31-only) may be a good solution if tooling support is available.

## Related concepts in OpenAPI 3.0

The `oneOf` concept in OpenAPI 3.0 has the same compatibility rules as an enum. An `anyOf` can be used to express an open `oneOf`.

```yaml
Payment:
  oneOf:
    - $ref: "#/components/schemas/PaymentMethod"
    - $ref: "#/components/schemas/PaymentMethodDirectDebit"
  discriminator:
    propertyName: paymentMethod
    mapping:
      INVOICE: "#/components/schemas/PaymentMethod"
      PREPAYMENT: "#/components/schemas/PaymentMethod"
      CREDIT_CARD_ONLINE: "#/components/schemas/PaymentMethod"
      DIRECT_DEBIT: "#/components/schemas/PaymentMethodDirectDebit"
BasePaymentMethod:
  type: object
  required:
    - paymentMethod
  properties:
    paymentMethod:
      type: string
PaymentMethod:
  allOf:
    - $ref: "#/components/schemas/BasePaymentMethod"
    - type: object
      properties:
        paymentMethod:
          enum: [INVOICE, PREPAYMENT, CREDIT_CARD_ONLINE]
PaymentMethodDirectDebit:
  allOf:
    - $ref: "#/components/schemas/BasePaymentMethod"
    - type: object
      properties:
        paymentMethod:
          enum: [DIRECT_DEBIT]
```

can be converted to an `anyOf` **without** `discriminator`

```yaml
Payment:
  anyOf:
    - $ref: "#/components/schemas/PaymentMethod"
    - $ref: "#/components/schemas/PaymentMethodDirectDebit"
    - $ref: "#/components/schemas/BasePaymentMethod"
BasePaymentMethod:
  type: object
  required:
    - paymentMethod
  properties:
    paymentMethod:
      type: string
PaymentMethod:
  allOf:
    - $ref: "#/components/schemas/BasePaymentMethod"
    - type: object
      properties:
        paymentMethod:
          enum: [INVOICE, PREPAYMENT, CREDIT_CARD_ONLINE]
PaymentMethodDirectDebit:
  allOf:
    - $ref: "#/components/schemas/BasePaymentMethod"
    - type: object
      properties:
        paymentMethod:
          enum: [DIRECT_DEBIT]
```

The `discriminator` validation shortcut can't be used here because of its [definition](https://swagger.io/specification/#discriminator-object):

> In both the oneOf and anyOf use cases, all possible schemas MUST be listed explicitly.

This is not possible for unknown payment methods as the value of the `paymentMethod` property is not known.

Even without the `discriminator` json objects can be deserialized to the correct type, as possible values of `paymentMethod` are distinct. However, the missing `discriminator` can lead to a performance problem if the code for deserialization/validation is auto-generated from the OpenAPI 3.0 spec. It is recommended to write the code manually.
