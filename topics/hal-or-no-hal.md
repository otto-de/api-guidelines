# Whether or not to use HAL+JSON

## current status

- in theory JSON+HAL is one standard that APIs should adhere to
- in practice a lot of APIs do not

## drawbacks

- the standard is no longer actively maintained and expired in November 2016
    - very few companies use HAL+JSON, it is somewhat obscure
    - because of that there is virtually no library/tooling eco system

- the standard is quite minimalistic, leaves out a lot that we might want to define, such as
    - pagination
    - versioning
    - filtering / sorting

## advantages

- a bunch of APIs at otto already implement HAL+JSON, changing that will be some effort
- we want some features of HAL+JSON
 - ability to link between entities / endpoints

## proposal for adapting JSON:API

- we adapt [JSON:API](https://jsonapi.org/format/#fetching-pagination) for the basis of our new API standard
    - this should give us capabilities similar to JSON+HAL like hyperlinking
    - the standard is being actively maintained, new versions are backwards compatible
- our own standard is seen as an addendum to JSON:API
- where we want to be stricter / more specific than the standard we can limit options that JSON:HAL gives
  - this could mean changing SHOULD requirements to MUST requirements
  - these stricter requirements can evolve & change over time to give teams time to adapt
  - or limiting the number of options JSON:API to fewer to have a more consistent API experience
- where JSON:API is lacking / makes no recommendations we try to define additions that will, most likely, not collide with future development of JSON:API
  - i.e. with versioning we choose another mechanism than using the Content-Type header, since that will [probably be used by JSON-API](https://jsonapi.org/format/#content-negotiation-servers)
- only where _absolutely_ necessary we deviate from JSON:API in such way that would contradict it

## Related links
- [JSON:API - Why not use the hal specification](https://jsonapi.org/faq/#why-not-use-the-hal-specification)
- [Choosing a hypermedia format](https://sookocheff.com/post/api/on-choosing-a-hypermedia-format/)

### Quote from _Choosing a hypermedia format_ blog post

##### Conclusions

I’ve create a [Gist](https://gist.github.com/soofaloofa/bc3f82793baa79dd897a7d2588841a07) comparing each of the media types discussed in this post.

After going through this exercise I’ve come to a few conclusions.

##### JSON-LD

JSON-LD is great for augmenting existing APIs without introducing breaking changes. This augmentation mostly serves as a way to self document your API. If you are looking to add operations to a JSON-LD response look to HYDRA. HYDRA adds a vocabulary for communicating using the JSON-LD specification. This is an interesting choice as it decouples the API serialization format from the communication format.

##### HAL

The light weight syntax and semantics of HAL is appealing in a lot of contexts. HAL is a minimal representation that offers most of the benefits of using a hypermedia type without adding too much complexity to the implementation. One area where HAL falters is, like JSON-LD, the lack of support for specifying actions.

##### Collection+JSON

Don’t be fooled by the name. Collection+JSON can be used to represent single items as well and it does this quite well. Of course it shines when representing data collections. Particularly appealing is the ability to list queries that your collection supports and templates that clients can use to alter your collection. For publishing user editable data Collection+JSON shines.

##### SIREN

SIREN attempts to represent generic classes of items and overcome the main drawback of HAL – support for actions. It does this admirably well and also introduces the concept of classes to your model bringing a sense of type information to your API responses.

##### JSON:API

JSON:API provides a robust set of features for most APIs. In addition, it has arguably the broadest industry support. This is important because writing APIs directly against a standard can be difficult and being able to leverage tooling to help you is one of the best ways to ensure adoption of a standard across an entire organization.
