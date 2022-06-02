---
type: SHOULD
id: R200018
---

# not publish data from other business domains

Events published from one domain should not contain data from other business domains. This rule explicitly excludes data that has become part of the domain but originated in another domain.

Not including foreign data and its schema reduces transitive dependencies. Transitive schema dependencies may lead to a trickle-down effect of incompatible schema changes whenever a transitive dependencies' schema introduces incompatible changes.

If there is a need to link to other business domains, API providers can use the following means:

- An entity-Id pointing to an entity in the other business domain.
- Id and source of the CloudEvent from the other business domain.

### Example

Consider a price alarm service that consumes price information of products from the product domain. Every user can set a price alarm with a limit price on a specified product. If the product's price drops below the limit price of the alarm, the service should publish a `PriceAlarmMet` event. The service itself has some business rules that influence if it raises an alarm event to guarantee that only stable prices will lead to a `PriceAlarmMet` event.

Data that has become part of the price alarm domain and can be included in the `PriceAlarmMet` event:

- The price of the product that triggered the `PriceAlarmMet` event.
- The id of the product.

Example data that has not become part of the price alarm domain and should not be included in the `PriceAlarmMet` event:

- The product title.
- The product description.
