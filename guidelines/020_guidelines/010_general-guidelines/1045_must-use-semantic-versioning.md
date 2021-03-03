---
type: MUST
id: R000064
---

# use semantic versioning in OpenAPI specification files

In order to generate meaningful changelogs and version numbers, OpenAPI specification files need to follow [semantic versioning](https://semver.org).

```yaml
openapi: 3.0.3

# [...]
info:
  title: My Product API
  description: Provides basic product information.
  contact:
    name: FT X
    email: FTX-DEV@otto.de
  version: 1.0.0
```
