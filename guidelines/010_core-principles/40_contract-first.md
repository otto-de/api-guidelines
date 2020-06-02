# Contract first

There are repeated discussions about the "API First" development paradigm, and many well-known software development companies follow this approach.
The definition and understanding are not consistent though, and we have learned that the "API First" approach does not work well for us.
But "Contract First" does even better.

In a nutshell, Contract First implies that we start out establishing a contract and then share it with our consumer.
The contract includes what the request and response communication is expected to be.
Once the contract is in place, the backend team can start developing the API whereas the consumer can start working on an application to consume it.

Specifically we have decided to follow the principle "UI First, API Second" based on some thoughts that [Stefan Tilkov posted on Twitter](https://twitter.com/stilkov/status/1250355396864176132).
This implies that we do not approach the API design from the backend point of view, but from the direction of a specific visual representation of the intended feature.

What are the advantages of Contract First for us?

- Since coding happens based on the contract, the backend team and the consumer are clear about the communication approach and details. Hence, development on backend and consumer side can happen at the same time.

- The backend team and the consumer have an idea of each others' expectations. As a result, if cross-team testing is not possible due to different paces of development, stub software can be used to mock the other's behavior, all based on the contract.
