---
id: R000029
---

# MUST prepare consumers to accept compatible API extensions

API consumers should apply the robustness principle:

- Be conservative with API inputs and avoid exploiting definition deficits. For example, do not pass megabytes of content for an input string that has no defined maximum length.
- Be tolerant of processing and reading data from API output.

More specifically, API consumers must be prepared for compatible API extensions of API providers:

- Be tolerant with unknown fields in the payload (see also Martin Fowler’s post about ["TolerantReader"](http://martinfowler.com/bliki/TolerantReader.html)).
- Be prepared that `x-extensible-enum` output types may deliver new values; either be agnostic or provide default behavior for unknown values (see [SHOULD use extensible enums](./should-use-extensible-enums.md)).
