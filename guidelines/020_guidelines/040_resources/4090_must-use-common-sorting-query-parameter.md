---
type: MUST
id: R100030
---

# use common sorting query parameter

If simple sorting of the results is possible, the `sort` query parameter must be used.

The parameter accepts a property and optionally the direction to sort by (e.g. `?sort=price,desc`).

The property name should correspond to the name used in the resource representation (e.g. `price.grossValue`).

Multiple sorting criteria are supported by providing the `sort` query parameter multiple times (e.g. `?sort=price,desc&sort=name`)

Services do not need to support all resource properties to be used for sorting.

If the use case cannot be expressed using this simple sorting parameter, you should introduce a separate query parameter or a separate endpoint that accepts a complex filter/query language as a JSON body instead of a query parameter.

Syntax in BNF for the `sort` parameter:

```ebnf
<sort>              ::= <field> [ "," <direction> ]
<field>             ::= <field_name> [ "." <field_name> ]
<field_name>        ::= <dash_letter_digit> [ <field_name> ]
<direction>         ::= "ASC" | "DESC" (* case insensitive *)
<dash_letter_digit> ::= <dash> | <letter> | <digit>
<dash>              ::= "-" | "_"
<letter>            ::= "A" | ... | "Z" | "a" | ... | "z"
<digit>             ::= "0" | ... | "9"
```

`Note`{ label } Make sure that you add the `sort` parameter to the to HAL links if necessary.

See also [Conventional query parameters](./1120_must-stick-to-conventional-query-parameters.md).
