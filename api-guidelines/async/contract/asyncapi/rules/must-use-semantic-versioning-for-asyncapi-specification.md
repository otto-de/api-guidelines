---
id: R200008
---

# MUST use semantic versioning for AsyncAPI specification

In order to generate meaningful changelogs and version numbers, AsyncAPI specification files need to follow [semantic versioning](https://semver.org).

In the context of an AsyncAPI specification, semantic versioning currently only needs to consider produced messages and not consumed messages.

The major version needs to be increased when:

- A [message](https://www.asyncapi.com/docs/specifications/v2.3.0#messageObject) is no longer produced on the same [channel](https://www.asyncapi.com/docs/specifications/v2.3.0#channelsObject) on which it has previously been produced.
- A channel on which messages are produced is renamed or removed.

The minor version needs to be increased when:

- A new version of a message is introduced while still producing the old version.
- A new message is produced.
- Compatible schema changes to an existing message have been made.

The patch version needs to be increased when:

- Metadata of the AsyncAPI specification have changed.
- The applications consumed messages have changed.
- Refactorings have been made that do not change produced messages.

::: references

- [AsyncAPI Info Object schema](https://www.asyncapi.com/docs/specifications/v2.3.0#infoObject)
- [Versioning is easy](https://eventstack.tech/posts/versioning-is-easy)
  :::
