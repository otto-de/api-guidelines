# OTTO OpenAPI example

The openapi.yaml contains an OpenAPI example spec that has been created according to the [REST guidelines](https://api.otto.de/portal/guidelines).

It is based on a "How to write a specification" workshop that is outlined below.

## Workshop

### Scenario

You want to develop an app that collects and displays delicious recipes provided by OTTO colleagues.
To ensure that the recipes are only accessible by OTTO colleagues, you want to secure the app and make it accessible to registered and logged-in users only.
To make sure that you keep all important aspects in mind during development, you first write the spec for the required endpoints.
Thus, you now need to write the [guideline-compliant](https://api.otto.de/portal/guidelines) spec for the endpoint used to query the recipe list according to the [OpenAPI standard](https://swagger.io/specification/).
You are unsure whether you have all guidelines at the top of your mind?
The [OTTO API Linter](https://github.com/otto-de/api-guidelines/tree/ed10a53da3c173b3e8381c9f281cb0629ea3596d#api-linting) will help you to create the spec.

### Response (200)

```json
{ 
    "results": [ 
        {   "id": "3509314713",
            "name": "Best cheese nachos",
            "healthLabel": "Extremely healthy",
            "creationDate": "2022-12-06T00:00:00Z",
            "mealType": "SNACK",
            "ingredients": [
                {   "name": "Cheese",
                    "foodId": "57618045",
                    "quantity": {
                        "value": "150",
                        "unit": "mg" 
                    }
                },
                {   "name": "Nachos",
                    "foodId": "67438035",
                    "quantity": {
                        "value": "300",
                        "unit": "mg"
                    }
                }
            ],
            "preparationTime": 10,
            "experienceLevel": "BEGINNER",
            "_links": {
                "self": {
                    "href": "https://best-recipes.com/3509314713"
                }
            }
        }
    ]
}
```

### Further information

| Element  | Value  |
|---|---|
| Path  | https://api.develop.otto.de/recipes?page=0&pageSize=100&maxPreparationTime=30&experienceLevel=Beginner  |
| Query parameter  | The query parameters `page` and `pageSize` have a minimum and a default value. `pageSize` also has a maximum value. `maxPreparationTime` is an integer without any further restrictions. Under `experienceLevel`, a list of the enum values to be included can be specified. It is also possible to filter the recipes by a list of recipe IDs. All query parameters are optional.  |
| Authorization  | Client Credentials Flow; Scope: recipes.read  |
| Header parameter  | `account-id`. The ID must have the following format [0-9a-f]{40}.  |
| Error responses  | Can be ignored in this exercise.  |
| Extensible enums  | The property `mealType` can have the following extensible enum values: `SNACK`, `LUNCH`, `BREAKFAST`, `DINNER`. The property `experienceLevel` can have the following extensible enum values: `BEGINNER`, `ADVANCED`, `PRO`. |
| Required properties  | The properties `healthLabel` and `creationDate` are the only optional fields. All other fields are required.  |
| Discriminator  | Only if the meal type is `DINNER`, the response is as follows. The optional properties dishType and calories are added on root level. The property `dishType` can have the following extensible enum values: `PASTA`, `BBQ`, `VEGETARIAN`. |

