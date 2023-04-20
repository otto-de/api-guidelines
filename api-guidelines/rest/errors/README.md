# Errors

HTTP status codes are the most obvious choice for error communication, but they have a limited expressiveness.
Many status codes are too generic to explain the specific type of an error.
Most importantly, without contextual details, they are not particularly meaningful and user-friendly.

Different frameworks provide their own methods for error responses.
Particularly in microservice architectures with different programming languages and frameworks in use, this is not optimal.
An API must always report the same error message scheme.

[<!--INCLUDE-->Error handling](./error-handling/README.md)
