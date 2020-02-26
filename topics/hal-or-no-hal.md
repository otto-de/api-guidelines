# Wether or not to use HAL+JSON

## current status

- in theory JSON+HAL is one standard that APIs should adhere to
- in practice a lot of APIs do not

## drawbacks

- the standard is no longer actively maintained and expired in November 2016
- very few companies use HAL+JSON, it is somewhat obscure
 - because of that there is virtually no library/tooling eco system
- the standard is quite minimalistic, leaves out a lot that we might want to define, such as
 - pagination
 - versioning
 - filtering / sorting

## advantages

- a bunch of APIs at otto already implement HAL+JSON, changing that will be some effort
- we want some features of HAL+JSON
 - ability to link between entities / endpoints

## proposal

- we adapt (JSON:API)[https://jsonapi.org/format/#fetching-pagination] for the basis of our new API standard
 - this should give us capabilities similar to JSON+HAL like hyperlinking
 - the standard is being actively maintained, new versions are backwards compatible
 - where we want to be stricter / more lax than the standard we can add to it in our own documentation
