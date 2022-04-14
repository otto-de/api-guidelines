---
type: MUST
id: R000079
appliesTo: client
---

# send unknown fields in PUT requests

To allow API evolution of services, clients must not break if providers add new properties to responses (see [MUST prepare consumers to accept compatible API extensions](@guidelines/R000029)).

A client that needs to update a resource, first has to retrieve the current state of the resource using a GET request. The client may then perform the necessary modifications ignoring unknown properties. In the subsequent PUT request for updating the resource on the server, the client must send all properties (i.e. known and unknown properties) to the server.
