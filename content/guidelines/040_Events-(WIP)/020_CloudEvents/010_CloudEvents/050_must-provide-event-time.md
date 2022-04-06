---
type: MUST
id: R200011
---

# provide event `time` in UTC

The [`time`](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/spec.md#time) context attribute must be provided in [date-time](https://datatracker.ietf.org/doc/html/rfc3339#section-5.6) format at UTC timezone. A common timezone and format make it easier to sort events only by interpreting the string representation.

If the `time` context attribute does not contain the timestamp of when the event happened, API providers must explicitly document this in the API specification.

`Example`{label} 1990-12-31T23:59:60Z

::: references

- [MUST use common date and time format](@guidelines/r100072).
  :::
