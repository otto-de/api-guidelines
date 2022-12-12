# Contributing to ottoapi_guidelines

First things first: thank you for contributing to the ottoapi_guidelines repository.
The following is a set of contribution guidelines.
Reading and following these guidelines will help us make the contribution process easy and effective for everyone involved.
You can contribute to the ottoapi_guidelines repository in various ways: by reporting bugs, suggesting new features, or by creating or reviewing pull requests.
All of it is greatly appreciated and required to create and maintain great API Guidelines.

#### Table of contents

- [Report a bug](#report-a-bug)
- [Suggest a feature](#suggest-a-feature)
- [Create a pull request](#create-a-pull-request)
- [Create a pull request draft](#create-a-pull-request-draft)
- [Compose a changelog relevant pull request](#compose-a-changelog-relevant-pull-request)
  - [You added a new rule](#you-added-a-new-rule)
  - [You made a change to an existing rule](#you-made-a-change-to-an-existing-rule)
  - [You added several new rules](#you-added-several-new-rules)
  - [You made changes to several rules](#you-made-changes-to-several-rules)
- [Pull request reviews](#pull-request-reviews)

## Report a bug

Nobody is perfect.
If you find a bug, we appreciate a bug report via a GitHub issue.
Bug reports help us improve.
Include as many details as possible to help us understand the issue.

## Suggest a feature

You're welcome to report a feature or suggest an improvement to an existing functionality via a GitHub issue.
Include as many details as possible to help us understand the requirement.

## Create a pull request

Changes and additions to the API Guidelines require a pull request against `main`.
This ensures that the intended changes

- can be properly reviewed with context.
- do not negatively affect or block the build process.
- integrate into the overall picture.

In any case, choose a descriptive PR title that explains the context and main purpose of the PR.
Use the present tense and start the title description with a verb.

We adhere to [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) to describe the structure of a commit message.
If your commit type is `feat` or `fix`, refer to [Compose a changelog relevant pull request](#compose-a-changelog-relevant-pull-request).

## Create a pull request draft

If your changes are not yet ready for review but you would still like to create a pull request to better organize your work, create a [pull request draft](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests#draft-pull-requests).

## Compose a changelog relevant pull request

The pull request title and commit body are used to generate changelog entries for the API Guidelines.
Only pull requests with the types `feat` and `fix` will be used for the changelog.
`feat` indicates a new rule, `fix` indicates an update of a rule.
In order to display them properly and user-friendly in the API Portal, a few things must be considered.
Check the following use cases to compose a changelog relevant pull request:

### You added a new rule

This is what you write in the PR title if you created a new rule.

```plain
feat(<rule-number>): <title-description>
```

This is displayed in the changelog as:

```markdown
New: <rule-name>
```

Example:

This entry

`feat(r100078): add new rule to identify customers`

is converted to

```markdown
New: SHOULD use customerId to identify customers
```

From the PR title, the changelog entry will be generated, where `feat` references a new rule and the rule number is converted to the actual rule name.
The title description is only used for the commit history and has no indication for the changelog.

For new rules, there is no need to add additional changelog information to the PR body.

### You made a change to an existing rule

This is what you write in the PR title if you made a change to an existing rule.

```plain
fix(<rule-number>): <title-description>
```

Use the PR body to list the change(s) like this:

```plain
<!--changelogbody-->
- add fix
```

This is displayed in the changelog as:

```markdown
Change: <rule-name>

- add fix
```

Example:

This entry

`fix(r000030): specify profile for content type header`

```plain
<!--changelogbody-->
- Specified profile for content type header
```

is converted to

```markdown
Update: SHOULD use Accept and Content-Type headers with profile parameter

- Specified profile for content type header
```

From the PR title, the changelog entry will be generated, where `fix` references a rule update and the rule number is converted to the actual rule name.
The title description is only used for the commit history and has no indication for the changelog.
Updates to rules need a changelog body to indicate the change(s).

### You added several new rules

This is what you write in the PR title if you created several new rules.

```plain
feat(*): <title-description>
```

Use the PR body to list the affected rules like this:

```plain
<!--changelogbody-->
- (<rule-number>)
- (<rule-number>)
- (<rule-number>)
- (<rule-number>)
- (<rule-number>)
```

This is displayed in the changelog as:

```markdown
New: <title-description>

- (<rule-number>)
- (<rule-number>)
- (<rule-number>)
- (<rule-number>)
- (<rule-number>)
```

Example:

This entry

`feat(*): release mvp of event guidelines`

```plain
<!--changelogbody-->
- (R200001)
- (R200002)
- (R200003)
- (R200004)
- (R200005)
```

is converted to

```markdown
New: release mvp of event guidelines

- (R200001)
- (R200002)
- (R200003)
- (R200004)
- (R200005)
```

From the PR title, the changelog entry will be generated, where `feat(*)` indicates a set of new rules and the title description is used for the changelog entry.
The rule numbers listed in the PR body are displayed as links.

### You made changes to several rules

This is what you write in the PR title if you created several new rules.

```plain
fix(*): <title-description>
```

Use the PR body to list the changes and affected rules like this:

```plain
<!--changelogbody-->
- Change this to that (<rule-number>)
- Remove text (<rule-number>)
```

This is displayed in the changelog as:

```markdown
Change: <title-description>

- Change this to that (<rule-number>)
- Remove text (<rule-number>)
```

Example:

This entry

`fix(*): soften the hypermedia rules`

```plain
<!--changelogbody-->
- Change MUST to SHOULD (R200001)
- Remove maturity level 3 (R200002)
```

is converted to

```markdown
Update: soften the hypermedia rules

- Change MUST to SHOULD (R200001)
- Remove maturity level 3 (R200002)
```

From the PR title, the changelog entry will be generated, where `fix(*)` indicates a set of changed rules and the title description is used for the changelog entry.
The changelog body indicates the changes with the respective rule numbers as links.

## Pull request reviews

For each PR including changes related to guideline content, one or more of the following reviewer groups are required:

- otto-ec/api-coach: guideline compliance
- otto-ec/tech-writer: content and comprehensibility
- async-group: async guideline content
- rest-group: REST guideline content
