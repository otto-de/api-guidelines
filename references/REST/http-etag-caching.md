# HTTP `ETag` Caching

- <https://github.com/otto-ec/ottoapi_guidelines/issues/57>
- <https://api.otto.de/api-docs/guidelines/#R000010>
- <https://api.otto.de/api-docs/guidelines/#R000021>

~~We opted to split caching via `ETag` header into two different rules. It is straightforward to implement this for single entities, but non-trivial for collection resources. That's why we decided to formulate to seperate rules, indicating that single entities _SHOULD_ be using `ETags`, but collections _MAY_ use them. The rule for collections also describes that the implementation for `ETags` on collections needs to be decided on a case-by-case basis. Neither RFC 7232 nor other sources make a statement on how to exactly handle ETags on collection resources.~~

~~We downgraded the recommendation for using ETags for caching purposes from **SHOULD** to **MAY**. After further research it became clear, that implementing and using ETags is not as trivial as it sounds. Possible complications are outlined in the rule itself.~~
After more discussion we acknowledged the importance of concurrent updates by pushing ETag up again to **SHOULD**. Pitfalls and important implementation hints are documented for the brave :-)
