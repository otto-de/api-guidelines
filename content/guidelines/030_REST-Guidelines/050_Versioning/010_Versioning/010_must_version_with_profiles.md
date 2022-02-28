---
type: MUST
id: R000065
---

# must use profiles for Public APIs

[Public APIs](./guidelines/010_core-principles/0030_api-scope.md) must be versioned with [profiles](./guidelines/020_guidelines/040_hypermedia/4000_profiles.md) and provide comprehensive profile documentation using custom `x-ottoapi` tags.

```yml
openapi: 3.0.3

x-ottoapi:
  profiles:
    "{{service.profiles}}/checkout/delivery-methods+v1":
      title: Delivery methods
      description: Contains the delivery address type allowed for a specific checkout.
      schema:
        $ref: ./schemas.yml#/components/schemas/DeliveryMethodOptions
      examples:
        v1:
          $ref: ./examples.yml#/components/examples/DeliveryMethodsResponseV1
    "{{service.profiles}}/checkout/delivery-methods+v2":
      <<: *delivery-methods-v1
      description: |
         Contains the delivery address type allowed for a specific checkout. Includes express delivery options.
      schema:
        $ref: ./schemas.yml#/components/schemas/DeliveryMethodOptionsV2
      examples:
        v2:
          $ref: ./examples.yml#/components/examples/DeliveryMethodsResponseV2

paths: [...]
```
