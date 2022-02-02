# How to support an initial "full import"?

## Requirement

New consumers must be able to create a completely new read-only projection out of consumed events, even though they might be created way after the some events have been already published.

Solutions depend on:

- the capabilities of the used transport
- the [definition](event-definition.md) of "event".

## Possible solutions?
