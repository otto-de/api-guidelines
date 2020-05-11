# API First vs. Contract First

There are repeated discussions about the "API First" development paradigm. The definition and understanding are not 
consistent.

Based on some thoughts of Stefan Tilkov [posted on Twitter](../topics/api-first-vs-contract-first.md#api-first) we 
decided to follow the principle "UI First, API Second". This implies that we do not approach the API design from the 
backend point of view, but from the direction of a specific visual representation of the intended feature. 

## Decision

### <span style="color: #F1B500;">SHOULD</span> develop UI first, API second
While developing more endpoints is crucial to establish a comprehensive and vital API ecosystem, we don't want to build 
endpoints upfront without proper usecases. In the first step, you should focus on implementing an appropriate UI to 
identify the requirements and quality factors of the API. 

Only in a second step, an API should be provided, that is suitable to implement more clients, having similar 
requirements as the first UI usecase.

### <span style="color: #D4021D;">MUST</span> use "Contract First" approach

As soon as an API is developed, we are following a "Contract First" approach. In a nutshell this approach requires two 
aspects:

* define API contracts first, before coding its implementation, using a 
[standard specification language](./spec-format.md).
* get early review feedback from peers and client developers

By defining API contracts outside the code, we want to facilitate early review feedback and also a development 
discipline that focus service interface design on profound understanding of the domain and required functionality. 
Furthermore we strive to generalize business resources to avoid of use case specific APIs.
