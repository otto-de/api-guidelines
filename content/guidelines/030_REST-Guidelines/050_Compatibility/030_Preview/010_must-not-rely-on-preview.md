---
type: MUST NOT
id: R000077
appliesTo: client
---

# rely on API components marked as preview

API components marked as preview are intended to inform API consumers about upcoming API changes. However, these components have not been finally implemented yet and, in case of doubt, will not be used productively, so that no productive application may rely on their availability and reliability. If an API consumer relies on appropriately marked API components, they must check with the API provider when these changes will go live and can only go live with their own updated API client afterwards.
