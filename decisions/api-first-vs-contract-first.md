# API First vs. Contract First

There are repeated discussions about the "API First" development paradigm. The definition and understanding are not consistent.
Based on some thoughts of Stefan Tilkov [posted on Twitter](../topics/api-first-vs-contract-first.md#api-first) we decided to follow the principle "UI First, API Second". This implies that we do not approach the API design from the backend point of view, but from the direction of a specific visual representation of the intended feature. 

## Decision

### <span style="color: #F1B500;">SHOULD</span> develop UI first, API second
While developing more endpoints is crucial to establish a comprehensive and vital API ecosystem, we don't want to build endpoints upfront without proper  usecases. You should focus on implenting an appropriate UI to identify the requirements and quality factors of the API.

### <span style="color: #D4021D;">MUST</span> use "Contract First" approach
In a nutshell the Contract First approach requires two aspects:

* define API contracts first, before coding its implementation, using a [standard specification language](./spec-format.md).
* get early review feedback from peers and client developers

By defining API contracts outside the code, we want to facilitate early review feedback and also a development discipline that focus service interface design on profound understanding of the domain and required functionality. Furthermore we strive to generalized business resources to avoid of use case specific APIs.
