---

type: SHOULD
id: R000048

---

# scopes should adhere to the naming convention

Scopes should adhere to the naming convention starting with the vertical or service and ending with the scope type.

If sensible the scope can be limited to specific business entities.

$vertical.($entity.)$permissionType 

Do:

```text
opal.products.write
opal.brands.read
reco.read
```

Don't

```text
read
opal.write.products
products
```