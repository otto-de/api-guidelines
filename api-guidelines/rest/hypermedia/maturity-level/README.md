# Maturity level

[Richardson Maturity Model](https://martinfowler.com/articles/richardsonMaturityModel.html) is a well-received way to categorize APIs according to REST architectural constraints.

The last level of this model requires a constraint called HATEOAS (Hypermedia As The Engine Of Application State). This allows API providers to fully control consumer behavior with their responses, so in extreme cases they could even be implemented completely generically. While not practical most of the time, aspects of this last stage can be used to make consumers more independent of business changes to an API.

Hypermedia is based on the linking of resources that allows consumers to interact with the server with little to no prior knowledge. The links used for this purpose allow navigation without side effects between resources, as well as operations with side effects on resources that are interpreted differently depending on the domain.

[<!--RULES-->Rules](./rules)
