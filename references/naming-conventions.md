# Naming conventions

Reasons for arriving at our naming conventions for URIs and query-parameters:

## for URIs

- ideally we would have only used lowercase
- no underscores because we feared they would, depending on rendering, be hard to distinguish from underlining whitespace a link
- that left us with kebab-case

## for query parameters

- query parameters are meant to map to JSON-properties of the underlying documents
 - defining a translation rule would be error-prone
 - most teams use Java POJOs where the dominant style is camelCase property names

Both of which seem also to be the variants most teams have been using before defining this API standard.