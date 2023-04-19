# api-guidelines

This repository contains the source documentation of the OTTO API guidelines and acts as a `module` for the [OTTO API Portal](https://github.com/otto-ec/ottoapi_portal). The API guidelines aim for establishing a uniform API standard, which serves as a set of rules for the creation of new APIs.
The [API Manifesto](/manifesto.md) helps to establish this standard and comprises values that we have agreed upon in advance.

URL: <https://api.otto.de/portal/guidelines>

## Linter

### Installation

1. [Install Redocly CLI](https://redocly.com/docs/cli/installation/).
2. Add the following code snippet to your existing `.npmrc` or create a `.npmrc`.

   ```text
   @otto-de:registry=https://npm.pkg.github.com/
   ```

3. Install the dependency.

   ```shell
   npm install -D @otto-de/api-guidelines
   ```

4. Add the following code snippet to your redocly configuration:

   ```yaml
   extends:
     - api-guidelines/recommended

   plugins:
     - ./node_modules/@otto-de/api-guidelines/dist/plugin.cjs
   ```

### Recommended Redocly configuration

```yaml
extends:
  - recommended
  - api-guidelines/recommended

plugins:
  - ./node_modules/@otto-ec/ottoapi-guidelines/dist/plugin.cjs
```

### Lint your specs

```shell
redocly lint ./path/to/your/spec.yml
```

### Change severity

If you'd like to disable or change the severity of a specific rule,
you can add this to your Redocly configuration, for example, like this:

```yaml
rules:
  api-guidelines/always-return-json-object: off
  api-guidelines/define-permissions-with-scope: warn
```
