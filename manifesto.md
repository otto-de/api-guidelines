# OTTO API Manifesto

## Our API is a product.

In general, it still requires clarification as to who has product responsibility/governance.
For the time being, we consider the API as a joint product of EC in combination with the "Service Custodian" model.

## Our API is RESTful.

At the moment there is no clear definition how we define RESTful for the OTTO API.
A work group will deal with this issue.

[REST architectural constraints](https://restfulapi.net/rest-architectural-constraints/)

## Our API is self-explanatory.

We provide a self-explanatory API, that means the API is intuitive, predictable, explorable, discoverable, and well-documented.

Specifically, this means:

* Predictable URIs
* Self-explanatory parameters
* Easy-to-understand data objects
* The API is consistent with all other APIs within EC
* Explorable by API consumers without reading the documentation
* Discoverable by machines
* Documented in an easily digestible, fun, and exciting way

## Our API is easy to use.

* Has a clear starting point
* Provides only what we want the API client to call, instantiate, or extend. Avoids irrelevant clutter.
* Clear and unambigous naming conventions
* Validates input and throws clear exceptions that tell the client exactly what it did wrong.
* Limits the dependencies to what is strictly necessary

## We meet the quality standards of a public API.

See [quality standard](decisions/quality-standard.md).

## The responses of our API are consistently structured.

Across all APIs within EC the responses provide

* the same format
* a consistent error handling
* consistently attribute names
* tbc

## Our API is transparently versioned.

See [versioning](decisions/versioning.md).
