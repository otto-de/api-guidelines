# OTTO API Guidelines

With these guidelines, we aim to establish a set of best practices and standards for designing, developing, documenting, and maintaining APIs.

Skip to:

- [Purpose](#purpose)
- [How to read the guidelines](#how-to-read-the-guidelines)
- [API linting](#api-linting)
  - [Installation](#installation)
  - [Recommended Redocly configuration](#recommended-redocly-configuration)
  - [Lint your specs](#lint-your-specs)
  - [Change severity](#change-severity)
- [Attribution](#attribution)

## Purpose

We consider API guidelines essential to ensure that our APIs are consistent, reliable, secure, and easy to use.

Our APIs are a valuable part of our business assets, as with APIs we generate the corresponding operating values.
Ideally, by applying the API guidelines, all APIs look as if they were created by a single team, thus providing API consumers with a homogeneous, easy-to-use product.
This facilitates a great developer experience and the ability to quickly compose complex business processes.
With this in mind, we trust that our teams build APIs that are:

- self-explanatory
- easy to use and robust
- of high quality
- consistent
- transparently versioned
- RESTful with respect to REST APIs.

## How to read the guidelines

These guidelines include rules for REST and asynchronous APIs and are supplemented by rules applicable to both types of APIs.
It is a living document and will be revised over time as new rules are added or existing rules are modified.

The guidelines are structured into individual rules that use the key words “MUST”, “MUST NOT”, “SHOULD”, “SHOULD NOT”, and “MAY”.
These keywords are to be interpreted as described in [RFC2119](https://www.ietf.org/rfc/rfc2119.txt).
In this document, such keywords are highlighted at the beginning of each section in uppercase letters and are color-coded.

> **_Disclaimer:_**  Code examples may be incomplete and/or may violate the rules described in the guidelines. Examples are intentionally kept simple to make them more accessible and easier to comprehend. They are always correct in their context, but not necessarily outside of it. Common examples for this are omitted headers such as Authorization or omitted (mandatory) properties in JSON responses.

## API linting

Our APIs can be validated using the [Redocly CLI toolbox](https://github.com/Redocly/redocly-cli).
By automating the verification of APIs againgst our guidelines, we enable our developers to get a much quicker view of where API design needs to be adjusted.
If you'd like to use it for your own APIs, this is what you need to do:

### Installation

1. [Install Redocly CLI](https://redocly.com/docs/cli/installation/).
2. Add the following code snippet to your existing `.npmrc` or create a `.npmrc`. Set a valid GITHUB_TOKEN. (Sadly this necessary even if packages are public, we hope publishing packages to https://www.npmjs.com later to avoid this step)

   ```text
   @otto-de:registry=https://npm.pkg.github.com/
   //npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
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

## Attribution

At this point we would like to send Kudos to Zalando SE whose Tech Team did a great job crafting the [Zalando RESTful API Guidelines](https://opensource.zalando.com/restful-api-guidelines/#).
As much of the content resonates with what we do at OTTO, their well-prepared document inspired us and in certain parts provided a basis when crafting the OTTO API Guidelines.

The Zalando RESTful API Guidelines are published under the [Creative Commons Attribution 4.0 International License](https://github.com/zalando/restful-api-guidelines/blob/main/LICENSE) (CC BY 4.0).
For further notes on these OTTO API Guidelines’ license under CC BY 4.0, please refer to the [Creative Commons Attribution 4.0 International Public License](https://creativecommons.org/licenses/by/4.0/legalcode).

