# API design

API design involves many aspects such as architectural styles, API governance, backend capabilities, performance, and such.
There are many constraints and compromises to be considered.
With our API design we want to create value for the customer and provide a good developer experience.

For our APIs, we've decided to apply the RESTful principle to all kind of application components.
REST resources are identified via URIs and can be manipulated via standardized CRUD operations using different representations, and hypermedia.
RESTful APIs come with less rigid client/server coupling and are more suitable for an ecosystem of (core) services providing a platform of APIs to build diverse business services.

In summary:

- We prefer REST-based APIs with JSON payloads.
- We prefer systems to be truly RESTful.

If you want to dive deeper into REST, here's some good literature:

- [Build APIs You Won’t Hate](https://www.amazon.de/Build-APIs-You-Wont-Hate/dp/0692232699)
- [Irresistable APIs: Designing web APIs that developers will love](https://www.amazon.de/Irresistible-APIs-Designing-that-developers/dp/1617292559)
- [Architectural Styles and the Design of Network-Based Software Architectures](https://www.ics.uci.edu/~fielding/pubs/dissertation/top.htm)
