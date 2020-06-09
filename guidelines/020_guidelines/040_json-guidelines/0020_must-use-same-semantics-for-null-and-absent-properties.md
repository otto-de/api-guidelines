---
type: MUST
id: R004020
todo: mention Open API cases or do we cover that somewhere else? See https://opensource.zalando.com/restful-api-guidelines/#123
---

# use same semantics for null and absent properties

While JSON does allow null values in the scope of this API nullable properties that are *explicitly* null, and those that
are absent should be considered semantically equivalent.

So this object:

````json
{
    "name": "Peter",
    "age": null
}
````

should encode considered semantically equivalent to this object

````json
{
    "name": "Peter"
}
````

Meaning the object having no age property should encode a different state than the object having a null age property.
