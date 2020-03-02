## Requirements

### EDITORIAL

#### Getting started

Challenge:
Basic information on how to use the API is made availabe at different spots throughout the documentation, or is not available at all.
It might also be required, that the API is quickly discoverable for non-technical people. 

Approach:
Basic information is available at one place, such as info about HTTP verbs, API operations, request/response headers, versioning, pagination, or errors.

Example: https://developer.epages.com/apps/

#### User-friendly navigation

Challenge:
Information is only available with several clicks and steps, hidden behind other topics, and hard to find.
If users cannot quickly find what they are looking for, they lose valuable time, have to ask the API owner for support, or in the worst case stop using the API.

Approach:
All relevant entry points that are required to properly use the API are located in the sidebar.
The http verb is visually highlighted with the standard color coding.
The navigation is visible at all times.

Example: https://docs.ottoready.com/#tag/Touchpoint-API

#### Clear, structured, to the point

Challenge:
The user is overloaded with too much information, has too much text to read, and cannot find the relevant information.
Information is not easy to digest.

Approach:
All information is easily discoverable (no deep nesting), easy to digest, and prepared in a way that the consumer can effectively work with it.
This includes consistency in the following areas: tone of voice, terminology, attribute names, API endpoint design, requests and responses, and counting. 
The layout supports accordingly, e.g. with syntax highlighting or multi-column layout.

Examples: https://developer.paypal.com/docs/api/orders/v2/

#### TechWriter accessible

Challenge:
The editorial process of TechWriting should not affect the dev team's API (change) deployment capability.
Dev teams should at all times be able to deploy features, even if TechWriting did not yet touch the docs.

Approach:
The dev teams provide a first rough documentation so that a feature can be published even without TechWriting being involved.
For example, docs can be generated from the code.
TechWriting creates PRs on doc-related content on the team repos.
Easy option for TechWriting to provide editorial content via Pull Requests (reviewable by developers).
Can be handled via `CODEOWNERS` or by using a policy bot.
API reference docs are located in the team repository and can be easily accessed and updated by TechWriting.

> more info on a technical level required from Jens (.yml files).

#### Working environment and review process

Challenge:
TechWriting and dev team workflows are separated.
API docs origin from different working environments and sources.

Approach:
Content for API reference as well as editorial content is created in the development environment.
Review process is done in the development environment.

#### Default values in example requests/responses

Challenge:
Requests and responses that appear in the API documentation show internal data, inconsistent values/data, or data that does not fit the business case.

Approach:
The request and response examples that belong to every endpoint documentation have meaningful default values that follow a specific story.
These values might be created/reviewed with the help of TechWriting.

> more info on a technical implementation level required from Jens.

For using example email addresses, phone numbers, and such refer to https://developers.google.com/style/examples

#### EN-US

Challenge:
Editorial content might be made available in German, while the API is documented in English.
In many cases it's unclear if British or American English should be used.
This leads to inconsistent and unclear documentation.

Approach:
Documentation is provided in American English, as US spelling has become the standard in APIs. 
Also endpoints, properties, and default values are provided in American English.

### TECHNICAL

#### Automated API reference documentation

Challenge:
There shouldn't be a devitation between API implementation and API documentation.

Approach:
The API reference documentation is created and published automatically.

> more info on a technical implementation level required from Jens.

#### Automated changelog

Challenge:
API consumers have no clue about the recent changes to the API/revision history.
It might happen that they integrated and then suddenly something fails due to API changes that have not been communicated.

Approach:
A changelog/revision history is available in order for the API consumers to be up to date with the latest API changes.
This changelog is created automatically (but can be cosmetically changed by TechWriting).

Example: https://developer.bigcommerce.com/changelog

#### TechWriter accessible

See EDITORIAL

#### Postman collection/SDKs

Challenge:
API consumers require the best possible tooling in order to easily integrate with an API.

Approach:
Generation of Postman Collections or Client Language SDKs.

### STRUCTURE

#### Searchbar

Challenge:
API consumers want to quickly find a way to integrate and search for specific information.
Instead of just using the sidebar, many consumers favor a search. 

Approach:
The documentation provides a search.

Example: https://developer.bigcommerce.com/api-reference/

#### Sidebar

Challenge:
Users are lost in the documentation environment because it's unclear where to find which information.
When they click on an info they land in a different view or the view is suddenly hidden.

Approach:
The documentation can be easily browsed via the sidebar.
The endpoints can be accessed via the sidebar.
The sidebar is available at all times.

Example: https://developer.epages.com/beyond-docs/#change_log

#### Code examples & attribute tables

Challenge:
API consumers should get a clear understanding of what to expect when using the API.

Approach:
Every endpoint documentation comes with a (request and) response example and also provides a table listing the available attributes with explanatory text.
Incl. "Constraints" column.

### CONCEPTUAL

#### Familiarization with the API

Challenge: 
Which specific problem should be tackled with the API?
Intuitive familiarization vs conceptual information

Approach:
The documentation caters for experienced users that already have an idea of the endpoints to be used.
At the same time it provides the respective structure and information for inexperienced users who need a thourough introduction, and maybe even example use cases.

### NICE TO HAVE

Visual separation between code examples and explanatory text.

Example: https://developer.paypal.com/docs/api/payments/v2/#authorizations_capture