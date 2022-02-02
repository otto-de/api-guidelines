# What should an "event" represent?

1. Fact based? e.g. "5 points from bonus account 123 redeemed for xyz"
2. Change based? e.g. "bonus account 123 balance changed to 17 points"
3. Data based? e.g. "bonus account 123 updated: (complete data attached)"
4. Combinations of the before mentioned?
5. ...

## Implications?

Relevant for full import and message deduplication.

1. Fact based
   - Message depluplication is mandatory
