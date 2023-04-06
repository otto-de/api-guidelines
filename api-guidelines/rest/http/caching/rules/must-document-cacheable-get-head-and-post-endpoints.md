---
id: R006020
---

# MUST document cacheable `GET`, `HEAD` and `POST` endpoints

To clearly document that a `GET`, `HEAD` or `POST` endpoint implements any kind of caching, the support of caching headers (`Cache-Control`, `Vary`, `Etag`) must be declared in the response.

::: info Example OpenAPI Spec documentation fragment

```yaml
paths:
  "/products":
    get:
      operationId: products-read
      summary: This endpoint will return a collection of products.
      description: |
        Load a collection of products.
      responses:
        200:
          description: Successfully load products
          headers:
            Cache-Control:
              description: >
                Indicates if this response is cacheable.
                See [RFC 7234](https://tools.ietf.org/html/rfc7234#section-5.2.2) for possible values.
              schema:
                type: string
                content:
                  'application/json+hal;profile="https://api.otto.de/products/profiles/products+v1"':
                    schema:
                      "$ref": "#/components/schemas/LoadProductsV1Response"
```

:::

See:

- [MAY use `ETag` header for caching resources](/guidelines/r000010)
- [SHOULD use `ETag` together with `If-Match`/`If-None-Match` header for concurrency control](/guidelines/r000060)
