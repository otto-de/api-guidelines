# API scope

APIs can be assigned attributes to define certain non-functional requirements.
Here's what this exactly means in the context of the OTTO API.

Basically APIs can be described with the following attributes:

| Attribute | Description                                                                                                     |
| --------- | --------------------------------------------------------------------------------------------------------------- |
| public    | No network access restrictions, world-wide reachable.                                                           |
| private   | Network access restrictions, e.g. firewall or egress SecurityGroups required.                                   |
| open      | No authorization/authentication required, anonymous access.                                                     |
| closed    | Authorization/authentication required, different scopes for fine-grained permissions.                           |
| published | Service Level Agreements apply, such as established versioning, changelog, and documentation processes.         |
| internal  | Less strict Service Level Agreements, such as no established versioning, changelog, or documentation processes. |

The scope of the OTTO API ranges between a public and a private API.
The operational and organisational requirements such as guidelines, governance, documentation, and stability are similar to those of a public API.
The scope, level of detail, and content of the endpoints are not intended for public or anonymous use.
Access to data and company assets is only granted to selected and predictable API consumers.
This approach enables a targeted and managed development of API clients and products.

Bottom line: the OTTO API corresponds to the attributes **public**, **closed**, and **published**.
