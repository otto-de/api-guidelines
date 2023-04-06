---
id: R000037
---

# SHOULD use existing problem types

In addition to the [predefined types](https://www.rfc-editor.org/rfc/rfc7807#section-4.2) in RFC7807, we have defined
the problem type [https://api.otto.de/portal/problems/validation-failed](/guidelines/r000038).

We encourage API designers to reuse existing problem types instead of creating completely new or slightly modified ones.

If none of the existing error types match the semantics of the problem, [defining a new problem type](/guidelines/r000040) is a feasible option.
