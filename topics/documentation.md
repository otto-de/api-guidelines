## Requirements

### EDITORIAL

#### Getting started

Challenge:
Basic information on how to use the API is made availabe at different spots throughout the documentation, or not available at all.
It might also be required, that the API is quickly discoverable for non-technical people. 

Approach:
Basic information is available at one place, such as info about HTTP verbs, API operations, Request/Response headers, Versioning, Pagination, or errors.

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

Example: https://developer.epages.com/apps/

#### TechWriter accessible

TechWriters are allowed to create PRs on doc-related content on the team repos.

Easy option for TechWriting to provide editorial content via Pull Requests (reviewable by developers).

API reference docs are located outside of the code (key/value) and can be easily accessed and updated by TechWriting.

> more info on a technical level required from Jens.

#### Working environment and review process

Content for API reference as well as editorial content is created in the development environment.

Review process is done in the development environment.

#### Default values in example requests/responses

The request and response examples that belong to every endpoint documentation have meaningful default values that follow a specific story.
These values are created/reviewed with the help of TechWriting.

> more info on a technical level required from Jens.

For using example email addresses, phone numbers, and such refer to https://developers.google.com/style/examples

#### EN-US

Documentation is provided in American English.
Also endpoints, properties, and default values are provided in American English.

### TECHNICAL

#### Automated API reference documentation

The API reference documentation is created and published automatically. 

#### Automated changelog

A changelog/revision history is available in order for the API consumers to be up to date with the latest API changes.
This changelog is created automatically (but can be cosmetically changed by TechWriting).

#### TechWriter accessible

API reference docs are located outside of the code (key/value) and can be easily accessed and updated by TechWriting.

#### Postman collection

A JSON file is generated to provide the API consumers with a preconfigured collection in Postman that holds the all public API resources.

### STRUCTURE

#### Searchbar

The documentation provides a search.

#### Collapsible sidebar

The documentation can be easily browsed and the endpoints can be accessed via the sidebar.

#### Code examples

Every endpoint comes with an example request and response

#### Request & Response property tables

Incl. "Constraints" column

### CONCEPTUAL

#### Familiarization with the API

Intuitive familiarization vs conceptual information
Which specific problem should be tackled with the API?
Structure should be designed accordingly.

### NICE TO HAVE

Visual separation between code examples and explanatory text.

Example: https://developer.paypal.com/docs/api/payments/v2/#authorizations_capture
