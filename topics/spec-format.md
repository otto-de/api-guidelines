# Api Specification Data Format

many of the api requirements imply the need to recurrently repeat provision
of api descriptions and documentation or even building and updating of corresponding sdk's.

on the other hand we have to automate everything, what can be automated in order to be able
to keep up with all the changes, by minifying manual efforts.

In order to achive this we need to use an apropriate specification format for our apis.

## Machine Readable

A core requirement to the format is automation. For this the specifiaction data must be
read by machines, it have to be parsed, processed and validated. This means the data must use
a structured text/markup language, so we can process it.

Some examples of NOT machne readable data: `text, markdown, image`

Some examples of machine readable data: `json, xml, yaml, toml, csv`

Even JIT-Enabled script languages could be used, like `javascript`

## Multilevel Structure

Because of complexity and pure amount of metadata, which is needed to describe an api, format need
to provide the possibility to simplify the arrangement of the data. So different contents can be:
grouped (nesting), referenced (path) and reused (store/anchor)

Formats NOT supporting nesting: `csv`

Formats supporting nesting: `json, xml, yaml, toml`

## Mergeable

The way OTTO api is published is differrent to the "normal" one service-one api style.
The OTTO api is composed out of different endpoints where the endpoints are routed by a first-level
path. for example

- api.otto.de/customer: Route: /customer > Customer Service
- api.otto.de/product/12345: Route /product > Product Service

and every service provides its own specification data.

We have to merge all the specs into one document which, at the end, describes the OTTO api.

## Schema

It is not really critical which transport format we are using, it is even easy to support all
Structured text formats at once. But at the end of the day the data will land in the memory of the
machine which must process it. 

This means the data must be composed and all different specs from different services MUST apply
the very same schema. Once chosen it must be applied to all spec files.

Having right schema is critical point. The schema must cover all the requirements and provide enougth
possibilities to provide all the information we need in order to document, test, and provide the api
to the clients.

There are several possibilities how this could be achived: 

- we define custom schema
- we use a proprietary one
- we use an opesource one

## Tooling

Create api specification should be made as easy as possible so schema schould fit into a good
rich ecosystem with tool support, so we do not need build everything from sratch.

## Support

The schema format we use schould be well documented, and have broad community,
so everybody can get support fast.
And the onboarding process should be as short as possible.

## Extensibility

We have to apply OTTO specific processes to the specs, for example register in the gateway, merge
to a single document, etc. The schema must be extensible so we can define OTTO specific attributes
in the spec files without violating the schema or breaking the ecosystem support.

## Well known Spec Formats/Schemas

- [OpenApi](https://www.openapis.org/)
- [RAML](https://raml.org/)
- [api blueprint](https://apiblueprint.org/)

