---
navTitle: OTTO API Guidelines
---

# OTTO API Guidelines

::: warning Work in progress!
This version is intended as a sneak preview. Contents and structure are likely to change.
:::

The OTTO API Guidelines define standards and guidelines for building REST APIs at OTTO's MA-EC department.

MA-EC consists of various microservice teams that aim to provide functionality for OTTO clients via RESTful APIs.
Our APIs are a valuable part of our business assets, as with APIs we generate the corresponding operating values.
Ideally, by applying the API guidelines, all APIs look as if they were created by a single team, thus providing API consumers with a homogeneous, easy-to-use product.
This facilitates a great developer experience and the ability to quickly compose complex business processes.

With this in mind, we trust that our teams build APIs that are:

- RESTful
- self-explanatory
- easy to use
- of high quality
- transparently versioned

## How to read the guidelines

This guide is a living document and will be revised over time as new rules are added or existing rules are modified.

The guidelines are structured into individual rules that use the key words "MUST", "MUST NOT", "SHOULD", "SHOULD NOT", and "MAY".
These keywords are to be interpreted as described in [RFC2119](https://www.ietf.org/rfc/rfc2119.txt).
In this document, such keywords are highlighted at the beginning of each section in uppercase letters and are color-coded.

::: info Disclaimer
Code examples may be incomplete and/or may violate the rules described in the guidelines. Examples are intentionally kept simple to make them more accessible and easier to comprehend. They are always correct in their context, but not necessarily outside of it.

Common examples for this are:

- omitted headers such as `Authorization`
- omitted (mandatory) properties in JSON responses
  :::

## Reference

At this point we would like to send Kudos to Zalando whose Tech Team did a great job crafting the [Zalando RESTful API Guidelines](https://opensource.zalando.com/restful-api-guidelines/#).
As much of the content resonates with what we do at OTTO's MA-EC, this well-prepared document inspired us when crafting the OTTO API Guidelines, and we adapted it to our needs.
