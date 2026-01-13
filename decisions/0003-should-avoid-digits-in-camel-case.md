# [0003] Avoid digits in camel case

- Status: `accepted`
- Decided by: <christina.framke@otto.de>, <jens.fischer@otto.de>, <max.edenharter@otto.de>, API Community, AsyncAPI Community
- Date: 2025-08-26

## Context

Several rules in the OTTO API guidelines refer to using camel case for naming properties, parameters, and other identifiers in APIs.
The guidelines do not explicitly address the use of digits in camel case names, but our linter does not allow digits in camel case names.

## Options

### Option 1

Allow digits in camel case names, e.g. `item1`, `top100LoveSongs`, as there is no explicit rule against it.

Example:

```yaml
top100LoveSongs:
  type: array
  items:
    type: string
    description: The title of a love song.
  example:
    - "A Wonderful Song"
    - "Another Awesome Love Song"
    - ...
```

### Option 2

Do not allow digits in camel case names.

Example:

```yaml
popularLoveSongs:
  type: array
  description: Contains the 100 most popular love songs.
  items:
    type: string
    description: The title of a love song.
  minItems: 100
  maxItems: 100
  example:
    - "A Wonderful Song"
    - "Another Awesome Love Song"
    - ...
```

## Decision

Option 2 is chosen, as there is no known use case for digits in camel case names, and the OpenAPI specification provides features to describe ranges and array length if needed.
The linter rule is already in place and has been used in several APIs without issues.
This decision ensures more consistent naming conventions across all APIs and avoids potential compiling issues, if property names are starting with a digit, like in Java.

## Consequences

Existing guidelines referencing camel case names need to be updated to explicitly state that digits should be avoided.

[rule-R000022]: ../api-guidelines/rest/resources/naming-conventions/rules/must-use-camelcase-for-query-parameters.md
[rule-R004010]: ../api-guidelines/global/json/naming-conventions/rules/should-use-camel-case-for-property-names.md




