---
type: MUST
id: R100030
---

# use common sorting query parameter

If simple sorting of the results is possible, the `sort` query parameter must be used.

The parameter accepts a property and a direction prefix (e.g. `sort=+price`).
The direction `+` means the result will be sorted ascending, `-` descending accordingly.

The sort direction must always be provided.

The property name should correspond to the name used in the resource representation (e.g. `sort=+price.grossValue`).

Multiple sorting criteria [must be provided as a comma-separated list](./1085_must-not-use-the-same-query-parameter-multiple-times.md) (e.g. `sort=+price,-name`).

Services do not need to support all resource properties to be used for sorting.

If the use case cannot be expressed using this simple sorting parameter, you should introduce a separate query parameter or a separate endpoint that accepts a complex filter/query language as a JSON body instead of a query parameter.

`Note`{ label } Make sure that you add the `sort` parameter to the to HAL links if necessary.

See also [Conventional query parameters](./1120_must-stick-to-conventional-query-parameters.md).
