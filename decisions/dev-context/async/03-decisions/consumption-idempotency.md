# Message consumption must be idempotent

Consumers MUST ensure, that either

- the transports is guaranteeing no redelivery of already consumed messages or
- the must be implemented an appropriate strategy to skip already processed messages

in order to guarantee:

1. correct projection state in cases of messages being event facts or
2. no duplicate side effects being triggered
