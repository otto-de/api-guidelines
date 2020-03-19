# API specification data format

Many of the API requirements imply the need to repeatedly provide API descriptions and documentation, or even building and updating corresponding SDKs.

Furthermore, we have to automate as much as possible in order to be able to keep up with all the changes by minimizing manual efforts.

In order to achive this we need to use an appropriate specification format for our APIs.

## Machine-readable

A core requirement for the format is automation.
The machine-readable specifiaction data have to be parsed, processed, and validated, meaning the data must use a structured text/markup language so that we can process them.

Some examples of **NON-machine-readable** data: `text`, `markdown`, `image`.

Some examples of **machine readable** data: `json`, `xml`, `yaml`, `toml`, `csv`.
Even JIT-enabled script languages could be used, like `javascript`.

## Multilevel structure

Because of complexity and the pure amount of metadata needed to describe an API, the format needs to provide the possibility to simplify the arrangement of the data.
So different content can be: grouped (nesting), referenced (path), and reused (store/anchor).

Formats that **DON'T** support nesting: `csv`

Formats **DO** support nesting: `json', 'xml', 'yaml', 'toml`

## Mergeable

The way the OTTO API is published differs from the "normal" one service - one API style.
The OTTO API is composed of different endpoints where the endpoints are routed via a first-level
path. For example:

- api.otto.de/customer: Route: /customer > Customer Service
- api.otto.de/product/12345: Route /product > Product Service

and every service provides its own specification data.

We have to merge all the specs into one document which, at the end, describes the OTTO API.

## Schema

It is not really critical which transport format we are using, it is even easy to support all
structured text formats at once. But at the end of the day the data will land in the memory of the machine that processes it. 

This means the data must be composed and all different specs from different services MUST apply
the very same schema. Once chosen it must be applied to all spec files.

Having the right schema is critical point. The schema must cover all the requirements and provide enough possibilities to provide all the information we need in order to document, test, and provide the API to the clients.

There are several possibilities how this could be achieved: 

- we define custom schema
- we use a proprietary schema
- we use an opensource schema

## Tooling

Creating an API specification should be as easy as possible so the schema should fit into a good, rich ecosystem with tool support, so we do not need to build everything from sratch.

## Support

The schema format we use schould be well documented, and have broad community, so everybody can get support fast.
The onboarding process should be as short as possible.

## Extensibility

We have to apply OTTO specific processes to the specs, for example registering in the gateway, merging docs into a single document, etc. The schema must be extensible, so that we can define OTTO specific attributes in the spec files without violating the schema or breaking the ecosystem support.

## Well-known spec formats/schemas

- [OpenApi](https://www.openapis.org/)
- [RAML](https://raml.org/)
- [api blueprint](https://apiblueprint.org/)