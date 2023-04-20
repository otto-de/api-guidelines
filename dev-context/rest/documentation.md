# Documentation Requirements

<!-- SHOULD BE MOVED TO PORTAL? -->

## Clear structure

### Challenge

- User is overloaded with too much information and cannot find what they need
- Information is not easy to digest
- Basic information on how to use the API is made available at different spots throughout the documentation
- Information is hard to find or is not available at all

### Goal

- Simple and smooth structure that makes it easy to get started with the API
- Thoughtful introduction that allows users to gain a quick insight of what the API is about
- Access to the fundamentals (authentication, header types...) at the very beginning
- Clear starting point to work from basic features to the advanced resources in the API
- Enabling internal contributors to build and maintain a uniform image of the API

### Approach

_Userfriendly navigation_

- All relevant entry points that are required to properly use the API are located in the sidebar.
- The sidebar has a clear structure and is easy to navigate.
- The navigation/sidebar is visible at all times.
- The HTTP method is visually highlighted with a common color coding.
- A multi-column layout makes comprehension easier by showing endpoints and examples in context.

_Getting started/Quick start guide_

- Basic information is available at one place, such as info about HTTP methods, API operations, request/response headers, versioning, pagination, or errors.
- Short and simple guide that provides an overview of the most likely tasks to perform with the API
- Contact/support form

_Tutorials_

- Provide step-by-step walkthroughs covering specific functionality that can be implemented with the API

_Familiarize users with the API_

- Catering for experienced users that already have an idea of the endpoints to be used, and at the same time providing the respective structure and information for inexperienced users who need a thorough introduction and/or example use cases

_Discoverable and easy to digest_

- All information is easily discoverable (no deep nesting), easy to digest, and prepared in a way that the user can effectively work with it
- Consistency in the following areas: tone of voice, terminology, attribute names, API endpoint design, requests and responses, and counting.
- The layout supports accordingly, e.g. with syntax highlighting or multi-column layout.

💡 Best practice examples:

- [stripe](https://stripe.com/docs/api)
- [bigcommerce](https://developer.bigcommerce.com/api-docs)
- [paypal](https://developer.paypal.com/docs/api/payments/v2/#authorizations_capture)
- [epages](https://developer.epages.com/apps/)

## Code examples

### Challenge

- Requests and responses that appear in the API documentation show internal data, inconsistent values/data, or data that does not fit the business case.
- For API consumers it's unclear what to expect when using the API.

### Goal

- Provide additional information to support users to understand what a function does
- Provide code that users can copy and paste, then tweak to meet their requirements
- Feature story telling to show users the potential of the API

### Approach

_Default values_

- Request and response examples that belong to every endpoint documentation have meaningful default values that follow a specific story. These values might be created/reviewed with the help of TechWriting.

🤔 We need to find out who is responsible for the overall story line.

_Code examples and attribute tables_

- Every endpoint documentation comes with a (request and) response example and also provides a table listing the available attributes with explanatory text,incl. "Constraints".

_Automated API reference documentation_

- API reference documentation is created and published automatically.
- Install a defined interface between the team's process and the docs process via a defined interface

> 🤔 OpenAPI Spec YAML/JSON files could be an option. It is in the responsibility of the F-teams how such files are made available. An automated process can regularly convert changes to the specs of all teams into a homogeneous overall API documentation (to be clarified: push vs. pull principle for changed specs)

💡 Best practice examples:

- [epages](https://developer.epages.com/beyond-docs/#change_log)

## Consistency and accessability

### Challenge

- Editorial content might be available in German, while the API reference is documented in English.
- In many cases it's unclear if British or American English should be used. This leads to inconsistent and unclear documentation.
- API consumers require the best possible tooling in order to easily integrate with an API.
- API consumers want to quickly find a way to integrate and search for specific information. Instead of just using the sidebar, many consumers favor a search.
- Users are lost in the documentation environment because it's unclear where to find which information. When they click on an info they land in a different view or the view is suddenly hidden.

### Goal

- Uniform documentation
- No contradictions in the code
- Easy navigation
- Avoid nesting
- Well-categorized
- Available offline

### Approach

- Documentation is provided in American English (EN-US), as US spelling has become the standard in APIs. Also endpoints, properties, and default values are provided in American English.
- The documentation provides a search.
- The documentation can be easily browsed via the sidebar, the endpoints can be accessed via the sidebar, and the sidebar is available at all times.
- Visual separation between code examples and explanatory text.

> 🤔 Using OpenAPI spec to leverage from many OpenAPI post processing tools. Clients themselves can generate Postman collections or SDKs. Follow-up task: In order to implement several of the API documentation requirements, a uniform standard and a machine-readable description format are required.
> Since different formats are possible (e.g. ADOC, YAML, RAML, XML), it needs be defined what is desirable from an EC point of view and why.
> On this basis, the FTs can then be provided with tips and best practices.

> 🤔 Documentation resources are part of the tests and documentation is always up-to-date

💡 Best practice examples:

- [google](https://developers.google.com/gmail/api/v1/reference)
- [epages](https://developer.epages.com/beyond-docs/#change_log)

## Efficient and refined

### Challenge

- The editorial process of TechWriting should not affect the dev team's API (change) deployment capability.
- Dev teams should at all times be able to deploy features, even if TechWriting did not yet touch the docs.
- API consumers have no clue about the recent changes to the API/revision history. It might happen that they integrated and then suddenly something fails due to API changes that have not been communicated.
- TechWriting and dev team workflows are separated. API docs origin from different working environments and sources.

### Goal

- Well-documented API
- TechWriting is involved
- Up-to-date documentation
- Flawless
- Revision history

### Approach

- The dev teams provide a first rough documentation so that a feature can be published even without TechWriting being involved. For example, docs can be generated from the code. TechWriting creates PRs on doc-related content on the team repos. Easy option for TechWriting to provide editorial content via Pull Requests (reviewable by developers).

> 🤔 Can be handled via [`CODEOWNERS`](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/about-code-owners) or by using a [policy bot](https://github.com/palantir/policy-bot). API reference docs are located in the team repository and can be easily accessed and updated by TechWriting.

> 🤔 Providing a concrete solution should be tackled by the F-teams even if a cross-team process is desired on the long run. A possible solution for typical Gradle projects would be the maintenance of an `src/test/resources/api-docs.properties file`, which is used for the generation of API docs during the unit test run. Developers maintain unique keys with preliminary values, which are then automatically included in the generated documentation, for example, description of a specific endpoint or a response payload field. TechWriting places PRs on this file to rework the preliminary values.

- Changelog/revision history is available in order for the API consumers to be up to date with the latest API changes.

> 🤔 This process can be partially automated, e.g. by creating diffs of an OpenAPI spec during API docs generation, which are then transferred to a changelog. TechWriting can edit the changelog. Idea: Diffs generate PR on a changelog.md, TechWriting adds editorial content to PR and merges it.

- Content for API reference as well as editorial content is created in the development environment. Review process is done in the development environment.

💡 Best practice examples:

- [epages](https://developer.epages.com/beyond-docs/#change_log)
