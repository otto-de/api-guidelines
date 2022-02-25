# Compatibility

As long as applications are used, they are subject to change. If applications change, chances are that their consumed or provided APIs will occasionally change as well. So that in a distributed system landscape not all applications involved in a communication via an API have to be updated at the same time, it is important to keep changes to the API as transparent as possible for the other partners involved in the communication. _Transparency_ in this context means that despite the change, existing communication partners can continue to communicate without problems even with the partners who have already implemented the change.

::: warning
According to this definition, the term _compatibility_ refers solely to the exchange of messages _on the wire_. Any further interpretations, such as the API specification itself and how it can possibly be processed on the tool side, are explicitly excluded. However, API providers are of course free to give their consumers further guarantees beyond compatibility _on the wire_.
:::

This chapter is divided into:

- [compatible API evolution](./010_Compatible-changes/index.md)
- [versioning if incompatbile changes](./020_Versioning/index.md)
- [previewing and deprecation of versions](./030_Preview-deprecation/index.md)
