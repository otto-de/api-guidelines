---
type: MUST NOT
id: R000077
---

# rely on API components marked as preview

API specification components marked as preview are intended to inform API consumers about upcoming changes or additions. Details of both the specification and implementation are subject to change and, in case of doubt, will not be used productively, so a productive application should not rely on their availability and reliability. If an API consumer relies on appropriately marked API components, they must check with the API provider to find out when these changes will take effect, and only then can they go live with their own updated API client.
