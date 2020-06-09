---

type: SHOULD
id: R000048

---

# new scopes should adhere to the naming convention

New scopes should adhere to the naming convention starting with the vertical or service and ending with the scope type.

TODO: do we still talk about verticals in the scope of API? if not, what else? service?

If sensible the scope can be limited to specific business entities.

$vertical.($entity.).$permissionType 

Do:

````
opal.products.write
opal.brands.read
reco.read
````

Don't

````
read
opal.write.products
products
````