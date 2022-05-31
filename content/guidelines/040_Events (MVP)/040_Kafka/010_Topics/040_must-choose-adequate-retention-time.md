---
type: MUST
id: R200019
---

# choose adequate retention time

Individual records can't be deleted from topics configured using the [`delete` cleanup policy](https://kafka.apache.org/documentation/#topicconfigs_cleanup.policy). Records will be marked as to be deleted after a specific [retention time](https://kafka.apache.org/documentation/#topicconfigs_retention.ms). The API provider must choose the retention time adequately considering the following factors:

- The maximum time it takes for event consumers to pick up consumption after a failure.
- GDPR requires personal information to be deleted as soon as possible ([right to be forgotten](https://eur-lex.europa.eu/eli/reg/2016/679/oj#d1e2606-1-1) & [data minimalism](https://eur-lex.europa.eu/eli/reg/2016/679/oj#d1e1807-1-1)).
- Storage costs

Retention time should not exceed 30 days. If the business case requires to exceed 30 days, you'll have to consult ePrivacy department first to discuss GDPR-related requirements.
