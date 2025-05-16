# Compatibility

Change APIs, but keep all consumers running. Consumers usually have independent release lifecycles, focus on stability, and avoid changes that do not provide additional value. APIs are contracts between service providers and service consumers that cannot be broken via unilateral decisions.
So after releasing your API you realize that some details need to be changed: new properties need to be added, old ones deleted or renamed. No problem. To consider best practices and avoid some common pitfalls, you can either:

- follow rules for compatible extensions
- introduce new API versions and still support older versions

## Non-Breaking-Changes

#### Adding optional properties on request and responses

This is pretty straightforward:

1. Add the optional properties on your side
2. Deploy your service
3. Inform consumers about the new properties.

#### Removing optional properties from request and responses

This is as easy as adding them

1. Inform API consumers. Their CDC tests should not include rely on the presence of optional properties.
2. Remove the properties from request and responses
3. Deploy your service

#### Removing required properties from request

This is easier than adding required properties

1. Inform API consumers. Make sure that no consumer CDC test breaks which checks if missing required properties are correctly validated.
2. Remove the required property from your service
3. Deploy your service

#### Enum values only used in responses

Enum values can be removed without breaking compatibility if they are only used in responses.
Adding new values to enums used in responses is considered a breaking change, because the client may not be able to handle them.
If you need support for adding new values, please consider using [extensible enums](https://api.otto.de/portal/guidelines/r000035).

#### Enum values only used in requests

Enum values can be added without breaking compatibility if they are only used in requests.
Removing values from enums used in requests is considered a breaking change, because the client may still send the removed values. To mitigate this problem, the API might still support old values used in requests.

## Breaking Changes

For Breaking Changes it might be smart to release a new API Version. But in practice, you'll see that this way might lead to a huge amount of work on all sides. You might be tempted to take some shortcuts. And of course, you might save some time when you regard the following best practices:

#### Adding required properties in requests

1. Add the property on your side as an optional property.
2. Add a metric that measures the number of requests that are not providing the new property.
3. Deploy your service.
4. Inform consumers about the new property and your intention to make it required
5. Wait till consumers have updated and deployed the CDC tests. Monitor your metric until all consumers have migrated.
6. Write a migration job to fill the empty property values with meaningful defaults. It should be idempotent.
7. Deploy and run your migration job
8. Make the property required (e.g. implement a NonNull validation)
9. Deploy your service with the new validation - the property is now required
10. Run your migration job again (idempotence is a nice thing)
11. Remove your migration job

Sounds complicated, but this is the safest way to do it. Don't think about toggling the required validation on your side and in the UI and having two toggles depending on each other and deploying API and UI in any order. Many have tried this and all have failed... badly. You won't get through the CDCs.

#### Renaming required properties in requests

Naming is one of the two hard problems of computer science (besides cache invalidation and off-by-one errors).
So you might want to rename some properties in your entity after the API is in use. As you see, this causes some work.
It comes in handy if you have some sort of indirection layer between your business logic and your data transfer objects (in Java this is often represented through BOs and DTOs).

1. Add a new property in your data transfer object.
2. Rewrite your validation for the old and new property
   - check that only one of the two properties is set
   - apply the existing business logic to the value received
3. Add a metric that checks to see if the old property name is still used in requests.
4. Deploy your service - either one or the other properties are accepted.
5. Inform consumers to switch to the new property name
6. Wait for consumers to update their CDC tests
7. Wait until all consumers have migrated to the new property name. Leverage your metric for this.
8. Remove old property name and adjust validation
9. Deploy your service

#### Renaming required properties in responses

1. Add a new property in your data transfer object containing the same value as in the old property.
2. Deploy your service - either one or the other properties is provided
3. Inform consumers to switch to the new property name
4. Wait for consumers to update their CDC tests
5. Remove old property name
6. Deploy your service

#### Changing the properties' type in requests

Sometimes you realize that you have to change a properties' type (e.g. from type "string" to an embedded object). You can achieve this by applying the rules above

1. Introduce the new required property with a new name
2. Remove the old required property
3. Rename the new required property to the old property name
   As you might see, these are a lot of single steps. Increasing the version number of your API and offering new endpoints might be faster here.

## Consumer

The API client must be prepared to support compatible API extensions. He must conform to the following rules:

- be conservative with API requests and data passed as input, e.g. avoid to exploit definition deficits like passing megabytes of strings with unspecified maximum length.

- be prepared to handle http codes not explicitly defined

- Be tolerant with unknown properties in the payload, i.e. ignore new properties but do not eliminate them from payload if needed for subsequent PUT requests.

- Follow the redirect when the server returns HTTP status code 301 (Moved Permanently).

## Conclusion

I suggest the following rules:

### **[MUST]** not break backward compatibility

### **[SHOULD]** prefer compatible extensions and best practices over versioning

### **[MUST]** prepare clients to accept compatible API extensions
