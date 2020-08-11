## Deprecation

As an API Provider with the intention to deprecate my API, I need to find out about which clients are consuming my API. To do this, I need to collect all the clients, that have the scope and therefore the ability to call my API. Afterwards the corresponding teams are informed via email that the API is deprecated and will be switched off. A switch-off date has to be discussed with the customers.

The planned API changes that have led to the deprecation must be recorded in the Open API Specification. At least the affected endpoints must be marked as deprecated in the specification. But the API-owner may also mark the specific fields as deprecated.

Imagine the following Open API Specification:

```json
{
   "openapi":"3.0.0",
   "info":{
      "version":"1.0.0",
      "title":"API Deprecation example"
   },
   "servers":[
      {
         "url":"http://deprecation.api.otto.de"
      }
   ],
   "paths":{
      "/products":{
         "get":{
            "description":"Returns all Products",
            "responses":{
               "200":{
                  "description":"Product Response",
                  "content":{
                     "application/json":{
                        "schema":{
                           "type":"array",
                           "items":{
                              "$ref":"#/components/schemas/Product"
                           }
                        }
                     }
                  }
               }
            }
         },
         "post":{
            "description":"Creates a new product in the store.",
            "requestBody":{
               "description":"Product to add to the store",
               "required":true,
               "content":{
                  "application/json":{
                     "schema":{
                        "$ref":"#/components/schemas/Product"
                     }
                  }
               }
            },
            "responses":{
               "200":{
                  "description":"Product response",
                  "content":{
                     "application/json":{
                        "schema":{
                           "$ref":"#/components/schemas/Product"
                        }
                     }
                  }
               }
            }
         }
      }
   },
   "components":{
      "schemas":{
         "Product":{
            "allOf":[
               {
                  "type":"object",
                  "required":[
                     "productId",
                     "productName"
                  ],
                  "properties":{
                     "productId":{
                        "type":"integer",
                        "format":"int32"
                     },
                     "productName":{
                        "type":"string"
                     }
                  }
               }
            ]
         }
      }
   }
}
```

This API contains products with an 32 Bit Integer. It appears that 32 Bit Integer aren't sufficient to represent all products of Otto. Therefore the 32-Bit Integer needs to be replaced by an 64-Bit Integer, which is a breaking change. The API owner now could either mark the whole endpoints as deprecated:

```json
{
   "paths":{
      "/products":{
         "get":{
            "deprecated":true
         }
      }
   }
}
```

or just the specific field inside of the components schema:

```json
{
   "components":{
      "schemas":{
         "Product":{
            "allOf":[
               {
                  "type":"object",
                  "required":[
                     "productId",
                     "productName"
                  ],
                  "properties":{
                     "productId":{
                        "type":"integer",
                        "format":"int32"
                     },
                     "productName":{
                        "type":"string"
                     }
                  }
               }
            ]
         }
      }
   }
}
```
 
The payload itself does not contain any further information. But the deprecated and sunset headers form a central element. Both contain a timestamp as value. While the Deprecation header shows when the API should be migrated, the Sunset header shows when the API is really no longer available. These allow the client to build a logic upon these headers so that they can monitor the API states themselves.

As soon as the API is in the deprecated state, it becomes necessary to keep an eye on the migration process through monitoring. On the one hand, there is the possibility of doing this centrally on the reverse proxy, which would have the advantage that there is a central solution, or each team has to implement a solution itself.

Likewise, there must be no new clients as soon as the API has been marked as deprecated. This can also be mapped through appropriate monitoring.

