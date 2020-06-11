# HTTP `ETag` Caching

- https://github.com/otto-ec/ottoapi_guidelines/issues/57
- https://api.develop.otto.de/api-docs/guidelines/#R000010
- https://api.develop.otto.de/api-docs/guidelines/#R000021

We opted to split caching via `ETag` header into two different rules. It is straightforward to implement this for single entities, but non-trivial for collection resources. That's why we decided to formulate to seperate rules, indicating that single entities _SHOULD_ be using `ETags`, but collections _MAY_ use them. The rule for collections also describes that the implementation for `ETags` on collections needs to be decided on a case-by-case basis. Neither RFC 7232 nor other sources make a statement on how to exactly handle ETags on collection resources.
