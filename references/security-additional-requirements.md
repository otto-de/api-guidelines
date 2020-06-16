# additional requirements against the APIs security framework

While working on the first version on the API specification we primarily focused on a documentation the current capabilities of our API using them to securely publish API endpoints.

During this documentation we found a myriad of (sometimes more, sometimes less) well-defined additional requirements that different parties involved voiced when talking about the API.

This document will serve as a first collection of those requirements as well of the parties that brought them up. From there we'll try to sort them and, if time permits, come up with recommended solutions.

## Requirements

- As an otto.de app developer I want the logged in sessions to automagically get an API token, so that I do not need to request it explicitly.
- As an otto.de app developer I want non logged-in sessions to automagically get an (public scope) API token, so I do not need to request it explicitly.
- As a security minded developer I would like fewer authentication mechanisms and tokens between api.otto.de and www.otto.de, because designing a secure system is easier when the overall system is simpler.
