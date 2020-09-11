# Compatibility

Change APIs, but keep all consumers running. Consumers usually have independent release lifecycles, focus on stability, and avoid changes that do not provide additional value. APIs are contracts between service providers and service consumers that cannot be broken via unilateral decisions. 
So after releasing your API you realize that some details need to be changed: new fields need to be added, old ones deleted or renamed. No problem. To consider best practices and avoid some common pitfalls, you can either:

- follow rules for compatible extensions
- introduce new API versions and still support older versions

## Non-Breaking-Changes:

#### Adding optional fields
This is pretty straightforward:
1. Add the optional fields on your side
2.	Deploy your service
3.	Inform clients about the new fields
4.	Wait till clients have updated and deployed the CDC tests

#### Removing optional fields
This is as easy as adding them
1.	Talk to the Consumer-Teams
2.	Wait till Consumer-Teams have updated and deployed the CDC tests
3.	Remove the fields on your side
4.	Deploy your service

#### Removing mandatory fields
This is easier than adding mandatory fields
1.	Remove the mandatory validation on your side
2.	Deploy your service - the field is now optional
3.	Talk to the Consumer-Teams
4.	Wait till Consumer-Team has updated and deployed the CDC tests
5.	Remove the fields on your side
6.	Deploy your service

#### Enum Ranges

- Enum ranges input  can be reduced if server can handle old ranges
- Enum ranges output can be reduced when used as output parameter
- Enum ranges can be extended for input parameter
- Enum ranges can not be extended for output parameter - the client may not be able to handle them

## Breaking Changes

For Breaking Changes it might be smart to release a new API Version. But in practice, you'll see that this way might lead to a huge amount of work on all sides. You might be tempted to take some shortcuts. And of course, you might save some time when you regard the following best practices:


#### Adding mandatory fields

1.	Add the field on your side as an optional field
2.	Deploy your service
3.	Inform clients about the new field and your intention to make it mandatory
4.	Wait till clients have updated and deployed the CDC tests
5.	Write a migration job to fill the empty field values with meaningful defaults. It should be idempotent.
6.	Deploy and run your migration job
7.	Make the field mandatory (e.g. implement a NonNull validation)
8.	Deploy your service with the new validation - the field is now mandatory
9.	Run your migration job again (idempotence is a nice thing)
10.	Remove your migration job


Sounds complicated, but this is the safest way to do it. Don't think about toggling the mandatory validation on your side and in the UI and having two toggles depending on each other and deploying API and UI in any order. Many have tried this and all have failed... badly. You won't get through the CDCs.


#### Renaming mandatory fields
Naming is one of the two hard problems of computer science (besides cache invalidation and off-by-one errors). So you might want to rename some fields in your entity after the API is in use. As you see, this causes some work. It comes in handy if you have some sort of indirection layer between your business logic and your data transfer objects (in Java this is often represented through BOs and DTOs).
1.	Add a new field in your data transfer object
2.	Rewrite your validation for the old and new field
      - check that only one of the two fields is set
      - apply the existing business logic to the value received
3.	Deploy your service - either one or the other fields are accepted
4.	Inform clients to switch to the new field name
5.	Wait for clients to update their CDC tests
6.	Remove old field name and adjust validation
7.	Deploy your service

#### Changing the type of a field
Sometimes you realize that you have to change the type of an existing field (e.g. from type "String" to an embedded object). You can achieve this by applying the rules above
1.	Introduce the new mandatory field with a new name
2.	Remove the old mandatory field
3.	Rename the new mandatory field to the old field name
As you might see, these are a lot of single steps. Increasing the version number of your API and offering new endpoints might be faster here.

## Consumer

The API client must be prepared to support compatible API extensions. He must conform to the following rules:

-  be conservative with API requests and data passed as input, e.g. avoid to exploit definition deficits like passing megabytes of strings with unspecified maximum length.

- be prepared to handle http codes not explicitly defined

- Be tolerant with unknown fields in the payload, i.e. ignore new fields but do not eliminate them from payload if needed for subsequent PUT requests.

- Follow the redirect when the server returns HTTP status code 301 (Moved Permanently).

## Conclusion
I suggest the following rules:

### **[MUST]** not break backward compatibility
### **[SHOULD]** prefer compatible extensions and best practices over versioning
### **[MUST]** prepare clients to accept compatible API extensions
