# About this folder

As of May 2025, all decisions regarding API guidelines are filed in the `decisions` folder.
All formerly taken decisions remain in the `dev-context` folder unless they [need to be updated](#update-a-decision-filed-in-the-dev-context-folder).

The `dev-context` folder now serves as an archive of all previously taken decisions.
All decisions in the `dev-context` folder still apply.

## New decisions

All new decisions are filed in the `decisions` folder.
See [Add a new decision](/decisions/README.md#add-a-new-decision) for further information.

## Update a decision

If you want to update a decision from the `dev-context` folder, proceed as follows:

1. Check if the decision already complies with the [ADR guidelines](https://github.com/otto-ec/techwriting_hub/blob/main/how-tos/how-to-create-an-adr.md) (internal link).<br>
If you can't access the provided link, use [this template](https://github.com/joelparkerhenderson/architecture-decision-record/tree/main/locales/en/templates/decision-record-template-by-michael-nygard) by Michael Nygard instead.
1. If the decision does not comply with the guidelines or the template by Michael Nygard, rewrite it to meet the provided standard when you add your changes.
1. Rename and move the file:
    
    - Add a sequential number to the file name.
    - Move the file from the `dev-context` folder to the `decisions` folder.

## Decision numbers vs. guideline numbers

Both decisions and guidelines are numbered sequentially.
A guideline number does not equal the number of the related decision and vice versa.

When you add a new decision or update an existing decision, reference the related guideline(s) in the decision.